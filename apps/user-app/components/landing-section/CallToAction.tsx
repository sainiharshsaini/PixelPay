import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Badge } from '../ui/badge'

const CallToAction = React.memo(() => {
    return (
        <section className="relative overflow-hidden py-28 sm:py-32">
            {/* Decorative Blurs */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 opacity-10" />
                <div className="absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-br from-purple-400 to-pink-400 blur-[120px] opacity-30 rounded-full" />
                <div className="absolute bottom-[-60px] right-[-60px] w-[400px] h-[400px] bg-gradient-to-br from-blue-400 to-indigo-500 blur-[120px] opacity-20 rounded-full" />
            </div>

            {/* CTA Content */}
            <div className="container mx-auto px-4 text-center relative z-10">
                <Badge className="mb-6 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white text-sm px-5 py-2 rounded-full shadow-lg backdrop-blur-md border border-white/20">
                    🚀 Get Started Today
                </Badge>

                <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 mb-6 leading-tight">
                    Ready to transform your payments?
                </h2>

                <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-10">
                    Join millions of users who’ve already switched to smarter, faster, and more secure payments.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-5 mb-8">
                    <Button
                        size="lg"
                        className="h-auto animate-bounce px-10 py-4 text-lg font-semibold bg-gradient-to-br from-indigo-500 to-purple-600 text-white hover:shadow-2xl hover:scale-105 transition-transform"
                        asChild
                    >
                        <Link href="/dashboard">
                            Start Free Today
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                </div>

                <p className="text-sm text-gray-500">
                    No credit card required · Free forever plan · Cancel anytime
                </p>
            </div>
        </section>
    )
})

export default CallToAction;