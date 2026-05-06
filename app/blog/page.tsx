import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { getRecentArticles, formatDate } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Playbooks, interviews, field notes, and essays on clinical entrepreneurship. Written for founders, advisors, investors, and operators with a clinical background.",
};

export default function BlogIndexPage() {
  const all = getRecentArticles();
  const [featured, ...rest] = all;

  return (
    <>
      <ScrollProgress />
      <Nav />
      <main>
        <section className="relative isolate overflow-hidden pt-12 pb-12 md:pt-20 md:pb-16">
          <Container>
            <Reveal className="max-w-3xl">
              <span className="eyebrow">Insights</span>
              <h1 className="h-display mt-4 text-display-xl balance">
                Playbooks for clinicians who build.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-fg-muted pretty">
                Field notes, interviews, and essays on clinical entrepreneurship. New articles arrive most days. Each one is short, specific, and written by someone who has actually shipped the thing.
              </p>
            </Reveal>
          </Container>
        </section>

        {featured && (
          <section className="relative">
            <Container>
              <Reveal>
                <Link
                  href={`/blog/${featured.slug}`}
                  className="group grid gap-8 lg:grid-cols-12 lg:gap-12 rounded-3xl border border-border bg-surface-elevated p-5 md:p-7 transition-colors hover:border-border-strong"
                >
                  <div className="lg:col-span-7 relative aspect-[16/10] overflow-hidden rounded-2xl">
                    <Image
                      src={featured.cover}
                      alt={featured.coverAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      priority
                    />
                  </div>
                  <div className="lg:col-span-5 flex flex-col justify-center">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="rounded-full bg-brand-gradient-subtle px-2.5 py-0.5 font-medium text-brand-blue">
                        {featured.category}
                      </span>
                      <span className="text-fg-subtle">{featured.readTime}</span>
                    </div>
                    <h2 className="mt-5 font-display text-2xl tracking-tight text-fg balance md:text-3xl">
                      {featured.title}
                    </h2>
                    <p className="mt-4 text-base leading-relaxed text-fg-muted pretty">
                      {featured.dek}
                    </p>
                    <div className="mt-6 flex items-center justify-between text-sm text-fg-subtle">
                      <span>
                        {featured.author} · {formatDate(featured.date)}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-fg group-hover:text-brand-blue transition-colors">
                        Read
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            </Container>
          </section>
        )}

        <section className="section">
          <Container>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((post, i) => (
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
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
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
                      <div className="mt-auto pt-6 flex items-center justify-between text-xs text-fg-subtle">
                        <span>
                          {post.author} · {formatDate(post.date)}
                        </span>
                        <ArrowUpRight className="h-4 w-4 text-fg-muted transition-colors group-hover:text-brand-blue" />
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
