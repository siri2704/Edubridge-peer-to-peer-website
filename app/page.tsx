import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookOpen, Users, Video, FileText, MessageSquare, Award } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-16 bg-gradient-to-b from-blue-500 to-blue-700 text-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                Learn Together, Grow Together
              </h1>
              <p className="max-w-lg text-lg md:text-xl">
                EduBridge connects students for collaborative learning, mentorship, and knowledge sharing in a supportive peer-to-peer environment.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/signup">
                  <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100">
                    Get Started
                  </Button>
                </Link>
                <Link href="/about">
                  <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-700">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <img src="/placeholder.svg" alt="Students collaborating" className="w-full h-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-16 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Empowering Students Through Collaboration</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Peer Mentorship</h3>
              <p className="text-gray-600">Connect with knowledgeable peers for one-on-one mentorship sessions tailored to your learning needs.</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Integrated Video Calls</h3>
              <p className="text-gray-600">Seamless video integration for face-to-face learning sessions with your peers.</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Study Groups</h3>
              <p className="text-gray-600">Join or create interactive study groups with real-time chat and collaborative tools.</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Resource Sharing</h3>
              <p className="text-gray-600">Upload, organize and share notes, documents and study materials with version control.</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Session Scheduling</h3>
              <p className="text-gray-600">Book and manage learning sessions with an intuitive calendar interface.</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Q&A Forum</h3>
              <p className="text-gray-600">Ask questions, provide answers, and earn recognition for your contributions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-16 bg-gray-50">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">What Students Say</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-600 italic mb-4">"EduBridge helped me connect with peers who excel in subjects I struggle with. The mentorship sessions have been invaluable!"</p>
              <h3 className="text-lg font-semibold text-gray-800">Alex Johnson</h3>
              <p className="text-gray-500">Computer Science Student</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-600 italic mb-4">"The collaborative study groups feature is amazing! It's like having a virtual study room available 24/7."</p>
              <h3 className="text-lg font-semibold text-gray-800">Priya Sharma</h3>
              <p className="text-gray-500">Engineering Student</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-600 italic mb-4">"Being able to share my notes and help others has not only reinforced my own learning but earned me recognition among peers."</p>
              <h3 className="text-lg font-semibold text-gray-800">Michael Chen</h3>
              <p className="text-gray-500">Biology Major</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="w-full py-16 bg-blue-500 text-white">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Learning Experience?</h2>
          <p className="text-lg mb-8">
            Join thousands of students who are already benefiting from collaborative learning on EduBridge.
          </p>
          <Link href="/signup">
            <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100">
              Create Your Account
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="w-full py-8 bg-gray-800 text-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <h3 className="text-lg font-bold mb-4">Platform</h3>
              <ul className="space-y-2">
                <li><Link href="/features" className="hover:underline">Features</Link></li>
                <li><Link href="/pricing" className="hover:underline">Pricing</Link></li>
                <li><Link href="/faq" className="hover:underline">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link href="/about" className="hover:underline">About Us</Link></li>
                <li><Link href="/contact-us" className="hover:underline">Contact</Link></li>
                <li><Link href="/feedback" className="hover:underline">Feedback</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="hover:underline">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:underline">Terms of Service</Link></li>
                <li><Link href="/cookies" className="hover:underline">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-gray-400">
            <p>For inquiries, email us at <a href="mailto:siriananth.is22@bmsce.ac.in" className="underline">siriananth.is22@bmsce.ac.in</a> or <a href="mailto:vishaka.is22@bmsce.ac.in" className="underline">vishaka.is22@bmsce.ac.in</a>.</p>
            <p>© 2025 EduBridge. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
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
