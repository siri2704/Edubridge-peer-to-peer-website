"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const profileFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  bio: z.string().max(500, { message: "Bio must be less than 500 characters" }),
  institution: z.string().optional(),
  fieldOfStudy: z.string().optional(),
  yearOfStudy: z.string().optional(),
  subjects: z.array(z.string()).optional(),
  skills: z.array(z.string()).optional(),
  isMentor: z.boolean().default(false),
  availability: z.object({
    monday: z.boolean().default(false),
    tuesday: z.boolean().default(false),
    wednesday: z.boolean().default(false),
    thursday: z.boolean().default(false),
    friday: z.boolean().default(false),
    saturday: z.boolean().default(false),
    sunday: z.boolean().default(false),
  }),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

export default function ProfilePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [userId, setUserId] = useState<string | null>(null)

  // Default form values
  const defaultValues: Partial<ProfileFormValues> = {
    name: "",
    bio: "",
    institution: "",
    fieldOfStudy: "",
    yearOfStudy: "",
    subjects: [],
    skills: [],
    isMentor: false,
    availability: {
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false,
    },
  }

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
  })

  // Check if user is logged in and fetch profile data
  useEffect(() => {
    const token = localStorage.getItem("edubridge-token")
    if (!token) {
      router.push("/login")
      return
    }

    // This would be replaced with actual API call to get user profile
    // For now, we'll simulate loading data
    setTimeout(() => {
      setUserId("user123")
      form.reset({
        name: "John Doe",
        bio: "Computer Science student passionate about web development and AI.",
        institution: "University of Technology",
        fieldOfStudy: "Computer Science",
        yearOfStudy: "3",
        subjects: ["Web Development", "Algorithms"],
        skills: ["JavaScript", "React", "Node.js"],
        isMentor: true,
        availability: {
          monday: true,
          tuesday: false,
          wednesday: true,
          thursday: false,
          friday: true,
          saturday: false,
          sunday: false,
        },
      })
      setIsLoading(false)
    }, 1000)
  }, [router, form])

  async function onSubmit(data: ProfileFormValues) {
    setIsLoading(true)

    try {
      // This would be replaced with actual API call
      console.log("Profile update data:", data)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully!",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Update failed",
        description: "There was a problem updating your profile.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading && !userId) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading your profile...</p>
        </div>
      </div>
    )
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Profile" text="Manage your personal information and preferences." />

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="mentorship">Mentorship</TabsTrigger>
          <TabsTrigger value="badges">Badges & Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Information</CardTitle>
              <CardDescription>Update your personal details and academic information.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4 mb-6">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/placeholder.svg?height=80&width=80" alt="Profile" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" size="sm">
                    Change Avatar
                  </Button>
                </div>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bio</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Tell others about yourself..." className="resize-none" {...field} />
                        </FormControl>
                        <FormDescription>
                          Brief description about yourself, your interests, and expertise.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="institution"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Institution</FormLabel>
                          <FormControl>
                            <Input placeholder="University name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="fieldOfStudy"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Field of Study</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Computer Science" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="yearOfStudy"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Year of Study</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select year" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1">First Year</SelectItem>
                            <SelectItem value="2">Second Year</SelectItem>
                            <SelectItem value="3">Third Year</SelectItem>
                            <SelectItem value="4">Fourth Year</SelectItem>
                            <SelectItem value="5">Fifth Year</SelectItem>
                            <SelectItem value="graduate">Graduate</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Saving..." : "Save Changes"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mentorship">
          <Card>
            <CardHeader>
              <CardTitle>Mentorship Settings</CardTitle>
              <CardDescription>Configure your mentorship preferences and availability.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="isMentor"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>I want to be a mentor</FormLabel>
                          <FormDescription>Enable this to offer mentorship to other students.</FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />

                  <div className="space-y-4">
                    <FormLabel>Subjects I can teach</FormLabel>
                    <div className="flex flex-wrap gap-2">
                      {["Web Development", "Algorithms", "Data Structures", "Machine Learning", "Databases"].map(
                        (subject) => (
                          <Badge key={subject} variant="outline" className="px-3 py-1">
                            {subject}
                          </Badge>
                        ),
                      )}
                      <Button variant="outline" size="sm" className="h-8">
                        + Add Subject
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <FormLabel>Skills</FormLabel>
                    <div className="flex flex-wrap gap-2">
                      {["JavaScript", "React", "Node.js", "Python", "SQL"].map((skill) => (
                        <Badge key={skill} variant="outline" className="px-3 py-1">
                          {skill}
                        </Badge>
                      ))}
                      <Button variant="outline" size="sm" className="h-8">
                        + Add Skill
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <FormLabel>Availability</FormLabel>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {Object.entries({
                        monday: "Monday",
                        tuesday: "Tuesday",
                        wednesday: "Wednesday",
                        thursday: "Thursday",
                        friday: "Friday",
                        saturday: "Saturday",
                        sunday: "Sunday",
                      }).map(([day, label]) => (
                        <FormField
                          key={day}
                          control={form.control}
                          name={`availability.${day}` as any}
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                              </FormControl>
                              <FormLabel className="font-normal">{label}</FormLabel>
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                  </div>

                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Saving..." : "Save Changes"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="badges">
          <Card>
            <CardHeader>
              <CardTitle>Badges & Achievements</CardTitle>
              <CardDescription>View your earned badges and achievements.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Your Badges</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <BadgeCard
                      title="Mentor Star"
                      description="Completed 10+ mentorship sessions"
                      date="Earned on May 1, 2025"
                    />
                    <BadgeCard
                      title="Helpful Answers"
                      description="Provided 25+ accepted answers"
                      date="Earned on April 15, 2025"
                    />
                    <BadgeCard
                      title="Resource Contributor"
                      description="Shared 20+ study resources"
                      date="Earned on March 22, 2025"
                    />
                    <BadgeCard
                      title="Team Player"
                      description="Participated in 5+ study groups"
                      date="Earned on February 10, 2025"
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Achievements</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                          <span className="text-primary font-bold">1</span>
                        </div>
                        <div>
                          <p className="font-medium">First Mentorship Session</p>
                          <p className="text-sm text-muted-foreground">Completed your first mentorship session</p>
                        </div>
                      </div>
                      <Badge>Completed</Badge>
                    </div>

                    <div className="flex justify-between items-center p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                          <span className="text-primary font-bold">2</span>
                        </div>
                        <div>
                          <p className="font-medium">Resource Sharing</p>
                          <p className="text-sm text-muted-foreground">Share 10 study resources</p>
                        </div>
                      </div>
                      <Badge>Completed</Badge>
                    </div>

                    <div className="flex justify-between items-center p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                          <span className="text-primary font-bold">3</span>
                        </div>
                        <div>
                          <p className="font-medium">Community Contributor</p>
                          <p className="text-sm text-muted-foreground">Answer 50 questions in the forum</p>
                        </div>
                      </div>
                      <Badge variant="outline">In Progress (32/50)</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

function BadgeCard({
  title,
  description,
  date,
}: {
  title: string
  description: string
  date: string
}) {
  return (
    <div className="flex flex-col items-center text-center p-4 border rounded-lg">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-3">
        <span className="text-primary text-xl">🏆</span>
      </div>
      <h4 className="font-medium">{title}</h4>
      <p className="text-sm text-muted-foreground">{description}</p>
      <p className="text-xs text-muted-foreground mt-2">{date}</p>
    </div>
  )
}
