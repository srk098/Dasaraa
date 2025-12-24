"use client";

import { useEffect } from "react";
import { db } from "@/lib/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export default function ThemeLoader() {
  useEffect(() => {
    const fetchTheme = async () => {
      const docRef = doc(
        db,
        "restaurants",
        "dasaraa",
        "theme",
        "globalStyles"
      );
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        const data = snap.data();
        const root = document.documentElement;

        if (data.isActive) {
          root.style.setProperty("--primary-color", data.primaryColor);
          root.style.setProperty("--secondary-color", data.secondaryColor);
          root.style.setProperty("--tertiary-color", data.tertiaryColor);
          root.style.setProperty("--heading-1", data.heading1);
          root.style.setProperty("--heading-2", data.heading2);
          root.style.setProperty("--heading-3", data.heading3);
          root.style.setProperty("--description-text", data.descriptionText);
          root.style.setProperty("--main-text", data.mainText);
        }
      }
    };

    fetchTheme();
  }, []);

  return null; // this component only modifies styles on load
}
