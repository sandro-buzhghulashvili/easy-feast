import React, { useContext } from 'react';
import { cartContext } from '../store/cart-context';
import { Minus, Plus } from 'lucide-react';

const CartComponent: React.FC = () => {
  const cartCtx = useContext(cartContext);
  let totalPrice = 0;
  cartCtx.cart.forEach((item) => {
    totalPrice += Number(item.price) * item.quantity;
  });
  console.log(totalPrice);
  return (
    <>
      {cartCtx.cart.length === 0 ? (
        <h1 className="text-2xl text-center font-bold">
          You don't have any items in cart
        </h1>
      ) : (
        <div className="flex flex-col h-52 overflow-y-auto">
          {cartCtx.cart.map((cartItem) => {
            const totalPrice = (
              cartItem.quantity * Number(cartItem.price)
            ).toFixed(2);
            return (
              <div
                key={cartItem.id}
                className="flex items-center justify-between border-b-2 border-primary_orange pb-2 mb-5"
              >
                <div>
                  <h1 className="text-xl">{cartItem.title}</h1>
                  <p className="font-bold text-lg text-primary_orange">
                    ${totalPrice}
                  </p>
                </div>
                <div className="flex items-center">
                  <span className="p-2 mr-2 bg-white_color rounded-lg font-bold text-primary_orange border-2">
                    {cartItem.quantity}x
                  </span>
                  <button
                    className="mr-1"
                    onClick={() =>
                      cartCtx.addToCart({ ...cartItem, quantity: 1 })
                    }
                  >
                    <Plus className="w-5 stroke-primary_orange" />
                  </button>
                  <button onClick={() => cartCtx.removeFromCart(cartItem.id)}>
                    <Minus className="w-5 stroke-primary_orange" />
                  </button>
                </div>
              </div>
            );
          })}
          <h1 className="text-xl font-bold">
            Total : ${totalPrice.toFixed(2)}
          </h1>
        </div>
      )}
    </>
  );
};

export default CartComponent;
