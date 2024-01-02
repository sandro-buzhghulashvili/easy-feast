import React, { useContext } from "react";

import { useSearchParams, useNavigate } from "react-router-dom";
import SignUp from "./form-components/SignUp";
import Login from "./form-components/Login";
import User from "../models/User";

import { userContext } from "../store/user-context";

const FormComponent: React.FC = () => {
  const ctx = useContext(userContext);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isLoggingIn = searchParams.get("mode") === "login";

  const registerUser = async (user: User) => {
    try {
      console.log("start");
      const usersData = await fetch(
        "https://easy-feast-default-rtdb.firebaseio.com/users.json"
      );
      const users = await usersData.json();
      let userArray: User[] | undefined = undefined;

      if (users) userArray = Object.values(users);

      let alreadyExists: any = false;

      if (userArray) {
        alreadyExists = userArray.find(
          (item) => item.email === user.email || item.username === user.username
        );
      }

      if (!alreadyExists) {
        const res = await fetch(
          "https://easy-feast-default-rtdb.firebaseio.com/users.json",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
          }
        );

        if (!res.ok) throw new Error();

        navigate("/");
        ctx.login(user);
        ctx.applyFlashMessage({
          status: "success",
          message: "Successfully registered",
        });
      } else {
        ctx.applyFlashMessage({
          status: "error",
          message: "Could not register a user",
        });
      }
    } catch (e) {
      ctx.applyFlashMessage({
        status: "error",
        message: "Could not registered a user",
      });
    }
  };

  const submitHandler = (userData: {
    username: string;
    email?: string;
    password: string;
    id?: string;
  }) => {
    const loginMode = !userData.email;
    if (loginMode) console.log("You are in login mode");
    else registerUser(userData);
  };

  if (!isLoggingIn) {
    return <SignUp onFormSubmit={submitHandler} />;
  } else {
    return <Login onFormSubmit={submitHandler} />;
  }
};

export default FormComponent;
