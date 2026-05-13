import {Link, NavLink} from "react-router-dom";
import {Sun, Moon, Menu, X} from "lucide-react";
import {useState} from "react";
import {useTheme} from "@/context/ThemeContext";
import {SITE} from "@/config/site";

const navLinks = [
  {to: "/", label: "首页"},
  {to: "/blog", label: "博客"},
  {to: "/about", label: "关于"},
];

export default function Navbar() {
  const {theme, toggle} = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur border-b border-gray-200 dark:border-gray-800">
      <nav className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="font-bold text-lg tracking-tight">
          {SITE.title}
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-6 text-sm">
          {navLinks.map(({to, label}) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === "/"}
                className={({isActive}) =>
                  isActive
                    ? "text-blue-600 dark:text-blue-400 font-medium"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            aria-label="切换主题"
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            onClick={() => setOpen((o) => !o)}
            aria-label="菜单"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-800 px-4 py-3 flex flex-col gap-3">
          {navLinks.map(({to, label}) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              onClick={() => setOpen(false)}
              className={({isActive}) =>
                isActive
                  ? "text-blue-600 dark:text-blue-400 font-medium"
                  : "text-gray-600 dark:text-gray-400"
              }
            >
              {label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
}
