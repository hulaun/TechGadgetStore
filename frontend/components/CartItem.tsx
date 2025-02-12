import { View, Text, TouchableOpacity, Image, Pressable } from 'react-native';
import { CartItemType } from '@/types/CartItemType';
import { Ionicons } from '@expo/vector-icons';

type CartItemProps = Omit<CartItemType, 'id'>;

const CartItem = ({
  name,
  imageUrl,
  description,
  price,
  amount,
  checked,
  selectItem,
  increaseAmount,
  decreaseAmount,
}: CartItemProps & {
  checked: boolean,
  selectItem: () => void,
  increaseAmount: () => void,
  decreaseAmount: () => void
}) => {
  return (
    <View className="flex-row p-4 border-b border-gray-300 justify-between">
      <View className="flex-row items-center ">
        <Image source={{ uri: imageUrl }} resizeMode='cover' className="w-28 h-28 mr-4" />
        <View className="flex-col">
          <Text className="text-lg font-semibold line-clamp-1 max-w-[150px] "  >{name}</Text>
          <Text className="text-sm text-gray-500 line-clamp-2 max-w-[200px]">{description}</Text>
          <Text className="text-md text-red-600 mt-[20px]">${" " + price}</Text>
        </View>
      </View>
      <View className='justify-between items-end'>
        <Pressable onPress={selectItem} className="flex-row space-x-2">
          <View className={`w-6 h-6 border-2 rounded ${checked ? 'bg-blue-600' : 'bg-white'} border-blue-600`}>
            {checked && <Ionicons name="checkmark" size={20} color="white" />}
          </View>
        </Pressable>
        <View className="flex-row items-center space-x-14">
          <Pressable onPress={decreaseAmount} className="bg-red-600 p-1 rounded-full">
            <Ionicons name="remove" size={10} color="blue" />
          </Pressable>
          <View className='mx-[4px]' >
            <Text>{amount}</Text>
          </View>
          <Pressable onPress={increaseAmount} className="bg-blue-700 p-1 rounded-full">
            <Ionicons name="add" size={10} color="white" />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default CartItem;
