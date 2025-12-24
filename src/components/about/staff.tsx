"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { db } from "@/lib/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

type Staff = {
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  active?: boolean;
};

type StaffSectionData = {
  active?: boolean;
  sectionTitle?: string;
  staffList?: Staff[];
};

export default function StaffSection({
  restaurantId,
}: {
  restaurantId: string;
}) {
  const [staffData, setStaffData] = useState<StaffSectionData | null>(null);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const docRef = doc(
          db,
          "restaurants",
          restaurantId,
          "About_Page",
          "staff"
        );
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data() as StaffSectionData;
          const filteredList =
            (data.staffList || []).filter((staff) => staff.active !== false) ||
            [];

          setStaffData({
            active: data.active,
            sectionTitle: data.sectionTitle || "Meet Our Team",
            staffList: filteredList,
          });
        }
      } catch (error) {
        console.error("Error fetching staff data:", error);
      }
    };

    fetchStaff();
  }, [restaurantId]);

  if (!staffData?.active) return null;

  return (
    <section className="py-12 px-4 md:px-12 bg-white">
      <h2 className="text-4xl font-bold text-center mb-16">
        {staffData.sectionTitle}
      </h2>
      <div className="space-y-20 max-w-6xl mx-auto">
        {staffData.staffList?.map((staff, idx) => {
          const isEven = idx % 2 === 0;

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              viewport={{ once: false, amount: 0.3 }}
              className={`flex flex-col md:flex-row items-center gap-10 ${
                !isEven ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="w-full md:w-1/2 flex justify-center">
                <Image
                  src={staff.imageUrl}
                  alt={staff.name}
                  width={250}
                  height={250}
                  className="w-64 h-64 object-cover rounded-full shadow-lg border-4 border-white"
                />
              </div>

              <div className="w-full md:w-1/2 text-center md:text-left">
                <h3 className="text-2xl font-semibold">{staff.name}</h3>
                <p className="text-gray-500 mb-2">{staff.role}</p>
                <p className="text-gray-700">{staff.bio}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
