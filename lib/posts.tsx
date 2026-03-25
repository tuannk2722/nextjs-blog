import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
 
const postsDirectory = path.join(process.cwd(), 'posts');

type Post = {
  id: string
  title: string
  date: string
}

export function getSortedPostsData(): Post[] {
  const fileNames = fs.readdirSync(postsDirectory);

  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const matterResult = matter(fileContents);

    // 👇 ép kiểu tại đây
    const data = matterResult.data as { title: string; date: string }

    return {
      id,
      ...data,
    };
  });

  return allPostsData.sort((a, b) => {
    return a.date < b.date ? 1 : -1;
  });
}

// /lib/posts.tsx

// Lấy danh sách id của các bài viết
export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map((fileName) => ({
    id: fileName.replace(/\.md$/, ''),
  }));
}

// Lấy dữ liệu chi tiết của 1 bài viết
// export function getPostData(id: string) {
//   const fullPath = path.join(postsDirectory, `${id}.md`);
//   const fileContents = fs.readFileSync(fullPath, 'utf8');

//   const matterResult = matter(fileContents);

//   return {
//     id,
//     ...matterResult.data,
//   };
// }

type PostData = {
  id: string
  contentHtml: string
  title: string
  date: string
}

export async function getPostData(id: string): Promise<PostData> {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Parse metadata
  const matterResult = matter(fileContents);

  // 👇 ép kiểu rõ ràng
  const data = matterResult.data as { title: string; date: string };

  // Convert markdown → HTML
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);

  const contentHtml = processedContent.toString();

  return {
    id,
    contentHtml,
    ...data,
  };
}