"use client";
import Image from "next/image";
import { FormEvent } from "react";
import Header from "./components/header";
import Navbar from "./components/Navbar";
import PlantListComp from "./components/PlantList";

export default function Home() {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    alert("Message sent!");
  };

  return (
    <div className="min-h-screen bg-green-50 text-green-900 font-sans">
      {/* Header */}
      <Header/>
      

     <Navbar/>

      {/* Home Section */}
      <section id="home" className="p-6 text-center">
        <h2 className="text-3xl font-bold mb-3">Welcome to GreenArray</h2>
        <p className="max-w-2xl mx-auto">
          GreenArray is your one-stop solution for indoor/outdoor plants,
          gardening essentials, seeds, and expert care tips. We believe in
          creating greener homes and a sustainable future.
        </p>
      </section>

      {/* Products Section */}
      <PlantListComp></PlantListComp>

      {/* Guidance Section */}
      <section id="guidance" className="p-6 bg-green-100">
        <h2 className="text-3xl font-bold mb-4 text-center">
          Plant Care Guidance
        </h2>
        <div className="space-y-2 max-w-2xl mx-auto">
          <p>
            🌿 <strong>Watering:</strong> Check soil before watering. Water once
            a week.
          </p>
          <p>
            ☀️ <strong>Sunlight:</strong> Indoor plants need indirect light.
            Outdoor plants need full sun.
          </p>
          <p>
            🌱 <strong>Soil:</strong> Use well-draining soil. Choose correct
            mix.
          </p>
          <p>
            🐛 <strong>Pest Control:</strong> Use neem oil or soap solution for
            pests.
          </p>
          <p>
            🌼 <strong>Fertilizing:</strong> Apply organic fertilizers in
            summer, avoid in winter.
          </p>
          <p>
            ♻️ <strong>Repotting:</strong> Every 6-12 months with fresh soil.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="p-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 max-w-md mx-auto"
        >
          <input
            type="text"
            placeholder="Your Name"
            required
            className="p-3 border border-gray-300 rounded-lg"
          />
          <input
            type="email"
            placeholder="Your Email"
            required
            className="p-3 border border-gray-300 rounded-lg"
          />
          <textarea
            placeholder="Your Message"
            rows={4}
            required
            className="p-3 border border-gray-300 rounded-lg"
          />
          <button
            type="submit"
            className="p-3 bg-green-700 text-white rounded-lg font-semibold hover:bg-green-800 transition"
          >
            Send Message
          </button>
        </form>
      </section>

      {/* Footer */}
      <footer className="bg-green-800 text-white text-center p-6 mt-6">
        <p>© 2025 GreenArray | All Rights Reserved</p>
        <p>
          📧 Email:{" "}
          <a
            href="mailto:greenarray2627@gmail.com"
            className="underline hover:text-green-200"
          >
            greenarray2627@gmail.com
          </a>
        </p>
      </footer>
    </div>
  );
}
