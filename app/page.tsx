"use client";
import Image from "next/image";
import { FormEvent } from "react";
import Header from "./components/header";

export default function Home() {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    alert("Message sent!");
  };

  return (
    <div className="min-h-screen bg-green-50 text-green-900 font-sans">
      {/* Header */}
      <Header/>
      

      {/* Navbar */}
      <nav className="bg-green-600 flex justify-center gap-6 py-3">
        <a href="#home" className="text-white font-semibold hover:underline">
          Home
        </a>
        <a href="#products" className="text-white font-semibold hover:underline">
          Plants
        </a>
        <a href="#guidance" className="text-white font-semibold hover:underline">
          Guidance
        </a>
        <a href="#contact" className="text-white font-semibold hover:underline">
          Contact
        </a>
      </nav>

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
      <section id="products" className="p-6">
        <h2 className="text-3xl font-bold mb-6 text-center">Top 5 Plants</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              img: "/monestra.webp",
              title: "Monstera",
              desc: "Air-purifying, beautiful split leaves. Great for indoors.",
            },
            {
              img: "/japanesemapple.webp",
              title: "Japanese Maple",
              desc: "Stunning red foliage. Prefers partial sunlight.",
            },
            {
              img: "/birdofparadise.jpeg",
              title: "Bird of Paradise",
              desc: "Bright tropical flower. Needs good sunlight.",
            },
            {
              img: "/fiddleleaf.jpeg",
              title: "Fiddle Leaf Fig",
              desc: "Modern houseplant. Requires weekly watering.",
            },
            {
              img: "/guaiacum_officinale_flowers_2.jpg",
              title: "Guiacism",
              desc: "Rare medicinal plant with unique leaf structure.",
            },
          ].map((plant, idx) => (
            <div
              key={idx}
              className="bg-green-100 p-4 rounded-lg text-center shadow-md hover:shadow-lg transition"
            >
              <Image
                src={plant.img}
                alt={plant.title}
                width={400}
                height={200}
                className="rounded-lg object-cover h-48 w-full"
              />
              <h3 className="text-xl font-semibold mt-3">{plant.title}</h3>
              <p className="text-sm mt-1">{plant.desc}</p>
            </div>
          ))}
        </div>
      </section>

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
