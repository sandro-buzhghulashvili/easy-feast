import React from 'react';
import { Outlet, useNavigation } from 'react-router-dom';

import AdminNavbar from '../components/Admin/Navbar';
import LoadingScreen from '../components/UI/LoadingScreen';

const AdminLayoutPage: React.FC = () => {
  const navigation = useNavigation();
  return (
    <>
      {(navigation.state === 'loading' ||
        navigation.state === 'submitting') && <LoadingScreen />}
      <AdminNavbar />
      <Outlet />
    </>
  );
};

export default AdminLayoutPage;
