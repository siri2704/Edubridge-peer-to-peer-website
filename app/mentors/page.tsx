"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Star } from "lucide-react"

interface Mentor {
  id: string
  name: string
  avatar: string
  institution: string
  fieldOfStudy: string
  subjects: string[]
  skills: string[]
  rating: number
  sessionsCompleted: number
  image: string
  fee: number
  isAvailable: boolean
}

export default function MentorsPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [mentors, setMentors] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [subjectFilter, setSubjectFilter] = useState("")
  const [filter, setFilter] = useState("subject")

  useEffect(() => {
    const token = localStorage.getItem("edubridge-token")
    if (!token) {
      router.push("/login")
      return
    }

    // Fetch approved mentors from the backend API
    fetch('/api/mentors?status=approved')
      .then((response) => response.json())
      .then((data) => {
        setMentors(Array.isArray(data.mentors) ? data.mentors : [])
        setIsLoading(false)
      })
  }, [router])

  // Filter mentors based on search query and subject filter
  const filteredMentors = mentors.filter((mentor) => {
    const skills = Array.isArray(mentor.skills) ? mentor.skills : [];
    const subjects = Array.isArray(mentor.subjects) ? mentor.subjects : (mentor.subject ? [mentor.subject] : []);
    const matchesSearch =
      searchQuery === "" ||
      (mentor.name && mentor.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      skills.some((skill: string) => skill.toLowerCase().includes(searchQuery.toLowerCase())) ||
      subjects.some((subject: string) => subject.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesSubject = subjectFilter === "all" || subjectFilter === "" || subjects.some((subject: string) => subject === subjectFilter)

    return matchesSearch && matchesSubject
  })

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-black">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-white border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-4 text-white">Loading mentors...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white font-[Inter,sans-serif] px-2 md:px-8 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-4 mb-8 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search by name, subject, or skill..."
              className="pl-10 pr-4 py-3 rounded-full bg-[#18181b] text-white border border-gray-700 focus:border-blue-500 placeholder-gray-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="rounded-full bg-[#18181b] border border-gray-700 text-white w-40">
                <SelectValue placeholder="Filter by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="subject">Subject</SelectItem>
                <SelectItem value="experience">Experience</SelectItem>
                <SelectItem value="language">Language</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
              </SelectContent>
            </Select>
            <Select value={subjectFilter} onValueChange={setSubjectFilter}>
              <SelectTrigger className="rounded-full bg-[#18181b] border border-gray-700 text-white w-48">
                <SelectValue placeholder="Choose filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="Web Development">Web Development</SelectItem>
                <SelectItem value="Algorithms">Algorithms</SelectItem>
                <SelectItem value="Data Structures">Data Structures</SelectItem>
                <SelectItem value="Machine Learning">Machine Learning</SelectItem>
                <SelectItem value="Calculus">Calculus</SelectItem>
                <SelectItem value="Linear Algebra">Linear Algebra</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center"
        >
          {filteredMentors.length === 0 ? (
            <div className="col-span-full flex flex-col items-center py-20 animate-fade-in">
              <img src="/placeholder.svg" alt="No mentors" className="w-32 h-32 mb-4 opacity-60" />
              <p className="text-gray-400 text-lg">No mentors found matching your criteria.</p>
            </div>
          ) : (
            filteredMentors.map((mentor) => (
              <div
                key={mentor._id || mentor.id}
                className="bg-[#18181b] rounded-2xl shadow-lg p-6 flex flex-col items-center w-full max-w-[300px] min-w-[250px] transition-transform duration-200 hover:scale-105 hover:shadow-2xl border border-gray-800"
              >
                <Avatar className="w-20 h-20 mb-4">
                  <AvatarImage src={mentor.image || "/placeholder-user.jpg"} alt={mentor.name} />
                  <AvatarFallback>{mentor.name?.[0] || '?'}</AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-bold mb-1 text-white text-center">{mentor.name}</h2>
                <div className="flex flex-wrap gap-1 mb-2 justify-center">
                  {(mentor.skills || []).map((skill: string) => (
                    <Badge key={skill} className="bg-blue-900 text-blue-200 px-2 py-1 rounded-full text-xs font-medium">
                      {skill}
                    </Badge>
                  ))}
                </div>
                <p className="text-gray-300 text-sm mb-2 text-center min-h-[40px]">{mentor.fieldOfStudy || mentor.subject || ''}</p>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-yellow-400 font-semibold text-lg flex items-center">
                    <Star className="w-5 h-5 mr-1" fill="#facc15" />
                    {mentor.rating?.toFixed ? mentor.rating.toFixed(1) : (mentor.rating || "4.5")}
                  </span>
                  <span className="text-gray-400 text-xs">({mentor.sessionsCompleted || 0} sessions)</span>
                </div>
                <Button
                  className="w-full mt-2 bg-blue-700 hover:bg-blue-800 text-white rounded-full font-semibold py-2 transition-colors"
                  onClick={() => router.push(`/chat?mentor=${mentor.email}`)}
                >
                  Chat
                </Button>
                <Button
                  className="w-full mt-2 bg-green-700 hover:bg-green-800 text-white rounded-full font-semibold py-2 transition-colors"
                  onClick={() => router.push(`/sessions/book?mentorId=${mentor._id || mentor.id}`)}
                >
                  Set Up Session
                </Button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
