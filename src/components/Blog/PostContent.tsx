import MarkdownPreview from "@uiw/react-markdown-preview";
import {useTheme} from "@/context/ThemeContext";

interface PostContentProps {
  content: string;
}

export default function PostContent({content}: PostContentProps) {
  const {theme} = useTheme();

  return (
    <div className="max-w-none">
      <MarkdownPreview
        source={content}
        wrapperElement={{
          "data-color-mode": theme === "dark" ? "dark" : "light",
        }}
        style={{
          backgroundColor: "transparent",
          color: "inherit",
          fontFamily:
            '"ChunTian", "Noto Sans SC", ui-sans-serif, system-ui, sans-serif',
        }}
      />
    </div>
  );
}
