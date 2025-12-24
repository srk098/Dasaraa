"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../lib/firebaseConfig";

type StoryData = {
  active?: boolean;
  title: string;
  description: string;
};

export default function CateringOurStory({
  restaurantId,
}: {
  restaurantId: string;
}) {
  const [story, setStory] = useState<StoryData | null>(null);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const docRef = doc(
          db,
          "restaurants",
          restaurantId,
          "Catering_Page",
          "our-story-catering"
        );
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setStory(docSnap.data() as StoryData);
        }
      } catch (error) {
        console.error("Error fetching story:", error);
      }
    };

    fetchStory();
  }, [restaurantId]);

  if (!story?.active) return null;

  return (
    <section className="relative overflow-hidden py-12 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Left Image */}
          <div
            className="min-h-[400px] bg-cover bg-center w-full rounded-l-2xl"
            style={{
              backgroundImage: "url('/Images/CateringImages/CateringMain.png')",
            }}
          />

          {/* Right Text */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex items-center bg-gray text-black w-full rounded-r-2xl"
          >
            <div className="p-8 md:p-12">
              <p className="text-2xl italic text-red mb-2">Discover</p>
              <h2 className="text-4xl font-bold mb-4">{story.title}</h2>
              <p>{story.description}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
