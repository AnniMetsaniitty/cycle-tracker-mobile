import { Link, Redirect, router } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { getCurrentCycle, getMedicationStatus, startCycle } from "../src/api";
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
  const [startCycleLoading, setStartCycleLoading] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [feedbackTone, setFeedbackTone] = useState<"success" | "error" | null>(null);

  const loadTodayData = useCallback(async () => {
    if (!user || !token) {
      setScreenLoading(false);
      return;
    }

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
  }, [token, user]);

  useEffect(() => {
    if (authLoading) {
      return;
    }

    loadTodayData();
  }, [authLoading, loadTodayData]);

  async function handleLogout() {
    await logout();
    router.replace("/login");
  }

  async function handleStartCycle() {
    if (!user || !token || startCycleLoading) {
      return;
    }

    setStartCycleLoading(true);
    setFeedbackMessage(null);
    setFeedbackTone(null);
    setScreenError(null);

    try {
      const newCycle = await startCycle(user.id, token);
      await loadTodayData();
      setFeedbackTone("success");
      setFeedbackMessage(`New cycle started on ${formatDate(newCycle.startDate)}.`);
    } catch (startError) {
      const message =
        startError instanceof Error
          ? startError.message
          : "Could not start a new cycle.";
      setFeedbackTone("error");
      setFeedbackMessage(message);
    } finally {
      setStartCycleLoading(false);
    }
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
  const hasActiveCycle = cycle?.active ?? false;

  function renderCycleContent() {
    if (!hasActiveCycle) {
      return (
        <View style={styles.messageCard}>
          <Text style={styles.messageTitle}>No active cycle right now</Text>
          <Text style={styles.messageText}>
            Start a new cycle when today is the first day. The app will use today&apos;s
            date automatically.
          </Text>
          <Pressable
            onPress={handleStartCycle}
            disabled={startCycleLoading}
            style={({ pressed }) => [
              styles.primaryButton,
              startCycleLoading ? styles.buttonDisabled : null,
              pressed && !startCycleLoading ? styles.buttonPressed : null,
            ]}
          >
            {startCycleLoading ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              <Text style={styles.primaryButtonText}>Start New Cycle</Text>
            )}
          </Pressable>
        </View>
      );
    }

    return (
      <>
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
      </>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Today Screen</Text>
      <Text style={styles.description}>
        Signed in as {user?.username ?? "Unknown user"}
      </Text>

      {screenError ? <Text style={styles.errorText}>{screenError}</Text> : null}
      {feedbackMessage && feedbackTone ? (
        <View
          style={[
            styles.feedbackCard,
            feedbackTone === "success" ? styles.successCard : styles.errorCard,
          ]}
        >
          <Text
            style={[
              styles.feedbackText,
              feedbackTone === "success" ? styles.successText : styles.errorStrongText,
            ]}
          >
            {feedbackMessage}
          </Text>
        </View>
      ) : null}

      {renderCycleContent()}

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
  messageCard: {
    backgroundColor: "#f8fafc",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    padding: 16,
    gap: 10,
  },
  messageTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#0f172a",
  },
  messageText: {
    fontSize: 15,
    color: "#475569",
    lineHeight: 22,
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
  feedbackCard: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
  },
  successCard: {
    backgroundColor: "#ecfdf5",
    borderColor: "#86efac",
  },
  errorCard: {
    backgroundColor: "#fef2f2",
    borderColor: "#fca5a5",
  },
  feedbackText: {
    fontSize: 14,
    fontWeight: "500",
  },
  successText: {
    color: "#166534",
  },
  errorStrongText: {
    color: "#b91c1c",
  },
  primaryButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2563eb",
    borderRadius: 8,
    paddingVertical: 12,
    minHeight: 48,
    marginTop: 4,
  },
  primaryButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
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
  buttonDisabled: {
    opacity: 0.7,
  },
  link: {
    fontSize: 16,
    textDecorationLine: "underline",
    color: "#2563eb",
    marginTop: 4,
  },
});
