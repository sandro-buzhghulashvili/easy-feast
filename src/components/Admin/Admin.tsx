import React, { useContext, useEffect, useState } from 'react';
import AdminNavbar from './Navbar';
import { userContext } from '../../store/user-context';
import Dashboard from './Dashboard';
import OrderChart from './Chart';
import Menus from './Menus';

interface OrderEntry {
  month: string;
  itemsDelivered: number;
  monthlyRevenue?: number;
}

const AdminComponent: React.FC<{
  usersData: any;
  menuData: any;
  orders: any;
}> = ({ usersData, menuData, orders }) => {
  const orderData = Object.values(orders)[0] as OrderEntry[];
  const userCtx = useContext(userContext);

  const totalRevenue: number = orderData.reduce((a, b: any) => {
    return a + b.monthlyRevenue;
  }, 0);

  return (
    <div>
      <AdminNavbar userData={userCtx.user} />
      <Dashboard
        usersData={usersData}
        menuData={menuData}
        totalRevenue={Math.round(totalRevenue / 1000)}
      />
      <OrderChart orderData={orderData} />
      <Menus menu={Object.values(menuData)} />
    </div>
  );
};

export default AdminComponent;
