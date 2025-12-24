"use client";

import { db } from "../../lib/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface ServiceData {
  id: string;
  title: string;
  description: string;
  icon: string;
}

interface ServicesDocument {
  main_title: string;
  subtitle: string;
  [key: string]: any;
}

const restaurantId = "dasaraa"; // ✅ use lowercase to match Firestore if needed

export default function ServicesPage() {
  const [services, setServices] = useState<ServiceData[]>([]);
  const [meta, setMeta] = useState({ main_title: "", subtitle: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(
          db,
          "restaurants",
          restaurantId,
          "Catering_Page",
          "services"
        );
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data() as ServicesDocument;

          const { main_title = "", subtitle = "", ...serviceFields } = data;

          const parsedServices = Object.entries(serviceFields)
            .filter(([_, value]) => value?.active) // Only active services
            .map(([id, value]) => ({
              id,
              ...(value as Omit<ServiceData, "id">),
            }));

          setMeta({ main_title, subtitle });
          setServices(parsedServices);
          console.log("Fetched data:", data);
        } else {
          console.warn("No such document found!");
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="pt-12 px-6 pb-20 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-bold mb-4">
          {meta.main_title || "Our Catering Services"}
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          {meta.subtitle ||
            "We offer top-quality catering services for every occasion."}
        </p>
      </motion.div>

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {services.length > 0 ? (
          services.map((service, index) => (
            <motion.div
              key={service.id}
              className="bg-white rounded-2xl shadow-lg p-6 text-center border hover:border-primary transition-all duration-300"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-5xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-sm text-gray-500">{service.description}</p>
            </motion.div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-400">
            No services available at the moment.
          </p>
        )}
      </div>
    </div>
  );
}
