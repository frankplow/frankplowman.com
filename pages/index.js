import Head from 'next/head';
import Link from 'next/link';

import Layout, { title } from '../components/layout';
import { getSortedPostsData } from '../lib/posts';
import Date from '../components/date';
import ContactInfo from '../components/contact_info';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
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
  return (
    <Layout home>
      <Head>
        <title>{title}</title>
      </Head>
      <aside>
        <section>
          <h2>About</h2>
          <p>Engineer interested in multimedia and embedded systems. Currently studying for an MEng in Electronic Engineering at the University of Leeds.</p>
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
              {allPostsData.map(({ id, date, title }) => (
                <li key={id}>
                  <PostLink id={id} title={title} date={date} />
                </li>
              ))}
            </ul>
          </section> : null
      }
    </Layout>
  );
}
