"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
}

export const Button = ({ onClick, children }: ButtonProps) => {
  return (
    <button onClick={onClick} type="button" className="text-white border-red-500 cursor-pointer bg-blue-500 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2 me-2 mb-2">
      {children}
    </button>
  );
};