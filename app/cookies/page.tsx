import React from 'react';

const CookiesPage = () => {
  return (
    <div className="container mx-auto py-10 px-4 bg-gray-50">
      <h1 className="text-4xl font-bold mb-6 text-center text-black">Cookies Policy</h1>
      <div className="bg-white shadow-lg rounded-lg p-8">
        <p className="text-lg text-gray-800 mb-6">
          EduBridge uses cookies to enhance your experience on our platform. This Cookies Policy explains what cookies are, how we use them, and your choices regarding their use.
        </p>
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-2 text-black">1. What Are Cookies?</h2>
            <p className="text-gray-700">
              Cookies are small text files stored on your device by your web browser. They help websites remember your preferences and improve your browsing experience.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-2 text-black">2. How We Use Cookies</h2>
            <p className="text-gray-700">
              We use cookies to remember your preferences, analyze site traffic, and provide personalized content. Some cookies are essential for the platform to function properly.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-2 text-black">3. Your Choices</h2>
            <p className="text-gray-700">
              You can manage your cookie preferences through your browser settings. Please note that disabling cookies may affect the functionality of the platform.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-2 text-black">4. Contact Us</h2>
            <p className="text-gray-700">
              If you have any questions about our Cookies Policy, please contact us at cookies@edubridge.com.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiesPage;
