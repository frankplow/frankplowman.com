import Head from 'next/head';
import Link from 'next/link';

import Layout, { title } from '../components/layout';
import { getSortedPostsData } from '../lib/posts';
import Date from '../components/date';
import ContactInfo from '../components/contact_info';

export function getStaticProps() {
  return getSortedPostsData().then((allPostsData) => {
    return {
      props: {
        allPostsData,
      }
    }
  });
}

function PostLink({id, date, title}) {
  return (
    <article>
      <Link href={`/posts/${id}`}>{title}</Link>
      <br />
      <Date dateString={date} />
    </article>
  );
}

export default function Home({ allPostsData }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": title,
    "url": "https://www.frankplowman.com/",
  }

  return (
    <Layout home>
      <Head>
        <title>{title}</title>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </Head>
      <aside>
        <section>
          <h2>About</h2>
          <p>Engineer interested in multimedia and embedded systems. Currently working on post-VVC compression at Xiaomi.</p>
        </section>
        <section>
          <h2>Contact</h2>
          <ContactInfo />
        </section>
      </aside>
      {
        allPostsData.length != 0 ?
          <section>
            <h2>Blog</h2>
            <ul className="spaced list-style-none">
              {allPostsData.map(({ id, datePublished, title }) => (
                <li key={id}>
                  <PostLink id={id} title={title} date={datePublished} />
                </li>
              ))}
            </ul>
          </section> : null
      }
    </Layout>
  );
}
