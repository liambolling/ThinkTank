import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, connectAuthEmulator } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';

const firebaseConfig = {
  apiKey: "AIzaSyAeX-m1XHqr9dUA1Hd_whgxZjhGm4M_CXI",
  authDomain: "thinktank-9c9a2.firebaseapp.com",
  projectId: "thinktank-9c9a2",
  storageBucket: "thinktank-9c9a2.appspot.com",
  messagingSenderId: "7719678350",
  appId: "1:7719678350:web:414aa960e4d68661b874df",
  measurementId: "G-QHWHT2SJXT"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const functions = getFunctions(app);
const AuthContext = createContext();

connectFunctionsEmulator(functions, 'localhost', 5002);
connectAuthEmulator(auth, "http://127.0.0.1:9099");
connectFirestoreEmulator(firestore, '127.0.0.1', 8080);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

export { auth };
