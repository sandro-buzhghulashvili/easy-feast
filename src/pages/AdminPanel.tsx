import React, { useContext, useEffect } from "react";
import { userContext } from "../store/user-context";
import { json, redirect, useLoaderData, useNavigate } from "react-router-dom";
import AdminComponent from "../components/Admin/Admin";

const AdminPanel: React.FC = () => {
  const data = useLoaderData() as any;
  const ctx = useContext(userContext);
  const navigate = useNavigate();
  const isAdmin = ctx.user?.admin;

  useEffect(() => {
    if (!isAdmin) navigate("/");
  }, []);
  return (
    <>
      {isAdmin && (
        <AdminComponent
          usersData={data.users}
          menuData={data.menu}
          orders={data.orders}
          addons={data.addons}
        />
      )}
    </>
  );
};

export const action = async ({ request }: { request: any }) => {
  try {
    const data = await request.formData();
    const menuId = data.get("id");

    console.log(data.get("mode"));

    let url = "https://easy-feast-default-rtdb.firebaseio.com/foods.json";

    if (data.get("mode") === "addons") {
      url =
        "https://easy-feast-default-rtdb.firebaseio.com/addons/-Nn_PdepfniS2u3fpUJU.json";
    }

    const res = await fetch(url);
    const foods = Object.entries(await res.json());

    if (!res.ok) {
      throw json({ message: "Could not delete menu item" }, { status: 500 });
    }

    const menuItem: any = foods.find((entry: any) => entry[1].id === menuId);
    const id = menuItem[0];
    console.log(id);

    const deleteResponse = await fetch(
      `https://easy-feast-default-rtdb.firebaseio.com/${
        data.get("mode") === "addons"
          ? "addons/-Nn_PdepfniS2u3fpUJU/"
          : "foods/"
      }/` +
        id +
        ".json",
      {
        method: request.method,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!deleteResponse.ok) {
      throw json({ message: "Could not delete menu item" }, { status: 500 });
    }

    return redirect("/");
  } catch {
    throw json({ message: "Could not delete menu item" }, { status: 500 });
  }
};

export const loader = async () => {
  try {
    const users = await fetch(
      "https://easy-feast-default-rtdb.firebaseio.com/users.json"
    );
    const menu = await fetch(
      "https://easy-feast-default-rtdb.firebaseio.com/foods.json"
    );
    const orders = await fetch(
      "https://easy-feast-default-rtdb.firebaseio.com/orderDynamics.json"
    );
    const addons = await fetch(
      "https://easy-feast-default-rtdb.firebaseio.com/addons/-Nn_PdepfniS2u3fpUJU.json"
    );

    if (!users.ok || !menu.ok) {
      throw json({ message: "Could not load admin panel" }, { status: 500 });
    }

    const data = {
      users: await users.json(),
      menu: await menu.json(),
      orders: await orders.json(),
      addons: await addons.json(),
    };

    return data;
  } catch {
    throw json({ message: "Could not load admin panel" }, { status: 500 });
  }
};

export default AdminPanel;
