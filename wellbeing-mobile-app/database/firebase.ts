import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import * as key from '../key.json';

const firebaseConfig = {
  apiKey: key.API_KEY,
  authDomain: key.PROJECT_ID + ".firebaseapp.com",
  databaseURL: `https://${key.PROJECT_ID}-default-rtdb.firebaseio.com`,
  projectId: key.PROJECT_ID,
  storageBucket: key.STORAGE_BUCKET,
  messagingSenderId: key.GCM_SENDER_ID, // Use GCM_SENDER_ID
  appId: key.GOOGLE_APP_ID, // Use GOOGLE_APP_ID
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);


export { firebaseApp, db };