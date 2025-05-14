import React from 'react';

const FeaturesPage = () => {
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-6 text-center">Our Features</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Feature 1 */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl text-black font-semibold mb-2">Interactive Learning</h2>
          <p className="text-black">
            Engage in interactive sessions with mentors and peers to enhance your learning experience.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl text-black font-semibold mb-2">Resource Sharing</h2>
          <p className="text-black">
            Access and share a wide range of educational resources to support your studies.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl text-black font-semibold mb-2">Collaborative Study Groups</h2>
          <p className="text-black">
            Join study groups to collaborate with like-minded individuals and achieve your goals together.
          </p>
        </div>

        {/* Feature 4 */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl text-black font-semibold mb-2">Expert Mentorship</h2>
          <p className="text-black">
            Learn from experienced mentors who are dedicated to guiding you on your educational journey.
          </p>
        </div>

        {/* Feature 5 */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl text-black font-semibold mb-2">Personalized Dashboard</h2>
          <p className="text-black">
            Keep track of your progress and manage your activities with a personalized dashboard.
          </p>
        </div>

        {/* Feature 6 */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl text-black font-semibold mb-2">Seamless Communication</h2>
          <p className="text-black">
            Stay connected with mentors and peers through our integrated communication tools.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;
