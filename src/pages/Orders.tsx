import React, { useContext, useEffect } from 'react';
import { userContext } from '../store/user-context';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const OrdersPage: React.FC = () => {
  const userCtx = useContext(userContext);
  const navigate = useNavigate();

  console.log(userCtx.user?.orders);

  const removeFromDatabase = async () => {
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

  const removeOrder = (id: string) => {
    userCtx.removeOrder(id);
  };

  useEffect(() => {
    if (!userCtx.user) {
      navigate('/');
      userCtx.applyFlashMessage({
        status: 'error',
        message: 'User is not logged in',
      });
    }
    removeFromDatabase();
  }, [userCtx.user?.orders]);
  return (
    <motion.div
      initial={{ opacity: 0, y: 300 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-40 p-5"
    >
      {userCtx.user?.orders && userCtx.user.orders.length > 0 ? (
        <div>
          <h1 className="text-2xl mx-auto my-5 mb-16 w-fit font-bold">
            Your Orders
          </h1>
          <div className="container mx-auto my-16 flex flex-wrap justify-center overflow-x-auto">
            {userCtx.user.orders.map((order) => {
              return (
                <div
                  className="p-10 h-full m-5 border-2 rounded-xl border-primary_orange w-fit inline-block"
                  key={userCtx.user?.orders?.indexOf(order)}
                >
                  {order.foods.map((food) => {
                    return (
                      <div
                        key={food.id}
                        className="mb-2 pb-1 border-b-2 border-typography_color"
                      >
                        <h1 className="text-xl font-bold mb-1">
                          {food.title} x{food.quantity}
                        </h1>
                        {food.addon && (
                          <h1>
                            +{food.addon.title} x{food.quantity}
                          </h1>
                        )}
                      </div>
                    );
                  })}
                  <h1 className="text-xl font-bold text-primary_orange">
                    ${order.price.toFixed(2)}
                  </h1>
                  {order.location && (
                    <h1 className="text-lg text-gray_color font-bold">
                      {order.location.location}, {order.location.address}
                    </h1>
                  )}
                  <h1 className="font-bold mb-5 text-primary_yellow">
                    {order.date}
                  </h1>
                  <button
                    className="px-5 py-2 bg-red_color text-white_color rounded-xl cursor-pointer md:hover:scale-110 duration-300"
                    onClick={() => removeOrder(order.id)}
                  >
                    Cancel
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <h1 className="my-44 w-fit m-auto text-2xl font-bold text-center">
          You have not ordered anything yet
        </h1>
      )}
    </motion.div>
  );
};

export default OrdersPage;
