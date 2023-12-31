import React from "react";

import classes from "./Footer.module.scss";

import { Instagram, Facebook, Twitter, Send } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <div
      className={`${classes.container} mx-auto p-10 flex justify-center flex-wrap bg-light_orange`}
    >
      <div className={classes["footer-section"]}>
        <h1>EASY FEAST</h1>
        <p className='mb-5 w-fit'>
          Our job is to filling your tummy with delicious food and with fast and
          free delivery.
        </p>
        <span className='inline-block mr-3 cursor-pointer'>
          <Instagram className='stroke-primary_orange' />
        </span>
        <span className='inline-block mr-3 cursor-pointer'>
          <Facebook className='stroke-none fill-primary_orange' />
        </span>
        <span className='inline-block cursor-pointer'>
          <Twitter className='stroke-none fill-primary_orange' />
        </span>
      </div>
      <div className={classes["footer-section"]}>
        <h1>About</h1>
        <ul>
          <li>About Us</li>
          <li>Features</li>
          <li>News</li>
          <li>Menu</li>
        </ul>
      </div>
      <div className={classes["footer-section"]}>
        <h1>Support</h1>
        <ul>
          <li>Account</li>
          <li>Support Center</li>
          <li>Feedback</li>
          <li>Contact Us</li>
          <li>Accessibility</li>
        </ul>
      </div>
      <div className={`${classes["footer-section"]} mr-0`}>
        <h1>Get in Touch</h1>
        <p className='mb-3'>Question or feedback?</p>
        <p className='mb-5'>We’d love to hear from you</p>
        <button className='p-3 px-5 border-2 border-gray_color rounded-full md:hover:scale-110 transition duration-500'>
          Email Address{" "}
          <Send className='inline-block ml-3 stroke-primary_orange' />
        </button>
      </div>
    </div>
  );
};

export default Footer;
