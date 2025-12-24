"use client";

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../lib/firebaseConfig";

type StatItem = {
  label: string;
  value: number;
};

type StatsData = {
  active?: boolean;
  awards?: StatItem;
  happyCustomers?: StatItem;
  staffCount?: StatItem;
};

export default function Stats() {
  const [stats, setStats] = useState<StatsData | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      const docRef = doc(
        db,
        "restaurants",
        "dasaraa",
        "About_Page",
        "stats"
      );
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setStats(docSnap.data() as StatsData);
      }
    };

    fetchStats();
  }, []);

  if (!stats || stats.active === false) return null;

  return (
    <section className="py-20 px-4 md:px-12 bg-gray-900 text-white">
      <div className="max-w-5xl mx-auto grid md:grid-cols-3 text-center gap-10">
        {stats.awards && (
          <StatBlock label={stats.awards.label} value={stats.awards.value} />
        )}
        {stats.happyCustomers && (
          <StatBlock
            label={stats.happyCustomers.label}
            value={stats.happyCustomers.value}
          />
        )}
        {stats.staffCount && (
          <StatBlock
            label={stats.staffCount.label}
            value={stats.staffCount.value}
          />
        )}
      </div>
    </section>
  );
}

function StatBlock({ label, value }: { label: string; value: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;

    const increment = end / 60;
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.ceil(start));
      }
    }, 20);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <div>
      <h3 className="text-5xl font-bold mb-2">{count}</h3>
      <p className="text-xl text-gray-300">{label}</p>
    </div>
  );
}
