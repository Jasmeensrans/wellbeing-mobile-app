import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface ButtonProps {
  onPress: () => void;
  title: string;
  disabled?: boolean;
  style?: any; // Allow custom button styles
  textStyle?: any; // Allow custom text styles
}

export const Button: React.FC<ButtonProps> = ({
  onPress,
  title,
  disabled,
  style,
  textStyle,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        disabled && styles.disabledButton,
        style, // Apply custom button styles
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.buttonText, textStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#1E90FF",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  disabledButton: {
    backgroundColor: "#808080",
    opacity: 0.7,
  },
});