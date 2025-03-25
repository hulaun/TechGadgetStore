
export type Category = {
  id: number;
  _id?: string;
  name: string;
  Icon: React.ComponentType<{ color?: string }>;
  color: string;
  iconColor: string;
};