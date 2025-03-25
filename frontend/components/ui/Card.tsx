import React from "react";
import { View, ViewStyle, StyleSheet } from "react-native";

interface CardProps {
  style?: ViewStyle;
  children?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ style, children }) => {
  return <View style={[styles.card, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // For Android shadow
  },
});

export { Card };
