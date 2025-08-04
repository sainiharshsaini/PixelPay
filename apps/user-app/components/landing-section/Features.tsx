import React from 'react'
import { Badge } from '../ui/badge'
import { Zap, Shield, Globe } from 'lucide-react';
import { Card } from '../ui/card';

const features = [
	{
		icon: Zap,
		title: "Instant Transfers",
		description: "Send money anywhere in the world in seconds, not days"
	},
	{
		icon: Shield,
		title: "Bank-Level Security",
		description: "Your money is protected with military-grade encryption"
	},
	{
		icon: Globe,
		title: "Global Reach",
		description: "Send money to over 150+ countries worldwide"
	}
];

const Features = () => {
	return (
		<section className="relative overflow-hidden py-32">
			{/* Soft gradient backdrop */}
			<div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background pointer-events-none"></div>
			<div className="absolute top-[-80px] left-1/4 w-[500px] h-[500px] bg-gradient-aurora rounded-full blur-3xl opacity-10"></div>

			<div className="relative z-10 container mx-auto px-6">
				<div className="text-center mb-20">
					<Badge className="mb-6 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white shadow-lg backdrop-blur-md border border-white/20">
						⚡ Powerful Features
					</Badge>
					<h2 className="text-4xl md:text-6xl font-extrabold bg-gradient-primary bg-clip-text text-transparent mb-6">
						Why Choose BloomPay?
					</h2>
					<p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
						Experience the perfect blend of security, speed, and simplicity in digital payments.
					</p>
				</div>

				<div className="grid md:grid-cols-3 gap-10">
					{features.map((feature, index) => (
						<Card
							key={feature.title}
							className="group relative p-10 text-center bg-gradient-glass backdrop-blur-xl border-white/10 rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-elegant"
							style={{ animationDelay: `${index * 150}ms` }}
						>
							{/* Hover glow effect */}
							<div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-500" />

							<div className="relative z-10">
								<div className="w-20 h-20 bg-gradient-aurora rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-glow transform group-hover:scale-110 transition-transform duration-300">
									<feature.icon className="h-10 w-10 text-white" />
								</div>
								<h3 className="text-2xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300 mb-4">
									{feature.title}
								</h3>
								<p className="text-lg text-muted-foreground leading-relaxed">
									{feature.description}
								</p>
							</div>
						</Card>
					))}
				</div>
			</div>
		</section>
	)
}

export default Features