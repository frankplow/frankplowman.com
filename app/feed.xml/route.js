import { generateFeed } from '@/lib/feed';
import { getSortedPostsData } from '@/lib/posts';

// import { renderToStaticMarkup } from "react-dom/server";

export const dynamic = 'force-static'

export async function GET() {
  const posts = await getSortedPostsData();

  // const React = await import('react');
  // const nextLink = await import('next/link');
  // nextLink.default = ({ children, href }) => React.createElement('a', { href }, children);

  // posts.forEach(function(post, index) {
  //   posts[index] = renderToStaticMarkup(post.content);
  // });

  const feed = await generateFeed(posts);

  return new Response(feed.atom1(), {
    headers: {
      'Content-Type': 'application/atom+xml; charset=utf-8',
    },
  });
}
