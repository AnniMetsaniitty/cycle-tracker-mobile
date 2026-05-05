import { Link, router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { useAuth } from "../src/auth";

export default function RegisterScreen() {
  const { register, isLoading, error } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister() {
    const success = await register(username.trim(), email.trim(), password);

    if (success) {
      router.replace("/");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <Text style={styles.description}>
        Create your account to start using the cycle tracker.
      </Text>

      <TextInput
        autoCapitalize="none"
        onChangeText={setUsername}
        placeholder="Username"
        style={styles.input}
        value={username}
      />

      <TextInput
        autoCapitalize="none"
        keyboardType="email-address"
        onChangeText={setEmail}
        placeholder="Email"
        style={styles.input}
        value={email}
      />

      <TextInput
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        value={password}
      />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <Pressable
        disabled={isLoading}
        onPress={handleRegister}
        style={({ pressed }) => [
          styles.button,
          pressed && !isLoading ? styles.buttonPressed : null,
          isLoading ? styles.buttonDisabled : null,
        ]}
      >
        {isLoading ? (
          <ActivityIndicator color="#ffffff" />
        ) : (
          <Text style={styles.buttonText}>Create Account</Text>
        )}
      </Pressable>

      <Link href="/login" style={styles.link}>
        Already have an account? Go to Login
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    gap: 12,
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
    color: "#444444",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: "#f8f8f8",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#2563eb",
    borderRadius: 8,
    paddingVertical: 12,
  },
  buttonPressed: {
    opacity: 0.85,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  errorText: {
    color: "#b00020",
    fontSize: 14,
  },
  link: {
    fontSize: 16,
    textDecorationLine: "underline",
    color: "#2563eb",
    marginTop: 4,
  },
});
