import MarkdownPreview from "@uiw/react-markdown-preview";
import {useTheme} from "@/context/ThemeContext";

interface PostContentProps {
  content: string;
}

export default function PostContent({content}: PostContentProps) {
  const {theme} = useTheme();

  return (
    <div id="post-content" className="max-w-none">
      <MarkdownPreview
        source={content}
        wrapperElement={{
          "data-color-mode": theme === "dark" ? "dark" : "light",
        }}
        style={{
          backgroundColor: "transparent",
          color: "inherit",
        }}
      />
    </div>
  );
}
