import PostsListing from '@/components/resources/shared/components/PostsListing';
import { POSTS } from '../data';

const WITH_HREF = POSTS.map((post) => ({ ...post, href: `/resources/case-studies/${post.id}` }));

// Same placeholder-repetition approach as BlogsListing — real case-study
// copy/images don't exist beyond these 3 yet, so Load More pages through
// this repeated set instead of being a no-op.
const ALL_POSTS = [...WITH_HREF, ...WITH_HREF].map((post, i) => ({ ...post, key: `${post.id}-${i}` }));

export default function CaseStudiesListing() {
  const featured = WITH_HREF[0];

  return (
    <PostsListing
      heading="Case studies"
      featured={{
        image: featured.image,
        tags: ['Case study', 'Latest'],
        text: 'Lorem ipsum dolor sit amet consectetur. In orci dui dolor tortor eleifend neque. Aliquam id at at.',
        ctaHref: featured.href,
      }}
      posts={ALL_POSTS}
    />
  );
}
