"use client";

import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookOpen, Users, Video, FileText, MessageSquare, Award } from "lucide-react"
import { useTheme } from "next-themes"

export default function Home() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  return (
    <main className="min-h-screen bg-black text-white font-[Inter,sans-serif]">
      {/* Hero Section */}
      <section className="w-full py-16 bg-black text-white border-b border-gray-800">
        <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 flex flex-col gap-6">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-2">Learn Together, Grow Together</h1>
            <p className="text-lg text-gray-300 mb-4">EduBridge connects students for collaborative learning, mentorship, and knowledge sharing in a supportive peer-to-peer environment.</p>
            <div className="flex gap-4">
              <Button size="lg" className="bg-white text-black hover:bg-gray-200 font-bold" onClick={() => window.location.href = "/signup"}>Get Started</Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-black font-bold" onClick={() => window.location.href = "/features"}>Learn More</Button>
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <img src="/placeholder-logo.svg" alt="Students collaborating" className="w-64 h-64 object-contain grayscale" />
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="w-full py-16 bg-black text-white border-b border-gray-800">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#18181b] rounded-xl p-6 shadow border border-gray-800">
            <h2 className="text-2xl font-semibold mb-2">Peer Mentorship</h2>
            <p className="text-gray-300">Connect with knowledgeable peers for one-on-one mentorship sessions tailored to your learning needs.</p>
          </div>
          <div className="bg-[#18181b] rounded-xl p-6 shadow border border-gray-800">
            <h2 className="text-2xl font-semibold mb-2">Integrated Video Calls</h2>
            <p className="text-gray-300">Seamless video integration for face-to-face learning sessions with your peers.</p>
          </div>
          <div className="bg-[#18181b] rounded-xl p-6 shadow border border-gray-800">
            <h2 className="text-2xl font-semibold mb-2">Study Groups</h2>
            <p className="text-gray-300">Join or create interactive study groups with real-time chat and collaborative tools.</p>
          </div>
          <div className="bg-[#18181b] rounded-xl p-6 shadow border border-gray-800">
            <h2 className="text-2xl font-semibold mb-2">Resource Sharing</h2>
            <p className="text-gray-300">Upload, organize and share notes, documents and study materials with version control.</p>
          </div>
          <div className="bg-[#18181b] rounded-xl p-6 shadow border border-gray-800">
            <h2 className="text-2xl font-semibold mb-2">Session Scheduling</h2>
            <p className="text-gray-300">Book and manage learning sessions with an intuitive calendar interface.</p>
          </div>
          <div className="bg-[#18181b] rounded-xl p-6 shadow border border-gray-800">
            <h2 className="text-2xl font-semibold mb-2">Q&A Forum</h2>
            <p className="text-gray-300">Ask questions, provide answers, and earn recognition for your contributions.</p>
          </div>
        </div>
      </section>
      {/* Testimonials Section */}
      <section className="w-full py-16 bg-black text-white border-b border-gray-800">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">What Students Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#18181b] rounded-xl p-6 shadow border border-gray-800 flex flex-col items-center">
              <img src="/placeholder-user.jpg" alt="Bhumika" className="w-16 h-16 rounded-full mb-3" />
              <p className="text-lg italic mb-2">"EduBridge helped me connect with peers who excel in subjects I struggle with. The mentorship sessions have been invaluable!"</p>
              <div className="font-semibold">Bhumika</div>
              <div className="text-sm text-gray-400">Student 1</div>
            </div>
            <div className="bg-[#18181b] rounded-xl p-6 shadow border border-gray-800 flex flex-col items-center">
              <img src="/placeholder-user.jpg" alt="Kalyan" className="w-16 h-16 rounded-full mb-3" />
              <p className="text-lg italic mb-2">"The collaborative study groups feature is amazing! It's like having a virtual study room available 24/7."</p>
              <div className="font-semibold">Kalyan</div>
              <div className="text-sm text-gray-400">Student 2</div>
            </div>
            <div className="bg-[#18181b] rounded-xl p-6 shadow border border-gray-800 flex flex-col items-center">
              <img src="/placeholder-user.jpg" alt="Dhanya" className="w-16 h-16 rounded-full mb-3" />
              <p className="text-lg italic mb-2">"Being able to share my notes and help others has not only reinforced my own learning but earned me recognition among peers."</p>
              <div className="font-semibold">Dhanya</div>
              <div className="text-sm text-gray-400">Student 3</div>
            </div>
          </div>
        </div>
      </section>
      {/* Call to Action */}
      <section className="w-full py-16 bg-black text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Learning Experience?</h2>
          <p className="mb-6 text-lg text-gray-300">Join thousands of students who are already benefiting from collaborative learning on EduBridge.</p>
          <Button size="lg" className="bg-white text-black hover:bg-gray-200 font-bold" onClick={() => window.location.href = "/signup"}>Create Your Account</Button>
        </div>
      </section>
      {/* Footer */}
      <footer className="w-full py-8 bg-black text-white border-t border-gray-800 text-center">
        <div className="mb-2">
          <span className="font-bold">Platform</span> &nbsp;|&nbsp;
          Features &nbsp;|&nbsp; Pricing &nbsp;|&nbsp; FAQ
        </div>
        <div className="mb-2">
          <span className="font-bold">Company</span> &nbsp;|&nbsp;
          About Us &nbsp;|&nbsp; Contact &nbsp;|&nbsp; Feedback
        </div>
        <div className="mb-2">
          <span className="font-bold">Legal</span> &nbsp;|&nbsp;
          Privacy Policy &nbsp;|&nbsp; Terms of Service &nbsp;|&nbsp; Cookie Policy
        </div>
        <div className="mb-2 text-gray-400 text-sm">
          For inquiries, email us at <a href="mailto:siriananth.is22@bmsce.ac.in" className="underline">siriananth.is22@bmsce.ac.in</a> or <a href="mailto:vishaka.is22@bmsce.ac.in" className="underline">vishaka.is22@bmsce.ac.in</a>.
        </div>
        <div className="text-gray-500 text-xs">© 2025 EduBridge. All rights reserved.</div>
      </footer>
    </main>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
      <div className="p-2 bg-primary/10 rounded-full text-primary">{icon}</div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-muted-foreground text-center">{description}</p>
    </div>
  )
}

function StepCard({
  number,
  title,
  description,
}: {
  number: string
  title: string
  description: string
}) {
  return (
    <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 shadow-sm">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground text-xl font-bold">
        {number}
      </div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-muted-foreground text-center">{description}</p>
    </div>
  )
}
