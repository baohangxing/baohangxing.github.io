import {SITE} from "@/config/site";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 mt-16 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
      <p>
        © {new Date().getFullYear()} {SITE.author} · Powered by{" "}
        <a
          href={`https://github.com/${SITE.owner}/${SITE.repo}/issues`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          GitHub Issues
        </a>
      </p>
    </footer>
  );
}
