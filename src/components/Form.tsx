import React, { useEffect, useState } from "react";

import classes from "./Form.module.scss";
import { Link, useSearchParams } from "react-router-dom";

import useInput from "../hooks/use-input";

const FormComponent: React.FC = () => {
  const [formIsValid,setFormIsValid] = useState(false)
  const {
    value : usernameValue,
    hasError : usernameHasError,
    isValid : usernameIsValid,
    valueChangeHandler : usernameChangeHandler,
    blurHandler : usernameBlurHandler
  } = useInput(value => value.trim().length > 0)

  const {
    value : emailValue,
    hasError : emailHasError,
    isValid : emailIsValid,
    valueChangeHandler : emailChangeHandler,
    blurHandler : emailBlurHandler
  } = useInput(value => value.trim().length > 0 && value.includes('@'))


  const {
    value : passwordValue,
    hasError : passwordHasError,
    isValid : passwordIsValid,
    valueChangeHandler : passwordChangeHandler,
    blurHandler : passwordBlurHandler
  } = useInput(value => value.trim().length > 0)

  const [searchParams] = useSearchParams();

  const isLoggingIn = searchParams.get("mode") === "login";

  useEffect(() => {
    if(isLoggingIn) {
      console.log(usernameIsValid, passwordIsValid)
      if(usernameIsValid && passwordIsValid) setFormIsValid(true)
      else setFormIsValid(false)
    } else {
      if(usernameIsValid && passwordIsValid && emailIsValid) setFormIsValid(true)
      else setFormIsValid(false)
    }
  }, [usernameIsValid, emailIsValid, passwordIsValid])

  return (
    <form className='container mx-auto p-10 md:px-52 mb-28'>
      <div className={`${classes["form-control"]} ${usernameHasError ? classes.invalid : undefined}`}>
        <label htmlFor='username'>Username {isLoggingIn && "or E-Mail"}</label>
        <input type='text' value={usernameValue} onChange={usernameChangeHandler} onBlur={usernameBlurHandler} />
      </div>
      {!isLoggingIn && (
        <div className={`${classes["form-control"]} ${emailHasError ? classes.invalid : undefined}`}>
          <label htmlFor='email'>E-Mail</label>
          <input type='text' value={emailValue} onChange={emailChangeHandler} onBlur={emailBlurHandler} />
        </div>
      )}
      <div className={`${classes["form-control"]} ${passwordHasError ? classes.invalid : undefined}`}>
        <label htmlFor='password'>Password</label>
        <input type='password' value={passwordValue} onChange={passwordChangeHandler} onBlur={passwordBlurHandler} />
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
      <button disabled={!formIsValid} className={`${!formIsValid && "cursor-not-allowed opacity-70"} py-3 px-10 bg-primary_orange text-white_color rounded-full`}>
        {isLoggingIn ? "Login" : "Sign Up"}
      </button>
    </form>
  );
};

export default FormComponent;
