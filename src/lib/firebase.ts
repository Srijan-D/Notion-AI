// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage } from "firebase/storage";
import { ref, uploadBytes } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "notionai-6f98c.firebaseapp.com",
  projectId: "notionai-6f98c",
  storageBucket: "notionai-6f98c.appspot.com",
  messagingSenderId: "42553340975",
  appId: "1:42553340975:web:226af2bd7d4292b47e42da",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);

export async function uploadFirebase(image_url: string, name: string) {
  try {
    const response = await fetch(image_url); //temporary image url
    const buffer = await response.arrayBuffer();
    const file_name = name.replace(" ", "") + Date.now() + ".jpeg";
    const storageRef = ref(storage, file_name);
    await uploadBytes(storageRef, buffer, {
      contentType: "image/jpeg",
    });
    const firebase_url = await getDownloadURL(storageRef);
    return firebase_url;
  } catch (error) {
    console.log(error);
  }
}
