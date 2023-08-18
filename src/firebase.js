import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FB_APIKEY,
  authDomain: process.env.REACT_APP_FB_AUTHDOMAIN,
  projectId: process.env.REACT_APP_FB_PROJECTID,
  storageBucket: process.env.REACT_APP_FB_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FB_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FB_APPID,
  measurementId: process.env.REACT_APP_FB_MEASUREMENTID,
};
// console.log("APIKEY:" + process.env.REACT_APP_FB_APIKEY);
// console.log("base url:" + process.env.REACT_APP_BASE_URL);

// const firebaseConfig = {
//   apiKey: "AIzaSyCQNSPsXAaq9aH338FLV405a_j_DI1ZlcE",
//   authDomain: "new-moi-app.firebaseapp.com",
//   projectId: "new-moi-app",
//   storageBucket: "new-moi-app.appspot.com",
//   messagingSenderId: "789825138912",
//   appId: "1:789825138912:web:c92d771bb279683bafa085",
//   measurementId: "G-N3GMTEQT0E",
// };

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const storage = getStorage();
export const db = getFirestore();
export default app;
