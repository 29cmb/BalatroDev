import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import ReactMarkdown from 'react-markdown';
import "@/styles/globals.css";
import { GetServerSideProps } from "next";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Head from 'next/head';
import remarkGfm from 'remark-gfm'
import Image from "next/image";

interface GuideData {
  success: boolean;
  guide: {
    content: string;
    name: string;
  };
}

export default function Guide({ content, name, id }: { content: string; name: string, id: string }) {
  return (
    <>
      <Head>
        <title>{`${name} | Documentation`}</title>
        <meta name="description" content={`Documentation guide for ${name}`} />
      </Head>
      <Topbar />
      <Sidebar id={id} />
      <div className="ml-[26em] flex-1 p-[20px]">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code(props) {
              const { children, className, ...rest } = props;
              const match = /language-(\w+)/.exec(className || '');
              return match ? (
                // @ts-expect-error No idea why this is "broken"
                <SyntaxHighlighter
                  {...rest}
                  PreTag="div"
                  language={match[1]}
                  style={materialDark}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className="bg-[#374151] rounded-md p-[5px] text-[16px] font-mono text-white">
                  {children}
                </code>
              );
            },
            h1(props) {
              return <h1 className="text-[40px] font-bold" {...props} />;
            },
            h2(props) {
              return <h2 className="text-[30px] font-bold" {...props} />;
            },
            h3(props) {
              return <h3 className="text-[25px] font-bold" {...props} />;
            },
            h4(props) {
              return <h4 className="text-[20px] font-bold" {...props} />;
            },
            h5(props) {
              return <h5 className="text-[18px] font-bold" {...props} />;
            },
            h6(props) {
              return <h6 className="text-[16px] font-bold" {...props} />;
            },
            blockquote(props){
              return <blockquote className="border-l-[7px] rounded-md border-[#328bca] bg-[#2b648d] p-[10px]">
                <div className="flex items-center gap-2 mb-2">
                  <Image width="25" height="25" src="https://img.icons8.com/00b7ff/info.png" alt="info--v1"/>
                  <p className="m-0 font-bold">INFO</p>
                </div>
                {props.children}
              </blockquote>
            },
            p(props) {
              return <p className="my-[10px]" {...props} />
            },
            a(props){
              return <a className="text-[#ca3232] underline" {...props} />
            }
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { id } = context.query;

    if (!id || typeof id !== 'string') {
      return { notFound: true };
    }

    const res = await fetch(`${process.env.SERVER_URL}/api/v1/guide/${id}`);
    
    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.statusText}`);
    }

    const data: GuideData = await res.json();

    if (!data.success || !data.guide) {
      return { notFound: true };
    }

    return {
      props: {
        content: data.guide.content,
        name: data.guide.name || null,
        id
      },
    };
  } catch (error) {
    console.error('Error fetching guide:', error);
    return { notFound: true };
  }
}