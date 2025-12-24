// "use client";

// import { motion } from "framer-motion";
// import { useEffect, useState } from "react";
// import { doc, getDoc } from "firebase/firestore";
// import { db } from "../../lib/firebaseConfig";

// type StoryData = {
//   active?: boolean;
//   title: string;
//   description: string;
// };

// export default function OurStory({ restaurantId }: { restaurantId: string }) {
//   const [story, setStory] = useState<StoryData | null>(null);

//   useEffect(() => {
//     const fetchStory = async () => {
//       try {
//         const docRef = doc(
//           db,
//           "restaurants",
//           restaurantId,
//           "About_Page",
//           "our-story-section"
//         );
//         const docSnap = await getDoc(docRef);
//         if (docSnap.exists()) {
//           setStory(docSnap.data() as StoryData);
//         }
//       } catch (error) {
//         console.error("Error fetching story:", error);
//       }
//     };

//     fetchStory();
//   }, [restaurantId]);

//   if (!story?.active) return null;

//   return (
//     <section className="relative overflow-hidden py-12 md:py-24">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid md:grid-cols-2 gap-0">
//           {/* Left Image */}
//           <div
//             className="min-h-[400px] bg-cover bg-center w-full rounded-l-2xl"
//             style={{
//               backgroundImage: "url('/Images/aboutPage/DiscoverUs.jpg')",
//             }}
//           />

//           {/* Right Text */}
//           <motion.div
//             initial={{ opacity: 0, x: 60 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8 }}
//             viewport={{ once: true }}
//             className="flex items-center bg-secondary text-black w-full rounded-r-2xl"
//           >
//             <div className="p-8 md:p-12">
//               <p className="text-2xl italic text-red mb-2">Discover</p>
//               <h2 className="text-4xl font-bold mb-4">{story.title}</h2>
//               <p>{story.description}</p>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// }



"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { db } from "@/lib/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

const restaurantId = "dasaraa";

interface ZigZagContentItem {
  title: string;
  text: string;
  active: boolean;
}

export default function ZigZagContent() {
  const [contentItems, setContentItems] = useState<ZigZagContentItem[]>([]);

  useEffect(() => {
    const fetchZigZagContent = async () => {
      try {
        const docRef = doc(
          db,
          "restaurants",
          restaurantId,
          "About_Page",
          "our-story-section"
        );
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          const filtered = (data.zigzagContent ?? []).filter(
            (item: ZigZagContentItem) => item.active
          );
          setContentItems(filtered);
        } else {
          console.warn("Zigzag content document not found.");
        }
      } catch (error) {
        console.error("Error fetching ZigZag content:", error);
      }
    };

    fetchZigZagContent();
  }, []);

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="max-w-4xl mx-auto px-6 space-y-24">

        {contentItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >

            {/* Title */}
            <h2 className="font-bold text-secondary mb-4">
              {item.title}
            </h2>

            {/* Decorative border */}
            <div className="flex justify-center mb-6">
              <img
                src="/Images/heading_main.PNG"
                alt="decor border"
                className="w-full max-w-[90%] sm:max-w-[70%] md:max-w-[48%]"

              />
            </div>

            {/* Text */}
            <p className="text-gray-800 mb-6">
              {item.text}
            </p>
          </motion.div>
        ))}

      </div>
    </section>
  );
}
