// import { getFirestore, doc, getDoc } from "firebase/firestore";
// import { app } from "../utils/firebaseConfig"; // your firebase initialization

// export async function getRestaurantMetadata(restaurantId: string) {
//   const db = getFirestore(app);
//   const docRef = doc(db, "restaurants", restaurantId);
//   const docSnap = await getDoc(docRef);

//   if (docSnap.exists()) {
//     const data = docSnap.data();
//     return {
//       title: data?.metaTitle || null,
//       description: data?.metaDescription || null,
//       faviconUrl: data?.faviconUrl || null,
//     };
//   } else {
//     return null;
//   }
// }
