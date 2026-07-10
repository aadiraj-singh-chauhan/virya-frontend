import styles from './page.module.css';
import BlogsListing from '@/components/resources/blogs/components/BlogsListing';

export const metadata = {
  title: 'Blogs & Insights · Virya',
  description: 'Latest news, milestones, and insights from Virya Autonomous Technologies.',
};

export default function ResourcesBlogs() {
  return (
    <main className={styles.main}>
      <BlogsListing />
    </main>
  );
}
