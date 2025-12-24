"use client";

import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { db } from "../../lib/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import DineInMenuPage from "./DineInMenuPage";
import { useSearchParams } from "next/navigation";
// import other menu pages here when needed

interface MenuOption {
  id: string;
  label: string;
}

export default function MenuLandingPage() {
  const searchParams = useSearchParams();
  const [menuOptions, setMenuOptions] = useState<MenuOption[]>([]);
  const [selectedMenu, setSelectedMenu] = useState<string>("DineInMenuPage");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const restaurantName = "dasaraa"; // Replace with dynamic ID if needed
    const fetchMenuOptions = async () => {
      const snapshot = await getDocs(
        collection(db, "restaurants", restaurantName, "Menu_Page")
      );

      const options = snapshot.docs.map((doc) => ({
        id: doc.id,
        label: doc.data().label ?? doc.id, // fallback to id if label is missing
      }));

      setMenuOptions(options);

      // Auto-select first menu if available
      if (options.length > 0 && !selectedMenu) {
        setSelectedMenu(options[0].id);
      }
    };

    fetchMenuOptions();
  }, []);

  const renderSelectedMenuPage = () => {
    switch (selectedMenu) {
      case "DineInMenuPage":
        return <DineInMenuPage />;
      // case "BanquetHallMenuPage":
      //   return <BanquetHallMenuPage />;
      // Add other pages as needed
      default:
        return (
          <div className="text-center py-10 text-white/60">Menu not found.</div>
        );
    }
  };

  return (
    <div className="min-h-screen text-white">
      {/* Hero */}
      {/* <div
        className="relative h-[20vh] bg-cover bg-center flex items-center justify-center brightness-50"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1547573854-74d2a71d0826?q=80&w=2070")',
        }}
        role="img"
        aria-label="Indian restaurant ambiance and cuisine display"
      >
       
      </div> */}
         <div className="absolute inset-0  pt-20"></div>
      {/* Menu Options */}
      <div className="max-w-[1600px] mx-auto px-4 py-12 md:py-8">
        {/* Mobile Dropdown */}
        {/* <div className="md:hidden relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full px-6 py-3 border border-white/20 text-white/80 font-medium tracking-wide text-sm flex items-center justify-between rounded"
            aria-expanded={isOpen}
          >
            {menuOptions.find((opt) => opt.id === selectedMenu)?.label ||
              "Select Menu"}
            <ChevronDown
              className={`transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          {isOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 border border-gold/50 rounded z-50">
              {menuOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => {
                    setSelectedMenu(option.id);
                    setIsOpen(false);
                  }}
                  className={`w-full px-6 py-3 text-left tracking-wide text-sm ${
                    selectedMenu === option.id
                      ? "text-gold"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div> */}

        {/* Desktop Tabs */}
        {/* <div className="hidden md:grid  gap-x-32 gap-y-8  bg-white">
          {menuOptions.map((option) => (
            <div key={option.id} className="flex flex-col items-center gap-8">
              <button
                onClick={() => setSelectedMenu(option.id)}
                className={`w-full px-8 py-3 border font-medium tracking-wide text-center rounded transition-all duration-300 bg-white  ${
                  selectedMenu === option.id
                    ? "border-black text-black bg-white"
                    : "border-white/20 text-white/80 hover:border-white/40"
                }`}
              >
                {option.label}
              </button>
            </div>
          ))}
        </div>*/}
      </div>

      {/* Dynamic Content */}
      <div>{renderSelectedMenuPage()}</div>
    </div>
  );
}
