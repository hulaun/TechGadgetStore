import React from "react";
import { Image, View, Text, ImageSourcePropType, StyleSheet } from "react-native";

interface AvatarProps {
  src?: ImageSourcePropType;
  alt?: string;
  style?: object;
}

const Avatar: React.FC<AvatarProps> = ({ src, alt, style }) => {
  return (
    <View style={[styles.avatarContainer, style]}>
      {src ? (
        <Image source={src} style={styles.image} resizeMode="cover" />
      ) : (
        <Text style={styles.placeholder}>👤</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
  placeholder: {
    fontSize: 16,
    color: "#6B7280",
  },
});

export { Avatar };
