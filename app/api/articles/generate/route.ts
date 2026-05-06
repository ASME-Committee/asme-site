/**
 * Article generation harness.
 *
 * Calls the Anthropic API with the built-in web_search tool, instructs the
 * model to research a clinical-entrepreneurship topic, and returns a JSON
 * article matching the Article schema in `lib/blog.ts`.
 *
 * Persistence is intentionally NOT wired up yet. The route returns the
 * generated article. Choose one of the persistence options below before
 * scheduling daily generation:
 *
 *  1. Sanity / Contentful CMS — POST the article into a Sanity dataset.
 *  2. Postgres / Supabase — INSERT into an `articles` table that the site
 *     reads from instead of `lib/blog.ts`.
 *  3. Git-backed — open a PR against this repo with the generated JSON.
 *
 * Auth: requires the `Authorization: Bearer <ARTICLE_GEN_TOKEN>` header.
 *
 * Env vars:
 *   - ANTHROPIC_API_KEY    Required. Anthropic API key with web_search access.
 *   - ARTICLE_GEN_TOKEN    Required. Shared secret for Vercel Cron / manual
 *                          invocation. Anything cryptographically random.
 *
 * Schedule via Vercel Cron in `vercel.json`:
 *   {
 *     "crons": [
 *       { "path": "/api/articles/generate", "schedule": "0 23 * * *" }
 *     ]
 *   }
 */

import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 300;

/** Categories the model can pick from. Maps to ArticleCategory in lib/blog.ts. */
const CATEGORIES = ["Playbook", "Interview", "Field note", "Essay"] as const;

/** Topic prompts the model rotates through if no `topic` is passed in. */
const ROTATING_TOPICS = [
  "A recent (last 60 days) Australian or global clinician-led healthtech fundraising announcement. Profile the company, the clinician founder, and what other clinician founders can take from the public record.",
  "A specific tactical aspect of building a healthtech startup as a clinician: pitch deck construction, investor outreach, customer discovery, product-market fit signals, hiring the first non-clinical operator, or pricing strategy. Pick one and write a playbook.",
  "A regulatory or policy development that materially affects Australian clinician founders (TGA, AHPRA, MBS, Privacy Act, ESS rules). Explain what changed, who is affected, and what to do.",
  "A profile of an internationally significant clinician entrepreneur (Eric Topol, Atul Gawande, Devi Shetty, Alan Greene, Jessica Mega, etc.) and what their public writing teaches Australian clinician founders.",
  "A recent (last 90 days) clinical-AI or digital-health news event with implications for early-stage clinician founders. Cite the original reporting.",
];

const SYSTEM_PROMPT = `You are the editorial AI for the Australian Society for Medical Entrepreneurship (ASME). You research and write articles on clinical entrepreneurship for a readership of Australian clinician founders, advisors, investors, and operators.

EDITORIAL RULES (strict):
- No em dashes (—) or en dashes (–). Use periods, commas, or sentence reconstruction instead.
- Article body must be 700 to 1000 words, divided into 4 to 6 H2 sections with kebab-case ids.
- Every quantitative claim, named company, and external reference MUST be in the \`sources\` array with a working URL the reader can click. Do not make up statistics. Do not make up named individuals' quotes. If a claim cannot be sourced, do not make it.
- Do not invent personal anecdotes or first-person stories. Write in editorial voice (third person or imperative second person).
- Default author byline is "ASME Editorial".
- Australian English spelling. Australian regulatory and tax context where relevant.
- Cover image: pick a real, public Unsplash photo URL of the form https://images.unsplash.com/photo-<id>?auto=format&fit=crop&w=1600&q=80. Use only photo IDs that you actually verified during research (or that you have a citation for). If you are not sure a photo ID exists, omit the cover field and the caller will fill it in.

OUTPUT FORMAT:
After researching, return a SINGLE JSON object (no surrounding prose) that matches this TypeScript type:

type Article = {
  slug: string;             // kebab-case, unique
  title: string;
  dek: string;              // 1-2 sentence subhead
  category: "Playbook" | "Interview" | "Field note" | "Essay";
  author: string;           // default "ASME Editorial"
  date: string;             // ISO yyyy-mm-dd, today
  readTime: string;         // e.g. "8 min"
  cover: string;            // Unsplash URL
  coverAlt: string;
  sections: {
    id: string;             // kebab-case anchor
    heading: string;
    body: string[];         // array of paragraphs
  }[];
  sources: {
    label: string;
    url: string;
  }[];
};

Wrap the JSON in a fenced \`\`\`json block so the caller can parse it cleanly.`;

type GenerateRequest = {
  topic?: string;
  category?: (typeof CATEGORIES)[number];
};

