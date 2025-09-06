"use client"

import React from 'react'
import Link from 'next/link';

const footerLinks = {
  product: ["Features", "Pricing", "API", "Security"],
  company: ["About", "Careers", "Blog", "Contact"],
  support: ["Help Center", "Privacy Policy", "Terms of Service", "Status"],
};

const Footer = () => {
  return (
    <footer className="relative bg-white/80 backdrop-blur-md border-t py-12 text-sm text-muted-foreground overflow-hidden">
      
      <div className="absolute -top-20 -left-32 w-96 h-96 bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 blur-[120px] opacity-20 rounded-full -z-10" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-br from-pink-400 to-indigo-400 blur-[100px] opacity-20 rounded-full -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid gap-10 md:grid-cols-4">

          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-lg flex items-center justify-center font-bold shadow">
                PP
              </div>
              <span className="text-xl font-semibold text-gray-900">PixelPay</span>
            </div>
            <p className="max-w-xs text-gray-500">
              The future of digital payments, today.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4 tracking-wide uppercase text-xs">Product</h4>
            <ul className="space-y-2">
              {footerLinks.product.map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="hover:text-purple-600 focus:text-purple-700 transition-colors px-1 py-0.5 rounded focus:outline-none focus:ring-2 focus:ring-purple-300"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4 tracking-wide uppercase text-xs">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="hover:text-purple-600 focus:text-purple-700 transition-colors px-1 py-0.5 rounded focus:outline-none focus:ring-2 focus:ring-purple-300"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4 tracking-wide uppercase text-xs">Support</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="hover:text-purple-600 focus:text-purple-700 transition-colors px-1 py-0.5 rounded focus:outline-none focus:ring-2 focus:ring-purple-300"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-10 pt-6 text-center text-xs text-gray-400">
          <p>
            © {new Date().getFullYear()} <span className="font-semibold text-gray-600">PixelPay</span>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer