"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { db } from "../../lib/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export default function Parallax() {
  const [data, setData] = useState<{
    active: boolean;
    backgroundImage: string;
    heading: string;
    subheading: string;
  } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const restaurantName = "dasaraa";
      const docRef = doc(
        db,
        "restaurants",
        restaurantName,
        "About_Page",
        "parallax"
      );
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setData(docSnap.data() as any);
      }
    };
    fetchData();
  }, []);

  if (!data || !data.active) return null;

  return (
    <section
      className="relative bg-fixed bg-center bg-cover h-[60vh] flex items-center justify-center"
      style={{ backgroundImage: `url('${data.backgroundImage}')` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60 z-0" />

      {/* Glass container */}
      <div className="relative z-10 px-4">
        <div
          className="
            mx-auto
            max-w-3xl
            rounded-2xl
            bg-white/10
            backdrop-blur-sm
            border border-white/20
            shadow-2xl
            px-8 py-10
            text-center
          "
        >
          <motion.h2
            className="font-bold text-white mb-4 text-3xl md:text-4xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {data.heading}
          </motion.h2>

          <motion.p
            className="text-white/80 text-base md:text-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {data.subheading}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
