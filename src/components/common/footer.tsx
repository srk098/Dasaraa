// "use client";

// import Image from "next/image";
// import { useEffect, useState } from "react";
// import { db } from "@/lib/firebaseConfig";
// import { doc, getDoc } from "firebase/firestore";
// import {
//   FaFacebook,
//   FaTwitter,
//   FaInstagram,
//   FaPhone,
//   FaMapMarkerAlt,
// } from "react-icons/fa";

// interface FooterData {
//   logo?: string;
//   tagline?: string;
//   contact?: {
//     phone?: string;
//     email?: string;
//   };
//   openingHours?: {
//     title?: string;
//     weekdays?: string[];
//     weekends?: string[];
//   };
//   socialLinks?: {
//     facebook?: string;
//     twitter?: string;
//     instagram?: string;
//     active?: boolean;
//   };
//   addressLabel?: string;
//   address?: {
//     streetAdd?: string;
//     cityZip?: string;
//   };
//   copyright?: string;
//   poweredBy?: string;
//   poweredByLink?: string; // <--- added
// }

// export default function Footer({ restaurantId }: { restaurantId: string }) {
//   const [data, setData] = useState<FooterData | null>(null);

//   useEffect(() => {
//     async function fetchFooter() {
//       try {
//         const docRef = doc(
//           db,
//           "restaurants",
//           restaurantId,
//           "footer",
//           "footerData2"
//         );
//         const snap = await getDoc(docRef);
//         if (snap.exists()) {
//           setData(snap.data() as FooterData);
//         }
//       } catch (err) {
//         console.error("Error fetching footer data:", err);
//       }
//     }
//     fetchFooter();
//   }, [restaurantId]);

//   if (!data) return null;

//   return (
//     <footer className="bg-[#ebebec] text-black px-6 pt-12 text-center md:text-left"
//     //  style={{ backgroundImage: "url('/Images/background-green.jpg')" }}
//     >
//       {/* Top Section */}
//       <div className="max-w-8xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 pb-12 border-b border-gray-500 md:place-items-center">

//         {/* Logo and Tagline */}
//         <div className="flex flex-col items-center">
//           {data.logo && (
//             <Image
//               src={data.logo}
//               alt="Logo"
//               width={160}
//               height={50}
//               className="mb-3"
//             />
//           )}
//           {data.tagline && <p>{data.tagline}</p>}
//         </div>

//         {/* Opening Hours */}
//         <div className="flex flex-col items-center md:items-start text-center md:text-left ">
//           <h4 className="text-lg font-semibold mb-3">
//             {data.openingHours?.title ?? "OPENING HOURS"}
//           </h4>

//           <div className="space-y-1 text-gray-700">
//             {data.openingHours?.weekdays?.map((line, i) => (
//               <p className="text-lg" key={i}>
//                 {line}
//               </p>
//             ))}
//             {data.openingHours?.weekends?.map((line, i) => (
//               <p className="text-lg" key={i}>
//                 {line}
//               </p>
//             ))}
//           </div>
//         </div>

//         {/* Address and Phone */}
//         <div className="flex flex-col items-center md:items-start text-center md:text-left ">
//           <h3 className="text-lg mb-3">{data.addressLabel || "ADDRESS"}</h3>

//           {data.address?.streetAdd && (
//             <div className="flex items-center justify-center md:justify-start gap-2 text-lg">
//               <FaMapMarkerAlt className="text-gray-700" />
//               <p className="text-lg">{data.address.streetAdd}</p>
//             </div>
//           )}

//           {data.address?.cityZip && (
//             <div className="flex items-center justify-center md:justify-start gap-2 text-lg">
//               <FaMapMarkerAlt className="invisible" />
//               <p className="text-lg">{data.address.cityZip}</p>
//             </div>
//           )}

//           {data.contact?.phone && (
//             <div className="flex items-center justify-center md:justify-start gap-2 text-lg">
//               <FaPhone className="text-gray-700 rotate-90" />
//               <p className="text-lg">{data.contact.phone}</p>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Bottom Section */}
//       <div className="max-w-8xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 py-6 border-b border-gray-500 md:place-items-center">

//         {/* Social Icons */}
//         {(data.socialLinks?.facebook ||
//           data.socialLinks?.twitter ||
//           data.socialLinks?.instagram) && (
//           <div className="flex justify-center gap-6 text-2xl text-gray-700">
//             {data.socialLinks.facebook && (
//               <a
//                 href={data.socialLinks.facebook}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 aria-label="Facebook"
//               >
//                 <FaFacebook className="hover:text-yellow-600 transition" />
//               </a>
//             )}

//             {data.socialLinks.twitter && (
//               <a
//                 href={data.socialLinks.twitter}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 aria-label="Twitter"
//               >
//                 <FaTwitter className="hover:text-yellow-600 transition" />
//               </a>
//             )}

//             {data.socialLinks.instagram && (
//               <a
//                 href={data.socialLinks.instagram}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 aria-label="Instagram"
//               >
//                 <FaInstagram className="hover:text-yellow-600 transition" />
//               </a>
//             )}
//           </div>
//         )}

//         {/* Copyright */}
//         <div className="text-lg text-gray-600 text-center">
//           <p className="text-lg">
//             © {new Date().getFullYear()} {data.copyright || "Your Brand"}, ALL
//             RIGHTS RESERVED
//           </p>
//         </div>

