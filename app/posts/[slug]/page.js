import Post from '@/components/post';

export default async function Page({ params }) {
  const slug = (await params).slug;
  const { meta, default: PostContent } = await import (`/posts/${slug}.mdx`)
  return <Post id={slug} meta={meta}>
    <PostContent />
  </Post>
}
