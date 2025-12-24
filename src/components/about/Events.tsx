"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";

type EventData = {
  title: string;
  date: string;
  description: string;
  image?: string;
  active?: boolean;
};

export default function Events({ restaurantId }: { restaurantId: string }) {
  const [events, setEvents] = useState<EventData[]>([]);
  const [sectionActive, setSectionActive] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const docRef = doc(
          db,
          "restaurants",
          restaurantId,
          "About_Page",
          "events"
        );
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          const eventList: EventData[] = data?.eventList || [];

          setSectionActive(data?.active !== false); // default to true if undefined

          const activeEvents = eventList.filter(
            (event) => event.active !== false
          );
          setEvents(activeEvents);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [restaurantId]);

  if (loading || !sectionActive) return null;

  return (
    <section className="py-12 px-4 md:px-12 bg-white">
      <h2 className="text-3xl font-bold text-center mb-10">Upcoming Events</h2>

      {events.length === 0 ? (
        <div className="flex justify-center items-center h-40 text-gray-500 text-lg text-center">
          No upcoming events at the moment. Check back soon!
        </div>
      ) : (
        <div
          className={`gap-6 max-w-6xl mx-auto ${
            events.length < 3
              ? "flex flex-wrap justify-center"
              : "grid md:grid-cols-3"
          }`}
        >
          {events.map((event, idx) => (
            <div
              key={idx}
              className="bg-gray-100 rounded-lg shadow hover:shadow-md transition overflow-hidden w-full md:w-[300px]"
            >
              {event.image && (
                <div className="w-full h-48 relative">
                  <Image
                    src={event.image}
                    alt={event.title}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                <p className="text-sm text-gray-500 mb-2">{event.date}</p>
                <p className="text-gray-700">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
