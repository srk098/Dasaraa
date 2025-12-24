"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { db } from "../../lib/firebaseConfig";
import { getDoc, doc } from "firebase/firestore";

interface SubMenuItem {
  name: string;
  href?: string;
  active?: boolean;
}

interface SubMenuSection {
  heading: string;
  image: string;
  items: SubMenuItem[];
  active?: boolean;
}

interface NavbarItem {
  id: string;
  name: string;
  href?: string;
  subMenu?: SubMenuSection[];
  active?: boolean;
}

interface OrderNowButton {
  label: string;
  href: string;
  active: boolean;
}

async function fetchNavbarData(restaurantId: string) {
  const navbarDocRef = doc(
    db,
    "restaurants",
    restaurantId,
    "navbar",
    "navbarData"
  );

  const docSnap = await getDoc(navbarDocRef);
  if (!docSnap.exists()) return { items: [] };

  const data = docSnap.data();
  return {
    items: (data.items as NavbarItem[]).filter((i) => i.active),
    orderNowButton: data.orderNow as OrderNowButton,
  };
}

export default function Header({ restaurantId }: { restaurantId: string }) {
  const [navbarItems, setNavbarItems] = useState<NavbarItem[]>([]);
  const [orderNowButton, setOrderNowButton] =
    useState<OrderNowButton | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    if (!restaurantId) return;
    fetchNavbarData(restaurantId).then(({ items, orderNowButton }) => {
      setNavbarItems(items || []);
      setOrderNowButton(orderNowButton || null);
    });
  }, [restaurantId]);

  return (
    <div className="fixed top-0 w-full z-50 bg-white shadow-lg">
      <div className=""></div>

      <header className="w-full rounded-xl">
        <div className="max-w-4xl mx-auto px-6 py-5 flex justify-between items-center relative">
          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="
    lg:hidden
    bg-transparent
    p-0
    m-0
    border-0
    shadow-none
    outline-none
    focus:outline-none
    active:bg-transparent
    flex
    flex-col
    justify-center
    gap-1.5
  "
          >
            {!mobileMenuOpen ? (
              <>
                <span className="block h-[2px] w-6 bg-secondary"></span>
                <span className="block h-[2px] w-6 bg-secondary"></span>
                <span className="block h-[2px] w-6 bg-secondary"></span>
              </>
            ) : (
              <X size={26} className="text-black" />
            )}
          </button>

          {/* LEFT NAV ITEMS */}
          <nav className="hidden lg:flex items-center gap-20">
            {navbarItems
              .slice(0, Math.floor(navbarItems.length / 2))
              .map((item) => {
                const activeSub =
                  item.subMenu?.filter(
                    (s) => s.active && s.items.some((i) => i.active)
                  ) || [];

                return (
                  <div
                    key={item.id}
                    className="relative"
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <Link
                      href={item.href || "#"}
                      className="text-black text-xl hover:text-secondary transition"
                    >
                      {item.name}
                    </Link>

                    {activeSub.length > 0 && hoveredItem === item.id && (
                      <div className="absolute top-full mt-3 bg-white shadow-lg p-4 rounded-md w-64">
                        {activeSub.map((section, i) => (
                          <div key={i} className="mb-3">
                            <Image
                              src={section.image}
                              alt=""
                              width={230}
                              height={18}
                              className="rounded mb-2"
                            />
                            <p className="font-semibold">{section.heading}</p>
                            {section.items
                              .filter((i) => i.active)
                              .map((sub, j) => (
                                <Link
                                  key={j}
                                  href={sub.href || "#"}
                                  className="block text-gray-600 hover:text-secondary text-sm py-1"
                                >
                                  {sub.name}
                                </Link>
                              ))}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
          </nav>

          {/* CENTER LOGO */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <Image
              src="/Images/Logo/Dasaraa Logo Final.png"
              alt="Logo"
              width={180}
              height={40}
              className="w-[120px] sm:w-[150px] md:w-[180px] h-auto"
              priority
            />
          </div>


          {/* RIGHT NAV ITEMS */}
          <nav className="hidden lg:flex items-center gap-20">
            {navbarItems
              .slice(Math.floor(navbarItems.length / 2))
              .map((item) => {
                const activeSub =
                  item.subMenu?.filter(
                    (s) => s.active && s.items.some((i) => i.active)
                  ) || [];

                return (
                  <div
                    key={item.id}
                    className="relative"
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <Link
                      href={item.href || "#"}
                      className="text-black text-xl hover:text-secondary transition"
                    >
                      {item.name}
                    </Link>

                    {activeSub.length > 0 && hoveredItem === item.id && (
                      <div className="absolute top-full mt-3 bg-white shadow-lg p-4 rounded-md w-64">
                        {activeSub.map((section, i) => (
                          <div key={i} className="mb-3">
                            <Image
                              src={section.image}
                              alt=""
                              width={230}
                              height={120}
                              className="rounded mb-2"
                            />
                            <p className="font-semibold">{section.heading}</p>
                            {section.items
                              .filter((i) => i.active)
                              .map((sub, j) => (
                                <Link
                                  key={j}
                                  href={sub.href || "#"}
                                  className="block text-gray-600 hover:text-secondary text-sm py-1"
                                >
                                  {sub.name}
                                </Link>
                              ))}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

            {orderNowButton?.active && (
              <button className="px-6 py-3 text-white hover:bg-primary-dark">
                <Link href={orderNowButton.href}>
                  {orderNowButton.label}
                </Link>
              </button>
            )}
          </nav>
        </div>


        {/* MOBILE MENU */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              {/* BACKDROP */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black z-40 md:hidden"
                onClick={() => setMobileMenuOpen(false)}
              />

              {/* MENU */}
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "tween", duration: 0.3 }}
                className="fixed top-0 left-0 w-2/3 h-full bg-white z-50 p-6 shadow-lg md:hidden"
              >
                {navbarItems.map((item) => (
                  <div key={item.id} className="py-3">
                    <Link
                      href={item.href || "#"}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-lg font-medium text-black"
                    >
                      {item.name}
                    </Link>
                  </div>
                ))}

                {orderNowButton?.active && (
                  <Link
                    href={orderNowButton.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="mt-5 block w-full py-4 text-lg text-center bg-primary text-white hover:bg-primary-dark"
                  >
                    {orderNowButton.label}
                  </Link>
                )}
              </motion.div>
            </>
          )}
        </AnimatePresence>

      </header>
    </div>
  );
}





// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Menu, X } from "lucide-react";
// import { db } from "../../lib/firebaseConfig";
// import { getDoc, doc } from "firebase/firestore";

// // Interfaces
// interface SubMenuItem {
//   name: string;
//   href?: string;
//   active?: boolean;
// }

// interface SubMenuSection {
//   heading: string;
//   image: string;
//   items: SubMenuItem[];
//   active?: boolean;
// }

// interface NavbarItem {
//   id: string;
//   name: string;
//   href?: string;
//   subMenu?: SubMenuSection[];
//   active?: boolean;
// }

// interface OrderNowButton {
//   label: string;
//   href: string;
//   active: boolean;
// }

// // Fetch Navbar Data
// async function fetchNavbarData(restaurantId: string) {
//   const navbarDocRef = doc(
//     db,
//     "restaurants",
//     restaurantId,
//     "navbar",
//     "navbarData",
//   );

//   const docSnap = await getDoc(navbarDocRef);
//   if (!docSnap.exists()) return { items: [] };

//   const data = docSnap.data();
//   return {
//     items: (data.items as NavbarItem[]).filter((i) => i.active),
//     orderNowButton: data.orderNow as OrderNowButton,
//   };
// }

// export default function Header({ restaurantId }: { restaurantId: string }) {
//   const [navbarItems, setNavbarItems] = useState<NavbarItem[]>([]);
//   const [orderNowButton, setOrderNowButton] =
//     useState<OrderNowButton | null>(null);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [hoveredItem, setHoveredItem] = useState<string | null>(null);

//   useEffect(() => {
//     if (!restaurantId) return;
//     fetchNavbarData(restaurantId).then(({ items, orderNowButton }) => {
//       setNavbarItems(items || []);
//       setOrderNowButton(orderNowButton || null);
//     });
//   }, [restaurantId]);

//   return (
//     <header className="fixed w-full z-50 top-0 left-0">
//       <div className="relative max-w-6xl mx-auto px-6 ">

//         {/* WHITE BAR WITH CURVE */}
//         <div className="bg-white shadow-lg rounded-b-[60px] py-5 px-6 flex justify-between items-center relative">

//           {/* Mobile Menu Button */}
//           <button
//             className="lg:hidden"
//             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//           >
//             {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
//           </button>

//           {/* LEFT NAV ITEMS */}
//           <nav className="hidden lg:flex items-center gap-10">
//             {navbarItems.slice(0, Math.floor(navbarItems.length / 2)).map((item) => {
//               const activeSub =
//                 item.subMenu?.filter((s) => s.active && s.items.some((i) => i.active)) || [];

//               return (
//                 <div
//                   key={item.id}
//                   className="relative"
//                   onMouseEnter={() => setHoveredItem(item.id)}
//                   onMouseLeave={() => setHoveredItem(null)}
//                 >
//                   <Link
//                     href={item.href || "#"}
//                     className="text-lg text-gray-700 hover:text-primary transition"
//                   >
//                     {item.name}
//                   </Link>

//                   {/* DESKTOP DROPDOWN */}
//                   {activeSub.length > 0 && hoveredItem === item.id && (
//                     <div className="absolute top-full mt-3 bg-white shadow-lg p-4 rounded-md w-64">
//                       {activeSub.map((section, i) => (
//                         <div key={i} className="mb-3">
//                           <Image
//                             src={section.image}
//                             alt=""
//                             width={230}
//                             height={120}
//                             className="rounded mb-2"
//                           />
//                           <p className="font-semibold">{section.heading}</p>
//                           {section.items
//                             .filter((i) => i.active)
//                             .map((sub, j) => (
//                               <Link
//                                 key={j}
//                                 href={sub.href || "#"}
//                                 className="block text-gray-600 hover:text-primary text-sm py-1"
//                               >
//                                 {sub.name}
//                               </Link>
//                             ))}
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               );
//             })}
//           </nav>

//           {/* RIGHT NAV ITEMS */}
//           <nav className="hidden lg:flex items-center gap-10">
//             {navbarItems.slice(Math.floor(navbarItems.length / 2)).map((item) => {
//               const activeSub =
//                 item.subMenu?.filter((s) => s.active && s.items.some((i) => i.active)) || [];

//               return (
//                 <div
//                   key={item.id}
//                   className="relative"
//                   onMouseEnter={() => setHoveredItem(item.id)}
//                   onMouseLeave={() => setHoveredItem(null)}
//                 >
//                   <Link
//                     href={item.href || "#"}
//                     className="text-lg text-gray-700 hover:text-primary transition"
//                   >
//                     {item.name}
//                   </Link>

//                   {activeSub.length > 0 && hoveredItem === item.id && (
//                     <div className="absolute top-full mt-3 bg-white shadow-lg p-4 rounded-md w-64">
//                       {activeSub.map((section, i) => (
//                         <div key={i} className="mb-3">
//                           <Image
//                             src={section.image}
//                             alt=""
//                             width={230}
//                             height={120}
//                             className="rounded mb-2"
//                           />
//                           <p className="font-semibold">{section.heading}</p>
//                           {section.items
//                             .filter((i) => i.active)
//                             .map((sub, j) => (
//                               <Link
//                                 key={j}
//                                 href={sub.href || "#"}
//                                 className="block text-gray-600 hover:text-primary text-sm py-1"
//                               >
//                                 {sub.name}
//                               </Link>
//                             ))}
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               );
//             })}
//           </nav>

//           {/* ORDER NOW BUTTON */}
//           {/* {orderNowButton?.active && (
//             <Button className="hidden lg:block px-6 py-5">
//               <Link href={orderNowButton.href}>{orderNowButton.label}</Link>
//             </Button>
//           )} */}
//         </div>

//         {/* CENTER LOGO OVER CURVED AREA IN DIAMOND SHAPE */}
//         <div className="absolute left-1/2 -translate-x-1/2 -bottom-10">
//           {/* <div className="w-34 h-34 bg-white rounded-full flex items-center justify-center top-10"> */}
//             {/* <div className="transform -rotate-45"> */}
//               <Image
//                 src="/Images/Logo/Dasaraa Logo Final.png"
//                 alt="Logo"
//                 width={150}
//                 height={65}
//               />
//             {/* </div> */}
//           {/* </div> */}
//         </div>
//       </div>

//       {/* MOBILE MENU DRAWER */}
//       <AnimatePresence>
//         {mobileMenuOpen && (
//           <motion.div
//             initial={{ x: "-100%" }}
//             animate={{ x: 0 }}
//             exit={{ x: "-100%" }}
//             className="fixed top-0 left-0 w-2/3 h-full bg-white z-50 p-6"
//           >
//             {navbarItems.map((item) => (
//               <div key={item.id} className="py-3 border-b">
//                 <Link
//                   href={item.href || "#"}
//                   onClick={() => setMobileMenuOpen(false)}
//                   className="text-lg font-medium text-gray-800"
//                 >
//                   {item.name}
//                 </Link>
//               </div>
//             ))}

//             {orderNowButton?.active && (
//               <Button className="mt-5 w-full py-4 text-lg">
//                 <Link href={orderNowButton.href}>{orderNowButton.label}</Link>
//               </Button>
//             )}
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </header>
//   );
// }








