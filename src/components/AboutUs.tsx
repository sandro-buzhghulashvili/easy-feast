import React from "react";

import classes from "./AboutUs.module.scss";
import chiefImg from "../assets/about-us/chef-holding-vegetables 1.png";
import leaf1 from "../assets/about-us/leaf-1.png";
import leaf2 from "../assets/about-us/leaf-2.png";
import onion from "../assets/about-us/onion.png";
import mushroom from "../assets/about-us/mushroom.png";

import user1 from "../assets/about-us/user1.png";
import user2 from "../assets/about-us/user2.png";
import user3 from "../assets/about-us/user3.png";
import { Star } from "lucide-react";

const AboutUs: React.FC = () => {
  return (
    <div className='md:flex container mx-auto mb-20'>
      <div
        className={`${classes.about} relative flex justify-center w-2/3 md:w-1/3 md:items-center mx-auto mb-28`}
      >
        <img
          className='relative'
          src={chiefImg}
          alt='chief holding vegetables'
        />
        <div className={`${classes.rect}`}></div>
        <img className='absolute top-0 right-0' src={leaf1} alt='leaf' />
        <img className='absolute top-10 -right-10' src={leaf2} alt='leaf' />
        <img className='absolute top-0 -left-10' src={onion} alt='onion' />
        <img
          className='absolute top-1/2 -left-10'
          src={mushroom}
          alt='mushroom'
        />
        <div
          className={`${classes["review-profile"]} absolute -bottom-5 right-0 bg-white_color p-3 rounded-2xl shadow-md`}
        >
          <p className='font-bold mb-2'>Our Reviews</p>
          <div className='flex'>
            <span>
              <img src={user1} alt='user profile' />
            </span>
            <span>
              <img src={user2} alt='user profile' />
            </span>
            <span>
              <img src={user3} alt='user profile' />
            </span>
          </div>
        </div>
      </div>
      <div className='p-10 text-center md:text-left md:w-1/2'>
        <p className='font-bold text-primary_orange mb-5'>WHAT THEY SAY</p>
        <h1 className='font-bold text-3xl md:text-4xl mb-10'>
          What Our Customers Say About Us
        </h1>
        <p className='mb-10'>
          “Fudo is the best. Besides the many and delicious meals, the service
          is also very good, especially in the very fast delivey. I highly
          recommend Fudo to you”.
        </p>
        <div className='flex justify-center md:justify-start items-center mb-10'>
          <img src={user1} alt='user profile thumbnail' className='mr-3' />
          <div className='text-left'>
            <p className='text-lg font-bold'>Theresa Jordan</p>
            <p className='text-sm text-gray_color'>Food Enthusiast</p>
          </div>
        </div>
        <div>
          {Array.from({ length: 5 }).map((_, index) => {
            return (
              <Star
                key={index}
                className={`${
                  index === 4
                    ? "stroke-primary_yellow fill-none"
                    : "stroke-none fill-primary_yellow"
                } inline-block`}
              />
            );
          })}
          <span className='ml-2 text-lg font-bold'>4.8</span>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
