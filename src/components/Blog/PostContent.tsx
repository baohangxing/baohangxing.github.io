import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import {oneDark} from "react-syntax-highlighter/dist/esm/styles/prism";
import {oneLight} from "react-syntax-highlighter/dist/esm/styles/prism";
import {useTheme} from "@/context/ThemeContext";
import type {Components} from "react-markdown";

interface PostContentProps {
  content: string;
}

export default function PostContent({content}: PostContentProps) {
  const {theme} = useTheme();

  const components: Components = {
    code({className, children, ...props}) {
      const match = /language-(\w+)/.exec(className || "");
      const isInline = !match;
      if (isInline) {
        return (
          <code className="text-sm font-mono" {...props}>
            {children}
          </code>
        );
      }
      return (
        <SyntaxHighlighter
          language={match[1]}
          style={theme === "dark" ? oneDark : oneLight}
          PreTag="div"
          className="rounded-lg !my-4"
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      );
    },
  };

  return (
    <div className="prose prose-gray dark:prose-invert max-w-none prose-code:before:content-none prose-code:after:content-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
