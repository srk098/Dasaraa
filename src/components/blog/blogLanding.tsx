"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "../ui/button";

interface Blog {
  id: string;
  title: string;
  description: string;
  imageAlt: string;
  imagePath: string;
  date: string;
}

export default function BlogsLanding() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const restaurantName = "dasaraa";
        const querySnapshot = await getDocs(
          collection(db, "restaurants", restaurantName, "blog_page")
        );
        const blogsData = querySnapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() }) as Blog
        );
        setBlogs(blogsData);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen text-black font-jost bg-white">
      {/* Hero Section */}
      <div className="relative h-[20vh] bg-cover bg-center flex items-center justify-center ">
        <Image
          src="https://images.unsplash.com/photo-1547573854-74d2a71d0826?q=80&w=2070"
          alt="Traditional Indian spices and cooking ingredients"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center" />
      </div>

      {/* Blogs Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <motion.div
              key={blog.id}
              whileHover={{ scale: 1.03 }}
              className="group bg-white rounded-2xl overflow-hidden shadow-md flex flex-col transition duration-300"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <Image
                  src={blog.imagePath}
                  alt={blog.imageAlt}
                  width={400}
                  height={300}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110 brightness-50"
                />
              </div>

              <div className="flex flex-col flex-grow p-6">
                <h2 className="text-2xl font-semibold mb-2">{blog.title}</h2>
                <p className="text-gray-500 text-xs mb-4">
                  {new Date(blog.date).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
                <p className="text-gray-700 flex-grow">{blog.description}</p>

                <Link href={`/blog/${blog.id}`} className="mt-6 inline-block">
                  <Button>Read More</Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
