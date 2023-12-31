import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import UserContextProvider from "../store/user-context";

export default function LayoutPage() {
  return (
    <UserContextProvider>
      <Navbar />
      <Outlet />
      <Footer />
    </UserContextProvider>
  );
}
