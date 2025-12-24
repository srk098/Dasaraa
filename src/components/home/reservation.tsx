// "use client";

// import { motion } from "framer-motion";

// export default function ReservationSection() {
//   return (
//     <section className="relative py-24 overflow-hidden">
//       <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-10">

//         {/* LEFT TEXT BOX */}
//         <motion.div
//           initial={{ opacity: 0, x: 100 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           viewport={{ once: true, amount: 0.3 }}
//           transition={{ duration: 0.8, ease: "easeOut" }}
//           className="bg-[url('/Images/background-green.jpg')] bg-cover bg-center 
//                      text-center md:text-left py-16 px-10 rounded-lg w-full md:w-[68%]"
//         >
//           <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
//             Reservations
//           </h2>

//           <p className="text-lg md:text-xl text-white/90 leading-relaxed">
//             Reserve a spot for you and your loved ones, and take a trip
//             down memory lane, in the most indulgent ways possible.
//           </p>
//         </motion.div>

//         {/* RIGHT IMAGE – NODDING COW HEAD */}
//         <motion.img
//           src="/Images/utk-cow.png"
//           alt="Cow Mask"
//           className="w-[240px] md:w-[330px] lg:w-[380px]"
//           initial={{ opacity: 0, x: -80 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           viewport={{ once: true, amount: 0.3 }}
//           transition={{ duration: 0.8, ease: "easeOut" }}
//           animate={{
//             rotate: [0, -4, 0, 4, 0], // nodding motion
//           }}
//           transition={{
//             repeat: Infinity,
//             duration: 2.5,
//             ease: "easeInOut",
//           }}
//         />
//       </div>
//     </section>
//   );
// }

"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

interface ReservationContent {
  title: string;
  description: string;
  image: string;
  backgroundImage: string;
  active: boolean;
}

export default function ReservationSection() {
  const [content, setContent] = useState<ReservationContent | null>(null);

  useEffect(() => {
    async function fetchData() {
      const restaurantId = "dasaraa";

      const docRef = doc(
        db,
        "restaurants",
        restaurantId,
        "Home_Page",
        "reservation"
      );

      const snapshot = await getDoc(docRef);

      if (snapshot.exists()) {
        setContent(snapshot.data() as ReservationContent);
      }
    }

    fetchData();
  }, []);

  if (!content || content.active === false) return null;

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-10">

        {/* LEFT TEXT BOX */}
        <motion.div
          initial={{ opacity: 1, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="
            relative
            bg-cover
            bg-center
            text-center md:text-left
            py-16 px-10
            rounded-lg
           
            min-h-[320px]
          "
          style={{
            backgroundImage: `url(${content.backgroundImage})`,
          }}
        >
          {/* Optional overlay for better readability */}
          <div className="absolute inset-0 brounded-lg" />

          <div className="relative z-10">
             <h2 className="font-bold text-white mb-4">
              {content.title}
            </h2>

             <p className="text-white mb-6">
              {content.description}
            </p>
          </div>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.img
          src={content.image}
          alt="Mask"
          className="w-[330px] md:w-[450px] lg:w-[500px]"
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          animate={{ rotate: [0, -6, 0, 6, 0] }}
          transition={{
            rotate: {
              repeat: Infinity,
              repeatType: "reverse",
              duration: 2.8,
              ease: "easeInOut",
            },
          }}
        />
      </div>
    </section>
  );
}
