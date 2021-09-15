import * as firebase from "firebase/app";
import { getStorage, ref } from "firebase/storage";
import "firebase/firestore";
import "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBy7sfXVA7kQlLEVda1uA-VUw5FQ8YyCEU",

  authDomain: "netflix-clone-953f5.firebaseapp.com",

  projectId: "netflix-clone-953f5",

  storageBucket: "netflix-clone-953f5.appspot.com",

  messagingSenderId: "343431870155",

  appId: "1:343431870155:web:07537c368a57d6e3b84d4e",

  measurementId: "G-5B89XLVGTB",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage(firebaseApp);

export default storage;
