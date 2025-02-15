import Link from 'next/link';
 
import Layout, { title } from '../components/layout';
import { getSortedPostsData } from '../lib/posts';
import Date from '../components/date';
import ContactInfo from '../components/contact_info';

function PostLink({id, date, title}) {
  return (
    <article>
      <Link href={`/posts/${id}`}>{title}</Link>
      <br />
      <Date dateString={date} />
    </article>
  );
}

export const metadata = {
  title: "Frank Plowman",
  description: "Engineer interested in multimedia and embedded systems",
};

export default async function Index() {
  const posts = await getSortedPostsData();
  
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": metadata.title,
    "description": metadata.description,
    "url": "https://www.frankplowman.com/",
    "jobTitle": "Staff Engineer - Video Standards",
    "worksFor": "Xiaomi",
  }

  return (
    <Layout home>
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
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
        posts.length != 0 ?
          <section>
            <h2>Blog
              <a href="/feed.xml">
                <svg style={{verticalAlign: "bottom", marginLeft: "2px", marginBottom: "2px"}} fill="var(--color-link)" height="20px" preserveAspectRatio="X200Y200 meet" version="1.1" id="Capa_1" viewBox="0 0 80 80">
                  <circle cx="19.91" cy="58.23" r="6.86"></circle>
                  <path d="M67.89,65.72H55.7A41.86,41.86,0,0,0,13.89,23.91V11.73A54.06,54.06,0,0,1,67.89,65.72Z"></path>
                  <path d="M48.93,65.72H36.75A22.88,22.88,0,0,0,13.89,42.87V30.68A35.08,35.08,0,0,1,48.93,65.72Z"></path>
                </svg>
              </a>
            </h2>
            <ul className="spaced list-style-none">
              {posts.map(({ id, datePublished, title }) => (
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
