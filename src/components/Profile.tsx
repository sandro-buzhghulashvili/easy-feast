import React, { useContext, useEffect, useState } from 'react';
import { userContext } from '../store/user-context';
import { Bell, ChevronRight, Edit, Heart } from 'lucide-react';

import Modal from './UI/Modal';
import { AnimatePresence, motion } from 'framer-motion';
import UpdateProfile from './UpdateProfie';
import LoadingScreen from './UI/LoadingScreen';
import { useNavigate } from 'react-router-dom';

const ProfileComponent: React.FC = () => {
  const navigate = useNavigate();
  const ctx = useContext(userContext);

  const [uploadProfilePicture, setUploadProfilePicture] =
    useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const uploadPictureHandler = () => {
    setUploadProfilePicture((prevValue) => !prevValue);
  };

  const findUserId = async () => {
    try {
      const res = await fetch(
        'https://easy-feast-default-rtdb.firebaseio.com/users.json'
      );
      const usersData: any[] = Object.entries(await res.json());

      const user = usersData.find(
        ([key, value]: [key: string, value: { id: string }]) => {
          if (ctx.user) {
            if (value.id === ctx.user.id) {
              return [key, value];
            }
          }
        }
      );
      const userId = user[0];

      return userId;
    } catch (e) {
      console.log(e);
    }
  };

  const updateUser = async (id: string, newUser: any) => {
    try {
      const usersData = await fetch(
        'https://easy-feast-default-rtdb.firebaseio.com/users.json'
      );
      const users: any[] = Object.values(await usersData.json());
      const userExists = users.find(
        (user) => user.username === newUser.username && user.id !== newUser.id
      );

      if (!userExists) {
        const res = await fetch(
          `https://easy-feast-default-rtdb.firebaseio.com/users/${id}.json`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
          }
        );

        if (!res.ok) {
          throw new Error();
        }

        ctx.login(newUser);
        ctx.applyFlashMessage({
          status: 'success',
          message: 'Successfully updated user',
        });
      } else {
        ctx.applyFlashMessage({
          status: 'error',
          message: 'Username already exists',
        });
      }
    } catch (e) {
      ctx.applyFlashMessage({
        status: 'error',
        message: 'Could not update user',
      });
    }
  };

  const updateUserHandler = async (username: string, img: string) => {
    uploadPictureHandler();
    setLoading(true);
    const updatedUser = {
      ...ctx.user,
      username,
      img,
    };
    const id = await findUserId();
    await updateUser(id, updatedUser);
    setLoading(false);
  };

  const logoutHandler = () => {
    navigate('../');
    ctx.logout();
    ctx.applyFlashMessage({
      status: 'success',
      message: 'Successfully logged out',
    });
  };

  useEffect(() => {
    if (!ctx.user) {
      navigate('../');
      ctx.applyFlashMessage({
        status: 'error',
        message: 'User is not logged in',
      });
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 300 }}
      animate={{ opacity: 1, y: 0 }}
      className="container md:w-3/4 lg:w-1/2 mx-auto px-3 mt-40"
    >
      {loading && <LoadingScreen />}
      <AnimatePresence>
        {uploadProfilePicture && (
          <Modal onClose={uploadPictureHandler}>
            <UpdateProfile onSubmit={updateUserHandler} />
          </Modal>
        )}
      </AnimatePresence>
      <h1 className="text-2xl font-bold mb-5">Profile</h1>
      <div className="flex items-center justify-between p-5 md:px-10 bg-primary_orange rounded-xl mb-10">
        <div className="flex items-center">
          <img
            className="w-1/5 h-full max-h-44 mr-3 border-2 border-white_color rounded-full"
            src={ctx.user?.img}
            alt="user profile"
          />
          <div className="text-white_color">
            <h1 className="text-lg">{ctx.user?.username}</h1>
            <p className="text-sm text-gray_color font-light">
              {ctx.user?.email}
            </p>
          </div>
        </div>
        <span
          onClick={uploadPictureHandler}
          className="md:hover:scale-110 duration-300 cursor-pointer"
        >
          <Edit className="s stroke-white_color" />
        </span>
      </div>
      <ul className="mb-10">
        <li className="flex p-5 font-bold justify-between">
          <div className="flex">
            <Bell className="mr-5 stroke-primary_orange" />
            <p className="font-bold">Help & Support</p>
          </div>
          <ChevronRight className="stroke-gray_color" />
        </li>
        <li className="flex p-5 font-bold justify-between">
          <div className="flex">
            <Heart className="mr-5 stroke-primary_orange" />
            <p className="font-bold">About App</p>
          </div>
          <ChevronRight className="stroke-gray_color" />
        </li>
      </ul>
      <button
        onClick={logoutHandler}
        className="mb-10 bg-primary_orange md:bg-white_color text-white_color px-5 py-3 border-2 border-primary_orange rounded-xl font-bold text-lg md:text-primary_orange md:hover:bg-primary_orange md:hover:text-white_color duration-300"
      >
        Logout
      </button>
    </motion.div>
  );
};

export default ProfileComponent;
