import React, { useContext, useState } from 'react';

import { useSearchParams, useNavigate } from 'react-router-dom';
import SignUp from './form-components/SignUp';
import Login from './form-components/Login';
import User from '../models/User';

import { userContext } from '../store/user-context';
import LoadingScreen from './UI/LoadingScreen';

const FormComponent: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const ctx = useContext(userContext);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isLoggingIn = searchParams.get('mode') === 'login';

  const registerUser = async (user: User) => {
    try {
      const usersData = await fetch(
        'https://easy-feast-default-rtdb.firebaseio.com/users.json'
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
          'https://easy-feast-default-rtdb.firebaseio.com/users.json',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
          }
        );

        if (!res.ok) throw new Error();

        navigate('/');
        ctx.login(user);
        ctx.applyFlashMessage({
          status: 'success',
          message: 'Successfully registered',
        });
      } else {
        ctx.applyFlashMessage({
          status: 'error',
          message: 'User with following name already exists',
        });
      }
    } catch (e) {
      ctx.applyFlashMessage({
        status: 'error',
        message: 'Could not registered a user',
      });
    }
  };

  const loginUser = async (user: User) => {
    try {
      const res = await fetch(
        'https://easy-feast-default-rtdb.firebaseio.com/users.json'
      );
      const users: User[] | [] = Object.values(await res.json());

      let existingUser: User | undefined = undefined;

      if (users.length > 0) {
        existingUser = users.find(
          (item) =>
            (item.email === user.username || item.username === user.username) &&
            item.password === user.password
        );
      }

      if (existingUser) {
        navigate('/');
        ctx.login(existingUser);
        ctx.applyFlashMessage({
          status: 'success',
          message: 'Successfully logged in',
        });
      } else {
        ctx.applyFlashMessage({
          status: 'error',
          message: "User with given username and password doesn't exists",
        });
      }
    } catch (e) {}
  };

  const submitHandler = async (userData: {
    username: string;
    email?: string;
    password: string;
    id?: string;
    img?: string;
  }) => {
    const loginMode = !userData.email;
    if (loginMode) {
      setLoading(true);
      await loginUser(userData);
      setLoading(false);
    } else {
      setLoading(true);
      await registerUser(userData);
      setLoading(false);
    }
  };

  if (!isLoggingIn) {
    return (
      <>
        {loading && <LoadingScreen />}
        <SignUp onFormSubmit={submitHandler} />
      </>
    );
  } else {
    return (
      <>
        {loading && <LoadingScreen />}
        <Login onFormSubmit={submitHandler} />
      </>
    );
  }
};

export default FormComponent;
