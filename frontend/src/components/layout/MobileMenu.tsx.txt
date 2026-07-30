import { Menu, X } from "lucide-react";
import { useState } from "react";
import Sidebar from "./Sidebar";

export default function MobileMenu() {

  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed left-5 top-24 z-50 rounded-xl bg-white p-3 shadow-lg md:hidden"
      >
        <Menu />
      </button>

      {open && (

        <div className="fixed inset-0 z-50 bg-black/30">

          <div className="relative h-full w-72 bg-white">

            <button
              onClick={() => setOpen(false)}
              className="absolute right-5 top-5"
            >
              <X />
            </button>

            <Sidebar />

          </div>

        </div>

      )}
    </>
  );
}