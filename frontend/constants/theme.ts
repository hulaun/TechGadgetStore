import { DefaultTheme, DarkTheme } from "@react-navigation/native";
import { } from "react-native";

export const CustomLightTheme = {
    ...DefaultTheme,
    colors: {
        background: "#FFFFFF",
        text: "#000000",
        primary: "#3669C9",
        card: "#FAFAFA",
        border: "#FAFAFA",
        notification: "#FDA429",
    }
};

export const CustomDarkTheme = {
    ...DarkTheme,
    colors: {
        background: "#13181F",
        text: "#FFFFFF",
        primary: "#FDA429",
        card: "#1E242D",
        border: "#262B33",
        notification: "#C93545"
    }
};
