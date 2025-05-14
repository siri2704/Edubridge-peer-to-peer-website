import React from 'react';
import Image from 'next/image';

const AboutPage = () => {
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-6 text-center">About Us</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Card for Siri */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <Image
            src="/placeholder-user.jpg"
            alt="Siri"
            width={400}
            height={400}
            className="w-full h-64 object-cover"
          />
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-2">Siri</h2>
            <p className="text-gray-700 mb-4">Student of BMS College of Engineering</p>
            <p className="text-gray-600">
              Siri is passionate about web development and has contributed significantly to the design and functionality of this platform.
            </p>
          </div>
        </div>

        {/* Card for Vishaka */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <Image
            src="/placeholder-user.jpg"
            alt="Vishaka"
            width={400}
            height={400}
            className="w-full h-64 object-cover"
          />
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-2">Vishaka</h2>
            <p className="text-gray-700 mb-4">Student of BMS College of Engineering</p>
            <p className="text-gray-600">
              Vishaka has been instrumental in bringing creative ideas and ensuring a seamless user experience for this platform.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <h2 className="text-3xl font-bold mb-4 text-center">The Idea Behind EduBridge</h2>
        <p className="text-lg leading-7 mb-4">
          EduBridge was born out of a vision to create a platform that fosters collaborative learning and bridges the gap between students and mentors. In today’s fast-paced world, access to quality education and mentorship can be a challenge. EduBridge aims to solve this by providing a space where learners can connect with experts, share knowledge, and grow together.
        </p>
        <p className="text-lg leading-7 mb-4">
          Our platform is designed to empower individuals by making education more accessible and interactive. Whether you are a student looking to enhance your skills, a professional seeking guidance, or a mentor willing to share your expertise, EduBridge provides the tools and community to make it happen.
        </p>
        <p className="text-lg leading-7">
          At EduBridge, we believe that learning is a lifelong journey, and collaboration is the key to success. Join us in building a community where knowledge knows no boundaries, and everyone has the opportunity to achieve their full potential.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
