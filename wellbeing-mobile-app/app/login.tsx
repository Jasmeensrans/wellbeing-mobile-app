import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import {firebaseApp} from "@/database/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import AuthenticationForm from "@/components/AuthenticatationForm";

export default function Login() {
  const [user, setUser] = useState<any | null>(null);
  const [isError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const auth = getAuth(firebaseApp);
  const router = useRouter();

  const onLogin = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setUser(user);
      })
      .catch((error) => {
        setError(true);
        setErrorMessage(
          error.message
            .replace("Firebase: Error (auth/", "")
            .replace(").", "")
            .replace(/-/g, " ")
        );
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <AuthenticationForm
        isLogin={true}
        onSubmit={onLogin}
        isError={isError}
        errorMessage={errorMessage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
});
