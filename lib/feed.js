import { Feed } from "feed";

export function generateFeed(posts) {
  // @TODO: Sort by post date.  In the current implementation, the
  //        posts are already sorted, but that shouldn't be a
  //        requirement of this function's API.
  const updated = new Date(posts[0].datePublished);

  const site_url = "https://www.frankplowman.com";

  const feed = new Feed({
    title: "Frank Plowman's Blog",
    description: "Ashes to ashes, bits to bits",
    id: `${site_url}/`,
    link: `${site_url}/`,
    language: "en",
    // image: `${site_url}/image.png`,
    favicon: `${site_url}/favicon.svg`,
    copyright: "",
    updated: updated,
    generator: "",
    feedLinks: {
      json: `${site_url}/json`, // Check these
      atom: `${site_url}/atom`
    },
  });

  posts.forEach(post => {
    feed.addItem({
      title: post.title,
      id: post.id,
      link: `${site_url}/posts/${post.id}`,
      description: post.description,
      content: post.content,
      date: new Date(post.datePublished)
    });
  });

  return feed;
}
