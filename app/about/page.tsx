import React from 'react';

const AboutPage = () => {
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-6 text-center">About Us</h1>
      <div className="flex flex-col md:flex-row justify-center items-center gap-8 max-w-4xl mx-auto">
        {/* Card for Siri */}
        <div className="bg-white shadow-2xl rounded-2xl flex flex-col items-center py-10 px-8 w-80 md:w-96 transition-transform hover:scale-105 border border-gray-200">
          <img
            src="/siri-profile.jpg"
            alt="Siri"
            width={160}
            height={160}
            className="rounded-full border-4 border-primary object-cover mb-6 shadow-md"
            style={{ aspectRatio: '1/1', objectFit: 'cover' }}
          />
          <h2 className="text-2xl font-bold text-gray-900 mt-2 mb-1 text-center">Siri</h2>
          <p className="text-base font-medium text-gray-700 mb-2 text-center">Student of BMS College of Engineering</p>
          <p className="text-base text-gray-600 text-center max-w-xs">
            Siri is passionate about web development and has contributed significantly to the design and functionality of this platform.
          </p>
        </div>

        {/* Card for Vishaka */}
        <div className="bg-white shadow-2xl rounded-2xl flex flex-col items-center py-10 px-8 w-80 md:w-96 transition-transform hover:scale-105 border border-gray-200">
          <img
            src="/vishaka-profile.jpeg"
            alt="Vishaka"
            width={160}
            height={160}
            className="rounded-full border-4 border-primary object-cover mb-6 shadow-md"
            style={{ aspectRatio: '1/1', objectFit: 'cover' }}
          />
          <h2 className="text-2xl font-bold text-gray-900 mt-2 mb-1 text-center">Vishaka</h2>
          <p className="text-base font-medium text-gray-700 mb-2 text-center">Student of BMS College of Engineering</p>
          <p className="text-base text-gray-600 text-center max-w-xs">
            Vishaka has been instrumental in bringing creative ideas and ensuring a seamless user experience for this platform.
          </p>
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
