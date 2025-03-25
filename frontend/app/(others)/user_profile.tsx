import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { Avatar } from "@/components/ui/Avatar";
import { Switch } from "@/components/ui/Switch";
import { Card } from "@/components/ui/Card";
import { Bell, Heart, LogOut, Shield, User, Users } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router"; // Thêm useRouter để điều hướng
import { useAuth } from "@/context/AuthProvider";

export default function ProfileScreen() {
    const [faceIDEnabled, setFaceIDEnabled] = useState(false);
    const router = useRouter(); // Khởi tạo router
    const { isLogged, loading, handleLogout } = useAuth();

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                {/* Profile Header */}
                <View style={styles.profileHeader}>
                    <Avatar />
                    <View>
                        <Text style={styles.profileName}>Itunuoluwa Abidoye</Text>
                        <Text style={styles.profileUsername}>@Itunuoluwa</Text>
                    </View>
                </View>

                {/* Profile Options */}
                <View style={styles.section}>
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => router.push("/(others)/update_profile")} // Chuyển hướng đến update_profile
                    >
                        <View style={styles.cardContent}>
                            <User size={20} color="#000" />
                            <View>
                                <Text style={styles.cardTitle}>My Account</Text>
                                <Text style={styles.cardSubtitle}>Make changes to your account</Text>
                            </View>
                        </View>
                        <Text style={styles.warningIcon}>⚠️</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.card} onPress={() => router.push("/(others)/order_list_screen")} // Navigate to Order List screen
                    >            <View style={styles.cardContent}>
                            <Users size={20} color="#000" />
                            <View>
                                <Text style={styles.cardTitle}>Order list</Text>
                                <Text style={styles.cardSubtitle}>Manage your all orders</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    <View style={styles.card}>
                        <View style={styles.cardContent}>
                            <Shield size={20} color="#000" />
                            <View>
                                <Text style={styles.cardTitle}>Face ID / Touch ID</Text>
                                <Text style={styles.cardSubtitle}>Manage your device security</Text>
                            </View>
                        </View>
                        <Switch value={faceIDEnabled} onValueChange={setFaceIDEnabled} />
                    </View>

                    <TouchableOpacity style={styles.card}>
                        <View style={styles.cardContent}>
                            <Shield size={20} color="#000" />
                            <View>
                                <Text style={styles.cardTitle}>Two-Factor Authentication</Text>
                                <Text style={styles.cardSubtitle}>Further secure your account for safety</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.card} onPress={handleLogout}>
                        <View style={styles.cardContent}>
                            <LogOut size={20} color="red" />
                            <View>
                                <Text style={styles.cardTitle}>Log out</Text>
                                <Text style={styles.cardSubtitle}>Ensure your account security</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                </View>

                {/* More Section */}
                <View style={styles.section}>
                    <TouchableOpacity style={styles.card}>
                        <View style={styles.cardContent}>
                            <Bell size={20} color="#000" />
                            <Text style={styles.cardTitle}>Help & Support</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.card}>
                        <View style={styles.cardContent}>
                            <Heart size={20} color="#000" />
                            <Text style={styles.cardTitle}>About App</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {/* Bottom Navigation */}
            <View style={styles.bottomNav}>
                <Text style={styles.navItem}>Home</Text>
                <Text style={styles.navItem}>Card</Text>
                <Text style={styles.navItem}>Transactions</Text>
                <Text style={styles.navItem}>Requests</Text>
                <Text style={styles.navActive}>Profile</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#F3F4F6" },
    content: { padding: 16 },
    profileHeader: {
        backgroundColor: "#2563EB",
        padding: 24,
        borderRadius: 20,
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
    },
    profileName: { fontSize: 18, fontWeight: "600", color: "white" },
    profileUsername: { fontSize: 14, color: "white" },

    section: { marginTop: 16 },
    card: {
        backgroundColor: "white",
        borderRadius: 16,
        padding: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 12,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardContent: { flexDirection: "row", alignItems: "center", gap: 12 },
    cardTitle: { fontSize: 16, fontWeight: "500" },
    cardSubtitle: { fontSize: 12, color: "#6B7280" },
    warningIcon: { color: "red", fontSize: 18 },

    bottomNav: {
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: "white",
        paddingVertical: 16,
        borderTopWidth: 1,
        borderTopColor: "#E5E7EB",
    },
    navItem: { color: "#6B7280" },
    navActive: { color: "#2563EB", fontWeight: "600" },
});