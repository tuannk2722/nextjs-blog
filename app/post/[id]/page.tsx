import Date from "@/app/component/date/page";
import Layout from "@/app/component/layout/page";
import { getPostData, getAllPostIds } from "@/lib/posts";
import Head from "next/head";
import utilStyles from "../../styles/utils.module.css";

// Generate static pages
export function generateStaticParams() {
  return getAllPostIds();
}

// Page component
export default async function Post({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const postData = await getPostData(id);

  return (
    <Layout home>
      <Head>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
      </Head>
      <div className={utilStyles.lightText}>
        <Date dateString={postData.date} />
      </div>

      {/* Render HTML từ markdown */}
      <div
        dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
      />
    </Layout>
  );
}