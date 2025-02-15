import Link from 'next/link';

import Layout from './layout';
import Date from './date';

export default function Post({ children, id, meta }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "name": meta.title,
    "url": `https://www.frankplowman.com/posts/${id}`,
    "author": [{
      "@type": "Person",
      "name": meta.author,
      "url": "https://frankplowman.com/"
    }],
    "datePublished": meta.datePublished,
    "dateModified": meta.dateModified,
  };

  return (
    <Layout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
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
