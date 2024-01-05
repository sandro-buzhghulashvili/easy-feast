import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import LayoutPage from './pages/Layout';
import LandingPage from './pages/Landing';
import FormPage from './pages/Form';
import ProfilePage from './pages/Profile';

import UserContextProvider from './store/user-context';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutPage />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: 'form',
        element: <FormPage />,
      },
      {
        path: 'profile',
        element: <ProfilePage />,
      },
    ],
  },
]);

function App() {
  return (
    <UserContextProvider>
      <RouterProvider router={router}></RouterProvider>
    </UserContextProvider>
  );
}

export default App;
