"use client";

import { motion } from "framer-motion";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { useEffect, useState } from "react";
import { db } from "../../lib/firebaseConfig";
import { getDocs, collection } from "firebase/firestore";

interface HeroData {
  id: string;
  heroText: {
    value: string;
    active: boolean;
  };
  description: {
    value: string;
    active: boolean;
  };
  button: {
    text: string;
    link: string;
    active: boolean;
  };
  socialLinks: {
    facebook: string;
    twitter: string;
    instagram: string;
    active: boolean;
  };
  backgroundImage?: string;
  backgroundVideo?: string;
}

async function fetchDataFromFirebase(): Promise<HeroData[]> {
  try {
    const restaurantName = "dasaraa";
    const querySnapshot = await getDocs(
      collection(db, "restaurants", restaurantName, "About_Page")
    );

    if (querySnapshot.empty) {
      console.warn("No documents found in 'About_Page'");
      return [];
    }

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<HeroData, "id">),
    }));
  } catch (error) {
    console.error("Error fetching About hero data:", error);
    return [];
  }
}

const AboutHero: React.FC = () => {
  const [heroData, setHeroData] = useState<HeroData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchDataFromFirebase();
      if (data.length > 0) setHeroData(data[0]);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen flex justify-center items-center text-white overflow-hidden">

      {/* Background */}
      {heroData?.backgroundVideo ? (
        <video
          className="absolute inset-0 w-full h-full object-cover blur-sm"
          src={heroData.backgroundVideo}
          autoPlay
          loop
          muted
          playsInline
        />
      ) : heroData?.backgroundImage ? (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroData.backgroundImage})` }}
        />
      ) : null}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content Wrapper */}
      <div className="relative z-10 px-6 md:px-12 flex flex-col items-center gap-6">

        {/* Glass Card */}
        <motion.div
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
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {heroData?.heroText?.active && (
            <h1 className="hero font-bold">
              {heroData.heroText.value}
            </h1>
          )}

          {heroData?.description?.active && (
            <p className="text-lg max-w-2xl">
              {heroData.description.value}
            </p>
          )}
        </motion.div>

        {/* Button OUTSIDE Glass Card */}
        {heroData?.button?.active && (
          <motion.a
            href={heroData.button.link}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <button className="text-white font-semibold px-10 py-3">
              {heroData.button.text}
            </button>
          </motion.a>
        )}
      </div>

      {/* Social Links */}
      {heroData?.socialLinks?.active && (
        <div className="absolute bottom-6 right-6 flex space-x-4 text-2xl z-10">
          {heroData.socialLinks.facebook && (
            <a href={heroData.socialLinks.facebook} target="_blank" rel="noopener noreferrer">
              <FaFacebook className="hover:text-gray-300 transition" />
            </a>
          )}
          {heroData.socialLinks.twitter && (
            <a href={heroData.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
              <FaTwitter className="hover:text-gray-300 transition" />
            </a>
          )}
          {heroData.socialLinks.instagram && (
            <a href={heroData.socialLinks.instagram} target="_blank" rel="noopener noreferrer">
              <FaInstagram className="hover:text-gray-300 transition" />
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default AboutHero;







// "use client";

// import { useState, useEffect } from "react";
// import { ChevronDown } from "lucide-react";
// import { db } from "../../lib/firebaseConfig";
// import { collection, getDocs } from "firebase/firestore";
// import { useSearchParams } from "next/navigation";
// // import other menu pages here when needed

// interface MenuOption {
//   id: string;
//   label: string;
// }

// export default function MenuLandingPage() {
//   const searchParams = useSearchParams();
//   const [menuOptions, setMenuOptions] = useState<MenuOption[]>([]);
//   const [selectedMenu, setSelectedMenu] = useState<string>("DineInMenuPage");
//   const [isOpen, setIsOpen] = useState(false);

//   useEffect(() => {
//     const restaurantName = "dasaraa"; // Replace with dynamic ID if needed
//     const fetchMenuOptions = async () => {
//       const snapshot = await getDocs(
//         collection(db, "restaurants", restaurantName, "Menu_Page")
//       );

//       const options = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         label: doc.data().label || doc.id, // fallback to id if label is missing
//       }));

//       setMenuOptions(options);

//       // Auto-select first menu if available
//       if (options.length > 0 && !selectedMenu) {
//         setSelectedMenu(options[0].id);
//       }
//     };

//     fetchMenuOptions();
//   }, []);

//   return (
//     <div>
//       {/* Hero */}
//       <div
//         className="relative h-[20vh] bg-cover bg-center flex items-center justify-center brightness-50"
//         style={{
//           backgroundImage:
//             'url("https://images.unsplash.com/photo-1547573854-74d2a71d0826?q=80&w=2070")',
//         }}
//         role="img"
//         aria-label="Indian restaurant ambiance and cuisine display"
//       >
//         <div className="absolute inset-0  pt-20"></div>
//       </div>

//       {/* Menu Options */}
//       <div className="max-w-[1600px] mx-auto px-4 py-12 md:py-8"></div>
//     </div>
//   );
// }
