import classes from "./Landing.module.scss";
import { motion, useScroll, useTransform } from "framer-motion";

import { Phone, Play, Star } from "lucide-react";
import cherryImg from "../assets/cherry.png";
import feedbackIcon1 from "../assets/feedback-icon-1.png";
import feedbackIcon2 from "../assets/feedback-icon-2.png";
import feedbackIcon3 from "../assets/feedback-icon-3.png";
import heroImg from "../assets/young-african-american-woman-eating-cereal-bowl-bed.png";
import clockIcon from "../assets/clock.png";
import arrowIcon from "../assets/arrow.png";
import fireIcon from "../assets/noto_fire.png";
import userEmoji from "../assets/user-emoji.png";
import pizzaProfile from "../assets/pizza-profile.png";

const Landing = () => {
  const { scrollY } = useScroll()
  const rotateClock = useTransform(scrollY, [0, 150, 300], [0, 90, 180])
  const profilesOpacity = useTransform(scrollY, [0, 400, 600], [1, 0.7, 0.5])
  return (
    <motion.main
      initial={{ opacity: 0, y: 200 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      className='flex flex-col-reverse lg:flex-row justify-between p-10 w-fit m-auto items-center container mb-44'
    >
      <section className={`${classes.hero} lg:w-3/5`}>
        <span
          className={`${classes.cherry} flex p-5 text-primary_orange bg-light_orange w-fit rounded-full text-md mb-7`}
        >
          More Than Faster <img src={cherryImg} className='ml-4' alt='cherry' />
        </span>
        <h1 className='text-4xl md:text-5xl leading-snug font-black mb-10'>
          Be The Fastest In Delivering Your{" "}
          <span className='text-primary_orange'>Food</span>
        </h1>
        <p className='mb-10'>
          Our job is to filling your tummy with delicious food and with fast and
          free delivery
        </p>
        <button className='px-10 py-4 bg-primary_orange rounded-full transition duration-300 mb-5'>
          Get Started
        </button>
        <button className='px-10 py-4 rounded-full transition duration-300'>
          <Play className='inline-block mr-5 fill-primary_orange stroke-none' />
          Watch Video
        </button>
        {/* feedback */}
        <div className='mt-16 flex items-center'>
          <div className='flex'>
            <img src={feedbackIcon1} alt='feedback icon' />
            <img
              className='-translate-x-5'
              src={feedbackIcon2}
              alt='feedback icon'
            />
            <img
              className='-translate-x-10'
              src={feedbackIcon3}
              alt='feedback icon'
            />
          </div>
          <div>
            <p className='font-bold'>Our Happy Customer</p>
            <div className='flex items-center'>
              <Star className='fill-primary_yellow stroke-none mr-1' />
              <p className='mr-1 font-bold'>4.8</p>
              <p className='text-sm text-gray_color text-center'>
                (12.5k Review)
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className={classes["hero-img"]}>
        <motion.img
          src={clockIcon}
          style={{ rotate: rotateClock }}
          alt='clock'
          className={`absolute top-0 left-0 ${classes["hero-icon"]}`}
        />
        <img
          src={fireIcon}
          alt='fire'
          className={`absolute top-0 right-0 ${classes["hero-icon"]}`}
        />
        <img
          src={arrowIcon}
          alt='arrow-icon'
          className={`absolute top-10 right-5 ${classes.arrow}`}
        />
        <div className={classes.ellipse}>
          <img src={heroImg} alt='hero' />
        </div>
        <motion.div
          style={{ opacity: profilesOpacity }}
          className={`${classes["courier-profile"]} absolute -bottom-10 -left-10 md:left-10 md:bottom-10 flex items-center bg-white_color px-3 py-2 rounded-full shadow-md`}
        >
          <img src={userEmoji} className='mr-3' alt='user emoji' />
          <div className='mr-5 text-sm'>
            <p>Richard Watson</p>
            <span>Food Courier</span>
          </div>
          <span className='p-3 bg-primary_orange rounded-full'>
            <Phone className='w w-5 h-5 stroke-white_color' />
          </span>
        </motion.div>
        <motion.div
          style={{ opacity: profilesOpacity }}
          className={`flex absolute lg:-right-10 lg:-bottom-10 -bottom-5 right-16 bg-white_color px-3 py-2 rounded-lg shadow-md ${classes["pizza-profile"]}`}
        >
          <img src={pizzaProfile} alt='pizza profile' className='m mr-3' />
          <div>
            <p className='font-bold text-lg'>Italian Piza</p>
            {Array.from({ length: 5 }).map((_, index) => {
              return (
                <Star
                  className={`inline-block stroke-none ${index === 4
                    ? "stroke-primary_yellow"
                    : "fill-primary_yellow"
                    }`}
                  key={index}
                />
              );
            })}
            <h2 className='mt-4 font-bold text-lg'>
              <span className='text-primary_orange text-sm'>$</span>7.49
            </h2>
          </div>
        </motion.div>
      </section>
    </motion.main>
  );
};

export default Landing;
