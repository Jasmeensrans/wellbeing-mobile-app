import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import firebaseApp from '@/database/firebase';
import { useRouter } from 'expo-router';

export default function PasswordRecovery() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const auth = getAuth(firebaseApp);
  const router = useRouter();

  const handlePasswordReset = () => {
    setLoading(true);
    sendPasswordResetEmail(auth, email)
      .then(() => {
        Alert.alert(
          'Password Reset',
          'A password reset email has been sent to your address.'
        );
        setEmailSent(true);
      })
      .catch((error) => {
        Alert.alert('Error', error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleGoToLogin = () => {
    router.push('/login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Password Recovery</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        disabled={emailSent}
      />
      <Button
        title={loading ? 'Sending...' : 'Send Reset Email'}
        onPress={handlePasswordReset}
        disabled={loading || emailSent}
      />
      {emailSent && (
        <Button title="Go to Login" onPress={handleGoToLogin} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
});