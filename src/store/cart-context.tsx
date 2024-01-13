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
  displayCart: boolean;
  displayCartFunc: () => void;
  removeFromCart: (id: string) => void;
};

export const cartContext = React.createContext<CartContextType>({
  cart: [] as CartItem[],
  addToCart: (cartItem: CartItem) => {},
  displayCart: false,
  displayCartFunc: () => {},
  removeFromCart: (id: string) => {},
});

const CartContextProvider: React.FC<{ children?: ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [displayCart, setDisplayCart] = useState<boolean>(false);

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

  const displayCartHandler = () => {
    setDisplayCart((prevValue) => !prevValue);
  };

  const removeFromCartHandler = (id: string) => {
    const item = cart.find((cartItem) => cartItem.id === id);

    if (item?.quantity === 1) {
      setCart(cart.filter((cartItem) => cartItem.id !== id));
    } else {
      console.log(cart);
      const transformedArr = cart.map((element) => {
        if (element.id === id) {
          return {
            ...element,
            quantity: element.quantity - 1,
          };
        } else {
          return element;
        }
      });
      setCart(transformedArr);
    }
  };

  const contextValue = {
    cart,
    addToCart: addToCartHandler,
    displayCart,
    displayCartFunc: displayCartHandler,
    removeFromCart: removeFromCartHandler,
  };

  return (
    <cartContext.Provider value={contextValue}>{children}</cartContext.Provider>
  );
};

export default CartContextProvider;
