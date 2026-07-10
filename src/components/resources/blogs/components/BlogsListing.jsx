'use client';

import PostsListing from '@/components/resources/shared/components/PostsListing';
import { POSTS } from '../data';

const TABS = [
  { id: 'all', label: 'All', match: () => true },
  { id: 'blogs', label: 'Blogs', match: (post) => post.tags.includes('Blog') },
  { id: 'insights', label: 'Insights', match: (post) => post.tags.includes('Insights') },
];

const WITH_HREF = POSTS.map((post) => ({ ...post, href: `/resources/blogs/${post.id}` }));

// Only 3 real posts exist site-wide today. Repeated (x3) here to fill out
// the initial 2 rows and leave enough beyond that for Load More to page
// through rather than being a no-op.
const ALL_POSTS = [...WITH_HREF, ...WITH_HREF, ...WITH_HREF].map((post, i) => ({ ...post, key: `${post.id}-${i}` }));

export default function BlogsListing() {
  const featured = WITH_HREF[0];

  return (
    <PostsListing
      heading="Latest from Virya"
      featured={{ image: featured.image, tags: featured.tags, text: featured.title, ctaHref: featured.href }}
      posts={ALL_POSTS}
      tabs={TABS}
    />
  );
}
