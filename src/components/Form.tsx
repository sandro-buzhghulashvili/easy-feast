import React from "react";

import classes from "./Form.module.scss";
import { Link, useSearchParams } from "react-router-dom";

const FormComponent: React.FC = () => {
  const [searchParams] = useSearchParams();

  const isLoggingIn = searchParams.get("mode") === "login";

  return (
    <form className='container mx-auto p-10 md:px-52 mb-28'>
      <div className={`${classes["form-control"]}`}>
        <label htmlFor='username'>Username {isLoggingIn && "or E-Mail"}</label>
        <input type='text' />
      </div>
      {!isLoggingIn && (
        <div className={`${classes["form-control"]}`}>
          <label htmlFor='email'>E-Mail</label>
          <input type='text' />
        </div>
      )}
      <div className={`${classes["form-control"]}`}>
        <label htmlFor='password'>Password</label>
        <input type='password' />
      </div>
      <p className='mb-5'>
        {!isLoggingIn ? "Already have an account?" : "Don't have an account"}{" "}
        <Link
          className='font-bold text-primary_orange'
          to={`/form?mode=${isLoggingIn ? "signup" : "login"}`}
        >
          {!isLoggingIn ? "Login" : "Register"}
        </Link>
      </p>
      <button className='py-3 px-10 bg-primary_orange text-white_color rounded-full'>
        {isLoggingIn ? "Login" : "Sign Up"}
      </button>
    </form>
  );
};

export default FormComponent;
