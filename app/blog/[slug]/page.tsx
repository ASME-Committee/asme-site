import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Clock } from "lucide-react";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { Container } from "@/components/ui/Container";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { articles, getArticleBySlug, getRecentArticles, formatDate } from "@/lib/blog";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.dek,
    openGraph: {
      title: article.title,
      description: article.dek,
      type: "article",
      publishedTime: article.date,
      authors: [article.author],
      images: [{ url: article.cover, alt: article.coverAlt }],
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const otherRecent = getRecentArticles()
    .filter((a) => a.slug !== article.slug)
    .slice(0, 3);

  return (
    <>
      <ScrollProgress />
      <Nav />
      <main>
        <section className="relative isolate overflow-hidden pt-10 pb-10 md:pt-14 md:pb-12">
          <Container>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-fg"
            >
              <ArrowLeft className="h-4 w-4" />
              All insights
            </Link>

            <div className="mx-auto mt-8 max-w-3xl">
              <div className="flex items-center gap-3 text-xs">
                <span className="rounded-full bg-brand-gradient-subtle px-2.5 py-0.5 font-medium text-brand-blue">
                  {article.category}
                </span>
                <span className="inline-flex items-center gap-1.5 text-fg-subtle">
                  <Clock className="h-3.5 w-3.5" />
                  {article.readTime}
                </span>
                <span className="text-fg-subtle">{formatDate(article.date)}</span>
              </div>
              <h1 className="h-display mt-5 text-display-lg balance">
                {article.title}
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-fg-muted pretty md:text-xl">
                {article.dek}
              </p>
              <p className="mt-6 text-sm text-fg-subtle">By {article.author}</p>
            </div>

            <div className="mx-auto mt-10 max-w-5xl">
              <div className="relative aspect-[16/9] overflow-hidden rounded-3xl border border-border">
                <Image
                  src={article.cover}
                  alt={article.coverAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </Container>
        </section>

        <section className="relative pb-24 md:pb-32">
          <Container>
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <aside className="lg:col-span-3">
                <TableOfContents
                  sections={article.sections.map((s) => ({
                    id: s.id,
                    heading: s.heading,
                  }))}
                />
              </aside>

              <article className="lg:col-span-9">
                <div className="prose-asme">
                  {article.sections.map((section) => (
                    <section key={section.id} className="mb-12 scroll-mt-28">
                      <h2
                        id={section.id}
                        className="font-display text-2xl tracking-tight text-fg md:text-3xl"
                      >
                        {section.heading}
                      </h2>
                      <div className="mt-5 space-y-5">
                        {section.body.map((para, i) => (
                          <p
                            key={i}
                            className="text-base leading-relaxed text-fg-muted pretty md:text-[1.05rem]"
                          >
                            {para}
                          </p>
                        ))}
                      </div>
                    </section>
                  ))}
                </div>

                {article.sources && article.sources.length > 0 && (
                  <section className="mt-16 border-t border-border pt-8">
                    <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-fg-subtle">
                      Sources
                    </h2>
                    <ol className="mt-5 space-y-3 text-sm">
                      {article.sources.map((s, i) => (
                        <li key={s.url} className="flex gap-3 text-fg-muted">
                          <span className="font-mono text-xs tracking-wider text-fg-subtle pt-0.5">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <a
                            href={s.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-fg hover:text-brand-blue transition-colors underline-offset-2 hover:underline"
                          >
                            {s.label}
                          </a>
                        </li>
                      ))}
                    </ol>
                  </section>
                )}

                <div className="mt-12 border-t border-border pt-8">
                  <p className="text-sm text-fg-subtle">
                    Written by <span className="text-fg">{article.author}</span> · Published {formatDate(article.date)}
                  </p>
                </div>
              </article>
            </div>
          </Container>
        </section>

        {otherRecent.length > 0 && (
          <section className="section bg-surface-subtle">
            <Container>
              <div className="flex items-end justify-between gap-8">
                <h2 className="h-display text-display-lg balance">
                  More insights
                </h2>
                <Link
                  href="/blog"
                  className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium text-fg hover:text-brand-blue transition-colors"
                >
                  All articles
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="mt-10 grid gap-6 md:grid-cols-3">
                {otherRecent.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="card card-hover group flex h-full flex-col overflow-hidden"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={post.cover}
                        alt={post.coverAlt}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="rounded-full bg-brand-gradient-subtle px-2.5 py-0.5 font-medium text-brand-blue">
                          {post.category}
                        </span>
                        <span className="text-fg-subtle">{post.readTime}</span>
                      </div>
                      <h3 className="mt-4 font-display text-lg leading-snug tracking-tight text-fg pretty">
                        {post.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-fg-muted pretty">
                        {post.dek}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </Container>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
