import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { ArrowLeft, Calendar } from "lucide-react-native";


const API_URL = 'http://192.168.1.189:3000/api/user'; // Change to your actual API URL

export default function BioDataScreen() {
  const navigation = useNavigation();

  // User info states
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [dob, setDob] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const userId = "customer"; // Replace with actual user ID from authentication

  // Function to handle API call
  const updateProfile = async () => {
    if (!firstName || !lastName || !phoneNumber || !gender) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname: firstName,
          lastname: lastName,
          phoneNumber,
          gender,
          dob: dob.toISOString().split("T")[0], // Format date to YYYY-MM-DD
        }),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        Alert.alert("Success", "Profile updated successfully!");
      } else {
        Alert.alert("Error", data.message || "Failed to update profile");
      }
    } catch (error) {
      setLoading(false);
      console.error("Update profile error:", error);
      Alert.alert("Error", "Something went wrong!");
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <ArrowLeft size={24} color="black" />
      </TouchableOpacity>

      {/* Profile Avatar */}
      <View style={styles.profileHeader}>
        <Image source={{ uri: "https://i.pravatar.cc/150" }} style={styles.avatar} />
        <Text style={styles.name}>Itunuoluwa Abidoye</Text>
        <Text style={styles.email}>Itunuoluwa@petra.africa</Text>
      </View>

      {/* Input Fields */}
      <TextInput
        style={styles.input}
        placeholder="What's your first name?"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="And your last name?"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone number"
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />

      {/* Gender Picker */}
      <View style={styles.pickerContainer}>
        <Picker selectedValue={gender} onValueChange={(itemValue) => setGender(itemValue)}>
          <Picker.Item label="Select your gender" value="" />
          <Picker.Item label="Male" value="male" />
          <Picker.Item label="Female" value="female" />
          <Picker.Item label="Other" value="other" />
        </Picker>
      </View>

      {/* Date of Birth Picker */}
      <TouchableOpacity style={styles.dateInput} onPress={() => setShowDatePicker(true)}>
        <Text style={{ color: dob ? "black" : "#999" }}>
          {dob ? dob.toDateString() : "What is your date of birth?"}
        </Text>
        <Calendar size={20} color="#999" />
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={dob}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) setDob(selectedDate);
          }}
        />
      )}

      {/* Update Profile Button */}
      <TouchableOpacity style={styles.updateButton} onPress={updateProfile} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.updateText}>Update Profile</Text>}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB", padding: 16 },
  backButton: { position: "absolute", top: 20, left: 16, padding: 10 },
  profileHeader: { alignItems: "center", marginTop: 40, marginBottom: 20 },
  avatar: { width: 80, height: 80, borderRadius: 40, marginBottom: 10 },
  name: { fontSize: 18, fontWeight: "600" },
  email: { fontSize: 14, color: "#6B7280" },

  input: {
    backgroundColor: "white",
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  pickerContainer: {
    backgroundColor: "white",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 12,
  },
  dateInput: {
    backgroundColor: "white",
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  updateButton: {
    backgroundColor: "#1E40AF",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },
  updateText: { color: "white", fontSize: 16, fontWeight: "600" },
});

