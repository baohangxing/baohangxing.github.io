import {useState, useEffect, useRef} from "react";
import {List, X} from "lucide-react";

interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

interface TableOfContentsProps {
  /** 传入 markdown 原文，内容变化时触发重新读取 DOM */
  content: string;
}

export default function TableOfContents({content}: TableOfContentsProps) {
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // 从已渲染的 DOM 中读取 h2/h3 并建立目录
  useEffect(() => {
    const timer = setTimeout(() => {
      const container = document.getElementById("post-content");
      if (!container) return;

      const headings = Array.from(container.querySelectorAll("h2, h3"));
      const tocItems: TocItem[] = headings
        .map((el) => ({
          id: el.id,
          text: el.textContent?.trim() ?? "",
          level: parseInt(el.tagName[1]) as 2 | 3,
        }))
        .filter((item) => item.id && item.text);

      setItems(tocItems);
    }, 200);

    return () => clearTimeout(timer);
  }, [content]);

  // IntersectionObserver 追踪当前可见标题
  useEffect(() => {
    if (items.length === 0) return;

    observerRef.current?.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        // 取第一个进入视口的标题作为当前激活项
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {rootMargin: "-10% 0% -80% 0%", threshold: 0},
    );

    items.forEach(({id}) => {
      const el = document.getElementById(id);
      if (el) observerRef.current!.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, [items]);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({behavior: "smooth", block: "start"});
    }
    setMobileOpen(false);
  };

  if (items.length === 0) return null;

  const TocList = () => (
    <ul className="space-y-0.5">
      {items.map((item) => (
        <li key={item.id} className={item.level === 3 ? "pl-3" : ""}>
          <button
            onClick={() => handleClick(item.id)}
            title={item.text}
            className={`
              text-left text-sm w-full py-1 pr-1 transition-colors truncate block leading-snug
              ${
                activeId === item.id
                  ? "text-blue-600 dark:text-blue-400 font-medium"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
              }
            `}
          >
            {item.level === 3 && (
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-current opacity-40 mr-1.5 align-middle" />
            )}
            {item.text}
          </button>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      {/* 桌面端：固定右侧悬浮面板（xl 以上显示） */}
      <nav
        aria-label="文章目录"
        className="hidden xl:flex fixed top-1/2 -translate-y-1/2 right-4 2xl:right-8 w-52 z-30 flex-col"
      >
        <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm px-4 py-3 max-h-[70vh] flex flex-col">
          <p className="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2 shrink-0">
            目录
          </p>
          <div className="overflow-y-auto flex-1 pr-0.5 scrollbar-thin">
            <TocList />
          </div>
        </div>
      </nav>

      {/* 移动端：右下角浮动按钮 + 弹出面板 */}
      <div className="xl:hidden fixed bottom-20 right-4 z-40 flex flex-col items-end gap-2">
        {mobileOpen && (
          <>
            {/* 点击外部关闭 */}
            <div
              className="fixed inset-0 z-[-1]"
              onClick={() => setMobileOpen(false)}
            />
            <div className="w-64 max-h-72 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl px-4 py-3 overflow-y-auto">
              <p className="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
                目录
              </p>
              <TocList />
            </div>
          </>
        )}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "关闭目录" : "打开目录"}
          className="w-10 h-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full shadow-md flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          {mobileOpen ? <X size={16} /> : <List size={16} />}
        </button>
      </div>
    </>
  );
}
