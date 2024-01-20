import React, { useContext, useState } from "react";
import User from "../../models/User";

import classes from "./Orders.module.scss";
import { userContext } from "../../store/user-context";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../UI/LoadingScreen";

const Orders: React.FC<{ users: any }> = ({ users }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const ctx = useContext(userContext);
  const usersData: User[] = Object.values(users);
  const filteredUsers = usersData.filter((user: User) => user.orders);
  const orders: any[] = [];
  filteredUsers.forEach((user) => {
    if (user.orders) {
      user.orders.map((order) => {
        const orderObj = {
          username: user.username,
          order,
        };
        orders.push(orderObj);
      });
    }
  });

  const updateOrderDynamics = async ([confirmedOrder]: [
    confirmedOrder: any
  ]) => {
    try {
      const res = await fetch(
        "https://easy-feast-default-rtdb.firebaseio.com/orderDynamics/-NoJ09XhC7GxvAv1IocK.json"
      );
      const orderDynamics = await res.json();
      let updatedDynamics = orderDynamics.slice();
      const currentMonth = new Date().toLocaleString("en-US", {
        month: "long",
      });
      const monthExists = orderDynamics.find(
        (stat: any) => stat.month === currentMonth
      );
      if (!monthExists) {
        updatedDynamics.push({
          itemsDelivered: 1,
          month: currentMonth,
          monthlyRevenue: confirmedOrder.price,
        });
      } else {
        updatedDynamics = updatedDynamics.map((stat: any) => {
          if (stat.month === currentMonth) {
            return {
              ...stat,
              itemsDelivered: stat.itemsDelivered + 1,
              monthlyRevenue:
                Number(stat.monthlyRevenue) + Number(confirmedOrder.price),
            };
          } else {
            return stat;
          }
        });
      }
      if (!res.ok) {
        throw new Error();
      }

      fetch(
        "https://easy-feast-default-rtdb.firebaseio.com/orderDynamics/-NoJ09XhC7GxvAv1IocK.json",
        {
          method: "PUT",
          body: JSON.stringify(updatedDynamics),
        }
      );
    } catch {
      ctx.applyFlashMessage({
        status: "error",
        message: "Could not update order dynamics",
      });
    }
  };

  const confirmOrderDelivery = async (orderId: string) => {
    setLoading(true);
    try {
      const usersData = Object.entries(users).filter(
        ([_, user]: [id: string, user: any]) => user.orders
      );
      const currentUser: any = usersData.find(
        ([id, user]: [id: string, user: any]) => {
          if (user.orders.find((order: any) => order.id === orderId)) {
            return id;
          }
        }
      );
      const currentUserId = currentUser[0];
      const confirmedOrder = currentUser[1].orders.filter(
        (order: any) => order.id === orderId
      );
      await updateOrderDynamics(confirmedOrder);
      const updatedOrders = currentUser[1].orders.filter(
        (order: any) => order.id !== orderId
      );

      const res = await fetch(
        "https://easy-feast-default-rtdb.firebaseio.com/users/" +
          currentUserId +
          ".json",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orders: updatedOrders,
          }),
        }
      );

      if (!res.ok) {
        setLoading(false);
        ctx.applyFlashMessage({
          status: "error",
          message: "Could not confirm order",
        });
      } else {
        setLoading(false);
        ctx.applyFlashMessage({
          status: "success",
          message: "Successfully confirmed delivery",
        });
        navigate("/");
      }
    } catch {
      setLoading(false);
      ctx.applyFlashMessage({
        status: "error",
        message: "Could not confirm order",
      });
    }
  };
  return (
    <div className='container mx-auto mb-28'>
      {loading && <LoadingScreen />}
      <h1 className='text-2xl font-bold text-center mb-10'>Incoming Orders:</h1>
      <div
        className={`whitespace-nowrap lg:whitespace-normal lg:text-center overflow-x-auto pb-5 ${classes.orders}`}
      >
        {orders.length > 0 ? (
          orders.map(({ username, order }) => {
            return (
              <div
                className='p-10 h-full m-5 border-2 rounded-xl border-primary_orange w-fit inline-block'
                key={order.id}
              >
                <h1 className='mb-5 text-xl font-bold text-primary_orange pb-2 border-b-2 border-primary_orange'>
                  From : {username}
                </h1>
                {order.foods.map((food: any) => {
                  return (
                    <div
                      key={food.id}
                      className='mb-2 pb-1 border-b-2 border-typography_color'
                    >
                      <h1 className='text-xl font-bold mb-1'>
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
                <h1 className='text-xl font-bold text-primary_orange'>
                  ${order.price.toFixed(2)}
                </h1>
                {order.location && (
                  <h1 className='text-lg text-gray_color font-bold'>
                    {order.location.location}, {order.location.address}
                  </h1>
                )}
                <h1 className='font-bold mb-5 text-primary_yellow'>
                  {order.date}
                </h1>
                <button
                  onClick={() => confirmOrderDelivery(order.id)}
                  className='px-5 py-2 bg-green-700 text-white_color rounded-xl cursor-pointer md:hover:scale-110 duration-300'
                >
                  Confirm Delivery
                </button>
              </div>
            );
          })
        ) : (
          <h1 className='text-xl text-center'>Nobody ordered anything yet!</h1>
        )}
      </div>
    </div>
  );
};

export default Orders;
