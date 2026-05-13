import {SITE} from "@/config/site";

export default function About() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">关于我</h1>
      <div className="prose prose-gray dark:prose-invert max-w-none">
        <p>思绪会四处游荡，偶尔在这里停留~</p>
        <h2>联系方式</h2>
        <ul>
          <li>
            GitHub:{" "}
            <a
              href={`https://github.com/${SITE.owner}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              @{SITE.owner}
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
