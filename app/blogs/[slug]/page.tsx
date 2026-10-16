import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MotionDiv } from '@/components/blogs/MotionWrapper';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import type { Components } from 'react-markdown';

const blogsDirectory = path.join(process.cwd(), 'data/blogs');

interface BlogPostPageProps { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return fs.readdirSync(blogsDirectory).filter((file) => file.endsWith('.md')).map((file) => ({ slug: file.replace(/\.md$/, '') }));
}

const BlogPostPage = async ({ params }: BlogPostPageProps) => {
  const { slug } = await params;
  const filePath = path.join(blogsDirectory, `${slug}.md`);
  let post = '';
  let frontmatter: Record<string, any> = {};

  try {
    const { data, content } = matter(fs.readFileSync(filePath, 'utf8'));
    frontmatter = data;
    post = content;
  } catch {
    return <div className='min-h-screen flex items-center justify-center'><div className='text-center'><h1 className='text-4xl font-bold text-gray-900 mb-4'>404</h1><p className='text-gray-600 mb-8'>Blog post not found</p><Link href='/blogs' className='text-blue-600 hover:text-blue-700'>← Back to Blogs</Link></div></div>;
  }

  return (
    <div className='bg-white min-h-screen'>
      <div className='relative h-[60vh] w-full'><Image src={frontmatter.image} alt={frontmatter.title} fill className='object-cover' priority /><div className='absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white' /></div>
      <div className='max-w-3xl mx-auto px-6 sm:px-8 -mt-32 relative z-10'>
        <MotionDiv initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Link href='/blogs' className='inline-flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors'>← Back to Blogs</Link>
          <article className='bg-white rounded-lg'>
            <header className='mb-12'>
              <h1 className='text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight'>{frontmatter.title}</h1>
              <div className='flex items-center text-gray-600 text-sm space-x-4 mb-6'><time dateTime={frontmatter.date}>{new Date(frontmatter.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time><span>•</span><span>{frontmatter.author}</span></div>
              {frontmatter.tags && <div className='flex flex-wrap gap-2'>{frontmatter.tags.map((tag: string) => <span key={tag} className='px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full'>{tag}</span>)}</div>}
            </header>
            <div className='prose prose-lg prose-slate max-w-none prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-blue-600 prose-strong:text-gray-900 prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-6 prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-img:rounded-xl prose-img:shadow-2xl'>
              <ReactMarkdown components={{
                code(props) {
                  const { className, children } = props;
                  const match = /language-(\w+)/.exec(className || '');
                  return match ? <SyntaxHighlighter style={oneDark as Record<string, React.CSSProperties>} language={match[1]} PreTag='div'>{String(children).replace(/\n$/, '')}</SyntaxHighlighter> : <code className={className}>{children}</code>;
                },
                img(props) {
                  if (!props.src) return null;
                  return <Image src={props.src as string} alt={props.alt ?? ''} width={800} height={500} className='rounded-lg shadow-lg w-full h-auto' />;
                },
              } as Components}>{post}</ReactMarkdown>
            </div>
          </article>
          <div className='mt-16 mb-12 pt-8 border-t border-gray-200'><Link href='/blogs' className='text-gray-600 hover:text-gray-900 transition-colors font-medium'>← View all posts</Link></div>
        </MotionDiv>
      </div>
    </div>
  );
};

export default BlogPostPage;
