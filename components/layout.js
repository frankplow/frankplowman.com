import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

const name = 'Frank Plowman';
export const siteTitle = name;

export default function Layout({ children, home }) {
  return (
    <div>
      <Head>
        <link rel="icon" href="data:," />
        <meta
          name="description"
          content="Personal site for an engineer interested in multimedia and embedded systems"
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="author" content={siteTitle} />
      </Head>
      <header>
        {
          <>
            <h1><Link href={`/`}>{name}</Link></h1>
          </>
        }
      </header>
      <main>{children}</main>
    </div>
  );
}
