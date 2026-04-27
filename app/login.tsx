import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Screen</Text>
      <Text>This will contain the login form later.</Text>

      <Link href="/" style={styles.link}>
        Go to Today
      </Link>
      <Link href="/register" style={styles.link}>
        Go to Register
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
