import Head from 'next/head';
import Link from 'next/link';

import Layout from './layout';
import Date from './date';

export default function Post({ children, id, meta }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": `${meta.title}`,
    "datePublished": `${meta.datePublished}`,
    "dateModified": `${meta.dateModified}`,
    "author": [{
      "@type": "Person",
      "name": `${meta.author}`,
      "url": "https://frankplowman.com/"
    }]
  }

  return (
    <Layout>
      <Head>
        <title>{meta.title}</title>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </Head>
      <article>
        <section>
          <Link className="no-visited-style" href={`/posts/${id}`}><h2>{meta.title}</h2></Link>
          <Date dateString={meta.datePublished} />
          {children}
        </section>
      </article>
    </Layout>
  );
}
