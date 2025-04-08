import React from "react";
import { Text, StyleSheet } from "react-native";

interface ErrorTextProps {
  children: React.ReactNode;
  style?: any; // For any additional custom styles
}

export const ErrorText: React.FC<ErrorTextProps> = ({ children, style }) => {
  return <Text style={[styles.errorText, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
    marginBottom: 10,
    alignSelf: "flex-start", // Align to the left by default
  },
});