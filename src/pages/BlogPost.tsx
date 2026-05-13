import {useParams, Link} from "react-router-dom";
import {ArrowLeft, Clock, MessageCircle, ExternalLink} from "lucide-react";
import {useIssue} from "@/hooks/useIssue";
import PostContent from "@/components/Blog/PostContent";
import GiscusComments from "@/components/Comments/GiscusComments";

export default function BlogPost() {
  const {id} = useParams<{id: string}>();
  const number = parseInt(id ?? "0", 10);
  const {data: issue, isLoading, isError} = useIssue(number);

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10 space-y-4">
        <div className="h-8 w-2/3 bg-gray-100 dark:bg-gray-800 rounded animate-pulse" />
        <div className="h-4 w-1/3 bg-gray-100 dark:bg-gray-800 rounded animate-pulse" />
        <div className="space-y-2 mt-8">
          {Array.from({length: 8}).map((_, i) => (
            <div
              key={i}
              className="h-4 bg-gray-100 dark:bg-gray-800 rounded animate-pulse"
              style={{width: `${80 + Math.random() * 20}%`}}
            />
          ))}
        </div>
      </div>
    );
  }

  if (isError || !issue) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-500">文章不存在或加载失败。</p>
        <Link
          to="/blog"
          className="mt-4 inline-block text-blue-600 dark:text-blue-400"
        >
          返回博客
        </Link>
      </div>
    );
  }

  const date = new Date(issue.created_at).toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="max-w-3xl mx-auto px-4 py-10">
      <Link
        to="/blog"
        className="inline-flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-8 transition-colors"
      >
        <ArrowLeft size={14} /> 返回博客
      </Link>

      <header className="mb-8">
        <h1 className="text-3xl font-bold leading-snug mb-4">{issue.title}</h1>

        {issue.labels.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {issue.labels.map((label) => (
              <span
                key={label.id}
                className="px-2.5 py-0.5 text-xs rounded-full"
                style={{
                  backgroundColor: `#${label.color}22`,
                  color: `#${label.color}`,
                }}
              >
                {label.name}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-1.5">
            <img
              src={issue.user.avatar_url}
              alt={issue.user.login}
              className="w-5 h-5 rounded-full"
            />
            {issue.user.login}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={13} /> {date}
          </span>
          <span className="flex items-center gap-1">
            <MessageCircle size={13} /> {issue.comments}
          </span>
          <a
            href={issue.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors ml-auto"
          >
            GitHub <ExternalLink size={12} />
          </a>
        </div>
      </header>

      <PostContent content={issue.body ?? ""} />

      <GiscusComments />
    </article>
  );
}
