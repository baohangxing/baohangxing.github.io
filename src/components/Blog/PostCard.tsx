import {Link} from "react-router-dom";
import {MessageCircle, Clock} from "lucide-react";
import type {GitHubIssue} from "@/types/github";

interface PostCardProps {
  issue: GitHubIssue;
}

export default function PostCard({issue}: PostCardProps) {
  const date = new Date(issue.created_at).toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const excerpt = issue.body
    ? issue.body
        .replace(/!\[.*?\]\(.*?\)/g, "")
        .replace(/```[\s\S]*?```/g, "")
        .slice(0, 120) + "…"
    : "暂无内容";

  return (
    <article className="group border border-gray-200 dark:border-gray-800 rounded-xl p-5 hover:border-blue-400 dark:hover:border-blue-600 transition-colors">
      <Link to={`/blog/${issue.number}`}>
        <h2 className="text-lg font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2 line-clamp-2">
          {issue.title}
        </h2>
      </Link>

      {issue.labels.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {issue.labels.map((label) => (
            <span
              key={label.id}
              className="px-2 py-0.5 text-xs rounded-full"
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

      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mb-4">
        {excerpt}
      </p>

      <div className="flex items-center gap-4 text-xs text-gray-400 dark:text-gray-500">
        <span className="flex items-center gap-1">
          <Clock size={12} />
          {date}
        </span>
        <span className="flex items-center gap-1">
          <MessageCircle size={12} />
          {issue.comments} 评论
        </span>
      </div>
    </article>
  );
}
