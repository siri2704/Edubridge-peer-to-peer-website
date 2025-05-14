import React from 'react';

const PrivacyPage = () => {
  return (
    <div className="container mx-auto py-10 px-4 bg-gray-50">
      <h1 className="text-4xl font-bold mb-6 text-center text-black">Privacy Policy</h1>
      <div className="bg-white shadow-lg rounded-lg p-8">
        <p className="text-lg text-gray-800 mb-6">
          At EduBridge, we value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data.
        </p>
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-2 text-black">Information We Collect</h2>
            <p className="text-gray-700">
              We may collect personal information such as your name, email address, and payment details when you use our platform. Additionally, we collect data on your interactions with the platform to improve our services.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-2 text-black">How We Use Your Information</h2>
            <p className="text-gray-700">
              Your information is used to provide and improve our services, process transactions, and communicate with you. We do not share your personal information with third parties without your consent.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-2 text-black">Your Rights</h2>
            <p className="text-gray-700">
              You have the right to access, update, or delete your personal information at any time. If you have any concerns about your privacy, please contact us.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-2 text-black">Contact Us</h2>
            <p className="text-gray-700">
              If you have any questions about this Privacy Policy, please reach out to us at privacy@edubridge.com.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
