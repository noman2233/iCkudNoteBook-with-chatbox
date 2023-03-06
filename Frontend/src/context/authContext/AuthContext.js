import { createContext, useEffect, useState } from "react";
import { auth } from "../../Firebase";
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
const [firebaseUser, setFirebaseUser] = useState({})
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
        setFirebaseUser(user);
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ firebaseUser }}>
      {children}
    </AuthContext.Provider>
  );
};