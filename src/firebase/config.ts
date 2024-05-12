import {initializeApp} from 'firebase/app';

const {
  FB_API_KEY,
  FB_SENDER_ID,
  FB_APP_ID,
  FB_AUTH_DOMAIN,
  FB_PROJECT_ID,
  FB_STORAGE_BUCKET,
} = (import.meta as any).env;

const firebaseConfig = {
  apiKey: FB_API_KEY,
  authDomain: FB_AUTH_DOMAIN,
  projectId: FB_PROJECT_ID,
  storageBucket: FB_STORAGE_BUCKET,
  messagingSenderId: FB_SENDER_ID,
  appId: FB_APP_ID,
};

export default initializeApp(firebaseConfig);
