import Hero from "@/components/landing-section/Hero";
import Features from "@/components/landing-section/Features";
import Benefits from "@/components/landing-section/Benefits";
import Testimonials from "@/components/landing-section/Testimonials";
import CallToAction from "@/components/landing-section/CallToAction";

export default async function Page() {
  return (
    <>
      <Hero />
      <Features />
      <Benefits />
      <Testimonials />
      <CallToAction />
    </>
  )
}