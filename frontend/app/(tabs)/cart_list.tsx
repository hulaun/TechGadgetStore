import { Alert, Button, FlatList, StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
import { useEffect, useState } from 'react';

import CartItem from '@/components/ui/CartItem';
import { CartItemType } from '@/types/CartItemType';

export const cartSampleDate = [
  {
    id: 1,
    name: 'Product 1',
    description: 'Product 1 description',
    imageUrl: 'https://bizweb.dktcdn.net/thumb/1024x1024/100/336/177/products/31-f1eca7fd-2fe6-46c2-9a87-1d8f092f203a.jpg?v=1686131265947',
    price: 100,
    amount: 3
  },
  {
    id: 2,
    name: 'Product 2',
    description: 'Product 2 description',
    imageUrl: 'https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1724929826-best-fashion-trainers-fpmovementxon-66d056c041358.png?crop=1.00xw:0.668xh;0,0.236xh&resize=980:*',
    price: 200,
    amount: 4
  },
  {
    id: 3,
    name: 'Product 3Product 3Product 3Product 3Product 3Product 3Product 3Product 3Product 3Product 3Product 3Product 3Product 3Product 3',
    description: 'Product 3 descriptionProduct 3 descripttionProduct 3 descriptiontionProduct 3 descriptionionProduct 3 description ',
    imageUrl: 'https://media.glamourmagazine.co.uk/photos/63064ad263d110ee64653af0/16:9/w_2580,c_limit/WHITE%20TRAINERS%20240822%20MAIN.jpg',
    price: 300,
    amount: 5
  },
  {
    id: 4,
    name: 'Product 4',
    description: 'Product 4 description',
    imageUrl: 'https://media.glamourmagazine.co.uk/photos/63064ad263d110ee64653af0/16:9/w_2580,c_limit/WHITE%20TRAINERS%20240822%20MAIN.jpg',
    price: 400,
    amount: 6
  }, {
    id: 5,
    name: 'Product 5',
    description: 'Product 4 description',
    imageUrl: 'https://media.glamourmagazine.co.uk/photos/63064ad263d110ee64653af0/16:9/w_2580,c_limit/WHITE%20TRAINERS%20240822%20MAIN.jpg',
    price: 400,
    amount: 6
  }
];

const CartList = () => {
  const [cartItems, setCartItems] = useState<CartItemType[]>(cartSampleDate);

  const [selectedItemIds, setSelectedItemIds] = useState<number[]>([]);

  const [totalPrice, setTotalPrice] = useState<number>(0);

  const handleDeleteItems = (id: number[]): void => {
    const newCartItems = cartItems.filter((item) => !id.includes(item.id));
    setCartItems(newCartItems);
  };

  const handleSelectItem = (id: number): void => {
    if (selectedItemIds.includes(id)) {
      setSelectedItemIds((prevSelectedItemIds) => prevSelectedItemIds.filter((itemId) => itemId !== id));
    } else {
      setSelectedItemIds((prevSelectedItemIds) => [...prevSelectedItemIds, id]);
    }
  };

  const handleIncreaseAmount = (id: number): void => {
    const newCartItems = cartItems.map((item) => {
      if (item.id === id) {
        return { ...item, amount: item.amount + 1 };
      }
      return item;
    });
    setCartItems(newCartItems);
  };

  const handleDecreaseAmount = (id: number): void => {
    const newCartItems = cartItems.map((item) => {
      if (item.id === id) {
        return { ...item, amount: item.amount - 1 };
      }
      return item;
    });
    setCartItems(newCartItems);
  };

  const handleCheckout = (): void => {
    try {

    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Error while checking out');
    }
  }

  useEffect(() => {
    setCartItems(cartSampleDate);
  }, []);

  useEffect(() => {
    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.amount, 0);
    setTotalPrice(totalPrice);
  }, [cartItems]);

  return (
    <View className="flex-1">
      <View className="flex-row justify-between p-4 mt-[20px]">
        <Text className="text-xl font-bold">Shopping Cart</Text>
        <Pressable
          onPress={() => handleDeleteItems(selectedItemIds)}
          className="bg-blue-700 py-2 px-6 rounded-lg shadow-lg">
          <Text className="text-white text-center">Delete</Text>
        </Pressable>
      </View>
      <View className='flex-1'>
        <FlatList
          data={cartItems}
          renderItem={({ item }) => (
            <CartItem
              name={item.name}
              description={item.description}
              imageUrl={item.imageUrl}
              price={item.price}
              amount={item.amount}
              selectItem={() => handleSelectItem(item.id)}
              checked={selectedItemIds.includes(item.id)}
              increaseAmount={() => handleIncreaseAmount(item.id)}
              decreaseAmount={() => handleDecreaseAmount(item.id)}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
      <View>
        <View className='flex-row justify-between text-center p-2 mx-3 rounded-lg bg-slate-200'>
          <View>
            <Text >Total:</Text>
          </View>
          <View>
            <Text className='text-red-600'>{totalPrice + " "}$</Text>
          </View>
        </View>
        <Pressable
          onPress={handleCheckout}
          className="bg-blue-700 text-center p-2 mx-3 rounded-lg m-3">
          <Text className="text-white text-center">Checkout</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default CartList;
