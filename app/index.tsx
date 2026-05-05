import { Link, Redirect, router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { getCurrentCycle, getMedicationStatus } from "../src/api";
import { useAuth } from "../src/auth";
import type { Cycle, MedicationStatus } from "../src/types";
import { buildNextMedicationText, formatDate } from "../src/utils";

export default function TodayScreen() {
  const { user, token, logout, isLoading: authLoading } = useAuth();
  const [cycle, setCycle] = useState<Cycle | null>(null);
  const [medicationStatus, setMedicationStatus] = useState<MedicationStatus | null>(
    null,
  );
  const [screenLoading, setScreenLoading] = useState(true);
  const [screenError, setScreenError] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading) {
      return;
    }

    if (!user || !token) {
      setScreenLoading(false);
      return;
    }

    async function loadTodayData() {
      setScreenLoading(true);
      setScreenError(null);

      try {
        const currentCycle = await getCurrentCycle(user.id, token);
        setCycle(currentCycle);

        const currentMedicationStatus = await getMedicationStatus(user.id, token);
        setMedicationStatus(currentMedicationStatus);
      } catch (loadError) {
        const message =
          loadError instanceof Error
            ? loadError.message
            : "Could not load today screen data.";

        if (message.startsWith("No active cycle")) {
          setCycle(null);
          setMedicationStatus(null);
          setScreenError(null);
        } else {
          setScreenError(message);
        }
      } finally {
        setScreenLoading(false);
      }
    }

    loadTodayData();
  }, [authLoading, token, user]);

  async function handleLogout() {
    await logout();
    router.replace("/login");
  }

  if (!authLoading && (!user || !token)) {
    return <Redirect href="/login" />;
  }

  if (authLoading || screenLoading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={styles.loadingText}>Loading today screen...</Text>
      </View>
    );
  }

  const cycleDayText = cycle ? String(cycle.currentDay) : "--";
  const startDateText = cycle ? formatDate(cycle.startDate) : "--";
  const cycleStateText = cycle ? (cycle.active ? "Active" : "Closed") : "No active cycle";
  const medicationStateText = medicationStatus
    ? medicationStatus.active
      ? "Active today"
      : "Not active"
    : "Unavailable";
  const nextMedicationText = buildNextMedicationText(cycle, medicationStatus);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Today Screen</Text>
      <Text style={styles.description}>
        Signed in as {user?.username ?? "Unknown user"}
      </Text>

      {screenError ? <Text style={styles.errorText}>{screenError}</Text> : null}

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Current Cycle</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Cycle day</Text>
          <Text style={styles.value}>{cycleDayText}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Start date</Text>
          <Text style={styles.value}>{startDateText}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Active state</Text>
          <Text style={styles.value}>{cycleStateText}</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Medication</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Medication state</Text>
          <Text style={styles.value}>{medicationStateText}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Next medication date</Text>
          <Text style={styles.value}>{nextMedicationText}</Text>
        </View>
        {medicationStatus ? (
          <View style={styles.row}>
            <Text style={styles.label}>Medication window</Text>
            <Text
              style={styles.value}
            >{`Days ${medicationStatus.medicationStartDay}-${medicationStatus.medicationEndDay}`}</Text>
          </View>
        ) : null}
      </View>

      <Pressable
        onPress={handleLogout}
        style={({ pressed }) => [
          styles.logoutButton,
          pressed ? styles.buttonPressed : null,
        ]}
      >
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </Pressable>

      <Link href="/history" style={styles.link}>
        Open History
      </Link>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#ffffff",
    gap: 12,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    padding: 24,
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
  loadingText: {
    fontSize: 16,
    color: "#444444",
  },
  card: {
    backgroundColor: "#f8fafc",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
  },
  label: {
    flex: 1,
    fontSize: 16,
    color: "#475569",
  },
  value: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
    textAlign: "right",
    color: "#0f172a",
  },
  errorText: {
    color: "#b00020",
    fontSize: 14,
  },
  logoutButton: {
    alignItems: "center",
    backgroundColor: "#dc2626",
    borderRadius: 8,
    paddingVertical: 12,
    marginTop: 8,
  },
  logoutButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  buttonPressed: {
    opacity: 0.85,
  },
  link: {
    fontSize: 16,
    textDecorationLine: "underline",
    color: "#2563eb",
    marginTop: 4,
  },
});
