// "use client";

// import Image from "next/image";
// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { db } from "@/lib/firebaseConfig";
// import { doc, getDoc } from "firebase/firestore";

// // Swiper imports
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

// type GalleryImage = {
//   src: string;
//   alt: string;
// };

// export default function ImageGallery() {
//   const [images, setImages] = useState<GalleryImage[]>([]);
//   const [isActive, setIsActive] = useState<boolean>(false);
//   const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

//   useEffect(() => {
//     const fetchImages = async () => {
//       const restaurantId = "dasaraa";

//       try {
//         const docRef = doc(
//           db,
//           "restaurants",
//           restaurantId,
//           "Home_Page",
//           "image-gallery"
//         );

//         const docSnap = await getDoc(docRef);

//         if (docSnap.exists()) {
//           const data = docSnap.data();
//           setImages(data.images || []);
//           setIsActive(data.active ?? true);
//         } else {
//           console.warn("No gallery document found");
//         }
//       } catch (error) {
//         console.error("Error fetching gallery images:", error);
//       }
//     };

//     fetchImages();
//   }, []);

//   if (!isActive) return null;

//   return (
//     <section className="overflow-hidden py-24">
//       <div className="max-w-5xl mx-auto px-6 text-center">
//         {/* Decorative squiggly line */}
//         {/* <div className="text-[#b55227] text-6xl mb-6">
//           ~•~•~•~•~•~•~•~•~•~•~
//         </div> */}
//       </div>

//       <div className="max-w-screen-xl 2xl:max-w-screen-3xl px-8 md:px-12 mx-auto ">
//         <div className="text-center mb-8">
//           <h1 className="text-4xl md:text-5xl font-bold text-[#b55227] mb-4">Our Image Gallery</h1>

//             {/* Decorative border */}
//             <div className="flex justify-center mb-6">
//               <img
//                 src="/Images/heading-main-design.svg"
//                 alt="decor border"
//                 className="w-100 opacity-85 py-4"
//               />
//             </div>
//           {/* <p className="mt-3">
//             Explore our collection of stunning images that capture our journey
//             and creativity.
//           </p> */}
//         </div>

//         {/* Desktop Grid */}
//         <div className="hidden lg:grid grid-cols-1 md:grid-cols-4 lg:grid-cols-3 gap-4 overflow-hidden p-1">
//           {images.map((img, index) => (
//             <motion.div
//               key={index}
//               initial={{ scale: 1 }}
//               whileHover={{ scale: 1.08 }}
//               animate={{
//                 opacity:
//                   hoveredIndex === null || hoveredIndex === index ? 1 : 0.5,
//                 scale: hoveredIndex === index ? 1.08 : 1,
//               }}
//               transition={{ duration: 0.3, ease: "easeInOut" }}
//               onMouseEnter={() => setHoveredIndex(index)}
//               onMouseLeave={() => setHoveredIndex(null)}
//               className="relative rounded-xl overflow-hidden shadow-lg cursor-pointer w-full h-64"
//             >
//               <Image
//                 src={img.src}
//                 alt={img.alt}
//                 fill
//                 className="rounded-xl object-cover"
//               />
//             </motion.div>
//           ))}
//         </div>

//         {/* Mobile Slider */}
//         <div className="lg:hidden">
//           <Swiper
//             modules={[Navigation, Pagination]}
//             spaceBetween={10}
//             slidesPerView={1}
//             loop={true}
//             navigation
//             pagination={{ clickable: true }}
//             className="mySwiper"
//           >
//             {images.map((img, index) => (
//               <SwiperSlide key={index}>
//                 <div className="relative w-full h-64">
//                   <Image
//                     src={img.src}
//                     alt={img.alt}
//                     fill
//                     className="rounded-xl object-cover"
//                   />
//                 </div>
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         </div>
//       </div>
//     </section>
//   );
// }





"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { db } from "@/lib/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type GalleryImage = {
  src: string;
  alt: string;
};

type GallerySection = {
  active: boolean;
  images: GalleryImage[];
};

type GalleryData = {
  active: boolean;
  food?: GallerySection;
  ambience?: GallerySection;
};

export default function ImageGallery() {
  const [galleryData, setGalleryData] = useState<GalleryData | null>(null);
  const [activeTab, setActiveTab] = useState<"food" | "ambience" | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      const restaurantId = "dasaraa";

      try {
        const docRef = doc(
          db,
          "restaurants",
          restaurantId,
          "Home_Page",
          "image-gallery"
        );

        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data() as GalleryData;
          setGalleryData(data);

          // Auto-select first active tab
          if (data.food?.active) setActiveTab("food");
          else if (data.ambience?.active) setActiveTab("ambience");
        }
      } catch (error) {
        console.error("Error fetching gallery images:", error);
      }
    };

    fetchImages();
  }, []);

  if (!galleryData?.active || !activeTab) return null;

  const currentSection = galleryData[activeTab];
  if (!currentSection?.active) return null;

  const images = currentSection.images || [];

  return (
    <section className="overflow-hidden py-24">
      <div className="max-w-screen-xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="font-bold text-secondary mb-4">
            Our Image Gallery
          </h2>

          {/* Decorative border */}
          <div className="flex justify-center mb-6">
            <img
              src="/Images/heading_main.PNG"
              alt="decor border"
            className="w-full max-w-[90%] sm:max-w-[70%] md:max-w-[33%]"

            />
          </div>

          {/* Buttons (only show active ones) */}
          <div className="flex justify-center gap-4 mt-4">
            {galleryData.food?.active && (
              <button
                onClick={() => setActiveTab("food")}
                className={`px-6 py-2 font-semibold transition-all
                  ${activeTab === "food"
                    ? " text-white shadow-md border border-white/40"
                    : " border border-secondary hover:bg-white/10 transition text-black bg-white"
                  }`}
              >
                Food
              </button>
            )}

            {galleryData.ambience?.active && (
              <button
                onClick={() => setActiveTab("ambience")}
                className={`px-6 py-2 font-semibold transition-all
                  ${activeTab === "ambience"
                    ? "text-white shadow-md border border-white/40"
                    : "border border-secondary hover:bg-white/10 transition text-black bg-white"
                  }`}
              >
                Ambience
              </button>
            )}
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden lg:grid grid-cols-3 gap-4 p-1">
          {images.map((img, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.08 }}
              animate={{
                opacity:
                  hoveredIndex === null || hoveredIndex === index ? 1 : 0.5,
              }}
              transition={{ duration: 0.3 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative rounded-xl overflow-hidden shadow-lg w-full h-64"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover rounded-xl"
              />
            </motion.div>
          ))}
        </div>

        {/* Mobile Slider */}
        <div className="lg:hidden mt-6">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={12}
            slidesPerView={1}
            loop
            navigation
            pagination={{ clickable: true }}
          >
            {images.map((img, index) => (
              <SwiperSlide key={index}>
                <div className="relative w-full max-w-[100%] h-64">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover rounded-xl w-full max-w-[100%]"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
