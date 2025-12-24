// app/menu/dine-in/page.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { downloadMenu } from "@/utils/downloadMenu";
import { db } from "../../lib/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

const DineInMenuPage = () => {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [menuImages, setMenuImages] = useState<string[]>([]);
  const [menuCategories, setMenuCategories] = useState<
    { name: string; imageNumber: number }[]
  >([]);

  const searchParams = useSearchParams();

  // Fetch Firestore Data
  useEffect(() => {
    const restaurantName = "dasaraa";

    const fetchData = async () => {
      const docRef = doc(
        db,
        "restaurants",
        restaurantName,
        "Menu_Page",
        "DineInMenuPage"
      );

      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setMenuImages(data.images || []);
        setMenuCategories(data.categories || []);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {/* Menu Images */}
      <div className="max-w-[1100px] mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {menuImages.map((url, index) => {
            const isLast = index === menuImages.length - 1;
            const isOddCount = menuImages.length % 2 !== 0;

            return (
              <div
                key={index}
                className={`
                  flex
                  ${index % 2 === 0 ? "md:justify-start" : "md:justify-end"}
                  ${isLast && isOddCount ? "md:col-span-2 md:justify-center" : ""}
                `}
              >
                <img
                  src={url}
                  alt={`Dine-in Menu Page ${index + 1}`}
                  className="w-full max-w-[500px] h-auto shadow-lg rounded-lg menu-image"
                  loading="lazy"
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default DineInMenuPage;
