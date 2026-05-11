import { Redirect, router } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { getCycleHistory } from "../src/api";
import { useAuth } from "../src/auth";
import type { Cycle } from "../src/types";
import { formatDate, getCycleLengthText, getCycleStateText } from "../src/utils";

export default function HistoryScreen() {
  const { user, token, isLoading: authLoading } = useAuth();
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [screenLoading, setScreenLoading] = useState(true);
  const [screenError, setScreenError] = useState<string | null>(null);

  const loadHistory = useCallback(async () => {
    if (!user || !token) {
      return;
    }

    setScreenLoading(true);
    setScreenError(null);

    try {
      const history = await getCycleHistory(user.id, token);
      setCycles(history);
    } catch (loadError) {
      const message =
        loadError instanceof Error
          ? loadError.message
          : "Could not load cycle history.";
      setScreenError(message);
    } finally {
      setScreenLoading(false);
    }
  }, [token, user]);

  useEffect(() => {
    if (authLoading) {
      return;
    }

    if (!user || !token) {
      setScreenLoading(false);
      return;
    }

    loadHistory();
  }, [authLoading, loadHistory, token, user]);

  if (!authLoading && (!user || !token)) {
    return <Redirect href="/login" />;
  }

  if (authLoading || screenLoading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={styles.loadingText}>Loading cycle history...</Text>
      </View>
    );
  }

  function renderContent() {
    if (screenError) {
      return (
        <View style={styles.messageCard}>
          <Text style={styles.messageTitle}>Could not load history</Text>
          <Text style={styles.messageText}>{screenError}</Text>
          <Pressable
            onPress={loadHistory}
            style={({ pressed }) => [
              styles.secondaryButton,
              pressed ? styles.buttonPressed : null,
            ]}
          >
            <Text style={styles.secondaryButtonText}>Try Again</Text>
          </Pressable>
        </View>
      );
    }

    if (cycles.length === 0) {
      return (
        <View style={styles.messageCard}>
          <Text style={styles.messageTitle}>No cycle history yet</Text>
          <Text style={styles.messageText}>
            Start your first cycle on the Today screen to see it here later.
          </Text>
        </View>
      );
    }

    return cycles.map((cycle) => (
      <View key={cycle.id} style={styles.card}>
        <Text style={styles.cardTitle}>{`Cycle #${cycle.id}`}</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Start date</Text>
          <Text style={styles.value}>{formatDate(cycle.startDate)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>End date</Text>
          <Text style={styles.value}>
            {cycle.endDate ? formatDate(cycle.endDate) : "Active"}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>State</Text>
          <Text style={styles.value}>{getCycleStateText(cycle)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Length</Text>
          <Text style={styles.value}>{getCycleLengthText(cycle)}</Text>
        </View>
      </View>
    ));
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>History</Text>
      <Text style={styles.description}>
        Review your previous cycles from newest to oldest.
      </Text>

      {renderContent()}

      <Pressable
        onPress={() => router.push("/")}
        style={({ pressed }) => [
          styles.button,
          pressed ? styles.buttonPressed : null,
        ]}
      >
        <Text style={styles.buttonText}>Back to Today</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    gap: 12,
    backgroundColor: "#ffffff",
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
    gap: 8,
  },
  messageTitle: {
    fontSize: 18,
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
    color: "#0f172a",
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
  button: {
    alignItems: "center",
    backgroundColor: "#2563eb",
    borderRadius: 8,
    paddingVertical: 12,
    marginTop: 8,
  },
  secondaryButton: {
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: "#2563eb",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginTop: 4,
  },
  buttonPressed: {
    opacity: 0.85,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryButtonText: {
    color: "#2563eb",
    fontSize: 15,
    fontWeight: "600",
  },
});
