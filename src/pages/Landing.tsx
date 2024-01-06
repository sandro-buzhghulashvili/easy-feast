import Landing from "../components/Landing";
import Services from "../components/Services";
import Menu from "../components/Menu";
import AboutUs from "../components/AboutUs";
import { json, useLoaderData } from "react-router-dom";

export default function LandingPage() {
  const data: any = useLoaderData();
  const foods = Object.entries(data);
  return (
    <>
      <Landing />
      <Services />
      <Menu foods={foods} />
      <AboutUs />
    </>
  );
}

export const loader = async () => {
  try {
    const res = await fetch(
      "https://easy-feast-default-rtdb.firebaseio.com/foods.json"
    );

    if (!res.ok)
      throw json({ message: "Could not fetch foods" }, { status: 500 });

    return res;
  } catch (e) {
    throw json({ message: "Could not fetch foods" }, { status: 500 });
  }
};
