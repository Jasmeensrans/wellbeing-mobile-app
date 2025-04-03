// app/_layout.tsx
import React from 'react';
import { Stack } from 'expo-router';
import { View, StyleSheet } from 'react-native';


export default function AppLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
      <Stack.Screen name="(tabs)" /> // Use the tabs layout
      <Stack.Screen name="recoverpassword" />
    </Stack>
  );
}