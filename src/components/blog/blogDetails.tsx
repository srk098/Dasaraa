// app/blog/[id]/page.tsx
"use client";

import { useRouter } from "next/navigation"; // Correct now
import { useEffect, useState } from "react";
import { db } from "@/lib/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";

interface Blog {
  id: string;
  title: string;
  description: string;
  imageAlt: string;
  imagePath: string;
  date: string;
  content?: string; // optional if you have full blog content
}

export default function BlogDetailPage() {
  const router = useRouter();
  const [blog, setBlog] = useState<Blog | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      const id = window.location.pathname.split("/").pop(); // get blog id manually
      if (!id) return;

      const restaurantName = "dasaraa";
      const docRef = doc(
        db,
        "restaurants",
        restaurantName,
        "blog_page",
        "blogdata"
      ); // 'blogs' = document id
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const foundBlog = data.blogs.find((b: Blog) => b.id === id);
        if (foundBlog) {
          setBlog(foundBlog);
        } else {
          console.error("Blog not found");
        }
      } else {
        console.error("No blog document found!");
      }
    };

    fetchBlog();
  }, []);

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-4 font-jost">
      <Image
        src={blog.imagePath}
        alt={blog.imageAlt}
        width={800}
        height={500}
        className="rounded-lg mb-6"
      />
      <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
      <p className="text-gray-500 mb-4">
        {new Date(blog.date).toLocaleDateString()}
      </p>
      <p className="text-lg">{blog.content || blog.description}</p>
    </div>
  );
}
