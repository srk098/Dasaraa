"use client";

import { db } from "../../lib/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
  active: boolean;
}

const restaurantId = "dasaraa";

export default function FaqPage() {
  const [faqList, setFaqList] = useState<FAQItem[]>([]);

  useEffect(() => {
    const fetchFaq = async () => {
      try {
        const faqDocRef = doc(
          db,
          "restaurants",
          restaurantId,
          "Catering_Page",
          "faq"
        );
        const faqDocSnap = await getDoc(faqDocRef);

        if (faqDocSnap.exists()) {
          const data = faqDocSnap.data();
          const faqArray = Array.isArray(data.faq)
            ? data.faq.filter((item) => item.active)
            : [];
          setFaqList(faqArray);
        } else {
          console.warn("No FAQ document found.");
        }
      } catch (error) {
        console.error("Error fetching FAQ:", error);
      }
    };

    fetchFaq();
  }, []);

  return (
    <div className="pt-12 px-6 pb-20 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Everything you need to know about our catering services.
        </p>
      </motion.div>

      <div className="space-y-4">
        {faqList.length > 0 ? (
          faqList.map((faq, index) => (
            <FaqItem key={index} question={faq.question} answer={faq.answer} />
          ))
        ) : (
          <p className="text-center text-gray-400">
            No FAQs available right now.
          </p>
        )}
      </div>
    </div>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      layout
      className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center text-left"
      >
        <span className="font-medium text-gray-800">{question}</span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-5 h-5 text-gray-500" />
        </motion.div>
      </button>

      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden text-sm text-gray-600 mt-2"
      >
        {open && <p>{answer}</p>}
      </motion.div>
    </motion.div>
  );
}
