import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getDatabase } from "firebase/database"
import { getStorage} from "firebase/storage";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBI_H9or2i6p6Wrij22rKV-wc-ZtSR41xY",
    authDomain: "digest-531fc.firebaseapp.com",
    projectId: "digest-531fc",
    storageBucket: "digest-531fc.appspot.com",
    messagingSenderId: "893295712627",
    appId: "1:893295712627:web:acc6daaa937ba788ce4d06"
  };

  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);
  const firestore = getFirestore(app);
  const auth = getAuth();

  export {auth}
  export {firestore};
  export {database};
  export const storage = getStorage(app);
