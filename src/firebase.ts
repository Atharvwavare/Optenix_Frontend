import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDYVWf9j-LHbM4xVILykjQubFyKCQRROqk",
  authDomain: "optenix.firebaseapp.com",
  projectId: "optenix",
  storageBucket: "optenix.firebasestorage.app",
  messagingSenderId: "926161725225",
  appId: "1:926161725225:web:9e1257ac043a27b4c3f938"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
