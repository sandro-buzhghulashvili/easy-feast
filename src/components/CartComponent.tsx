import React, { useContext, useEffect } from 'react';
import { cartContext } from '../store/cart-context';
import { Minus, Plus } from 'lucide-react';

import classes from './CartComponent.module.scss';
import { userContext } from '../store/user-context';
import { OrderObject } from '../models/User';
import { useNavigate } from 'react-router-dom';

const CartComponent: React.FC = () => {
  const cartCtx = useContext(cartContext);
  const userCtx = useContext(userContext);
  const navigate = useNavigate();
  let orderPrice = 0;

  const addOrdersToDatabase = async () => {
    try {
      const res = await fetch(
        'https://easy-feast-default-rtdb.firebaseio.com/users.json'
      );
      const userEntries = Object.entries(await res.json());
      const user = userEntries.find(([id, user]: [id: any, user: any]) => {
        if (userCtx.user) {
          if (user.id === userCtx.user.id) {
            return id;
          }
        }
      });
      let userId: undefined | string = undefined;
      if (user) userId = user[0];

      if (res.ok) {
        fetch(
          'https://easy-feast-default-rtdb.firebaseio.com/users/' +
            userId +
            '.json',
          {
            method: 'PATCH',
            body: JSON.stringify({
              orders: userCtx.user?.orders,
            }),
          }
        );
      }
    } catch {
      userCtx.applyFlashMessage({
        status: 'error',
        message: 'Failed to order',
      });
    }
  };
  console.log(userCtx);
  const handleOrder = () => {
    const orderObj: OrderObject = {
      id: new Date().toISOString(),
      foods: cartCtx.cart,
      date: new Date().toDateString(),
      price: orderPrice,
      location: userCtx.user?.address,
    };
    userCtx.addOrder(orderObj);
    cartCtx.clearCart();
    cartCtx.displayCartFunc();
    navigate('/orders');
    userCtx.applyFlashMessage({
      status: 'success',
      message: 'Successfully ordered!',
    });
  };

  useEffect(() => {
    addOrdersToDatabase();
  }, [userCtx.user?.orders]);
  return (
    <>
      {cartCtx.cart.length === 0 ? (
        <h1 className="text-2xl text-center font-bold">
          You don't have any items in cart
        </h1>
      ) : (
        <>
          <div
            className={`flex flex-col max-h-52 mb-10 overflow-y-auto ${classes.cart}`}
          >
            {cartCtx.cart.map((cartItem) => {
              let totalPrice = cartItem.quantity * Number(cartItem.price);
              if (cartItem.addon)
                totalPrice += cartItem.quantity * Number(cartItem.addon.price);
              orderPrice += totalPrice;
              return (
                <div
                  key={cartItem.id}
                  className="flex items-center justify-between border-b-2 border-primary_orange pb-2 mb-5"
                >
                  <div>
                    <h1 className="text-xl md:text-2xl">{cartItem.title}</h1>
                    {cartItem.addon && (
                      <p className="text-sm md:text-lg font-bold">
                        + {cartItem.addon.title} x{cartItem.quantity} - $
                        {cartItem.addon.price}
                      </p>
                    )}
                    <p className="font-bold text-lg text-primary_orange">
                      ${totalPrice.toFixed(2)}
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
          </div>
          <h1 className="text-xl font-bold mb-5">
            Total : ${orderPrice.toFixed(2)}
          </h1>
          <button
            onClick={handleOrder}
            className="px-5 py-2 bg-primary_orange text-white_color rounded-full font-bold md:hover:scale-110 duration-300"
          >
            Order
          </button>
        </>
      )}
    </>
  );
};

export default CartComponent;
