"use client";

import React, { useEffect, useState } from "react";
import { db } from "../../lib/firebaseConfig";
import { doc, getDoc, collection, addDoc, Timestamp } from "firebase/firestore";
import { motion } from "framer-motion";

const restaurantId = "dasaraa";

const ContactPage = () => {
  const [formFields, setFormFields] = useState<any>(null);
  const [timings, setTimings] = useState<any>(null);
  const [restaurantInfo, setRestaurantInfo] = useState<any>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    contactMethod: "",
    phoneNumber: "",
    email: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      const mainRef = doc(
        db,
        "restaurants",
        restaurantId,
        "Contact_Us",
        "contactPageContent"
      );

      const mainSnap = await getDoc(mainRef);

      if (mainSnap.exists()) {
        const data = mainSnap.data();
        setFormFields(data.formFields || {});
        setTimings(data.timings || {});
        setRestaurantInfo(data.restaurantInfo || {});
      }

      setLoading(false);
    };

    fetchContent();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const contactRef = collection(
        db,
        "restaurants",
        restaurantId,
        "Contact_Us"
      );
      await addDoc(contactRef, {
        ...formData,
        timestamp: Timestamp.now(),
      });

      setIsSubmitted(true);
      setFormData({
        fullName: "",
        contactMethod: "",
        phoneNumber: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  if (loading)
    return (
      <motion.div
        className="min-h-screen flex items-center justify-center bg-white text-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <p className="text-lg animate-pulse">Loading Contact Info...</p>
      </motion.div>
    );

  return (
    <motion.div
      className="min-h-screen text-black px-4 pt-40 pb-20 md:px-20 flex justify-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* MAIN GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 max-w-6xl w-full items-start">
        {/* LEFT – FORM */}
        <motion.div
          className="w-full flex flex-col items-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h2 className="font-bold text-secondary mb-4">Contact Us</h2>

          {/* Decorative border */}
          <div className="flex justify-center mb-6">
            <img
              src="/Images/heading_main.PNG"
              alt="decor border"
              className="w-full max-w-[95%] sm:max-w-[90%] md:max-w-[80%]"

            />
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6 w-full max-w-md"
          >
            {formFields?.fullName?.active && (
              <div>
                <label className="block mb-1 text-center">
                  {formFields.fullName.label} *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-transparent border border-gray-400 rounded-md"
                  required
                />
              </div>
            )}

            {formFields?.contactMethod?.active && (
              <div>
                <label className="block mb-1 text-center">
                  {formFields.contactMethod.label} *
                </label>
                <select
                  name="contactMethod"
                  value={formData.contactMethod}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-transparent border border-gray-400 rounded-md"
                  required
                >
                  <option value="">Select a contact method</option>
                  {formFields.contactMethod.options.map((opt: string) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {formFields?.phoneNumber?.active &&
              formData.contactMethod === "Phone" && (
                <div>
                  <label className="block mb-1 text-center">
                    {formFields.phoneNumber.label} *
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-transparent border border-gray-400 rounded-md"
                    required
                  />
                </div>
              )}

            {formFields?.email?.active &&
              formData.contactMethod === "Email" && (
                <div>
                  <label className="block mb-1 text-center">
                    {formFields.email.label} *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-transparent border border-gray-400 rounded-md"
                    required
                  />
                </div>
              )}

            {formFields?.message?.active && (
              <div>
                <label className="block mb-1 text-center">
                  {formFields.message.label} *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 bg-transparent border border-gray-400 rounded-md"
                  required
                />
              </div>
            )}

            <button
              type="submit"
              className="block mx-auto px-8 py-2 text-white font-semibold hover:opacity-90"
            >
              Submit
            </button>

            {isSubmitted && (
              <p className="text-green-500 font-semibold text-center pt-2">
                Thank you! Your message has been sent.
              </p>
            )}
          </form>
        </motion.div>

        {/* RIGHT – INFO */}
        <motion.div
          className="w-full flex flex-col items-center text-center space-y-10"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div>
            <h2 className="font-bold text-secondary mb-4">Opening Hours</h2>

            {/* Decorative border */}
            <div className="flex justify-center mb-6">
              <img
                src="/Images/heading_main.PNG"
                alt="decor border"
                className="w-full max-w-[95%] sm:max-w-[90%] md:max-w-[80%]"

              />
            </div>

            {timings?.tuesdayToThursday?.active && (
              <div className="space-y-2">
                <span className="font-semibold">
                  {timings.tuesdayToThursday.label}
                </span>
                {timings.tuesdayToThursday.slots.map(
                  (slot: string, idx: number) => (
                    <p key={idx}>{slot}</p>
                  )
                )}
              </div>
            )}

            {timings?.fridayToSunday?.active && (
              <div className="space-y-2 mt-4">
                <span className="font-semibold">
                  {timings.fridayToSunday.label}
                </span>
                {timings.fridayToSunday.slots.map(
                  (slot: string, idx: number) => (
                    <p key={idx}>{slot}</p>
                  )
                )}
              </div>
            )}
          </div>

          {restaurantInfo?.address?.active && (
            <div>
              <h3 className="font-semibold text-lg">Restaurant Address</h3>
              {restaurantInfo.address.lines.map(
                (line: string, idx: number) => (
                  <p key={idx}>{line}</p>
                )
              )}
            </div>
          )}

          {restaurantInfo?.franchise?.active && (
            <div>
              <h3 className="font-semibold text-lg">
                Enquire About Getting a Franchise
              </h3>
              <p>Tel. {restaurantInfo.franchise.phone}</p>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ContactPage;





// "use client";

// import React, { useEffect, useState } from "react";
// import { db } from "../../lib/firebaseConfig";
// import { doc, getDoc, collection, addDoc, Timestamp } from "firebase/firestore";
// import { motion } from "framer-motion";

// const restaurantId = "dasaraa";

// const ContactPage = () => {
//   const [formFields, setFormFields] = useState<any>(null);
//   const [timings, setTimings] = useState<any>(null);
//   const [restaurantInfo, setRestaurantInfo] = useState<any>(null);

//   const [formData, setFormData] = useState({
//     fullName: "",
//     contactMethod: "",
//     phoneNumber: "",
//     email: "",
//     message: "",
//   });

//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchContent = async () => {
//       const mainRef = doc(
//         db,
//         "restaurants",
//         restaurantId,
//         "Contact_Us",
//         "contactPageContent"
//       );
//       const mainSnap = await getDoc(mainRef);

//       if (mainSnap.exists()) {
//         const data = mainSnap.data();
//         setFormFields(data.formFields || {});
//         setTimings(data.timings || {});
//         setRestaurantInfo(data.restaurantInfo || {});
//       }
//       setLoading(false);
//     };

//     fetchContent();
//   }, []);

//   const handleChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
//     >
//   ) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     await addDoc(
//       collection(db, "restaurants", restaurantId, "Contact_Us"),
//       { ...formData, timestamp: Timestamp.now() }
//     );
//     setIsSubmitted(true);
//     setFormData({
//       fullName: "",
//       contactMethod: "",
//       phoneNumber: "",
//       email: "",
//       message: "",
//     });
//   };

//   if (loading)
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         Loading...
//       </div>
//     );

//   return (
//     <motion.div
//       className="min-h-screen px-4 pt-40 pb-20 md:px-20 flex justify-center"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//     >
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-20 max-w-6xl w-full items-start">
//         {/* LEFT – CONTACT FORM */}
//         <motion.div className="w-full flex justify-center">
//           <div className="w-full max-w-md flex flex-col items-center">
//             <h2 className="font-bold text-secondary mb-4">Contact Us</h2>

//             <img
//               src="/Images/heading_main.PNG"
//               className="max-w-[80%] mb-6"
//             />

//             <form className="space-y-6 w-full">
//               {formFields?.fullName?.active && (
//                 <input
//                   type="text"
//                   name="fullName"
//                   placeholder={formFields.fullName.label}
//                   value={formData.fullName}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 border rounded-md"
//                   required
//                 />
//               )}

//               {formFields?.contactMethod?.active && (
//                 <select
//                   name="contactMethod"
//                   value={formData.contactMethod}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 border rounded-md"
//                   required
//                 >
//                   <option value="">Select Contact Method</option>
//                   {formFields.contactMethod.options.map((opt: string) => (
//                     <option key={opt}>{opt}</option>
//                   ))}
//                 </select>
//               )}

//               {formData.contactMethod === "Phone" && (
//                 <input
//                   type="tel"
//                   name="phoneNumber"
//                   placeholder="Phone Number"
//                   value={formData.phoneNumber}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 border rounded-md"
//                 />
//               )}

//               {formData.contactMethod === "Email" && (
//                 <input
//                   type="email"
//                   name="email"
//                   placeholder="Email Address"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 border rounded-md"
//                 />
//               )}

//               {formFields?.message?.active && (
//                 <textarea
//                   name="message"
//                   placeholder={formFields.message.label}
//                   value={formData.message}
//                   onChange={handleChange}
//                   rows={4}
//                   className="w-full px-4 py-2 border rounded-md"
//                 />
//               )}

//               <button className="block mx-auto px-8 py-2 text-white font-semibold">
//                 Submit
//               </button>

//               {isSubmitted && (
//                 <p className="text-green-500 text-center">
//                   Message sent successfully
//                 </p>
//               )}
//             </form>
//           </div>
//         </motion.div>

//         {/* RIGHT – INFO SECTIONS */}
//         <motion.div className="w-full flex justify-center">
//           <div className="w-full max-w-md flex flex-col space-y-14 text-center">
//             {/* OPENING HOURS */}
//             <div>
//               <h2 className="font-bold text-secondary mb-4">Opening Hours</h2>
//               <img
//                 src="/Images/heading_main.PNG"
//                 className="max-w-[80%] mx-auto mb-6"
//               />

//               {timings?.tuesdayToThursday && (
//                 <div className="mb-4">
//                   <p className="font-semibold">
//                     {timings.tuesdayToThursday.label}
//                   </p>
//                   {timings.tuesdayToThursday.slots.map(
//                     (slot: string, i: number) => (
//                       <p key={i}>{slot}</p>
//                     )
//                   )}
//                 </div>
//               )}

//               {timings?.fridayToSunday && (
//                 <div>
//                   <p className="font-semibold">
//                     {timings.fridayToSunday.label}
//                   </p>
//                   {timings.fridayToSunday.slots.map(
//                     (slot: string, i: number) => (
//                       <p key={i}>{slot}</p>
//                     )
//                   )}
//                 </div>
//               )}
//             </div>

//             {/* ADDRESS */}
//             {restaurantInfo?.address?.active && (
//               <div>
//                 <h3 className="font-bold text-secondary mb-4">
//                   Restaurant Address
//                 </h3>
//                 <img
//                   src="/Images/heading_main.PNG"
//                   className="max-w-[60%] mx-auto mb-4"
//                 />
//                 {restaurantInfo.address.lines.map(
//                   (line: string, i: number) => (
//                     <p key={i}>{line}</p>
//                   )
//                 )}
//               </div>
//             )}

//             {/* FRANCHISE */}
//             {restaurantInfo?.franchise?.active && (
//               <div>
//                 <h3 className="font-bold text-secondary mb-4">
//                   Franchise Enquiry
//                 </h3>
//                 <img
//                   src="/Images/heading_main.PNG"
//                   className="max-w-[60%] mx-auto mb-4"
//                 />
//                 <p>Tel. {restaurantInfo.franchise.phone}</p>
//               </div>
//             )}
//           </div>
//         </motion.div>
//       </div>
//     </motion.div>
//   );
// };

// export default ContactPage;

