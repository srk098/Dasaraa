"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

type OrderNowData = {
  active: boolean;
  label?: string;
  link?: string;
};

export default function FloatingOrderNowButton() {
  const [orderData, setOrderData] = useState<OrderNowData | null>(null);

  useEffect(() => {
    const fetchOrderButton = async () => {
      try {
        const docRef = doc(
          db,
          "restaurants",
          "dasaraa",
          "Home_Page",
          "order-now"
        );

        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setOrderData(docSnap.data() as OrderNowData);
        }
      } catch (error) {
        console.error("Error fetching Order Now button data:", error);
      }
    };

    fetchOrderButton();
  }, []);

  if (!orderData?.active || !orderData.link) return null;

  return (
    <a
      href={orderData.link}
      target="_blank"
      rel="noopener noreferrer"
     className="fixed bottom-4 right-4 z-50"
    >
      <button
        className="text-white font-semibold
                   px-5 py-3 rounded-l-full
                   shadow-lg hover:opacity-90
                   transition-all duration-300"
      >
        {orderData.label ?? "Order Now"}
      </button>
    </a>
  );
}
