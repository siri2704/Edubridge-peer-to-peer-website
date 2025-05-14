"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Search, Filter, Users, Calendar, MessageSquare, Plus } from "lucide-react"

interface StudyGroup {
  id: string
  name: string
  description: string
  subject: string
  memberCount: number
  members: {
    id: string
    name: string
    avatar: string
  }[]
  nextSession?: {
    date: string
    time: string
  }
  isActive: boolean
  isMember: boolean
}

export default function StudyGroupsPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [studyGroups, setStudyGroups] = useState<StudyGroup[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [subjectFilter, setSubjectFilter] = useState("")

  // Check if user is logged in and fetch study groups
  useEffect(() => {
    const token = localStorage.getItem("edubridge-token")
    if (!token) {
      router.push("/login")
      return
    }

    // This would be replaced with actual API call
    // For now, we'll simulate loading data
    setTimeout(() => {
      setStudyGroups([
        {
          id: "1",
          name: "Data Structures Study Group",
          description: "Weekly discussions on data structures and algorithms with practice problems.",
          subject: "Computer Science",
          memberCount: 12,
          members: [
            { id: "1", name: "Jane Doe", avatar: "/placeholder.svg?height=40&width=40" },
            { id: "2", name: "Mike Smith", avatar: "/placeholder.svg?height=40&width=40" },
            { id: "3", name: "Lisa Wong", avatar: "/placeholder.svg?height=40&width=40" },
          ],
          nextSession: {
            date: "Today",
            time: "3:00 PM",
          },
          isActive: true,
          isMember: true,
        },
        {
          id: "2",
          name: "Web Development Club",
          description: "Building projects together and learning modern web technologies.",
          subject: "Web Development",
          memberCount: 18,
          members: [
            { id: "4", name: "Alex Chen", avatar: "/placeholder.svg?height=40&width=40" },
            { id: "5", name: "Sarah Johnson", avatar: "/placeholder.svg?height=40&width=40" },
            { id: "6", name: "David Lee", avatar: "/placeholder.svg?height=40&width=40" },
          ],
          nextSession: {
            date: "Tomorrow",
            time: "5:00 PM",
          },
          isActive: true,
          isMember: true,
        },
        {
          id: "3",
          name: "Calculus Masters",
          description: "Advanced calculus problem solving and theory discussions.",
          subject: "Mathematics",
          memberCount: 8,
          members: [
            { id: "7", name: "Emily Chen", avatar: "/placeholder.svg?height=40&width=40" },
            { id: "8", name: "James Wilson", avatar: "/placeholder.svg?height=40&width=40" },
          ],
          nextSession: {
            date: "May 16, 2025",
            time: "4:00 PM",
          },
          isActive: true,
          isMember: false,
        },
        {
          id: "4",
          name: "Machine Learning Research",
          description: "Discussing latest ML papers and implementing algorithms together.",
          subject: "Artificial Intelligence",
          memberCount: 15,
          members: [
            { id: "9", name: "Robert Kim", avatar: "/placeholder.svg?height=40&width=40" },
            { id: "10", name: "Maria Garcia", avatar: "/placeholder.svg?height=40&width=40" },
            { id: "11", name: "Thomas Brown", avatar: "/placeholder.svg?height=40&width=40" },
          ],
          isActive: true,
          isMember: false,
        },
        {
          id: "5",
          name: "Physics Problem Solvers",
          description: "Weekly sessions to solve challenging physics problems together.",
          subject: "Physics",
          memberCount: 10,
          members: [
            { id: "12", name: "Olivia Taylor", avatar: "/placeholder.svg?height=40&width=40" },
            { id: "13", name: "William Davis", avatar: "/placeholder.svg?height=40&width=40" },
          ],
          nextSession: {
            date: "May 18, 2025",
            time: "2:00 PM",
          },
          isActive: true,
          isMember: false,
        },
        {
          id: "6",
          name: "Database Design Workshop",
          description: "Learning database modeling, SQL, and best practices.",
          subject: "Computer Science",
          memberCount: 14,
          members: [
            { id: "14", name: "Sophia Martinez", avatar: "/placeholder.svg?height=40&width=40" },
            { id: "15", name: "Benjamin Johnson", avatar: "/placeholder.svg?height=40&width=40" },
            { id: "16", name: "Emma Wilson", avatar: "/placeholder.svg?height=40&width=40" },
          ],
          isActive: true,
          isMember: false,
        },
      ])
      setIsLoading(false)
    }, 1000)
  }, [router])

  // Filter study groups based on search query and subject filter
  const filteredGroups = studyGroups.filter((group) => {
    const matchesSearch =
      searchQuery === "" ||
      group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesSubject = subjectFilter === "" || group.subject === subjectFilter

    return matchesSearch && matchesSubject
  })

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading study groups...</p>
        </div>
      </div>
    )
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Study Groups" text="Join or create study groups to collaborate with peers.">
        <Button onClick={() => router.push("/study-groups/create")}>
          <Plus className="mr-2 h-4 w-4" />
          Create Group
        </Button>
      </DashboardHeader>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search study groups..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={subjectFilter} onValueChange={setSubjectFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Subjects</SelectItem>
              <SelectItem value="Computer Science">Computer Science</SelectItem>
              <SelectItem value="Web Development">Web Development</SelectItem>
              <SelectItem value="Mathematics">Mathematics</SelectItem>
              <SelectItem value="Physics">Physics</SelectItem>
              <SelectItem value="Artificial Intelligence">Artificial Intelligence</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredGroups.map((group) => (
          <Card key={group.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{group.name}</h3>
                  <Badge variant="secondary" className="mt-1">
                    {group.subject}
                  </Badge>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 text-muted-foreground mr-1" />
                  <span className="text-sm text-muted-foreground">{group.memberCount}</span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mt-3">{group.description}</p>

              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Members</h4>
                <div className="flex -space-x-2">
                  {group.members.map((member) => (
                    <Avatar key={member.id} className="h-8 w-8 border-2 border-background">
                      <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                      <AvatarFallback>
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                  {group.memberCount > 3 && (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-muted text-xs font-medium">
                      +{group.memberCount - 3}
                    </div>
                  )}
                </div>
              </div>

              {group.nextSession && (
                <div className="mt-4 flex items-center text-sm">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>
                    Next session: {group.nextSession.date} at {group.nextSession.time}
                  </span>
                </div>
              )}
            </CardContent>

            <CardFooter className="flex border-t p-0">
              <Button
                variant="ghost"
                className="flex-1 rounded-none py-6"
                onClick={() => router.push(`/study-groups/${group.id}`)}
              >
                View Group
              </Button>
              {group.isMember ? (
                <Button
                  variant="secondary"
                  className="flex-1 rounded-none py-6"
                  onClick={() => router.push(`/chat?groupId=${group.id}`)}
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Chat
                </Button>
              ) : (
                <Button
                  className="flex-1 rounded-none py-6"
                  onClick={() => {
                    // This would be replaced with actual API call to join group
                    console.log(`Joining group ${group.id}`)
                  }}
                >
                  <Users className="mr-2 h-4 w-4" />
                  Join Group
                </Button>
              )}
            </CardFooter>
            <CardFooter>
              <Button
                variant="outline"
                onClick={() => router.push(`/chat`)}
                className="flex items-center space-x-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat</span>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredGroups.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No study groups found matching your criteria.</p>
          <Button variant="outline" className="mt-4" onClick={() => router.push("/study-groups/create")}>
            <Plus className="mr-2 h-4 w-4" />
            Create a New Study Group
          </Button>
        </div>
      )}
    </DashboardShell>
  )
}
