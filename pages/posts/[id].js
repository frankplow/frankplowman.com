import Head from 'next/head';
import Link from 'next/link';

import Layout from '../../components/layout';
import author from '../../components/layout';
import Date from '../../components/date';
import { getAllPostIds, getPostData } from '../../lib/posts';

export default function Post({ postData }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": `${postData.title}`,
    "datePublished": `${postData.datePublished}`,
    "dateModified": `${postData.dateModified}`,
    "author": [{
      "@type": "Person",
      "name": `${author}`,
      "url": "https://frankplowman.com/"
    }]
  }

  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </Head>
      <article>
        <section>
          <Link className="no-visited-style" href={`/posts/${postData.id}`}><h2>{postData.title}</h2></Link>
            <Date dateString={postData.datePublished} />
          <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </section>
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

