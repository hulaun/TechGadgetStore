import { useLocalSearchParams } from "expo-router";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function OrderDetailsScreen() {
  const { order } = useLocalSearchParams();

  // Ensure order is parsed correctly
  const parsedOrder = order ? JSON.parse(order as string) : null;

  if (!parsedOrder || typeof parsedOrder !== "object") {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Order details not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Total Amount:</Text>
      <Text style={styles.value}>
        ${parsedOrder.total ? Number(parsedOrder.total).toFixed(2) : "N/A"}
      </Text>

      <Text style={styles.label}>Order Date:</Text>
      <Text style={styles.value}>{parsedOrder.date || "N/A"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#F9FAFB" },
  label: { fontSize: 16, fontWeight: "bold", marginTop: 8 },
  value: { fontSize: 16, color: "#374151" },
  errorText: { fontSize: 16, color: "red", textAlign: "center", marginTop: 20 },
});
