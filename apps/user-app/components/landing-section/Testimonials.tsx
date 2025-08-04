import React from 'react'
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { Star } from 'lucide-react';

const testimonials = [
    {
        name: "Sarah Johnson",
        role: "Small Business Owner",
        content: "BloomPay has revolutionized how I handle international payments. Fast, secure, and reliable.",
        rating: 5
    },
    {
        name: "Michael Chen",
        role: "Freelancer",
        content: "The best payment platform I've used. Low fees and instant transfers make it perfect for my business.",
        rating: 5
    },
    {
        name: "Emma Davis",
        role: "Online Retailer",
        content: "Customer payments are processed instantly. My cash flow has never been better.",
        rating: 5
    }
];

const Testimonials = React.memo(() => {
    return (
        <section className="py-32 relative overflow-hidden bg-background">
            {/* Soft Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background z-0" />
            <div className="absolute -bottom-10 right-[20%] w-[400px] h-[400px] bg-gradient-to-br from-pink-400 to-purple-500 blur-[120px] opacity-20 rounded-full animate-pulse z-0" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-20">
                    <Badge className="mb-6 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 backdrop-blur-md border-white/20">
                        💬 Customer Stories
                    </Badge>
                    <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6 bg-gradient-to-br from-purple-600 to-pink-500 bg-clip-text text-transparent">
                        Loved by users worldwide
                    </h2>
                    <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
                        See what our customers are saying about PixelPay
                    </p>
                </div>

                {/* Testimonials Grid */}
                <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
                    {testimonials.map((testimonial, index) => (
                        <Card
                            key={testimonial.name + testimonial.role}
                            className={`group p-8 border-none bg-gradient-glass backdrop-blur-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 relative overflow-hidden animate-fade-in`}
                            style={{
                                animationDelay: `${index * 180}ms`,
                                animationDuration: "600ms",
                                animationFillMode: "both",
                            }}
                        >
                            {/* Background overlay on hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-400 opacity-0 group-hover:opacity-10 transition-opacity duration-500" />

                            <div className="relative z-10">
                                {/* Star rating */}
                                <div className="flex mb-6">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className="h-5 w-5 fill-yellow-400 text-yellow-400 animate-pop"
                                            style={{ animationDelay: `${i * 80}ms` }}
                                            aria-label="Star"
                                        />
                                    ))}
                                </div>

                                {/* Review text */}
                                <p className="text-lg italic text-foreground mb-8 leading-relaxed">
                                    "{testimonial.content}"
                                </p>

                                {/* Author info */}
                                <div className="flex items-center space-x-4">
                                    <div
                                        className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md"
                                        aria-label={`Avatar for ${testimonial.name}`}
                                    >
                                        {testimonial.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                                    </div>
                                    <div>
                                        <div className="font-semibold text-foreground text-lg">
                                            {testimonial.name}
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            {testimonial.role}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
})

export default Testimonials