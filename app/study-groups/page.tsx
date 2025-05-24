"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Plus } from "lucide-react"

export default function StudyGroupsPage() {
  const router = useRouter()
  const [studyGroups, setStudyGroups] = useState<any[]>([])
  const [showCreate, setShowCreate] = useState(false)
  const [newGroup, setNewGroup] = useState({ name: "", subject: "", description: "" })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch("/api/study-groups")
      .then((res) => res.json())
      .then((data) => setStudyGroups(Array.isArray(data.groups) ? data.groups : []))
  }, [])

  // Add createdBy to new group (use localStorage for user id/email)
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const createdBy = localStorage.getItem("edubridge-user-email") || localStorage.getItem("edubridge-token") || "anonymous"
    const res = await fetch("/api/study-groups", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...newGroup, createdBy }),
    })
    const data = await res.json()
    if (res.ok && data.studyGroupId) {
      setStudyGroups((prev) => [...prev, { ...newGroup, _id: data.studyGroupId, createdBy }])
      setShowCreate(false)
      setNewGroup({ name: "", subject: "", description: "" })
    }
    setLoading(false)
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Study Groups" text="Join or create study groups to collaborate with peers.">
        <Button onClick={() => setShowCreate((v) => !v)}>
          <Plus className="mr-2 h-4 w-4" />
          {showCreate ? "Cancel" : "Create Group"}
        </Button>
      </DashboardHeader>
      {showCreate && (
        <form onSubmit={handleCreate} className="bg-[#18181b] text-gray-100 border border-gray-800 rounded-2xl p-6 mb-8 max-w-2xl mx-auto flex flex-col gap-4">
          <Input
            placeholder="Group Name"
            value={newGroup.name}
            onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
            required
            className="bg-black text-white border-gray-700 focus:border-blue-500"
          />
          <Input
            placeholder="Subject"
            value={newGroup.subject}
            onChange={(e) => setNewGroup({ ...newGroup, subject: e.target.value })}
            required
            className="bg-black text-white border-gray-700 focus:border-blue-500"
          />
          <Input
            placeholder="Description"
            value={newGroup.description}
            onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })}
            required
            className="bg-black text-white border-gray-700 focus:border-blue-500"
          />
          <Button type="submit" className="bg-blue-700 text-white font-bold" disabled={loading}>
            {loading ? "Creating..." : "Create Group"}
          </Button>
        </form>
      )}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {studyGroups.length === 0 ? (
          <div className="text-center text-gray-400 col-span-full py-12">No study groups found. Create one!</div>
        ) : (
          studyGroups.map((group) => (
            <Card key={group._id || group.id} className="bg-[#18181b] text-white border-gray-800">
              <CardContent className="p-6">
                <div className="font-bold text-xl mb-1">{group.name}</div>
                <div className="text-gray-400 text-sm mb-2">{group.subject}</div>
                <div className="mb-2">{group.description}</div>
              </CardContent>
              <CardFooter className="flex border-t p-0">
                <Button className="flex-1 rounded-none py-6" onClick={() => router.push(`/chat?groupId=${group._id || group.id}`)}>
                  Chat
                </Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </DashboardShell>
  )
}
