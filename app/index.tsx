import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { useAuth } from "../src/auth";

export default function TodayScreen() {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Today Screen</Text>
      <Text>This will show the current cycle and medication status.</Text>
      {user ? <Text>Logged in as {user.username}</Text> : <Text>Not logged in yet.</Text>}

      <Link href="/login" style={styles.link}>
        Go to Login
      </Link>
      <Link href="/register" style={styles.link}>
        Go to Register
      </Link>
      <Link href="/history" style={styles.link}>
        Go to History
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
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  link: {
    fontSize: 18,
    textDecorationLine: "underline",
  },
});
