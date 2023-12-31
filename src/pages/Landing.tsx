import { useContext, useEffect } from "react";

import Landing from "../components/Landing";
import Services from "../components/Services";
import Menu from "../components/Menu";
import AboutUs from "../components/AboutUs";

import { userContext } from "../store/user-context";

export default function LandingPage() {
  const ctx = useContext(userContext);

  useEffect(() => {
    ctx.login({ email: "smth", username: "sandro", password: "dinidasemi2" });
  }, []);
  console.log(ctx);
  return (
    <>
      <Landing />
      <Services />
      <Menu />
      <AboutUs />
    </>
  );
}
