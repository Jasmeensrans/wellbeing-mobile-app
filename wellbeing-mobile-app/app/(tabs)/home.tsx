import React, { useState } from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import { useRouter } from "expo-router";
import { getAuth, signOut } from "firebase/auth";
import { firebaseApp } from "@/database/firebase";
import { updateJournalEntryAttribute } from "@/database/firestoreDatabase";
import { getTodayFormatted } from "@/database/utils";
import { getCorrelations } from "@/ai/genai";
import Widget from "@/components/Widget";
import Ionicons from '@expo/vector-icons/Ionicons';
import RowWidget from "@/components/RowWidget";

export default function Home() {
  const router = useRouter();
  const auth = getAuth(firebaseApp);
  const user = auth.currentUser;
  const userId = user?.uid;
  const [correlations, setCorrelations] = useState("");
  const [loadingCorrelations, setLoadingCorrelations] = useState(false);
  const [correlationError, setCorrelationError] = useState("");

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        router.push("/login");
      })
      .catch((error) => {
        console.error("Sign out error:", error);
      });
  };

  const logWater = () => {
    const date = getTodayFormatted();
    if (userId) {
      updateJournalEntryAttribute(userId, date, { water_intake: 2 }); // Corrected typo: water_intake to waterIntake
    }
  };

  const getLastWeekDates = () => {
    const today = new Date();
    const endDate = getTodayFormatted();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 7);
    const startFormattedDate = `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, '0')}-${String(startDate.getDate()).padStart(2, '0')}`;
    return { startDate: startFormattedDate, endDate };
  };

  const fetchLastWeekCorrelations = async () => {
    if (userId) {
      setLoadingCorrelations(true);
      setCorrelationError("");
      const { startDate, endDate } = getLastWeekDates();
      try {
        const response = await getCorrelations(userId, startDate, endDate);
        setCorrelations(JSON.stringify(response, null, 2));
      } catch (error: any) {
        console.error("Error fetching correlations:", error);
        setCorrelationError(error.message || "Failed to fetch correlations.");
        setCorrelations("");
      } finally {
        setLoadingCorrelations(false);
      }
    } else {
      setCorrelationError("User not logged in.");
      setCorrelations("");
    }
  };

  return (
    <View style={styles.container}>
      <Text>Hey</Text>
      <Widget title="Water" value="1.5L" isCompleted={false} onPress={() =>{}} icon={<Ionicons name="water" size={20} color="lightblue" />}/>
      <Widget title="Sugar" value="20g" isCompleted={true} onPress={() =>{}}/>
      <Widget title="Caffiene" value="100mg" isCompleted={true} onPress={() =>{}}/>
      <RowWidget value={"1.5L"} isCompleted={false} onPress={function (): void {
        throw new Error("Function not implemented.");
      } } />
      <Button title="Logout" onPress={handleSignOut} />

      {loadingCorrelations && <Text>Fetching correlations...</Text>}
      {correlationError && <Text style={styles.error}>{correlationError}</Text>}
      {correlations && (
        <View style={styles.responseContainer}>
          <Text style={styles.responseHeader}>Last Week's Correlations:</Text>
          <Text style={styles.responseText}>{correlations}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "white",
  },
  error: {
    color: "red",
    marginTop: 10,
  },
  responseContainer: {
    marginTop: 20,
    padding: 10,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
  },
  responseHeader: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  responseText: {
    fontFamily: "monospace",
  },
});