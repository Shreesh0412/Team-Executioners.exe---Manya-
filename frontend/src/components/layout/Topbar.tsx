import {
  Search,
  Bell,
  UserCircle2
} from "lucide-react";

export default function Topbar() {
  return (
    <div className="sticky top-20 z-30 flex h-24 items-center justify-between rounded-3xl bg-white/70 px-8 shadow backdrop-blur-xl">

      <div className="relative w-96">

        <Search
          className="absolute left-4 top-4 text-slate-400"
          size={18}
        />

        <input
          placeholder="Search documents, folders..."
          className="w-full rounded-full border border-slate-200 bg-white py-3 pl-12 pr-5 outline-none transition focus:border-sky-300"
        />

      </div>

      <div className="flex items-center gap-5">

        <button className="rounded-full bg-sky-50 p-3 transition hover:scale-110">
          <Bell size={20} />
        </button>

        <div className="flex items-center gap-3 rounded-full bg-white px-4 py-2 shadow">

          <UserCircle2
            size={34}
            className="text-sky-500"
          />

          <div>

            <h3 className="font-semibold">
              Student
            </h3>

            <p className="text-sm text-slate-500">
              Welcome Back
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}