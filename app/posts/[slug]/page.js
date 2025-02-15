import Post from '@/components/post';

export async function generateMetadata({ params }) {
  const slug = (await params).slug;
  const { meta } = await import (`/posts/${slug}.mdx`)
  return {
    title: meta.title,
    authors: [
      {
        name: meta.author,
      },
    ],
  }
}

export default async function Page({ params }) {
  const slug = (await params).slug;
  const { meta, default: PostContent } = await import (`/posts/${slug}.mdx`)
  return <Post id={slug} meta={meta}>
    <PostContent />
  </Post>
}
