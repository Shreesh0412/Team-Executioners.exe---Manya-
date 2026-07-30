import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FolderOpen,
  FileText,
  Brain,
  BookOpen,
  Calendar,
  StickyNote,
  TimerReset,
  Bell,
  User,
} from "lucide-react";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: FolderOpen, label: "Folders", path: "/folders" },
  { icon: FileText, label: "Documents", path: "/documents" },
  { icon: Brain, label: "AI Chat", path: "/chat" },
  { icon: BookOpen, label: "Flashcards", path: "/flashcards" },
  { icon: Calendar, label: "Planner", path: "/planner" },
  { icon: StickyNote, label: "Notes", path: "/notes" },
  { icon: TimerReset, label: "Pomodoro", path: "/pomodoro" },
  { icon: Bell, label: "Notifications", path: "/notifications" },
  { icon: User, label: "Profile", path: "/profile" },
];

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-20 h-[calc(100vh-80px)] w-72 border-r border-white/30 bg-white/70 backdrop-blur-xl">

      <div className="space-y-2 p-6">

        {menuItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-4 rounded-2xl px-5 py-4 transition-all duration-300 ${
                isActive
                  ? "bg-gradient-to-r from-sky-200 to-cyan-100 text-sky-700 shadow-lg"
                  : "text-slate-600 hover:bg-sky-50"
              }`
            }
          >
            <item.icon size={22} />

            <span className="font-medium">
              {item.label}
            </span>

          </NavLink>
        ))}

      </div>

    </aside>
  );
}