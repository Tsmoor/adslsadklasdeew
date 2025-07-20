import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, googleProvider, db } from "../firebase/config";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const ref = doc(db, "users", firebaseUser.uid);
        const snap = await getDoc(ref);
        if (!snap.exists()) {
          await setDoc(ref, {
            displayName: firebaseUser.displayName || "Guest",
            coins: 100,
            avatars: [],
            frames: [],
            vip: false,
            createdAt: serverTimestamp(),
          });
        }
        setUser({ ...firebaseUser, ...(snap.data() || {}) });
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  const loginGoogle = () => signInWithPopup(auth, googleProvider);
  const logout = () => signOut(auth);

  const value = { user, loginGoogle, logout };
  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}
