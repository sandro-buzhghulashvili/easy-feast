import React, { ReactNode, useState } from 'react';

export type CartItem = {
  id: string;
  title: string;
  price: string;
  addOnTitle?: string;
  address: any;
  quantity: number;
  date: string;
};

type CartContextType = {
  cart: CartItem[] | [];
  addToCart: (cartItem: CartItem) => void;
};

export const cartContext = React.createContext<CartContextType>({
  cart: [] as CartItem[],
  addToCart: (cartItem: CartItem) => {},
});

const CartContextProvider: React.FC<{ children?: ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCartHandler = (item: CartItem) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (!existingItem) setCart((prevValue) => [...prevValue, item]);
    else {
      const updatedCart = cart.map((cartItem) => {
        if (cartItem.id === item.id) {
          return {
            ...cartItem,
            quantity: cartItem.quantity + item.quantity,
          };
        } else {
          return cartItem;
        }
      });
      setCart(updatedCart);
    }
  };

  const contextValue = {
    cart,
    addToCart: addToCartHandler,
  };

  return (
    <cartContext.Provider value={contextValue}>{children}</cartContext.Provider>
  );
};

export default CartContextProvider;
