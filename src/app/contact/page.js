"use client";

import { useState } from "react";
import Header from "../../components/Header";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  return (
    <>
      <Header />
      <section className="bg-white text-gray-900 py-24 flex items-center justify-center">
        <div className="text-center max-w-3xl px-6">
          <h1 className="text-2xl font-extrabold sm:text-5xl leading-tight bg-gradient-to-r from-[#9AE66E] via-gray-900 to-black bg-clip-text text-transparent">
            Get in Touch
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-gray-600 sm:text-lg">
            Have questions? Need support? Fill out the form below and we’ll get
            back to you as soon as possible.
          </p>

          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="mt-10 border-2 border-dashed border-gray-300 p-8 rounded-lg text-left space-y-6 max-w-lg mx-auto"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9AE66E] transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9AE66E] transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="4"
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9AE66E] transition"
              />
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 text-sm font-semibold bg-[#9AE66E] text-gray-900 hover:bg-[#82d358] transition rounded-lg"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
