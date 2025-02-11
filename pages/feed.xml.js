import { generateFeed } from '../lib/feed';
import { getSortedPostsData } from '../lib/posts';
import { GetServerSideProps } from "next";

// export function getStaticProps() {
//   return getSortedPostsData().then((posts) => {
//     return {
//       props: {
//         posts,
//       }
//     }
//   });
// }

export const getServerSideProps = async ({ res }) => {
  const posts = await getSortedPostsData();
  const feed = generateFeed(posts);
  res.setHeader("Content-Type", "application/atom+xml");
  res.write(feed.atom1());
  res.end();
  return { props: {} };
}

export default function Feed({ posts }) {
  return null
}
