"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { geminiRequest } from "@/lib/gemini";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";

interface Resource {
  id: string
  title: string
  description: string
  subject: string
  fileType: string
  fileUrl: string
  link: string; // New: external resource link
  uploadedBy: {
    id: string
    name: string
    avatar: string
  }
  uploadedAt: string
  tags: string[]
  upvotes: number
  views: number
}

export default function ResourcesPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [resources, setResources] = useState<Resource[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [subjectFilter, setSubjectFilter] = useState("")
  const [typeFilter, setTypeFilter] = useState("")
  const [genPrompt, setGenPrompt] = useState("");
  const [genLoading, setGenLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");
  const { toast } = useToast();
  
  // Add Resource Form State
  const [showAddForm, setShowAddForm] = useState(false);
  const [addForm, setAddForm] = useState({
    title: "",
    description: "",
    subject: "",
    fileType: "",
    link: "",
    fileUrl: "",
  });
  const [addError, setAddError] = useState("");
  const [addLoading, setAddLoading] = useState(false);

  const handleAddChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setAddForm({ ...addForm, [e.target.name]: e.target.value });
    setAddError("");
  };

  const handleAddResource = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddError("");
    if (!addForm.title || !addForm.description || !addForm.subject || !addForm.fileType || !addForm.link) {
      setAddError("All fields including the resource link are required.");
      return;
    }
    setAddLoading(true);
    try {
      const res = await fetch("/api/resources", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: addForm.title,
          description: addForm.description,
          subject: addForm.subject,
          fileType: addForm.fileType,
          fileUrl: addForm.link, // Use link as fileUrl for backend
          uploadedBy: { id: "0", name: "You", avatar: "/placeholder-user.jpg" },
          tags: [],
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setResources([
          {
            id: data.resourceId,
            ...addForm,
            fileUrl: addForm.link,
            uploadedBy: { id: "0", name: "You", avatar: "/placeholder-user.jpg" },
            uploadedAt: "Just now",
            tags: [],
            upvotes: 0,
            views: 0,
          },
          ...resources,
        ]);
        setAddForm({ title: "", description: "", subject: "", fileType: "", link: "", fileUrl: "" });
        setShowAddForm(false);
        setAddLoading(false);
      } else {
        setAddError("Failed to add resource. Please try again.");
        setAddLoading(false);
      }
    } catch (err) {
      setAddError("Failed to add resource. Please try again.");
      setAddLoading(false);
    }
  };

  // Check if user is logged in and fetch resources
  useEffect(() => {
    const token = localStorage.getItem("edubridge-token")
    if (!token) {
      router.push("/login")
      return
    }

    // This would be replaced with actual API call
    // For now, we'll simulate loading data
    setTimeout(() => {
      setResources([
        {
          id: "1",
          title: "Data Structures and Algorithms Notes",
          description: "Comprehensive notes covering arrays, linked lists, trees, graphs, and common algorithms.",
          subject: "Computer Science",
          fileType: "pdf",
          fileUrl: "#",
          link: "https://www.geeksforgeeks.org/data-structures/", // Added external link
          uploadedBy: {
            id: "1",
            name: "Jane Doe",
            avatar: "/placeholder.svg?height=40&width=40"
          },
          uploadedAt: "2 days ago",
          tags: ["Data Structures", "Algorithms", "Notes"],
          upvotes: 24,
          views: 156
        },
        {
          id: "2",
          title: "Web Development Cheat Sheet",
          description: "Quick reference for HTML, CSS, JavaScript, and common web development patterns.",
          subject: "Web Development",
          fileType: "pdf",
          fileUrl: "#",
          link: "https://www.codecademy.com/resources/cheatsheets/subject/web-development", // Added external link
          uploadedBy: {
            id: "2",
            name: "Mike Smith",
            avatar: "/placeholder.svg?height=40&width=40"
          },
          uploadedAt: "1 week ago",
          tags: ["HTML", "CSS", "JavaScript", "Cheat Sheet"],
          upvotes: 42,
          views: 310
        },
        {
          id: "3",
          title: "Calculus Formula Sheet",
          description: "All important formulas for Calculus I, II, and III in one document.",
          subject: "Mathematics",
          fileType: "pdf",
          fileUrl: "#",
          link: "https://tutorial.math.lamar.edu/pdf/calculus_cheat_sheet_all.pdf",
          uploadedBy: {
            id: "3",
            name: "Lisa Wong",
            avatar: "/placeholder.svg?height=40&width=40"
          },
          uploadedAt: "2 weeks ago",
          tags: ["Calculus", "Formulas", "Mathematics"],
          upvotes: 36,
          views: 245
        },
        {
          id: "4",
          title: "Introduction to Machine Learning Slides",
          description: "Presentation slides covering ML basics, algorithms, and practical applications.",
          subject: "Artificial Intelligence",
          fileType: "ppt",
          fileUrl: "#",
          link: "https://www.geeksforgeeks.org/introduction-machine-learning/",
          uploadedBy: {
            id: "4",
            name: "Alex Chen",
            avatar: "/placeholder.svg?height=40&width=40"
          },
          uploadedAt: "3 weeks ago",
          tags: ["Machine Learning", "AI", "Slides"],
          upvotes: 18,
          views: 132
        },
        {
          id: "5",
          title: "Physics Problem Set Solutions",
          description: "Worked solutions for common mechanics and electromagnetism problems.",
          subject: "Physics",
          fileType: "pdf",
          fileUrl: "#",
          link: "https://web.mit.edu/8.02/www/Spring02/probsets.html",
          uploadedBy: {
            id: "5",
            name: "David Lee",
            avatar: "/placeholder.svg?height=40&width=40"
          },
          uploadedAt: "1 month ago",
          tags: ["Physics", "Problem Set", "Solutions"],
          upvotes: 29,
          views: 187
        },
        {
          id: "6",
          title: "Database Design Diagrams",
          description: "ER diagrams and schema examples for relational database design.",
          subject: "Computer Science",
          fileType: "img",
          fileUrl: "#",
          link: "https://vertabelo.com/blog/what-is-database-diagram/",
          uploadedBy: {
            id: "6",
            name: "Sarah Johnson",
            avatar: "/placeholder.svg?height=40&width=40"
          },
          uploadedAt: "1 month ago",
          tags: ["Database", "ER Diagram", "Schema"],
          upvotes: 15,
          views: 98
        }
      ])
      setIsLoading(false)
    }, 2000)
  }, [router])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleSubjectFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSubjectFilter(e.target.value)
  }

  const handleTypeFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTypeFilter(e.target.value)
  }

  const handleContentGen = async () => {
    if (!genPrompt.trim()) return;
    setGenLoading(true);
    setGeneratedContent("");
    try {
      const res = await geminiRequest({ prompt: genPrompt, type: "resource-gen" });
      if (res && res.candidates && res.candidates[0]?.content?.parts[0]?.text) {
        setGeneratedContent(res.candidates[0].content.parts[0].text);
      } else {
        setGeneratedContent("No content generated. Try a different prompt.");
      }
    } catch (e) {
      setGeneratedContent("Error: Failed to generate content.");
    }
    setGenLoading(false);
  };

  const filteredResources = resources.filter(resource => {
    return (
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (subjectFilter === "" || resource.subject === subjectFilter) &&
      (typeFilter === "" || resource.fileType === typeFilter)
    )
  })

  return (
    <div className="min-h-screen bg-black text-white px-2 md:px-8 py-8 font-[Inter,sans-serif]">
      <h1 className="text-3xl font-bold mb-6 text-center">Resources</h1>
      <div className="flex flex-col md:flex-row gap-4 mb-6 items-center justify-between">
        <Button onClick={() => setShowAddForm((v) => !v)} className="bg-green-700 hover:bg-green-800 text-white rounded-full font-semibold px-6 py-2 mb-4 md:mb-0">
          {showAddForm ? "Close" : "Add Resource"}
        </Button>
        <div className="flex gap-2 w-full md:w-auto">
          <Input
            type="text"
            placeholder="Search resources..."
            value={searchQuery}
            onChange={handleSearch}
            className="rounded-full bg-[#18181b] text-white border border-gray-700 focus:border-blue-500 px-4 py-2"
          />
          <select value={subjectFilter} onChange={handleSubjectFilter} className="rounded-full bg-[#18181b] text-white border border-gray-700 px-4 py-2">
            <option value="">All Subjects</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Web Development">Web Development</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Artificial Intelligence">Artificial Intelligence</option>
            <option value="Physics">Physics</option>
          </select>
          <select value={typeFilter} onChange={handleTypeFilter} className="rounded-full bg-[#18181b] text-white border border-gray-700 px-4 py-2">
            <option value="">All Types</option>
            <option value="pdf">PDF</option>
            <option value="ppt">PPT</option>
            <option value="img">Image</option>
          </select>
        </div>
        <div className="flex gap-2 w-full md:w-auto mt-4 md:mt-0">
          <Input
            type="text"
            placeholder="Generate resource content with AI..."
            value={genPrompt}
            onChange={e => setGenPrompt(e.target.value)}
            className="rounded-full bg-[#18181b] text-white border border-gray-700 focus:border-blue-500 px-4 py-2 w-64"
          />
          <Button
            onClick={handleContentGen}
            className="bg-blue-700 hover:bg-blue-800 text-white rounded-full font-semibold px-6 py-2"
            disabled={genLoading}
          >
            {genLoading ? "Generating..." : "Generate"}
          </Button>
        </div>
      </div>
      {showAddForm && (
        <form onSubmit={handleAddResource} className="bg-[#18181b] border border-gray-800 rounded-2xl p-6 mb-8 max-w-2xl mx-auto flex flex-col gap-4">
          <h2 className="text-xl font-bold mb-2 text-center">Add a Resource</h2>
          <Input name="title" placeholder="Title" value={addForm.title} onChange={handleAddChange} className="bg-black text-white border-gray-700 focus:border-blue-500" />
          <Textarea name="description" placeholder="Description" value={addForm.description} onChange={handleAddChange} className="bg-black text-white border-gray-700 focus:border-blue-500 min-h-[60px]" />
          <Input name="subject" placeholder="Subject" value={addForm.subject} onChange={handleAddChange} className="bg-black text-white border-gray-700 focus:border-blue-500" />
          <select name="fileType" value={addForm.fileType} onChange={handleAddChange} className="bg-black text-white border-gray-700 focus:border-blue-500 rounded px-3 py-2">
            <option value="">Select Type</option>
            <option value="pdf">PDF</option>
            <option value="ppt">PPT</option>
            <option value="img">Image</option>
            <option value="video">Video</option>
            <option value="link">Link</option>
          </select>
          <Input name="link" placeholder="Resource Link (YouTube, website, etc.)" value={addForm.link} onChange={handleAddChange} className="bg-black text-white border-gray-700 focus:border-blue-500" />
          {addError && <div className="text-red-400 text-sm text-center">{addError}</div>}
          <Button type="submit" className="bg-blue-700 hover:bg-blue-800 text-white rounded-full font-semibold py-2 mt-2" disabled={addLoading}>
            {addLoading ? "Adding..." : "Add Resource"}
          </Button>
        </form>
      )}
      {generatedContent && (
        <div className="mt-4 p-4 bg-[#23232a] rounded-xl border border-gray-700 text-white max-w-3xl mx-auto whitespace-pre-line">
          <h3 className="font-bold mb-2 text-lg text-blue-400">AI Generated Content</h3>
          <div>{generatedContent}</div>
        </div>
      )}
      <div className="overflow-x-auto rounded-2xl shadow-lg border border-gray-800 bg-[#18181b]">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Title</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Description</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Subject</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Type</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Uploaded By</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Tags</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Upvotes</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Views</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {isLoading ? (
              <tr><td colSpan={9} className="text-center py-8 text-gray-400">Loading...</td></tr>
            ) : filteredResources.length === 0 ? (
              <tr><td colSpan={9} className="text-center py-8 text-gray-400">No resources found.</td></tr>
            ) : (
              filteredResources.map(resource => (
                <tr key={resource.id} className="hover:bg-[#23232a] transition-colors cursor-pointer" onClick={() => window.open(resource.link, '_blank')}>
                  <td className="px-4 py-3 font-semibold text-blue-300 underline">{resource.title}</td>
                  <td className="px-4 py-3 text-gray-200 max-w-xs truncate">{resource.description}</td>
                  <td className="px-4 py-3">{resource.subject}</td>
                  <td className="px-4 py-3 uppercase">{resource.fileType}</td>
                  <td className="px-4 py-3 flex items-center gap-2">
                    <img src={resource.uploadedBy.avatar} alt={resource.uploadedBy.name} className="w-7 h-7 rounded-full" />
                    <span>{resource.uploadedBy.name}</span>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-400">{resource.tags.join(", ")}</td>
                  <td className="px-4 py-3 text-green-400 font-bold">{resource.upvotes}</td>
                  <td className="px-4 py-3 text-yellow-400 font-bold">{resource.views}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
