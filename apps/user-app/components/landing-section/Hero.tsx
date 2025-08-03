import React from 'react'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import Link from 'next/link'
import { Card } from '../ui/card'
import { ArrowRight, Zap } from 'lucide-react'

const Hero = () => {
  return (
    <section className="relative overflow-hidden min-h-screen flex items-center justify-center">
      {/* 🎨 Layered Gradient Backgrounds */}
      <div className="absolute inset-0 bg-gradient-hero opacity-10 pointer-events-none" />
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-aurora rounded-full blur-3xl opacity-20 animate-pulse" />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-sunset rounded-full blur-3xl opacity-15 animate-pulse"
          style={{ animationDelay: '2s' }}
        />
        <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-gradient-primary rounded-full blur-3xl opacity-5 -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-20 text-center">
        {/* 🌟 Badge */}
        <Badge className="mb-8 animate-fade-in bg-gradient-glass backdrop-blur-md border-white/20 text-foreground shadow-glass">
          ✨ Trusted by 1M+ users worldwide
        </Badge>

        {/* 🏆 Hero Title */}
        <h1
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-tight text-foreground mb-8 animate-fade-in"
          style={{ animationDelay: '200ms' }}
        >
          The Future of
          <br />
          <span className="bg-gradient-aurora bg-clip-text text-transparent animate-pulse">
            Digital Payments
          </span>
        </h1>

        {/* 💬 Subtitle */}
        <p
          className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed animate-fade-in"
          style={{ animationDelay: '400ms' }}
        >
          Send money instantly, pay bills effortlessly, and manage your finances with the most
          secure and user-friendly payment platform.
        </p>

        {/* 🚀 CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row justify-center gap-6 mb-16 animate-fade-in"
          style={{ animationDelay: '600ms' }}
        >
          <Button
            size="lg"
            className="text-lg px-10 py-4 h-auto bg-gradient-primary hover:shadow-glow transition-all duration-300 transform hover:scale-105"
            asChild
          >
            <Link href="/dashboard">
              Start Free Today <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="text-lg px-10 py-4 h-auto bg-gradient-glass backdrop-blur-md border-white/20 hover:bg-white/10 transition-all duration-300"
          >
            Watch Demo
          </Button>
        </div>

        {/* 🎥 Demo Card */}
        <div className="animate-fade-in" style={{ animationDelay: '800ms' }}>
          <Card className="max-w-5xl mx-auto p-8 bg-gradient-glass backdrop-blur-xl border-white/20 shadow-elegant">
            <div className="aspect-video bg-gradient-card rounded-2xl flex items-center justify-center relative overflow-hidden">
              {/* ✨ Floating Pulse Dots */}
              <div className="absolute top-4 left-4 w-3 h-3 bg-success rounded-full animate-pulse" />
              <div
                className="absolute top-4 right-4 w-3 h-3 bg-warning rounded-full animate-pulse"
                style={{ animationDelay: '1s' }}
              />
              <div
                className="absolute bottom-4 left-4 w-3 h-3 bg-info rounded-full animate-pulse"
                style={{ animationDelay: '2s' }}
              />

              {/* 💡 Center Content */}
              <div className="z-10 text-center">
                <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-glow">
                  <Zap className="h-10 w-10 text-white animate-pulse" />
                </div>
                <p className="text-muted-foreground text-lg">Interactive Demo Coming Soon</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default Hero