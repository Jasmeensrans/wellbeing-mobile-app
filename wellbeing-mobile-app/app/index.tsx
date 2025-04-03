import React, { useState, useEffect } from "react";
import { Redirect } from "expo-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {firebaseApp} from "@/database/firebase";

export default function Index() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null); // Initialize as null
  const auth = getAuth(firebaseApp);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user); // Set to true if user, false if null
    });

    return () => unsubscribe(); // Cleanup the listener
  }, [auth]);

  if (isLoggedIn === null) {
    return null; // Or a loading indicator
  }

  return <Redirect href={isLoggedIn ? "/(tabs)/home" : "/login"} />;
}