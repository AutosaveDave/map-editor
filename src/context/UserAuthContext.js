import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signOut
} from "firebase/auth";
import {addNewUser} from "../utils/mutations";
import {queryUserMaps} from "../utils/queries";
import app from "../firebase-config"

const userAuthContext = createContext();
const auth = getAuth(app);

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState(false);

  async function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  async function signUp(email, password) {
    await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
              addNewUser(userCredential.user);
              
            })
            .then((result) => {
              return result;
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              // ..
            });
  }
  function logOut() {
    return signOut(auth);
  }
  

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      setUser(currentuser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <userAuthContext.Provider
      value={{ user, auth, logIn, signUp, logOut }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}