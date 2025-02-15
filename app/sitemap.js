import { getSortedPostsData } from '../lib/posts';

export default async function sitemap() {
  const posts = await getSortedPostsData();

  var entries = [
    {
      url: 'https://www.frankplowman.com',
      lastModified: new Date(posts[0].datePublished),
      changeFrequency: 'yearly',
      priority: 1,
    },
  ];

  posts.forEach(post => {
    entries.push({
      url: `https://www.frankplowman.com/posts/${post.id}`,
      lastModified: new Date(post.dateModified),
      changeFrequency: 'yearly',
      priority: 0.6,
    });
  });

  return entries;
}
