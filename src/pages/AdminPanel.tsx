import React, { useContext, useEffect } from 'react';
import { userContext } from '../store/user-context';
import { json, useLoaderData, useNavigate } from 'react-router-dom';
import AdminComponent from '../components/Admin/Admin';

const AdminPanel: React.FC = () => {
  const data = useLoaderData() as any;
  const ctx = useContext(userContext);
  const navigate = useNavigate();
  const isAdmin = ctx.user?.admin;

  useEffect(() => {
    if (!isAdmin) navigate('/');
  }, []);
  return (
    <>
      {isAdmin && (
        <AdminComponent
          usersData={data.users}
          menuData={data.menu}
          orders={data.orders}
        />
      )}
    </>
  );
};

export const loader = async () => {
  try {
    const users = await fetch(
      'https://easy-feast-default-rtdb.firebaseio.com/users.json'
    );
    const menu = await fetch(
      'https://easy-feast-default-rtdb.firebaseio.com/foods.json'
    );
    const orders = await fetch(
      'https://easy-feast-default-rtdb.firebaseio.com/orderDynamics.json'
    );

    if (!users.ok || !menu.ok) {
      throw json({ message: 'Could not load admin panel' }, { status: 500 });
    }

    const data = {
      users: await users.json(),
      menu: await menu.json(),
      orders: await orders.json(),
    };

    return data;
  } catch {
    throw json({ message: 'Could not load admin panel' }, { status: 500 });
  }
};

export default AdminPanel;
