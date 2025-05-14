import React from 'react';

const BlogPage = () => {
  const blogs = [
    {
      title: "The Importance of Peer Mentorship",
      date: "May 10, 2025",
      author: "John Doe",
      excerpt: "Discover how peer mentorship can transform your learning experience and help you achieve your goals.",
    },
    {
      title: "Top 5 Study Tips for Students",
      date: "April 25, 2025",
      author: "Jane Smith",
      excerpt: "Learn the top 5 study tips that can help you stay focused and excel in your studies.",
    },
    {
      title: "How to Make the Most of EduBridge",
      date: "March 15, 2025",
      author: "EduBridge Team",
      excerpt: "A comprehensive guide to using EduBridge effectively for collaborative learning.",
    },
  ];

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-6 text-center text-black">Our Blog</h1>
      <div className="space-y-6">
        {blogs.map((blog, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-2 text-black">{blog.title}</h2>
            <p className="text-gray-500 text-sm mb-2">{blog.date} by {blog.author}</p>
            <p className="text-gray-700">{blog.excerpt}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
