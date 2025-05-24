"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { BookOpen } from "lucide-react"

export default function SignupPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
    subject: "",
    qualification: "",
    description: "",
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [pendingMentor, setPendingMentor] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.password !== form.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Passwords do not match",
        description: "Please make sure your passwords match.",
      })
      return
    }
    setLoading(true)
    try {
      if (form.role === "mentor") {
        // Send mentor application to admin (pending approval)
        const res = await fetch("/api/mentors", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form, status: "pending" }),
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || "Mentor application failed")
        setPendingMentor(true)
        setSubmitted(true)
        setLoading(false)
        return
      }
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "register", ...form }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Signup failed")
      toast({ title: "Signup successful", description: "You can now log in!" })
      router.push("/login")
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Signup failed",
        description: error.message || "Please try again.",
      })
    } finally {
      setLoading(false)
    }
  }

  if (pendingMentor && submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="w-full max-w-md bg-[#18181b] rounded-2xl shadow-2xl border border-gray-800 p-8 flex flex-col gap-6 text-center">
          <h1 className="text-2xl font-bold mb-2">Mentor Application Submitted</h1>
          <p className="text-lg text-gray-300 mb-4">Your mentor application has been sent to the admin for approval. You will be notified once your account is accepted.</p>
          <p className="text-gray-400">You can close this page or wait for admin approval.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-full max-w-md bg-[#18181b] rounded-2xl shadow-2xl border border-gray-800 p-8 flex flex-col gap-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-sm font-medium">Full Name</label>
            <Input
              id="name"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
              className="bg-black text-white border-gray-700 focus:border-white"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm font-medium">Email</label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="bg-black text-white border-gray-700 focus:border-white"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-sm font-medium">Password</label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="bg-black text-white border-gray-700 focus:border-white"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password</label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              className="bg-black text-white border-gray-700 focus:border-white"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="role" className="text-sm font-medium">Select Role</label>
            <select
              id="role"
              name="role"
              value={form.role}
              onChange={handleChange}
              required
              className="bg-black text-white border-gray-700 rounded px-3 py-2 focus:border-white"
            >
              <option value="user">Student</option>
              <option value="mentor">Mentor</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          {form.role === "mentor" && (
            <>
              <div className="flex flex-col gap-1">
                <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="Subject"
                  value={form.subject}
                  onChange={handleChange}
                  required
                  className="bg-black text-white border-gray-700 focus:border-white"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="qualification" className="text-sm font-medium">Qualification</label>
                <Input
                  id="qualification"
                  name="qualification"
                  placeholder="Qualification"
                  value={form.qualification}
                  onChange={handleChange}
                  required
                  className="bg-black text-white border-gray-700 focus:border-white"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="description" className="text-sm font-medium">Description</label>
                <Input
                  id="description"
                  name="description"
                  placeholder="Description"
                  value={form.description}
                  onChange={handleChange}
                  required
                  className="bg-black text-white border-gray-700 focus:border-white"
                />
              </div>
            </>
          )}
          <Button type="submit" className="bg-white text-black font-bold mt-2" disabled={loading}>
            {loading ? "Signing up..." : "Create Account"}
          </Button>
        </form>
        <div className="text-center text-sm mt-2">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-400 hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  )
}
