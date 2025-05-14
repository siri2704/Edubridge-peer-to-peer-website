import React from 'react';

const TermsPage = () => {
  return (
    <div className="container mx-auto py-10 px-4 bg-gray-50">
      <h1 className="text-4xl font-bold mb-6 text-center text-black">Terms and Conditions</h1>
      <div className="bg-white shadow-lg rounded-lg p-8">
        <p className="text-lg text-gray-800 mb-6">
          Welcome to EduBridge! By using our platform, you agree to the following terms and conditions. Please read them carefully.
        </p>
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-2 text-black">1. Acceptance of Terms</h2>
            <p className="text-gray-700">
              By accessing and using EduBridge, you agree to comply with and be bound by these terms. If you do not agree, please do not use our platform.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-2 text-black">2. User Responsibilities</h2>
            <p className="text-gray-700">
              Users are responsible for maintaining the confidentiality of their account information and for all activities that occur under their account.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-2 text-black">3. Prohibited Activities</h2>
            <p className="text-gray-700">
              Users must not engage in activities that violate any laws, infringe on intellectual property rights, or harm the platform or its users.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-2 text-black">4. Limitation of Liability</h2>
            <p className="text-gray-700">
              EduBridge is not liable for any damages resulting from the use or inability to use the platform.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-2 text-black">5. Changes to Terms</h2>
            <p className="text-gray-700">
              We reserve the right to update these terms at any time. Continued use of the platform constitutes acceptance of the updated terms.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
