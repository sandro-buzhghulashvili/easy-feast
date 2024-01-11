import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import LayoutPage from './pages/Layout';
import LandingPage, { loader as foodLoader } from './pages/Landing';
import FormPage from './pages/Form';
import ProfilePage from './pages/Profile';

import UserContextProvider from './store/user-context';
import CartContextProvider from './store/cart-context';
import FoodPage, { loader as mealLoader } from './pages/Food';
import AddressPage from './pages/Address';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutPage />,
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
