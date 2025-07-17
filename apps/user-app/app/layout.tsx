import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Providers from "../providers";
import { Toaster } from "react-hot-toast";
import Header from "../components/main-layout/Header";
import Footer from "../components/main-layout/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "PixelPay",
  description: "Payment app using Turborepo, Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} mx-auto  lg:w-4/5 border border-slate-200`}>
        <Providers>
          <Header />
          <Toaster />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
