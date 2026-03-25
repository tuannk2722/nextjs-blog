import Head from 'next/head';
import Layout, { siteTitle } from './component/layout/page';
import utilStyles from './styles/utils.module.css';
import Link from 'next/link';
import Date from './component/date';
import { getSortedPostsData } from "@/lib/posts";

// export default function Home() {
//   return (
//     <Layout home>
//       <Head>
//         <title className={utilsStyle.headingXl}>Blog</title>
//       </Head>
//       <li className={utilsStyle.listItem} key={id}>
//         <Link href={`/posts/${id}`}>{title}</Link>
//         <br />
//         <small className={utilsStyle.lightText}>
//           <Date dateString={date} />
//         </small>
//       </li>
//     </Layout>
//   );
// }


export default async function Home() {
  const posts = getSortedPostsData();

  return (
    <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
      <h2 className={utilStyles.headingLg}>Blog</h2>
      <ul className={utilStyles.list}>
        {posts.map(({ id, date, title }) => (
          <li className={utilStyles.listItem} key={id}>
            <Link href={`/post/${id}`}>{title}</Link>
            <br />
            <small className={utilStyles.lightText}>
              <Date dateString={date} />
            </small>
          </li>
        ))}
      </ul>
    </section>
  )
}

// 'use client'

// import { useState } from 'react'

// export default function HomePage() {
//   const [getHello, setGetHello] = useState('')
//   const [postHello, setPostHello] = useState('')
//   const [user, setUser] = useState('')

//   const callGet = async () => {
//     const res = await fetch('/api/hello')
//     const data = await res.json()
//     setGetHello(data.text)
//   }

//   const callPost = async () => {
//     const res = await fetch('/api/hello', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ name: 'Tuấn Khắc' }),
//     })
//     const data = await res.json()
//     setPostHello(data.text)
//   }

//   return (
//     <div style={{ padding: '20px' }}>
//       <h1>Next.js 13+ API Demo</h1>

//       <button onClick={callGet}>Call GET /api/hello</button>
//       <p>{getHello}</p>

//       <button onClick={callPost}>Call POST /api/hello</button>
//       <p>{postHello}</p>
//     </div>
//   )
// }