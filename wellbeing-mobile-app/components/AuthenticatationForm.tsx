import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import { useRouter } from "expo-router";
import { StyledTextField } from "./StyledTextField";
import { Button } from "./StyledButton";
import { ErrorText } from "./ErrorText";

interface AuthenticationFormProps {
  isLogin: boolean;
  onSubmit: (email: string, password: string, firstName?: string) => void;
  isError: boolean;
  errorMessage: string;
}

export default function AuthenticationForm({
  isLogin,
  onSubmit,
  isError,
  errorMessage,
}: AuthenticationFormProps) {
  const router = useRouter();

  const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Email is required"),
    password: yup.string().required("Password is required"),
    firstName: isLogin ? yup.string().notRequired() : yup
      .string()
      .min(2, "First name must be at least 2 characters")
      .matches(/^[A-Za-z]+$/, "First name can only contain letters")
      .required("First name is required"),
  });

  const registerValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .test("hasNumbers", "Password must contain at least 1 number", (value) => !!value && /\d/.test(value))
      .test("hasSymbols", "Password must contain at least 1 special character", (value) => !!value && /[!@#$%^&*(),.?":{}|<>]/.test(value))
      .required("Password is required"),
    firstName: yup
      .string()
      .min(2, "First name must be at least 2 characters")
      .matches(/^[A-Za-z]+$/, "First name can only contain letters")
      .required("First name is required"),
  });

  const validationSchema = isLogin ? loginValidationSchema : registerValidationSchema;

  const handleSubmit = (values: {
    email: string;
    password: string;
    firstName?: string;
  }) => {
    if (isLogin) {
      onSubmit(values.email, values.password);
    } else {
      onSubmit(values.email, values.password, values.firstName);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isLogin ? "Login" : "Sign up"}</Text>
      <Formik
        validationSchema={validationSchema}
        initialValues={{ email: "", password: "", firstName: "" }}
        onSubmit={handleSubmit}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          isValid,
        }) => (
          <>
            <StyledTextField
              placeholder="Email"
              keyboardType="email-address"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
            />
            {errors.email && touched.email && (
              <ErrorText>{errors.email}</ErrorText>
            )}
            <StyledTextField
              placeholder="Password"
              secureTextEntry
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
            />
            {!isLogin && (
              <StyledTextField
                placeholder="Name"
                onChangeText={handleChange("firstName")}
                onBlur={handleBlur("firstName")}
                value={values.firstName}
              />
            )}
            {errors.password && touched.password && (
              <ErrorText>{errors.password}</ErrorText>
            )}
            {errors.firstName && touched.firstName && (
              <ErrorText>{errors.firstName}</ErrorText>
            )}
            {isError && <ErrorText>{errorMessage}</ErrorText>}
            {isLogin && (
              <TouchableOpacity onPress={() => router.push('/recoverpassword')}>
                <Text style={styles.forgotPassword}>Forgot Password?</Text>
              </TouchableOpacity>
            )}
            <Button title="Submit" onPress={handleSubmit} disabled={!isValid} />
            <TouchableOpacity
              onPress={() => router.push(isLogin ? "/register" : "/login")}
            >
              <Text style={styles.forgotPassword}>
                {isLogin
                  ? "Don't have an account? Sign up"
                  : "Already have an account? Log in"}
              </Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  logo: {
    height: 200,
    width: 200,
    resizeMode: "contain",
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    marginBottom: 40,
    fontWeight: "bold",
    color: "black",
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 20,
    color: "#000",
  },
});