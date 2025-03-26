import React from "react";
import { View, Switch as RNSwitch, StyleSheet } from "react-native";

interface SwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
}

export const Switch: React.FC<SwitchProps> = ({ value, onValueChange, disabled }) => {
  return (
    <View style={styles.container}>
      <RNSwitch
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        trackColor={{ false: "#D1D5DB", true: "#2563EB" }} // Gray when off, blue when on
        thumbColor="#FFFFFF" // White thumb
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Switch;