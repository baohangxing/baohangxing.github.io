import {Link} from "react-router-dom";
import {useIssues} from "@/hooks/useIssues";
import PostCard from "@/components/Blog/PostCard";
import {ArrowRight} from "lucide-react";

export default function Home() {
  const {data: issues, isLoading} = useIssues(1, "", "");

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Recent posts */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">最近文章</h2>
          <Link
            to="/blog"
            className="text-sm text-blue-600 dark:text-blue-400 flex items-center gap-1 hover:gap-2 transition-all"
          >
            全部文章 <ArrowRight size={14} />
          </Link>
        </div>

        {isLoading && (
          <div className="space-y-4">
            {Array.from({length: 3}).map((_, i) => (
              <div
                key={i}
                className="h-36 rounded-xl bg-gray-100 dark:bg-gray-800 animate-pulse"
              />
            ))}
          </div>
        )}

        <div className="space-y-4">
          {issues?.slice(0, 3).map((issue) => (
            <PostCard key={issue.id} issue={issue} />
          ))}
        </div>
      </section>
    </div>
  );
}
