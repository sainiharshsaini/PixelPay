"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
}

export const Button = ({ children }: ButtonProps) => {
  return (
    <button type="button" className="text-white border border-red-500 bg-gray-800 hover:bg-gray-900 ">
      {children}
    </button>

  );
};