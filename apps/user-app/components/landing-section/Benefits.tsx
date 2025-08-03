import React from 'react'
import { Card } from '../ui/card'
import { Button } from '../ui/button'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Badge } from '../ui/badge'
import { Check } from 'lucide-react'

const benefits = [
  "Zero hidden fees",
  "24/7 customer support",
  "Real-time notifications",
  "Multi-currency support",
  "Instant account verification",
  "Mobile & web access"
];

const Benefits = () => {
  return (
    <section className="relative py-28 bg-background overflow-hidden">
      {/* Decorative blurred backgrounds */}
      <div className="absolute -top-10 -left-10 w-[400px] h-[400px] bg-gradient-to-br from-blue-500 to-purple-500 blur-3xl opacity-10 rounded-full z-0" />
      <div className="absolute bottom-0 -right-10 w-[400px] h-[400px] bg-gradient-to-br from-pink-500 to-yellow-500 blur-3xl opacity-10 rounded-full z-0" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT TEXT SIDE */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight tracking-tight">
              Everything you need for modern payments
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl">
              Join millions of users who trust BloomPay for their daily financial transactions.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div
                  key={benefit}
                  className="flex items-center space-x-3 opacity-0 animate-fade-in"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animationFillMode: "forwards",
                    animationDuration: "600ms",
                  }}
                >
                  <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center shadow-md">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-foreground font-medium">{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Button
              size="lg"
              className="mt-10 text-lg px-8 py-4 h-auto bg-gradient-primary hover:shadow-glow hover:scale-[1.03] transition-all"
              asChild
            >
              <Link href="/dashboard">
                Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>

          {/* RIGHT CARD SIDE */}
          <div className="relative">
            <Card className="p-10 bg-gradient-glass backdrop-blur-xl border-white/20 shadow-elegant rounded-3xl overflow-hidden relative">
              {/* Inner background effects */}
              <div className="absolute inset-0 bg-gradient-aurora opacity-[0.06]" />
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-primary blur-2xl opacity-20 rounded-full" />

              <div className="space-y-8 relative z-10">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Available Balance
                  </span>
                  <Badge className="bg-gradient-primary text-white shadow-glow">
                    USD
                  </Badge>
                </div>

                <div className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent tracking-tight">
                  $12,847.50
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="p-6 bg-gradient-glass backdrop-blur-md rounded-2xl border border-white/10">
                    <div className="text-sm text-muted-foreground mb-2">
                      This Month
                    </div>
                    <div className="text-2xl font-bold text-success">
                      +$2,340
                    </div>
                  </div>

                  <div className="p-6 bg-gradient-glass backdrop-blur-md rounded-2xl border border-white/10">
                    <div className="text-sm text-muted-foreground mb-2">
                      Transactions
                    </div>
                    <div className="text-2xl font-bold text-foreground">
                      127
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Benefits