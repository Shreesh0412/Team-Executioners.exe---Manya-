import { ReactNode } from "react";

import Navbar from "./Navbar";
import Footer from "./Footer";
import BackgroundGrid from "./BackgroundGrid";
import FloatingBlobs from "./FloatingBlobs";

interface Props {
  children: ReactNode;
}

export default function Layout({
  children,
}: Props) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-br from-sky-50 via-pink-50 to-yellow-50">

      <BackgroundGrid />

      <FloatingBlobs />

      <Navbar />

      <main className="relative z-10">
        {children}
      </main>

      <Footer />

    </div>
  );
}