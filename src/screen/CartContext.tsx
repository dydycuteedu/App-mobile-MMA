import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCartByUser, saveCart } from '../api/cartApi';
import { Alert } from 'react-native';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: any;
  portion?: string;
  date?: string;
  time?: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  increaseQuantity: (itemId: string) => void;
  decreaseQuantity: (itemId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  increaseQuantity: () => {},
  decreaseQuantity: () => {},
  clearCart: () => {},
});

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const userId = 'u1'; // sau này lấy từ login hoặc AsyncStorage

  // Lấy giỏ hàng từ server khi mở app
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const result = await getCartByUser(userId);
        if (result?.cartItems) {
          setCartItems(result.cartItems);
        }
      } catch (error) {
        console.error('Failed to fetch cart:', error);
      }
    };

    fetchCart();
  }, []);

  const syncCartToServer = async (updatedCart: CartItem[]) => {
    try {
      await saveCart(userId, updatedCart);
    } catch (error) {
      Alert.alert('Lỗi khi lưu giỏ hàng lên server');
    }
  };

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (cartItem) =>
          cartItem.id === item.id && cartItem.portion === (item as any).portion
      );

      let updatedCart;
      if (existingItem) {
        updatedCart = prevItems.map((cartItem) =>
          cartItem.id === item.id && cartItem.portion === (item as any).portion
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        updatedCart = [
          ...prevItems,
          {
            ...item,
            quantity: 1,
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ];
      }

      syncCartToServer(updatedCart);
      return updatedCart;
    });
  };

  const increaseQuantity = (itemId: string) => {
    setCartItems((prevItems) => {
      const updatedCart = prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      );
      syncCartToServer(updatedCart);
      return updatedCart;
    });
  };

  const decreaseQuantity = (itemId: string) => {
    setCartItems((prevItems) => {
      const updatedCart = prevItems.map((item) =>
        item.id === itemId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      syncCartToServer(updatedCart);
      return updatedCart;
    });
  };

  const clearCart = () => {
    syncCartToServer([]);
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
