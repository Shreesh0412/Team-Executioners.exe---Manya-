import {
  BookOpen,
  Github,
  Instagram,
  Linkedin,
  Mail,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-4">
        {/* Logo */}
        <div>
          <div className="mb-4 flex items-center gap-2">
            <BookOpen className="text-sky-600" size={28} />
            <h2 className="text-2xl font-bold text-slate-900">
              CourseMate
            </h2>
          </div>

          <p className="text-slate-600">
            Organize your study notes, documents and folders in one
            beautiful place.
          </p>
        </div>

        {/* Product */}
        <div>
          <h3 className="mb-4 text-lg font-semibold text-slate-900">
            Product
          </h3>

          <ul className="space-y-2 text-slate-600">
            <li>
              <a href="#" className="hover:text-sky-600">
                Features
              </a>
            </li>

            <li>
              <a href="#" className="hover:text-sky-600">
                How It Works
              </a>
            </li>

            <li>
              <a href="#" className="hover:text-sky-600">
                Testimonials
              </a>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="mb-4 text-lg font-semibold text-slate-900">
            Support
          </h3>

          <ul className="space-y-2 text-slate-600">
            <li>
              <a href="#" className="hover:text-sky-600">
                Contact
              </a>
            </li>

            <li>
              <a href="#" className="hover:text-sky-600">
                Privacy Policy
              </a>
            </li>

            <li>
              <a href="#" className="hover:text-sky-600">
                Terms of Service
              </a>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="mb-4 text-lg font-semibold text-slate-900">
            Connect
          </h3>

          <div className="flex gap-4">
            <a
              href="#"
              className="rounded-full bg-slate-100 p-3 transition hover:bg-sky-500 hover:text-white"
            >
              <Github size={20} />
            </a>

            <a
              href="#"
              className="rounded-full bg-slate-100 p-3 transition hover:bg-sky-500 hover:text-white"
            >
              <Linkedin size={20} />
            </a>

            <a
              href="#"
              className="rounded-full bg-slate-100 p-3 transition hover:bg-sky-500 hover:text-white"
            >
              <Instagram size={20} />
            </a>

            <a
              href="#"
              className="rounded-full bg-slate-100 p-3 transition hover:bg-sky-500 hover:text-white"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200 py-6 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} CourseMate. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;