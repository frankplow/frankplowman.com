import fs from 'fs'
import path from 'path'
// import { renderToStaticMarkup } from "react-dom/server";

const postsDirectory = path.join(process.cwd(), '/posts');

export async function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = []
  for (let fileName of fileNames) { 
    const id = fileName.replace(/\.mdx$/, '');
    const { default: Content, meta } = await import(`/posts/${id}.mdx`);

    const postData = {
      id,
      content: Content,
      ...meta,
    };
    allPostsData.push(postData);
  }

  return allPostsData.sort((a, b) => {
    if (a.publishedDate < b.publishedDate) {
      return 1;
    } else {
      return -1;
    }
  });
}

export async function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    };
  });
}
