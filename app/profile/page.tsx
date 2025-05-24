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
  isMentor: z.boolean(),
  availability: z.object({
    monday: z.boolean(),
    tuesday: z.boolean(),
    wednesday: z.boolean(),
    thursday: z.boolean(),
    friday: z.boolean(),
    saturday: z.boolean(),
    sunday: z.boolean(),
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

      {/* Remove Tabs and just show the General Information card */}
      <Card>
        <CardHeader>
          <CardTitle className="font-bold text-2xl">General Information</CardTitle>
          <CardDescription className="text-base text-gray-400">Update your personal details and academic information.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-6">
            <Avatar className="h-20 w-20">
              <AvatarImage src="/vishaka-profile.jpeg" alt="Vishaka" />
              <AvatarFallback className="font-semibold text-lg">VS</AvatarFallback>
            </Avatar>
            <div>
              <Button variant="outline" size="sm">
                Change Avatar
              </Button>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Name */}
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

              {/* Bio */}
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

              {/* Institution and Field of Study */}
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

              {/* Year of Study */}
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
