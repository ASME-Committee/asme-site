import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { getRecentArticles, formatDate } from "@/lib/blog";

export function Insights() {
  const posts = getRecentArticles(4);

  return (
    <section id="insights" className="section relative">
      <Container>
        <Reveal className="flex items-end justify-between gap-8">
          <div className="max-w-xl">
            <span className="eyebrow">Insights</span>
            <h2 className="h-display mt-3 text-display-lg balance">
              Playbooks for clinicians who build.
            </h2>
            <p className="mt-4 text-sm text-fg-muted pretty">
              New articles arrive most days. Field notes, interviews, and essays on clinical entrepreneurship.
            </p>
          </div>
          <Link
            href="/blog"
            className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium text-fg hover:text-brand-blue transition-colors"
          >
            All articles
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.05}>
              <Link
                href={`/blog/${post.slug}`}
                className="card card-hover group flex h-full flex-col overflow-hidden"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={post.cover}
                    alt={post.coverAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="rounded-full bg-brand-gradient-subtle px-2.5 py-0.5 font-medium text-brand-blue">
                      {post.category}
                    </span>
                    <span className="text-fg-subtle">{post.readTime}</span>
                  </div>
                  <h3 className="mt-4 font-display text-base leading-snug tracking-tight text-fg pretty">
                    {post.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-fg-muted pretty line-clamp-3">
                    {post.dek}
                  </p>
                  <div className="mt-auto pt-5 flex items-center justify-between text-xs text-fg-subtle">
                    <span>{post.author}</span>
                    <ArrowUpRight className="h-4 w-4 text-fg-muted transition-colors group-hover:text-brand-blue" />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 text-center md:hidden">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-fg"
          >
            All articles
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
