import React from 'react';

const FeedbackPage = () => {
  return (
    <div className="container mx-auto py-10 px-4 bg-gray-50">
      <h1 className="text-4xl font-bold mb-6 text-center text-black">Feedback</h1>
      <div className="bg-white shadow-lg rounded-lg p-8">
        <p className="text-lg text-gray-800 mb-6">
          We value your feedback! Please fill out the form below to share your thoughts and suggestions.
        </p>
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
            <label htmlFor="feedback" className="block text-sm font-medium text-gray-700">
              Feedback
            </label>
            <textarea
              id="feedback"
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

export default FeedbackPage;
