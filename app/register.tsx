import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function RegisterScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register Screen</Text>
      <Text>This will contain the registration form later.</Text>

      <Link href="/login" style={styles.link}>
        Go to Login
      </Link>
      <Link href="/" style={styles.link}>
        Go to Today
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
