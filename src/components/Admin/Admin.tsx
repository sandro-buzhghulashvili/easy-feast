import React, { useContext } from "react";
import Dashboard from "./Dashboard";
import OrderChart from "./Chart";
import Menus from "./Menus";
import Orders from "./Orders";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../store/user-context";

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
  const navigate = useNavigate();
  const ctx = useContext(userContext);

  const totalRevenue: number = orderData.reduce((a, b: any) => {
    return a + b.monthlyRevenue;
  }, 0);

  const logoutHandler = () => {
    ctx.logout();
    navigate("/");
  };

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
      <button
        onClick={logoutHandler}
        className='mx-auto mb-10 font-bold block px-7 py-2 text-xl bg-primary_orange text-white rounded-xl md:hover:scale-110 duration-300'
      >
        Logout
      </button>
    </div>
  );
};

export default AdminComponent;
