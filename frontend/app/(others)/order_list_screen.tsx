import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft } from "lucide-react-native"; // Import icon

const orders = [
  { id: "1001", status: "Pending", total: 120.5, date: "2024-03-20" },
  { id: "1002", status: "Shipped", total: 80.99, date: "2024-03-18" },
  { id: "1003", status: "Delivered", total: 200.0, date: "2024-03-15" },
  { id: "1004", status: "Cancelled", total: 50.0, date: "2024-03-10" },
];

export default function OrderListScreen() {
  const router = useRouter();

  const getStatusColor = (status: string): string => {
    switch (status) {
      case "Pending":
        return "#FACC15"; // Yellow
      case "Shipped":
        return "#3B82F6"; // Blue
      case "Delivered":
        return "#10B981"; // Green
      case "Cancelled":
        return "#EF4444"; // Red
      default:
        return "#6B7280"; // Gray
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Back Button chỉ có Icon */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.push("/(others)/user_profile")}>
        <ArrowLeft size={28} color="#1E40AF" />
      </TouchableOpacity>

      <Text style={styles.header}>Your Orders</Text>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.orderCard}
            onPress={() =>
              router.push({
                pathname: "/order_details",
                params: { order: JSON.stringify(item) },
              })
            }
          >
            <View style={styles.row}>
              <Text style={styles.orderId}>#{item.id}</Text>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
                <Text style={styles.statusText}>{item.status}</Text>
              </View>
            </View>
            <Text style={styles.orderDate}>Date: {item.date}</Text>
            <Text style={styles.orderTotal}>Total: ${item.total.toFixed(2)}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB", padding: 16 },

  // Back button chỉ có icon
  backButton: { marginBottom: 16, width: 40, height: 40, justifyContent: "center", alignItems: "center" },

  header: { fontSize: 20, fontWeight: "bold", marginBottom: 16, color: "#1E40AF" },

  orderCard: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  orderId: { fontSize: 16, fontWeight: "600" },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  statusText: { color: "white", fontSize: 12, fontWeight: "600" },
  orderDate: { fontSize: 14, color: "#6B7280", marginTop: 4 },
  orderTotal: { fontSize: 16, fontWeight: "bold", color: "#1E40AF", marginTop: 4 },
});
