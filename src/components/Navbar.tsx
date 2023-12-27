import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import classes from "./Navbar.module.scss";

import { Menu, List, X, User, LocateIcon, Contact, Home } from "lucide-react";

import profileImg from "../assets/temporary-icon.png";

export default function Navbar() {
  const [toggleNavBar, setToggleNavbar] = useState<boolean>(false);

  const toggleNavbarHandler = (): void => {
    setToggleNavbar((prevValue) => !prevValue);
  };
  return (
    <div className='flex justify-between items-center py-8 px-8 sm:px-20 lg:px-56 mb-10'>
      <h1 className={classes.logo}>
        EASY <span>FEAST</span>
      </h1>
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
        className={`${classes["nav-links"]} ${
          toggleNavBar ? classes.active : undefined
        } flex flex-col items-center justify-center `}
      >
        <li className='flex flex-col items-center p-10'>
          <img
            src={profileImg}
            alt='profile'
            className='mb-5 rounded-full cursor-pointer'
          />
          <h1 className='mb-3 text-xl font-bold'>Farion Wick</h1>
          <p className='text-gray-400'>farionwick@gmail.com</p>
        </li>
        <li>
          <a href='#orders'>
            <Home className='mr-5' /> Home
          </a>
        </li>
        <li>
          <a href='#orders'>
            <Contact className='mr-5' /> Contact Us
          </a>
        </li>
        <li>
          <a href='#orders'>
            <List className='mr-5' /> My Orders
          </a>
        </li>
        <li>
          <a href='#orders'>
            <User className='mr-5' /> My Profile
          </a>
        </li>
        <li>
          <a href='#orders'>
            <LocateIcon className='mr-5' /> Delivery Address
          </a>
        </li>
        <li>
          <a href='#orders'>
            <List className='mr-5' /> My Orders
          </a>
        </li>
      </ul>
    </div>
  );
}
