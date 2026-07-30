import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "rounded-full transition-all duration-300 font-medium flex items-center justify-center",
  {
    variants: {
      variant: {
        primary:
          "bg-sky-200 hover:bg-sky-300 text-slate-800",

        secondary:
          "bg-emerald-100 hover:bg-emerald-200 text-slate-800",

        outline:
          "border border-sky-300 bg-transparent hover:bg-sky-100",

        ghost:
          "hover:bg-slate-100",

        gradient:
          "bg-gradient-to-r from-sky-200 via-pink-200 to-yellow-200 hover:scale-105",

        danger:
          "bg-red-300 hover:bg-red-400 text-white",
      },

      size: {
        sm: "h-9 px-4 text-sm",

        md: "h-11 px-6",

        lg: "h-12 px-8",

        xl: "h-14 px-10 text-lg",
      },
    },

    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);