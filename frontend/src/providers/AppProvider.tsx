import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

import QueryProvider from "./QueryProvider";
import ThemeProvider from "./ThemeProvider";

interface AppProviderProps {
  children: ReactNode;
}

export default function AppProvider({
  children,
}: AppProviderProps) {
  return (
    <ThemeProvider>
      <QueryProvider>
        {children}

        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            duration: 3000,

            style: {
              borderRadius: "16px",
              background: "#ffffff",
              color: "#1f2937",
              border: "1px solid rgba(0,0,0,.06)",
            },
          }}
        />
      </QueryProvider>
    </ThemeProvider>
  );
}