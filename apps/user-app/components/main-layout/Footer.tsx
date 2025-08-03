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
    <footer className="bg-white border-t py-12 text-sm text-muted-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-lg flex items-center justify-center font-bold">
                PP
              </div>
              <span className="text-xl font-semibold text-gray-900">PixelPay</span>
            </div>
            <p className="max-w-xs text-gray-500">
              The future of digital payments, today.
            </p>
          </div>

          {/* Sections */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Product</h4>
            <ul className="space-y-2">
              {footerLinks.product.map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="hover:text-gray-900 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="hover:text-gray-900 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Support</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="hover:text-gray-900 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-10 pt-6 text-center text-xs text-gray-400">
          <p>© {new Date().getFullYear()} PixelPay. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer