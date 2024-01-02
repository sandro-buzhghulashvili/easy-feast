import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import UserContextProvider, { userContext } from "../store/user-context";
import { useContext } from "react";

export default function LayoutPage() {
  const ctx = useContext(userContext);

  return (
    <UserContextProvider>
      <Navbar />
      <Outlet />
      <Footer />
    </UserContextProvider>
  );
}
