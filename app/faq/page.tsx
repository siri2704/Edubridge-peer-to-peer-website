import React from 'react';

const FAQPage = () => {
  const faqs = [
    {
      question: "What is EduBridge?",
      answer: "EduBridge is a platform designed to connect learners with mentors and provide collaborative learning opportunities."
    },
    {
      question: "How can I become a mentor?",
      answer: "You can sign up as a mentor by creating an account and filling out the mentor application form."
    },
    {
      question: "Is EduBridge free to use?",
      answer: "EduBridge offers both free and premium features. Some mentorship sessions may have associated fees."
    },
    {
      question: "How do I join a study group?",
      answer: "You can browse available study groups on the platform and request to join the ones that interest you."
    }
  ];

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-6 text-center">Frequently Asked Questions</h1>
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-2">{faq.question}</h2>
            <p className="text-gray-700">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQPage;
