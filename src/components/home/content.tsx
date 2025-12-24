// "use client";

// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { db } from "@/lib/firebaseConfig";
// import { doc, getDoc } from "firebase/firestore";

// const restaurantId = "dasaraa";

// interface ZigZagContentItem {
//   image: string;
//   title: string;
//   text: string;
//   active: boolean;
// }

// export default function ZigZagContent() {
//   const [contentItems, setContentItems] = useState<ZigZagContentItem[]>([]);

//   useEffect(() => {
//     const fetchZigZagContent = async () => {
//       try {
//         const docRef = doc(
//           db,
//           "restaurants",
//           restaurantId,
//           "Home_Page",
//           "zigzagContent"
//         );
//         const docSnap = await getDoc(docRef);

//         if (docSnap.exists()) {
//           const data = docSnap.data();
//           const filtered = (data.zigzagContent ?? []).filter(
//             (item: ZigZagContentItem) => item.active
//           );
//           setContentItems(filtered);
//         } else {
//           console.warn("Zigzag content document not found.");
//         }
//       } catch (error) {
//         console.error("Error fetching ZigZag content:", error);
//       }
//     };

//     fetchZigZagContent();
//   }, []);

//   return (
//     <section className="relative overflow-hidden py-12 md:py-24">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
//         {contentItems.map((item, index) => (
//           <motion.div
//             key={index}
//             initial={{ opacity: 0, y: 50 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, ease: "easeOut" }}
//             viewport={{ once: false, amount: 0.3 }}
//             className={`flex flex-col md:flex-row ${
//               index % 2 !== 0 ? "md:flex-row-reverse" : ""
//             }`}
//           >
//             {/* Image Section */}
//             <div
//               className="min-h-[400px] bg-cover bg-center w-full md:w-1/2 rounded-l-2xl"
//               style={{ backgroundImage: `url(${item.image})` }}
//             />

//             {/* Text Section */}
//             <motion.div
//               initial={{ opacity: 0, x: 60 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.8 }}
//               viewport={{ once: true }}
//               className="flex items-center bg-secondary text-black w-full md:w-1/2 rounded-r-2xl"
//             >
//               <div className="p-8 md:p-12">
//                 <h2 className="text-4xl font-bold mb-4">{item.title}</h2>
//                 <p>{item.text}</p>
//               </div>
//             </motion.div>
//           </motion.div>
//         ))}
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

interface ZigZagButton {
  text: string;
  link: string;
  active: boolean;
}

interface ZigZagContentItem {
  image: string;
  title: string;
  text: string;
  active: boolean;
  button?: ZigZagButton;
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
          "Home_Page",
          "zigzagContent"
        );

        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();

          const filtered = (data?.zigzagContent ?? []).filter(
            (item: ZigZagContentItem) => item.active === true
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

  if (!contentItems.length) return null;

  return (
    <section className="relative overflow-hidden py-16 md:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 space-y-28">

        {contentItems.map((item, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row items-center gap-12"
          >
            {/* IMAGE */}
            <motion.div
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              className="w-full md:w-1/2 flex justify-center"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-[450px] md:w-[520px] object-contain select-none pointer-events-none"
              />
            </motion.div>

            {/* TEXT */}
            <div className="w-full md:w-1/2 text-center">
              <h2 className="font-bold text-secondary mb-4">
                {item.title}
              </h2>
              {/* Decorative border */}
              <div className="flex justify-center mb-6">
                <img
                  src="/Images/heading_main.PNG"
                  alt="decor border"
                 className="w-full max-w-[90%] sm:max-w-[80%] md:max-w-[70%]"
                />
              </div>

              <p className="text-gray-800 mb-6">
                {item.text}
              </p>

              {/* ✅ FIREBASE CONTROLLED BUTTON */}
              {item.button?.active && (
                <a href={item.button.link}>
                  <button className="text-white font-semibold px-8 py-2 hover:opacity-90 transition">
                    {item.button.text}
                  </button>
                </a>
              )}
            </div>
          </div>
        ))}

      </div>
    </section>
  );
}
