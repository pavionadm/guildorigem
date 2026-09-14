import type { Metadata } from "next";
import { notFound } from "next/navigation";
import GuideDetail from "@/components/guia/GuideDetail";
import { getGuideBySlug, getGuideSlugs } from "@/lib/guides";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams(): Array<{ slug: string }> {
  return getGuideSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  if (!guide) {
    return { title: "Guia não encontrado | Guild Origem" };
  }

  return {
    title: `${guide.namePt} | Guias Guild Origem`,
    description: guide.summary,
  };
}

export default async function GuiaSlugPage({ params }: PageProps): Promise<React.ReactElement> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  if (!guide) {
    notFound();
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-16">
      <GuideDetail guide={guide} />
    </section>
  );
}
