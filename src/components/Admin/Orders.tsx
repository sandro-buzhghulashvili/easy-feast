import React from "react";
import User from "../../models/User";

const Orders: React.FC<{ users: any }> = ({ users }) => {
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
  console.log(orders);
  return <h1>Orders</h1>;
};

export default Orders;
