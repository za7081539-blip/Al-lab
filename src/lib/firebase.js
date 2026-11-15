
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
   apiKey: "AIzaSyDUEJMCKtW4CnQKHyj0A7SRdyLX0ocjsC0",
  authDomain: "fir-auth-rtk-main.firebaseapp.com",
  projectId: "fir-auth-rtk-main",
  storageBucket: "fir-auth-rtk-main.firebasestorage.app",
  messagingSenderId: "499347040026",
  appId: "1:499347040026:web:3e466abc38d72a9d5e6ea3",
};

const app = getApps().length
  ? getApp()
  : initializeApp(firebaseConfig);

export const auth = getAuth(app);
