import React from 'react';

const GuidesPage = () => {
  const guides = [
    {
      title: "Getting Started with EduBridge",
      description: "Learn how to set up your account and start using EduBridge effectively.",
      link: "#",
    },
    {
      title: "How to Find the Right Mentor",
      description: "Tips and tricks to connect with the best mentors for your learning goals.",
      link: "#",
    },
    {
      title: "Creating and Managing Study Groups",
      description: "A step-by-step guide to creating and managing study groups on EduBridge.",
      link: "#",
    },
  ];

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-6 text-center text-black">Guides</h1>
      <p className="text-lg text-gray-700 mb-8 text-center">
        Explore our comprehensive guides to make the most of EduBridge. Whether you're a beginner or an advanced user, these resources will help you navigate the platform effectively.
      </p>
      <div className="space-y-6">
        {guides.map((guide, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-2 text-black">{guide.title}</h2>
            <p className="text-gray-700 mb-4">{guide.description}</p>
            <a href={guide.link} className="text-primary hover:underline">Read More</a>
          </div>
        ))}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-2 text-black">Advanced Features of EduBridge</h2>
          <p className="text-gray-700 mb-4">
            Dive deep into the advanced features of EduBridge, including personalized dashboards, real-time collaboration tools, and more.
          </p>
          <a href="#" className="text-primary hover:underline">Read More</a>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-2 text-black">Tips for Effective Mentorship</h2>
          <p className="text-gray-700 mb-4">
            Learn how to be an effective mentor and make a lasting impact on your mentees.
          </p>
          <a href="#" className="text-primary hover:underline">Read More</a>
        </div>
      </div>
    </div>
  );
};

export default GuidesPage;
