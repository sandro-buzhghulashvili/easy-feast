import React, { FormEvent, useEffect, useState } from "react";

import classes from "./Form.module.scss";
import { Link } from "react-router-dom";

import useInput from "../../hooks/use-input";
import User from "../../models/User";

const Login: React.FC<{ onFormSubmit: (userConfig: User) => void }> = ({
  onFormSubmit,
}) => {
  const [formIsValid, setFormIsValid] = useState(false);
  const {
    value: usernameValue,
    hasError: usernameHasError,
    isValid: usernameIsValid,
    valueChangeHandler: usernameChangeHandler,
    blurHandler: usernameBlurHandler,
  } = useInput((value) => value.trim().length > 0);

  const {
    value: passwordValue,
    hasError: passwordHasError,
    isValid: passwordIsValid,
    valueChangeHandler: passwordChangeHandler,
    blurHandler: passwordBlurHandler,
  } = useInput((value) => value.trim().length > 0);

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();

    const obj = {
      username: usernameValue,
      password: passwordValue,
    };

    onFormSubmit(obj);
  };

  useEffect(() => {
    if (usernameIsValid && passwordIsValid) setFormIsValid(true);
    else setFormIsValid(false);
  }, [usernameIsValid, passwordIsValid]);

  return (
    <form
      onSubmit={submitHandler}
      className='container mx-auto p-10 md:px-52 mb-28'
    >
      <div
        className={`${classes["form-control"]} ${
          usernameHasError ? classes.invalid : undefined
        }`}
      >
        <label htmlFor='username'>Username or E-Mail</label>
        <input
          type='text'
          value={usernameValue}
          onChange={usernameChangeHandler}
          onBlur={usernameBlurHandler}
        />
      </div>
      <div
        className={`${classes["form-control"]} ${
          passwordHasError ? classes.invalid : undefined
        }`}
      >
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          value={passwordValue}
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
        />
      </div>
      <p className='mb-5'>
        Don't have an account ?{" "}
        <Link
          className='font-bold text-primary_orange'
          to='/form?mode=register'
        >
          Register
        </Link>
      </p>
      <button
        disabled={!formIsValid}
        className={`${
          !formIsValid && "cursor-not-allowed opacity-70"
        } py-3 px-10 bg-primary_orange text-white_color rounded-full`}
      >
        Login
      </button>
    </form>
  );
};

export default Login;
