import {SITE} from "@/config/site";

export default function Footer() {
  return (
    <footer className="border-gray-200 dark:border-gray-800 mt-16 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
      <p>
        © {new Date().getFullYear()} {SITE.author}
      </p>
    </footer>
  );
}
