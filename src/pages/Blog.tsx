import {useState, useCallback} from "react";
import {ChevronLeft, ChevronRight} from "lucide-react";
import {useIssues} from "@/hooks/useIssues";
import {useLabels} from "@/hooks/useIssue";
import PostCard from "@/components/Blog/PostCard";
import SearchBar from "@/components/UI/SearchBar";
import TagFilter from "@/components/UI/TagFilter";

export default function Blog() {
  const [page, setPage] = useState(1);
  const [label, setLabel] = useState("");
  const [search, setSearch] = useState("");

  const {data: issues, isLoading, isError} = useIssues(page, label, search);
  const {data: labels = []} = useLabels();

  const handleSearch = useCallback((v: string) => {
    setSearch(v);
    setPage(1);
  }, []);

  const handleLabel = useCallback((v: string) => {
    setLabel(v);
    setPage(1);
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">博客</h1>

      <div className="space-y-4 mb-8">
        <SearchBar value={search} onChange={handleSearch} />
        <TagFilter labels={labels} active={label} onChange={handleLabel} />
      </div>

      {isLoading && (
        <div className="space-y-4">
          {Array.from({length: 5}).map((_, i) => (
            <div
              key={i}
              className="h-36 rounded-xl bg-gray-100 dark:bg-gray-800 animate-pulse"
            />
          ))}
        </div>
      )}

      {isError && (
        <p className="text-red-500 dark:text-red-400">加载失败，请稍后重试。</p>
      )}

      <div className="space-y-4">
        {issues?.map((issue) => (
          <PostCard key={issue.id} issue={issue} />
        ))}
      </div>

      {!isLoading && issues?.length === 0 && (
        <p className="text-center py-16 text-gray-400">没有找到相关文章。</p>
      )}

      {/* Pagination */}
      {!search && (
        <div className="flex items-center justify-center gap-4 mt-10">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 disabled:opacity-40 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          <span className="text-sm text-gray-500">第 {page} 页</span>
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={!issues || issues.length < 10}
            className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 disabled:opacity-40 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
