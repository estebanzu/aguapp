import { NavLink, useLocation } from "react-router-dom";
import { playClick } from "../utils/sound";

const navItems = [
  {
    to: "/",
    label: "Maison",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-7 h-7"
      >
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    to: "/colores",
    label: "Couleurs",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7">
        <circle cx="12" cy="12" r="10" fill="#EF4444" />
        <circle cx="7" cy="10" r="3" fill="#3B82F6" />
        <circle cx="15" cy="8" r="2.5" fill="#22C55E" />
        <circle cx="14" cy="14" r="2" fill="#EAB308" />
      </svg>
    ),
  },
  {
    to: "/numeros",
    label: "Nombres",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-7 h-7"
      >
        <text
          x="4"
          y="18"
          fontSize="16"
          fontWeight="bold"
          fill="currentColor"
          stroke="none"
        >
          1
        </text>
        <text
          x="14"
          y="18"
          fontSize="16"
          fontWeight="bold"
          fill="currentColor"
          stroke="none"
        >
          2
        </text>
      </svg>
    ),
  },
  {
    to: "/cuerpo",
    label: "Corps",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-7 h-7"
      >
        <circle cx="12" cy="5" r="3" />
        <path d="M12 8v6" />
        <path d="M8 11l4 3 4-3" />
        <path d="M12 14v4" />
        <path d="M9 22l3-4 3 4" />
      </svg>
    ),
  },
];

export default function Layout({ children }) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-cream font-body flex flex-col">
      <main className="flex-1 pb-24 overflow-y-auto">{children}</main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-50">
        <div className="max-w-lg mx-auto flex justify-around items-center py-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => playClick()}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all duration-200 ${
                  isActive
                    ? "text-blue-500 scale-110 bg-blue-50"
                    : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
                }`
              }
            >
              {item.icon}
              <span className="text-xs font-display font-bold">
                {item.label}
              </span>
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}
