import { ImageSourcePropType } from "react-native";

export type Product = {
    _id: string;
    name: string;
    price: string;
    image: ImageSourcePropType;
    averageRating: number;
    description?: string;
  };