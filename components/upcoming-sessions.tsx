import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, Video } from "lucide-react"

export function UpcomingSessions() {
  return (
    <div className="space-y-4">
      <SessionItem
        title="Data Structures Study Group"
        date="Today"
        time="3:00 PM - 4:30 PM"
        type="Group Session"
        participants={[
          { name: "Jane Doe", image: "/placeholder.svg?height=32&width=32", initials: "JD" },
          { name: "Mike Smith", image: "/placeholder.svg?height=32&width=32", initials: "MS" },
          { name: "Lisa Wong", image: "/placeholder.svg?height=32&width=32", initials: "LW" },
        ]}
      />
      <SessionItem
        title="JavaScript Mentorship with Alex Chen"
        date="Tomorrow"
        time="1:00 PM - 2:00 PM"
        type="1-on-1 Mentorship"
        participants={[{ name: "Alex Chen", image: "/placeholder.svg?height=32&width=32", initials: "AC" }]}
      />
      <SessionItem
        title="Database Design Workshop"
        date="May 16, 2025"
        time="5:00 PM - 6:30 PM"
        type="Workshop"
        participants={[
          { name: "Sarah Johnson", image: "/placeholder.svg?height=32&width=32", initials: "SJ" },
          { name: "David Lee", image: "/placeholder.svg?height=32&width=32", initials: "DL" },
        ]}
      />
    </div>
  )
}

interface Participant {
  name: string
  image: string
  initials: string
}

interface SessionItemProps {
  title: string
  date: string
  time: string
  type: string
  participants: Participant[]
}

function SessionItem({ title, date, time, type, participants }: SessionItemProps) {
  return (
    <div className="flex flex-col space-y-2 rounded-lg border p-4">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-medium">{title}</h3>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Calendar className="mr-1 h-4 w-4" />
              {date}
            </div>
            <div className="flex items-center">
              <Clock className="mr-1 h-4 w-4" />
              {time}
            </div>
          </div>
        </div>
        <Button variant="outline" size="sm" className="gap-1">
          <Video className="h-4 w-4" />
          Join
        </Button>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex -space-x-2">
          {participants.map((participant, i) => (
            <Avatar key={i} className="h-8 w-8 border-2 border-background">
              <AvatarImage src={participant.image || "/placeholder.svg"} alt={participant.name} />
              <AvatarFallback>{participant.initials}</AvatarFallback>
            </Avatar>
          ))}
          {participants.length > 3 && (
            <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-muted text-xs font-medium">
              +{participants.length - 3}
            </div>
          )}
        </div>
        <span className="text-xs text-muted-foreground">{type}</span>
      </div>
    </div>
  )
}
