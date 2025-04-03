import React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';
import { getAuth, signOut } from "firebase/auth";
import {firebaseApp} from '@/database/firebase';

export default function ViewEntries() {
  const router = useRouter();
  const auth = getAuth(firebaseApp);

  const handleSignOut = () => { // Renamed for clarity
    signOut(auth)
      .then(() => {
        router.push('/login'); // Use push for navigation
      })
      .catch((error) => {
        console.error("Sign out error:", error);
        // Handle error (e.g., show an alert)
      });
  };

  return (
    <View style={styles.container}>
      <Text>hey</Text>
      <Button title="logout" onPress={handleSignOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'white'
  },
});