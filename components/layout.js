import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

export const author = 'Frank Plowman';
export const title = author;
export const description = 'Engineer interested in multimedia and embedded systems';

export default function Layout({ children, home }) {
  return (
    <div>
      <Head>
        <link rel="icon" href="data:," />
        <meta name="description" content={description} key="desc" />
        <meta name="author" content={author} />
        <meta name="og:title" content={title} />
        <meta name="og:description" content={description} />
      </Head>
      <header>
        {
          <>
            <h1><Link className="no-visited-style" href={`/`}>{title}</Link></h1>
          </>
        }
      </header>
      <main>{children}</main>
    </div>
  );
}
