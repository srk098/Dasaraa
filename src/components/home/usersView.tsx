"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { db } from "@/lib/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

interface Testimonial {
  src: string;
  alt: string;
  feedback: string;
  name: string;
  active: boolean;
  rating?: number; // Added rating here
}

export default function UsersView() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const restaurantId = "dasaraa"; // replace with actual restaurant ID
        const docRef = doc(
          db,
          "restaurants",
          restaurantId,
          "Home_Page",
          "users-feedback"
        );
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          const allTestimonials: Testimonial[] = data.testimonials || [];
          const activeTestimonials = allTestimonials.filter((t) => t.active);
          setTestimonials(activeTestimonials);
        } else {
          console.warn("No testimonials found");
        }
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    }

    fetchTestimonials();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) =>
        testimonials.length ? (prevIndex + 1) % testimonials.length : 0
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [testimonials]);

  if (!testimonials.length) {
    return (
      <section className="bg-gray-100 py-12 text-center">
        <h2 className="text-2xl text-gray-600">
          No user testimonials available
        </h2>
      </section>
    );
  }

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto text-center px-2">
        <h1 className="mb-10">What Our Users Say</h1>
        <div className="relative overflow-hidden w-full">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center bg-gray shadow-xl rounded-xl p-6 mx-auto"
          >
            <p className="text-gray-600 italic mb-3">
              {testimonials[activeIndex].feedback}
            </p>
            <div className="flex space-x-1 text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <i key={i} className="bi bi-star-fill" />
              ))}
            </div>
            <h5 className="text-gray-800 font-semibold mt-3">
              BY {testimonials[activeIndex].name}
            </h5>
            {!!testimonials[activeIndex].rating && (
              <div className="text-yellow-400">
                {"⭐".repeat(testimonials[activeIndex].rating || 0)}
              </div>
            )}
          </motion.div>
        </div>

        {/* Indicator dots */}
        <div className="flex justify-center space-x-2 mt-6">
          {testimonials.map((_, index) => (
            <span
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
                activeIndex === index
                  ? "bg-black shadow-md"
                  : "bg-red shadow-sm"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
