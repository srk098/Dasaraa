"use client";

import { Button } from "@/components/ui/button";
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
      collection(db, "restaurants", restaurantName, "Home_Page")
    );

    if (querySnapshot.empty) {
      console.warn("No documents found in 'Home_Page'");
      return [];
    }

    const data: HeroData[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as HeroData[];

    return data;
  } catch (error) {
    console.error("Error fetching hero section data:", error);
    return [];
  }
}

const HeroSection: React.FC = () => {
  const [heroData, setHeroData] = useState<HeroData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchDataFromFirebase();
      if (data.length > 0) {
        setHeroData(data[0]);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-black">
        Loading...
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen flex flex-col justify-center items-center text-center text-white overflow-hidden pt-2">
      {/* Background Video or Image */}
      {heroData?.backgroundVideo ? (
        <video
          className="absolute left-0 w-full h-full object-cover  "
          src={heroData.backgroundVideo}
          autoPlay
          loop
          muted
        />
      ) : heroData?.backgroundImage ? (
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center blur-m"
          style={{ backgroundImage: `url(${heroData.backgroundImage})` }}
        />
      ) : null}

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50" />

      {/* Hero Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center gap-4 px-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {heroData ? (
          <>
            {heroData.heroText?.active && (
              <h1 className="hero font-bold">{heroData.heroText.value}</h1>
            )}
            {heroData.description?.active && (
              <h4>{heroData.description.value}</h4>
            )}
            {heroData.button?.active && (
              <a href={heroData.button.link}>
                <button className=" text-white font-semibold px-8 py-2 rounded-full hover:opacity-90 transition">
                  {heroData.button.text}
                </button>
              </a>
            )}
          </>
        ) : (
          <p>No hero section data found.</p>
        )}
      </motion.div>

      {/* Social Icons */}
      {heroData?.socialLinks?.active && (
        <div className="absolute bottom-6 right-6 flex space-x-4 text-2xl">
          {heroData.socialLinks.facebook && (
            <a
              href={heroData.socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook className="hover:text-gray-300 transition" />
            </a>
          )}
          {heroData.socialLinks.twitter && (
            <a
              href={heroData.socialLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className="hover:text-gray-300 transition" />
            </a>
          )}
          {heroData.socialLinks.instagram && (
            <a
              href={heroData.socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="hover:text-gray-300 transition" />
            </a>
          )}
        </div>


      )}
 
    </div>


  );
};

export default HeroSection;
