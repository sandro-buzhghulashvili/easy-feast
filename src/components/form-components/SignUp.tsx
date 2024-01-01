import React, { useEffect, useState } from 'react';

import classes from './Form.module.scss';
import { Link } from 'react-router-dom';

import useInput from '../../hooks/use-input';

const SignUp: React.FC = () => {
  const [formIsValid, setFormIsValid] = useState(false);

  const {
    value: usernameValue,
    hasError: usernameHasError,
    isValid: usernameIsValid,
    valueChangeHandler: usernameChangeHandler,
    blurHandler: usernameBlurHandler,
  } = useInput((value) => value.trim().length > 0);

  const {
    value: emailValue,
    hasError: emailHasError,
    isValid: emailIsValid,
    valueChangeHandler: emailChangeHandler,
    blurHandler: emailBlurHandler,
  } = useInput((value) => value.trim().length > 0 && value.includes('@'));

  const {
    value: passwordValue,
    hasError: passwordHasError,
    isValid: passwordIsValid,
    valueChangeHandler: passwordChangeHandler,
    blurHandler: passwordBlurHandler,
  } = useInput((value) => value.trim().length > 0);

  const chooseAvatarHandler = (event: any) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (usernameIsValid && passwordIsValid && emailIsValid)
      setFormIsValid(true);
    else setFormIsValid(false);
  }, [usernameIsValid, passwordIsValid, emailIsValid]);

  return (
    <form className="container mx-auto p-10 md:px-52 mb-28">
      <div
        className={`${classes['form-control']} ${
          usernameHasError ? classes.invalid : undefined
        }`}
      >
        <label htmlFor="username">Username</label>
        <input
          type="text"
          value={usernameValue}
          onChange={usernameChangeHandler}
          onBlur={usernameBlurHandler}
        />
      </div>
      <div
        className={`${classes['form-control']} ${
          emailHasError ? classes.invalid : undefined
        }`}
      >
        <label htmlFor="email">E-Mail</label>
        <input
          type="text"
          value={emailValue}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
        />
      </div>
      <div className={`${classes['form-control']} ${classes.file}`}>
        <label htmlFor="image">
          Upload your profile picture or choose avatar
        </label>
        <div className={classes['file-container']}>
          <label htmlFor="img" className={classes['upload-img']}>
            Choose File
          </label>
          <input id="img" type="file" />
        </div>
      </div>
      <div className={classes['form-control']}>
        <button className={classes['choose-avatar']}>Choose Avatar</button>
      </div>
      <div
        className={`${classes['form-control']} ${
          passwordHasError ? classes.invalid : undefined
        }`}
      >
        <label htmlFor="password">Password</label>
        <input
          type="password"
          value={passwordValue}
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
        />
      </div>
      <p className="mb-5">
        Already have an account ?{' '}
        <Link className="font-bold text-primary_orange" to="/form?mode=login">
          Login
        </Link>
      </p>
      <button
        disabled={!formIsValid}
        className={`${
          !formIsValid && 'cursor-not-allowed opacity-70'
        } py-3 px-10 bg-primary_orange text-white_color rounded-full`}
      >
        Sign up
      </button>
    </form>
  );
};

export default SignUp;
