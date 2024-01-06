import React, { useEffect } from "react";
import { useLoaderData } from "react-router-dom";

const FoodPage: React.FC = () => {
  const foodData = useLoaderData();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  console.log(foodData);
  return <h1>this is food page</h1>;
};

export const loader = async ({ params }: { params: any }) => {
  try {
    const response = await fetch(
      "https://easy-feast-default-rtdb.firebaseio.com/foods/" +
        params.id +
        ".json"
    );

    return response;
  } catch (e) {}
};

export default FoodPage;
