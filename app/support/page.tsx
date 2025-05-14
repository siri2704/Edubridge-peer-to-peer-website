import React from 'react';

const SupportPage = () => {
  return (
    <div className="container mx-auto py-10 px-4 bg-gray-50">
      <h1 className="text-4xl font-bold mb-6 text-center text-black">Support</h1>
      <div className="bg-white shadow-lg rounded-lg p-8">
        <p className="text-lg text-gray-800 mb-6">
          Need help? Our support team is here to assist you. Please reach out to us at:
        </p>
        <ul className="list-disc list-inside mb-6">
          <li>
            <a href="mailto:siriananth.is22@bmsce.ac.in" className="text-primary hover:underline">
              siriananth.is22@bmsce.ac.in
            </a>
          </li>
          <li>
            <a href="mailto:vishaka.is22@bmsce.ac.in" className="text-primary hover:underline">
              vishaka.is22@bmsce.ac.in
            </a>
          </li>
        </ul>
        <p className="text-lg text-gray-800">
          Alternatively, you can visit our <a href="/faq" className="text-primary hover:underline">FAQ</a> page for quick answers to common questions.
        </p>
      </div>
    </div>
  );
};

export default SupportPage;
