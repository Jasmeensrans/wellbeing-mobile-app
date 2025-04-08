import React from "react";
import { TextInput, View, StyleSheet, NativeSyntheticEvent, TextInputFocusEventData } from "react-native";

interface StyledTextInputProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?:
    | "default"
    | "number-pad"
    | "decimal-pad"
    | "numeric"
    | "email-address"
    | "phone-pad"
    | "url";
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  autoCorrect?: boolean;
  maxLength?: number;
  multiline?: boolean;
  textAlign?: "left" | "center" | "right";
  inputStyle?: any; // Style for the TextInput itself
  containerStyle?: any; // Style for the wrapping View
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void; // Add the onBlur prop
}

export const StyledTextField: React.FC<StyledTextInputProps> = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  keyboardType,
  autoCapitalize,
  autoCorrect,
  maxLength,
  multiline,
  textAlign,
  inputStyle,
  containerStyle,
  onBlur, // Destructure the onBlur prop
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCorrect}
        maxLength={maxLength}
        multiline={multiline}
        textAlign={textAlign}
        style={[styles.input, inputStyle, { flex: 1, height: '100%' }]} // Apply flex and height here
        onBlur={onBlur} // Pass the onBlur prop to the TextInput
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 50,
    backgroundColor: "#f1f1f1",
    borderRadius: 8,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  input: {
    fontSize: 16,
    color: "black",
  },
});