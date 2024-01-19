import React from "react";
import Dashboard from "./Dashboard";
import OrderChart from "./Chart";
import Menus from "./Menus";
import Orders from "./Orders";

interface OrderEntry {
  month: string;
  itemsDelivered: number;
  monthlyRevenue?: number;
}

const AdminComponent: React.FC<{
  usersData: any;
  menuData: any;
  orders: any;
  addons: any;
}> = ({ usersData, menuData, orders, addons }) => {
  const orderData = Object.values(orders)[0] as OrderEntry[];

  const totalRevenue: number = orderData.reduce((a, b: any) => {
    return a + b.monthlyRevenue;
  }, 0);

  return (
    <div>
      <Dashboard
        usersData={usersData}
        menuData={menuData}
        totalRevenue={Math.round(totalRevenue / 1000)}
      />
      <OrderChart orderData={orderData} />
      <Menus menu={Object.values(menuData)} addons={Object.values(addons)} />
      <Orders users={usersData} />
    </div>
  );
};

export default AdminComponent;
