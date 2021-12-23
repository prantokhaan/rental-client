import { useState, useEffect } from "react";
import initializeFirebase from "../Pages/Login/Firebase/firebase.init";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  getIdToken,
} from "firebase/auth";

initializeFirebase();

const googleProvider = new GoogleAuthProvider();

const useFirebase = () => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState("");
  const [admin, setAdmin] = useState(false);

  const auth = getAuth();

  // Register User
  const registerUser = (email, password, name, phoneNumber, history) => {
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setAuthError("");
        const newUser = { email, displayName: name, phoneNumber: phoneNumber };
        setUser(newUser);
        // save user to database
        // saveUser(email, name, "POST");
        // send name to firebase
        updateProfile(auth.currentUser, {
          displayName: name,
          phoneNumber: phoneNumber,
        })
          .then(() => {})
          .catch((error) => {});
        history.replace("/");
      })
      .catch((error) => {
        setAuthError(error.message);
        // ..
      })
      .finally(() => setIsLoading(false));
  };

  // Signin User
  const loginUser = (email, password, location, history) => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        const destination = location?.state?.from || "/";
        history.replace(destination);
        // saveUser(email, password, "PUT");

        setAuthError("");
      })
      .catch((error) => {
        setAuthError(error.message);
      })
      .finally(() => setIsLoading(false));
  };

  // Sign In With Google
  const googleSignIn = (history, location) => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const destination = location?.state?.from || "/";
        history.replace(destination);
        setUser(result.user);
        // saveUser(result.user.email, result.user.displayName, "PUT");
      })
      .catch((error) => {
        setAuthError(error.message);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser({});
      }
      setIsLoading(false);
    });
    return () => unsubscribed;
  }, []);

//   useEffect(() => {
//     fetch(`https://calm-plateau-72250.herokuapp.com/users/${user.email}`)
//       .then((res) => res.json())
//       .then((data) => {
//         setAdmin(data.admin);
//       });
//   }, [user.email]);

  const logOut = () => {
    setIsLoading(true);
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      })
      .finally(() => setIsLoading(false));
  };

  // save user to database
//   const saveUser = (email, displayName, method) => {
//     const user = { email, displayName };
//     fetch("https://calm-plateau-72250.herokuapp.com/users", {
//       method: method,
//       headers: {
//         "content-type": "application/json",
//       },
//       body: JSON.stringify(user),
//     }).then();
//   };

  return {
    user,
    admin,
    authError,
    isLoading,
    registerUser,
    loginUser,
    logOut,
    googleSignIn,
  };
};

export default useFirebase;
