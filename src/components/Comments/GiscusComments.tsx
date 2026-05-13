import Giscus from "@giscus/react";
import {useTheme} from "@/context/ThemeContext";
import {SITE} from "@/config/site";

export default function GiscusComments() {
  const {theme} = useTheme();

  if (!SITE.giscusRepoId || !SITE.giscusCategoryId) {
    return (
      <div className="mt-8 p-4 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg text-sm text-gray-500 dark:text-gray-400">
        评论功能尚未配置。请在{" "}
        <a
          href="https://giscus.app"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          giscus.app
        </a>{" "}
        获取 repoId / categoryId 后填入 <code>src/config/site.ts</code>。
      </div>
    );
  }

  return (
    <div className="mt-8">
      <Giscus
        repo={`${SITE.owner}/${SITE.repo}` as `${string}/${string}`}
        repoId={SITE.giscusRepoId}
        category={SITE.giscusCategory}
        categoryId={SITE.giscusCategoryId}
        mapping="pathname"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={theme === "dark" ? "dark" : "light"}
        lang="zh-CN"
        loading="lazy"
      />
    </div>
  );
}
