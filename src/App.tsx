import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import LayoutPage from './pages/Layout';
import LandingPage, { loader as foodLoader } from './pages/Landing';
import FormPage from './pages/Form';
import ProfilePage from './pages/Profile';

import UserContextProvider from './store/user-context';
import CartContextProvider from './store/cart-context';
import FoodPage, { loader as mealLoader } from './pages/Food';
import AddressPage from './pages/Address';
import OrdersPage from './pages/Orders';
import AdminPanel, {
  loader as adminDataLoader,
  action as deleteAction,
} from './pages/AdminPanel';
import NewMenu, { action as menuAction } from './components/Admin/NewMenu';
import AdminLayoutPage from './pages/AdminLayout';
import NewAddon, { action as addonAction } from './components/Admin/NewAddon';
import ErrorPage from './pages/ErrorPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <LandingPage />,
        loader: foodLoader,
      },
      {
        path: ':id',
        element: <FoodPage />,
        loader: mealLoader,
      },
      {
        path: 'form',
        element: <FormPage />,
      },
      {
        path: 'profile',
        element: <ProfilePage />,
      },
      {
        path: 'address',
        element: <AddressPage />,
      },
      {
        path: 'orders',
        element: <OrdersPage />,
      },
    ],
  },
  {
    path: '/admin',
    errorElement: <ErrorPage />,
    element: <AdminLayoutPage />,
    children: [
      {
        index: true,
        element: <AdminPanel />,
        loader: adminDataLoader,
        action: deleteAction,
      },
      {
        path: 'new-menu',
        element: <NewMenu />,
        action: menuAction,
      },
      {
        path: 'new-addon',
        element: <NewAddon />,
        action: addonAction,
      },
    ],
  },
]);

function App() {
  return (
    <UserContextProvider>
      <CartContextProvider>
        <RouterProvider router={router}></RouterProvider>
      </CartContextProvider>
    </UserContextProvider>
  );
}

export default App;
