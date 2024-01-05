import { useState, useContext } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import classes from './Navbar.module.scss';

import { userContext } from '../store/user-context';

import { Menu, List, X, User, LocateIcon, Contact, Home } from 'lucide-react';

import { Link } from 'react-router-dom';

export default function Navbar() {
  const ctx = useContext(userContext);
  const [toggleNavBar, setToggleNavbar] = useState<boolean>(false);

  const toggleNavbarHandler = (): void => {
    setToggleNavbar((prevValue) => !prevValue);
  };

  return (
    <div className="flex justify-between items-center py-8 px-8 sm:px-20 lg:px-56 mb-28">
      <Link to="../" className={classes.logo}>
        EASY <span>FEAST</span>
      </Link>
      <AnimatePresence>
        {toggleNavBar && (
          <motion.div
            onClick={toggleNavbarHandler}
            className={classes.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          ></motion.div>
        )}
      </AnimatePresence>
      <span
        className={`${classes.menu} ${toggleNavBar ? classes.exit : undefined}`}
        onClick={toggleNavbarHandler}
      >
        {toggleNavBar ? <X /> : <Menu />}
      </span>
      <ul
        className={`${classes['nav-links']} ${
          toggleNavBar ? classes.active : undefined
        } flex flex-col items-center justify-center `}
      >
        {ctx.user && (
          <Link
            to="profile"
            onClick={toggleNavbarHandler}
            className="flex flex-col items-center p-10 cursor-pointer md:hover:text-primary_orange duration-300"
          >
            <img
              src={ctx.user.img}
              alt="profile"
              className="mb-5 w-20 h-20 rounded-full"
            />
            <h1 className="mb-3 text-xl text-center font-bold">
              {ctx.user.username}
            </h1>
            <p className="text-gray-400">{ctx.user.email}</p>
          </Link>
        )}
        <li>
          <Link to="/" onClick={toggleNavbarHandler}>
            <Home className="mr-5" /> Home
          </Link>
        </li>
        <li onClick={toggleNavbarHandler}>
          <a href="#orders">
            <Contact className="mr-5" /> Contact Us
          </a>
        </li>
        {ctx.user ? (
          <>
            {' '}
            <li onClick={toggleNavbarHandler}>
              <a href="#orders">
                <List className="mr-5" /> My Orders
              </a>
            </li>
            <li onClick={toggleNavbarHandler}>
              <Link to="profile">
                <User className="mr-5" /> My Profile
              </Link>
            </li>
            <li>
              <a href="#orders">
                <LocateIcon className="mr-5" /> Delivery Address
              </a>
            </li>
            <li>
              <a href="#orders">
                <List className="mr-5" /> My Orders
              </a>
            </li>{' '}
          </>
        ) : (
          <>
            <Link
              onClick={toggleNavbarHandler}
              className="bg-white_color py-3 px-10 w-2/3 md:w-3/4 lg:w-1/2 text-center rounded-full text-primary_orange md:hover:scale-110 duration-300 mb-5 "
              to="/form?mode=signup"
            >
              Sign Up
            </Link>
            <Link
              onClick={toggleNavbarHandler}
              className="bg-primary_orange py-3 w-2/3 md:w-3/4 lg:w-1/2 text-center px-10 rounded-full text-white_color md:hover:scale-110 duration-300 mb-5 "
              to="/form?mode=login"
            >
              Login
            </Link>
          </>
        )}
      </ul>
    </div>
  );
}
