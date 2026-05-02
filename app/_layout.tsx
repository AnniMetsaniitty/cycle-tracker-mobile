import { Stack } from "expo-router";

import { AuthProvider } from "../src/auth";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Today" }} />
        <Stack.Screen name="login" options={{ title: "Login" }} />
        <Stack.Screen name="register" options={{ title: "Register" }} />
        <Stack.Screen name="history" options={{ title: "History" }} />
      </Stack>
    </AuthProvider>
  );
}
