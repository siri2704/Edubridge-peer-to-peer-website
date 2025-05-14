"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Users, FileText, MessageSquare, Award, Bell, Plus } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { RecentActivity } from "@/components/recent-activity"
import { UpcomingSessions } from "@/components/upcoming-sessions"

export default function DashboardPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem("edubridge-token")
    if (!token) {
      router.push("/login")
    } else {
      // Simulate loading data
      setTimeout(() => {
        setIsLoading(false)
      }, 1000)
    }
  }, [router])

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Dashboard" text="Welcome back! Here's an overview of your learning journey.">
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Session
        </Button>
      </DashboardHeader>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">XP Points</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,250</div>
            <p className="text-xs text-muted-foreground">Level 5 Scholar</p>
            <Progress value={65} className="mt-2 h-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mentorship Sessions</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Study Groups</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">Active memberships</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resources Shared</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+5 from last month</p>
          </CardContent>
        </Card>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sessions">Sessions</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Upcoming Sessions</CardTitle>
                <CardDescription>Your scheduled mentorship and study group sessions.</CardDescription>
              </CardHeader>
              <CardContent>
                <UpcomingSessions />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest updates from your learning network.</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentActivity />
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Your Badges</CardTitle>
                <CardDescription>Achievements you've earned so far.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                <Badge variant="outline" className="flex items-center gap-1 px-3 py-1">
                  <Award className="h-3 w-3" />
                  Mentor Star
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1 px-3 py-1">
                  <MessageSquare className="h-3 w-3" />
                  Helpful Answers
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1 px-3 py-1">
                  <FileText className="h-3 w-3" />
                  Resource Contributor
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1 px-3 py-1">
                  <Users className="h-3 w-3" />
                  Team Player
                </Badge>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Recommended Mentors</CardTitle>
                <CardDescription>Based on your learning interests.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">Jane Doe</p>
                    <p className="text-sm text-muted-foreground">Computer Science</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Connect
                  </Button>
                </div>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback>MS</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">Mike Smith</p>
                    <p className="text-sm text-muted-foreground">Mathematics</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Connect
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Study Groups</CardTitle>
                <CardDescription>Active groups you're part of.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                    <BookOpen className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">Data Structures</p>
                    <p className="text-sm text-muted-foreground">8 members</p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Bell className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                    <BookOpen className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">Web Development</p>
                    <p className="text-sm text-muted-foreground">12 members</p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Bell className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="sessions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Sessions</CardTitle>
              <CardDescription>Manage your upcoming and past learning sessions.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                This tab would contain a detailed view of all your sessions, with filtering options.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="resources" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Resources</CardTitle>
              <CardDescription>Access and manage your learning materials.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                This tab would contain your uploaded and saved resources, organized by subject.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="achievements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Achievements</CardTitle>
              <CardDescription>Track your progress and earned rewards.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                This tab would display all your badges, XP progression, and leaderboard position.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