export async function POST(req: Request) {
  const auth = req.headers.get("authorization") ?? "";
  const expected = process.env.ARTICLE_GEN_TOKEN;
  if (!expected || auth !== `Bearer ${expected}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "ANTHROPIC_API_KEY not configured" },
      { status: 500 },
    );
  }

  const body: GenerateRequest = await req.json().catch(() => ({}));

  const topic =
    body.topic ??
    ROTATING_TOPICS[
      Math.floor((Date.now() / (1000 * 60 * 60 * 24)) % ROTATING_TOPICS.length)
    ];

  const userMessage = `Research and write today's article.

Topic guidance: ${topic}

Use the web_search tool aggressively. Pull at least 4 distinct sources. Verify any company names, fundraising amounts, dates, and statistics against the original primary source where possible.

Return the JSON article only, in a fenced \`\`\`json block.`;

  const anthropicRes = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-opus-4-7",
      max_tokens: 8000,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userMessage }],
      tools: [
        {
          type: "web_search_20250305",
          name: "web_search",
          max_uses: 10,
        },
      ],
    }),
  });

  if (!anthropicRes.ok) {
    const err = await anthropicRes.text();
    return NextResponse.json(
      { error: "Anthropic API error", status: anthropicRes.status, detail: err.slice(0, 1000) },
      { status: 502 },
    );
  }

  const data = await anthropicRes.json();

  // Concatenate all text blocks from the final assistant turn, then extract
  // the fenced JSON.
  const blocks = (data.content ?? []) as Array<{ type: string; text?: string }>;
  const fullText = blocks
    .filter((b) => b.type === "text" && typeof b.text === "string")
    .map((b) => b.text)
    .join("\n\n");

  const fenced = fullText.match(/```json\s*([\s\S]*?)```/);
  const raw = fenced ? fenced[1] : fullText.match(/\{[\s\S]*\}/)?.[0];

  if (!raw) {
    return NextResponse.json(
      {
        error: "No JSON in model output",
        preview: fullText.slice(0, 1000),
        usage: data.usage,
      },
      { status: 502 },
    );
  }

  let article: unknown;
  try {
    article = JSON.parse(raw);
  } catch (e) {
    return NextResponse.json(
      {
        error: "Invalid JSON from model",
        parseError: (e as Error).message,
        raw: raw.slice(0, 1000),
      },
      { status: 502 },
    );
  }

  // Lightweight validation. Reject articles missing required fields so a
  // bad generation does not get persisted downstream.
  const validation = validateArticle(article);
  if (!validation.ok) {
    return NextResponse.json(
      { error: "Generated article failed validation", reasons: validation.errors, article },
      { status: 422 },
    );
  }

  return NextResponse.json({
    ok: true,
    article,
    usage: data.usage,
    /**
     * TODO(persistence): wire one of the options at the top of this file
     * to actually save the article. For now, the caller (you, or Vercel
     * Cron) receives the JSON and must persist it.
     */
  });
}

/** Manual GET handler for browser-based smoke testing. */
export async function GET() {
  return NextResponse.json({
    ok: true,
    note: "Article generation endpoint. POST with `Authorization: Bearer <ARTICLE_GEN_TOKEN>` to trigger.",
    body: {
      topic: "(optional) override the rotating topic prompt",
    },
  });
}

function validateArticle(a: unknown): { ok: true } | { ok: false; errors: string[] } {
  const errors: string[] = [];
  if (!a || typeof a !== "object") return { ok: false, errors: ["Not an object"] };
  const o = a as Record<string, unknown>;

  const required = ["slug", "title", "dek", "category", "author", "date", "readTime", "cover", "coverAlt", "sections", "sources"];
  for (const k of required) if (!(k in o)) errors.push(`Missing field: ${k}`);

  if (typeof o.slug === "string" && !/^[a-z0-9-]+$/.test(o.slug)) errors.push("slug must be kebab-case");
  if (typeof o.category === "string" && !CATEGORIES.includes(o.category as (typeof CATEGORIES)[number])) errors.push("category must be one of " + CATEGORIES.join(", "));
  if (typeof o.date === "string" && !/^\d{4}-\d{2}-\d{2}$/.test(o.date)) errors.push("date must be YYYY-MM-DD");

  if (Array.isArray(o.sections)) {
    if (o.sections.length < 3) errors.push("sections must have at least 3 entries");
    for (const [i, s] of o.sections.entries()) {
      if (!s || typeof s !== "object") errors.push(`sections[${i}] not an object`);
      else {
        const sec = s as Record<string, unknown>;
        if (typeof sec.id !== "string") errors.push(`sections[${i}].id missing`);
        if (typeof sec.heading !== "string") errors.push(`sections[${i}].heading missing`);
        if (!Array.isArray(sec.body)) errors.push(`sections[${i}].body not an array`);
      }
    }
  } else if ("sections" in o) {
    errors.push("sections must be an array");
  }

  if (Array.isArray(o.sources)) {
    if (o.sources.length < 3) errors.push("sources must have at least 3 entries (real, citable URLs)");
    for (const [i, s] of o.sources.entries()) {
      if (!s || typeof s !== "object") errors.push(`sources[${i}] not an object`);
      else {
        const src = s as Record<string, unknown>;
        if (typeof src.label !== "string") errors.push(`sources[${i}].label missing`);
        if (typeof src.url !== "string" || !/^https?:\/\//.test(src.url as string)) errors.push(`sources[${i}].url must be a full URL`);
      }
    }
  } else if ("sources" in o) {
    errors.push("sources must be an array");
  }

  // Body word-count check
  if (Array.isArray(o.sections)) {
    let words = 0;
    for (const s of o.sections) {
      const sec = s as { body?: unknown };
      if (Array.isArray(sec.body)) {
        for (const p of sec.body) if (typeof p === "string") words += p.split(/\s+/).length;
      }
    }
    if (words < 600) errors.push(`Body too short (${words} words; minimum 600)`);
    if (words > 1100) errors.push(`Body too long (${words} words; maximum 1100)`);
  }

  // No em or en dashes anywhere in the body strings
  if (Array.isArray(o.sections)) {
    for (const s of o.sections) {
      const sec = s as { body?: unknown };
      if (Array.isArray(sec.body)) {
        for (const p of sec.body) {
          if (typeof p === "string" && /[–—]/.test(p)) {
            errors.push("Body contains em or en dash (editorial rule violation)");
            break;
          }
        }
      }
    }
  }

  return errors.length === 0 ? { ok: true } : { ok: false, errors };
}
