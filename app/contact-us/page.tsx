import React from 'react';

const ContactUsPage = () => {
  return (
    <div className="container mx-auto py-10 px-4 bg-gray-50">
      <h1 className="text-4xl font-bold mb-6 text-center text-black">Contact Us</h1>
      <div className="bg-white shadow-lg rounded-lg p-8">
        <p className="text-lg text-gray-800 mb-6">
          For any inquiries, feel free to reach out to us at:
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
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              id="message"
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="inline-flex justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUsPage;
