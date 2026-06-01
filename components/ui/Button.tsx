import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

export default function Button({ children, ...rest }: Props) {
  return (
    <button
      {...rest}
      className={`rounded-full bg-[#1DB954] px-4 py-2 text-white text-sm disabled:opacity-60 ${rest.className ?? ""}`}
    >
      {children}
    </button>
  );
}
