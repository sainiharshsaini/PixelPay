import { getServerSession } from "next-auth";
import { redirect } from 'next/navigation'
import { authOptions } from "../lib/authOptions";
import Hero from "@/components/landing-section/Hero";
import Features from "@/components/landing-section/Features";
import Benefits from "@/components/landing-section/Benefits";
import Testimonials from "@/components/landing-section/Testimonials";
import CallToAction from "@/components/landing-section/CallToAction";

export default async function Page() {
  // const session = await getServerSession(authOptions);
  // if (session?.user) {
  //   redirect('/dashboard')
  // } else {
  //   redirect('/api/auth/signin')
  // }
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