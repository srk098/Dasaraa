// // app/catering/page.tsx

// import { db } from '@/firebase/firebase.config';
// import { collection, getDocs } from 'firebase/firestore';
// import Image from 'next/image';
// import { motion } from 'framer-motion';

// // Firestore restaurant ID
// const restaurantId = 'your_restaurant_id'; // Replace with actual ID or make dynamic

// // 🔹 Define data types
// interface HeroData {
//   id: string;
//   title: string;
//   subtitle: string;
//   backgroundImage: string;
// }

// interface ServiceData {
//   id: string;
//   title: string;
//   description: string;
//   icon: string;
// }

// interface PackageData {
//   id: string;
//   name: string;
//   price: number;
//   features: string[];
// }

// interface FaqData {
//   id: string;
//   question: string;
//   answer: string;
// }

// interface TestimonialData {
//   id: string;
//   name: string;
//   message: string;
//   rating: number;
// }

// interface CtaData {
//   id: string;
//   text: string;
//   buttonText: string;
//   link: string;
// }

// // 🔹 Generic Firestore fetcher
// const fetchCollection = async <T>(sub: string): Promise<(T & { id: string })[]> => {
//   const snapshot = await getDocs(collection(db, 'restaurants', restaurantId, sub));
//   return snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as T) }));
// };

// export default async function CateringPage() {
//   const [hero, services, packages, faqs, testimonials, cta] = await Promise.all([
//     fetchCollection<HeroData>('catering/hero'),
//     fetchCollection<ServiceData>('catering/services'),
//     fetchCollection<PackageData>('catering/packages'),
//     fetchCollection<FaqData>('catering/faqs'),
//     fetchCollection<TestimonialData>('catering/testimonials'),
//     fetchCollection<CtaData>('catering/cta'),
//   ]);

//   return (
//     <div className="pt-24 px-4">
//       {/* Hero */}
//       {hero[0] && (
//         <div className="text-center relative bg-gray-100 rounded-2xl p-10">
//           <Image
//             src={hero[0].backgroundImage}
//             alt="Catering Background"
//             fill
//             className="object-cover z-0 opacity-30 rounded-2xl"
//           />
//           <div className="relative z-10">
//             <h1 className="text-4xl font-bold">{hero[0].title}</h1>
//             <p className="mt-4 text-lg">{hero[0].subtitle}</p>
//           </div>
//         </div>
//       )}

//       {/* Services */}
//       <section className="mt-16 grid md:grid-cols-3 gap-8">
//         {services.map(service => (
//           <motion.div
//             key={service.id}
//             className="bg-white shadow-xl rounded-2xl p-6 text-center"
//             whileHover={{ scale: 1.05 }}
//           >
//             <div className="text-4xl mb-4">{service.icon}</div>
//             <h3 className="text-xl font-semibold">{service.title}</h3>
//             <p className="text-sm mt-2">{service.description}</p>
//           </motion.div>
//         ))}
//       </section>

//       {/* Packages */}
//       <section className="mt-20">
//         <h2 className="text-3xl font-bold text-center mb-10">Catering Packages</h2>
//         <div className="grid md:grid-cols-3 gap-6">
//           {packages.map(pkg => (
//             <div key={pkg.id} className="bg-white border p-6 rounded-xl shadow-md">
//               <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
//               <p className="text-lg text-primary font-semibold">${pkg.price}</p>
//               <ul className="list-disc list-inside mt-4 text-sm">
//                 {pkg.features.map((feat, i) => <li key={i}>{feat}</li>)}
//               </ul>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* FAQs */}
//       <section className="mt-20">
//         <h2 className="text-3xl font-bold text-center mb-10">FAQs</h2>
//         <div className="space-y-4 max-w-3xl mx-auto">
//           {faqs.map(faq => (
//             <details key={faq.id} className="bg-gray-100 p-4 rounded-md">
//               <summary className="cursor-pointer font-semibold">{faq.question}</summary>
//               <p className="mt-2 text-sm">{faq.answer}</p>
//             </details>
//           ))}
//         </div>
//       </section>

//       {/* Contact CTA */}
//       {cta[0] && (
//         <section className="mt-20 bg-primary text-white text-center py-12 rounded-xl">
//           <h2 className="text-2xl font-bold">{cta[0].text}</h2>
//           <a
//             href={cta[0].link}
//             className="inline-block mt-4 bg-white text-primary font-semibold py-2 px-6 rounded-full"
//           >
//             {cta[0].buttonText}
//           </a>
//         </section>
//       )}

//       {/* Testimonials */}
//       <section className="mt-20">
//         <h2 className="text-3xl font-bold text-center mb-10">What Our Customers Say</h2>
//         <div className="grid md:grid-cols-2 gap-6">
//           {testimonials.map(t => (
//             <div key={t.id} className="bg-white p-6 rounded-xl shadow">
//               <p className="italic">"{t.message}"</p>
//               <div className="mt-4 font-semibold">{t.name}</div>
//               <div className="text-yellow-400">{'⭐'.repeat(t.rating)}</div>
//             </div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// }
