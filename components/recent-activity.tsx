import type React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FileText, MessageSquare, Users, Video } from "lucide-react"

export function RecentActivity() {
  return (
    <div className="space-y-4">
      <ActivityItem
        avatar={
          <Avatar className="h-9 w-9">
            <AvatarImage src="/placeholder.svg?height=36&width=36" alt="@user1" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        }
        title="Jane Doe shared a resource"
        description="Advanced Python Programming Notes"
        time="2 hours ago"
        icon={<FileText className="h-4 w-4" />}
      />
      <ActivityItem
        avatar={
          <Avatar className="h-9 w-9">
            <AvatarImage src="/placeholder.svg?height=36&width=36" alt="@user2" />
            <AvatarFallback>MS</AvatarFallback>
          </Avatar>
        }
        title="Mike Smith answered your question"
        description="How to implement binary search trees?"
        time="Yesterday"
        icon={<MessageSquare className="h-4 w-4" />}
      />
      <ActivityItem
        avatar={
          <Avatar className="h-9 w-9">
            <AvatarImage src="/placeholder.svg?height=36&width=36" alt="@user3" />
            <AvatarFallback>AS</AvatarFallback>
          </Avatar>
        }
        title="Data Structures group has a new post"
        description="Weekly challenge: Implement a hash table"
        time="2 days ago"
        icon={<Users className="h-4 w-4" />}
      />
      <ActivityItem
        avatar={
          <Avatar className="h-9 w-9">
            <AvatarImage src="/placeholder.svg?height=36&width=36" alt="@user4" />
            <AvatarFallback>LW</AvatarFallback>
          </Avatar>
        }
        title="Lisa Wong completed a session with you"
        description="Introduction to React Hooks"
        time="3 days ago"
        icon={<Video className="h-4 w-4" />}
      />
    </div>
  )
}

interface ActivityItemProps {
  avatar: React.ReactNode
  title: string
  description: string
  time: string
  icon: React.ReactNode
}

function ActivityItem({ avatar, title, description, time, icon }: ActivityItemProps) {
  return (
    <div className="flex items-start space-x-4">
      {avatar}
      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium leading-none">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
        <p className="text-xs text-muted-foreground">{time}</p>
      </div>
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">{icon}</div>
    </div>
  )
}
