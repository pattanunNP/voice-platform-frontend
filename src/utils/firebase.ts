// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyBS4Ly_Hq3eg4OuBDl2Pw91hEgjUGJlRsA",
	authDomain: "verbilovoice.firebaseapp.com",
	projectId: "verbilovoice",
	storageBucket: "verbilovoice.appspot.com",
	messagingSenderId: "1059915443947",
	appId: "1:1059915443947:web:e7a69a355756629a0d98ae",
	measurementId: "G-8XT7KP0W7S",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// const analytics = getAnalytics(app);

export { app, auth };
