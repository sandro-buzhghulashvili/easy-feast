import { DollarSign, List, ListOrdered, Plus, User2Icon } from 'lucide-react';
import React from 'react';

const Dashboard: React.FC<{
  usersData: any;
  menuData: any;
  totalRevenue: number;
}> = ({ usersData, menuData, totalRevenue }) => {
  const users = Object.values(usersData);
  const menu = Object.values(menuData);

  const totalOrders: any = users
    .filter((user: any) => user.orders)
    .reduce(
      (a: any, b: any) => Number(a.orders.length) + Number(b.orders.length)
    );
  console.log(new Date().toLocaleString('en-US', { month: 'long' }));
  return (
    <div className="container mx-auto p-10 lg:px-32 mb-16">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-2xl md:text-3xl font-semibold">Dashboard</h1>
        <button className="flex items-center px-3 md:px-5 py-2 bg-primary_orange text-white_color rounded-xl cursor-pointer md:hover:scale-110 duration-300">
          <span className="inline-block mr-2">
            <Plus />
          </span>
          Add Menu
        </button>
      </div>
      <div className="flex flex-wrap justify-center lg:justify-between">
        <div className="flex w-fit lg:w-1/5 justify-center items-center p-5 shadow-xl mr-5 my-5">
          <span className="mr-4 p-3 rounded-full bg-gray-300">
            <List className="w-7" />
          </span>
          <div className="text-center">
            <p className="text-2xl font-bold">{menu.length}</p>
            <p className="text-sm text-gray-500">TOTAL MENUS</p>
          </div>
        </div>
        <div className="flex w-fit lg:w-1/5 justify-center items-center p-5 shadow-xl mr-5 my-5">
          <span className="mr-4 p-3 rounded-full bg-gray-300">
            <DollarSign className="w-7" />
          </span>
          <div className="text-center">
            <p className="text-2xl font-bold">{totalRevenue}k</p>
            <p className="text-sm text-gray-500">TOTAL REVENUE</p>
          </div>
        </div>
        <div className="flex w-fit lg:w-1/5 justify-center items-center p-5 shadow-xl mr-5 my-5">
          <span className="mr-4 p-3 rounded-full bg-gray-300">
            <ListOrdered className="w-7" />
          </span>
          <div className="text-center">
            <p className="text-2xl font-bold">
              {typeof totalOrders === 'number' ? totalOrders : '1'}
            </p>
            <p className="text-sm text-gray-500">TOTAL ORDERS</p>
          </div>
        </div>
        <div className="flex w-fit lg:w-1/5 justify-center items-center p-5 shadow-xl mr-5 my-5">
          <span className="mr-4 p-3 rounded-full bg-gray-300">
            <User2Icon className="w-7" />
          </span>
          <div className="text-center">
            <p className="text-2xl font-bold">{users.length}</p>
            <p className="text-sm text-gray-500">TOTAL CLIENTS</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
