import { DefaultTheme, DarkTheme } from "@react-navigation/native";

export const CustomLightTheme = {
    ...DefaultTheme,
    colors: {
        background: "#FFFFFF",  // Pure white
        text: "#121212",        // Dark gray for better readability
        primary: "#F5F5F5",     // Softer off-white for primary elements
        card: "#F0F0F0",        // Light gray for subtle card contrast
        border: "#E0E0E0",      // Slightly darker than card
        notification: "#FF9800", // Warmer orange for notifications
    }
};

export const CustomDarkTheme = {
    ...DarkTheme,
    colors: {
        background: "#0F141A",  // Darker background for deep contrast
        text: "#E0E0E0",        // Light gray for text (not pure white)
        primary: "#1A1F26",     // Dark navy-like shade for primary elements
        card: "#20252C",        // Slightly lighter than primary for depth
        border: "#2A2F37",      // Subtle contrast from card
        notification: "#E53935" // Brighter red for notifications
    }
};
