import { notFound } from 'next/navigation';
import ArticleDetail from '@/components/resources/shared/components/ArticleDetail';
import { POSTS, DETAILS } from '@/components/resources/case-studies/data';

export function generateStaticParams() {
  return POSTS.map((post) => ({ slug: post.id }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = POSTS.find((p) => p.id === slug);
  if (!post) return {};
  return {
    title: `${post.title} · Virya`,
    description: DETAILS[slug]?.lead,
  };
}

export default async function CaseStudyPost({ params }) {
  const { slug } = await params;
  const post = POSTS.find((p) => p.id === slug);
  const detail = DETAILS[slug];
  if (!post || !detail) notFound();

  const related = POSTS.filter((p) => p.id !== slug).map((p) => ({ ...p, slug: p.id }));

  return (
    <ArticleDetail
      backHref="/resources/case-studies"
      backLabel="View all case studies"
      post={{ ...detail, title: post.title }}
      related={related}
    />
  );
}