//         {/* Powered By (Clickable, No Underline, Smaller) */}
//         {data.poweredBy && (
//           <p className="text-center text-lg">
//             Powered by{" "}
//             <a
//               href={data.poweredByLink ?? "#"}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-2xl text-orange-600 font-bold no-underline hover:no-underline"
//             >
//               {data.poweredBy}
//             </a>
//           </p>
//         )}
//       </div>
//     </footer>
//   );
// }



"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";

interface FooterData {
  logo?: string;
  tagline?: string;
  contact?: {
    phone?: string;
    email?: string;
  };
  openingHours?: {
    title?: string;
    weekdays?: string[];
    weekends?: string[];
  };
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
  };
  addressLabel?: string;
  address?: {
    streetAdd?: string;
    cityZip?: string;
  };
  copyright?: string;
  poweredBy?: string;
  poweredByLink?: string;
}

export default function Footer({ restaurantId }: { restaurantId: string }) {
  const [data, setData] = useState<FooterData | null>(null);

  useEffect(() => {
    async function fetchFooter() {
      try {
        const docRef = doc(
          db,
          "restaurants",
          restaurantId,
          "footer",
          "footerData2"
        );
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          setData(snap.data() as FooterData);
        }
      } catch (err) {
        console.error("Error fetching footer data:", err);
      }
    }
    fetchFooter();
  }, [restaurantId]);

  if (!data) return null;

  return (
    <footer
      className="relative bg-cover bg-center text-white"
      style={{
        backgroundImage: "url('/Images/background-green.png')",
      }}
    >
      <div className="relative px-6 pt-16">

        {/* ───────── TOP SECTION ───────── */}
        <div
          className="
    max-w-7xl mx-auto
    grid grid-cols-1 md:grid-cols-3
    text-center
    divide-y md:divide-y-0 md:divide-x divide-white
  "
        >
          {/* CONTACT */}
          <div className="flex flex-col items-center justify-start px-6 py-8 md:py-0">
            <p className="font-semibold tracking-widest mb-6">
              CONTACT US
            </p>

            <div className="space-y-2">
              {data.contact?.phone && (
                <p className="text-white font-semibold">
                  Tel. {data.contact.phone}
                </p>
              )}
              {data.contact?.email && (
                <p className="text-white font-semibold">
                  Mail. {data.contact.email}
                </p>
              )}
            </div>
          </div>

          {/* OPENING HOURS */}
          <div className="flex flex-col items-center justify-start px-6 py-8 md:py-0">
            <p className="font-semibold tracking-widest mb-6">
              {data.openingHours?.title ?? "OPENING HOURS"}
            </p>

            <div className="space-y-2 text-white font-semibold text-center">
              {data.openingHours?.weekdays?.map((line, i) => (
                <p key={i} className="text-white font-semibold">{line}</p>
              ))}
              {data.openingHours?.weekends?.map((line, i) => (
                <p key={i} className="text-white font-semibold">{line}</p>
              ))}
            </div>
          </div>

          {/* ADDRESS */}
          <div className="flex flex-col items-center justify-start px-6 py-8 md:py-0">
            <p className="font-semibold tracking-widest mb-6">
              {data.addressLabel || "ADDRESS"}
            </p>

            <div className="space-y-2">
              {data.address?.streetAdd && (
                <p className="text-white font-semibold">
                  {data.address.streetAdd}
                </p>
              )}
              {data.address?.cityZip && (
                <p className="text-white font-semibold">
                  {data.address.cityZip}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* ───────── BRAND ───────── */}
        <div className="flex flex-col items-center py-8">
          {data.logo && (
            <Image
              src={data.logo}
              alt="Logo"
              width={180}
              height={60}
              className="mb-3"
            />
          )}
          {data.tagline && (
            <p className="text-xs tracking-widest text-white text-center">
              {data.tagline}
            </p>
          )}
        </div>

        <div className="border-t border-white max-w-6xl mx-auto" />

        {/* ───────── BOTTOM SECTION ───────── */}
        <div className="max-w-7xl mx-auto pt-5 pb-3 flex flex-col items-center">

          {/* SOCIAL MEDIA ICONS */}
          <div className="flex items-center justify-center gap-8 text-2xl mb-3">
            {data.socialLinks?.facebook && (
              <a
                href={data.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-secondary transition"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>
            )}

            {data.socialLinks?.instagram && (
              <a
                href={data.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-secondary transition"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
            )}

            {data.socialLinks?.twitter && (
              <a
                href={data.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-secondary transition"
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>
            )}
          </div>

          {/* COPYRIGHT */}
          <a className=" text-white text-center font- semibold">
            © {new Date().getFullYear()}{" "}
            {data.copyright || "Your Brand"}, ALL RIGHTS RESERVED
          </a>

          {/* POWERED BY */}
          {data.poweredBy && (
            <a
              href={data.poweredByLink ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-[2px] flex items-center gap-1 text-white hover:opacity-80"
            >
              <span>Powered by</span>
              <Image
                src={data.poweredBy}
                alt="Powered by"
                width={67}
                height={10}
                className="object-contain mb-2"
              />
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
