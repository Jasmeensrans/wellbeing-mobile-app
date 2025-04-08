import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { firebaseApp } from "@/database/firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  deleteUser,
} from "firebase/auth";
import AuthenticationForm from "@/components/AuthenticatationForm";
import { addUser } from "@/database/firestoreDatabase";

export default function Login() {
  const [user, setUser] = useState<any | null>(null);
  const [isError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const auth = getAuth(firebaseApp);
  const router = useRouter();

  const onSignup = (email: string, password: string, name: string) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential: any) => {
        const user = userCredential.user;
        // add the user to our database
        try {
          await addUser(user.uid, { name }); // Use user.uid as userId
          console.log("User added to Firestore successfully.");
          // navigate to dashboard page
          router.push("/(tabs)/home");
        } catch (firestoreError) {
          console.error("Error adding user to Firestore:", firestoreError);
          setErrorMessage("Error creating user account, please try again");
          setError(true);
          // delete user
          // Delete the Firebase Authentication user if Firestore add fails
          try {
            await deleteUser(user);
            console.log(
              "Firebase Authentication user deleted due to Firestore error."
            );
          } catch (deleteError) {
            setErrorMessage(
              "Error creating user account, please try again, and contact support"
            );
          }
        }
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
        isLogin={false}
        onSubmit={onSignup}
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
