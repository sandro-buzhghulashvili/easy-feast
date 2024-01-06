import { useState } from "react";
import classes from "./Menu.module.scss";
import { motion } from "framer-motion";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

type TypeIcon = {
  type: string;
  icon: string;
};

const Menu: React.FC<{ foods: any[] }> = ({ foods }) => {
  const [selectedType, setSelectedType] = useState<string>("Pizza");
  const [sliderIndex, setSliderIndex] = useState<number>(0);

  let iconArray: TypeIcon[] = [];

  foods.forEach(([_, food]) => {
    const existingType = iconArray.find(
      (element) => element.type === food.type
    );
    if (!existingType) {
      iconArray.push({
        type: food.type,
        icon: food.typeIcon,
      });
    }
  });

  console.log(iconArray);

  const filteredFoods = foods.filter(([_, food]) => food.type === selectedType);

  console.log(filteredFoods);

  const selectTypeHandler = (type: string): void => {
    setSelectedType(type);
    setSliderIndex(0);
  };

  const sliderToLeftHandler = (): void => {
    if (filteredFoods.length > 1) {
      if (window.innerWidth >= 1040) {
        if (sliderIndex === 0) setSliderIndex(filteredFoods.length - 2);
        else setSliderIndex((prevValue) => prevValue - 1);
      } else {
        if (sliderIndex === 0) setSliderIndex(filteredFoods.length - 1);
        else setSliderIndex((prevValue) => prevValue - 1);
      }
    }
  };

  const sliderToRightHandler = () => {
    if (filteredFoods.length > 1) {
      if (window.innerWidth >= 1040) {
        if (sliderIndex === filteredFoods.length - 2) setSliderIndex(0);
        else setSliderIndex((prevValue) => prevValue + 1);
      } else {
        if (sliderIndex === filteredFoods.length - 1) setSliderIndex(0);
        else setSliderIndex((prevValue) => prevValue + 1);
      }
    }
  };

  return (
    <div className='container text-center py-3 px-5 mx-auto mb-40'>
      <div className='md:flex lg:px-16 justify-between items-center'>
        <div className='m md:w-1/2'>
          <p className='text-primary_orange font-bold mb-3 md:text-left'>
            OUR MENU
          </p>
          <h1 className='text-typography_color text-3xl text-center font-bold mb-14 md:text-left'>
            Menu That Always Makes You Fall In Love
          </h1>
        </div>
        <div className={`${classes["slider-buttons"]}`}>
          <button onClick={sliderToLeftHandler}>
            <ChevronLeft />
          </button>
          <button onClick={sliderToRightHandler}>
            <ChevronRight />
          </button>
        </div>
      </div>
      <div className='md:flex md:h-80 md:justify-center'>
        <div
          className={`whitespace-nowrap overflow-x-auto md:overflow-x-hidden md:mr-10 p-5 md:p-0 md:pr-5 ${classes["type-select"]} mb-20 md:mb-0`}
        >
          {iconArray.map((type) => {
            return (
              <button
                className={`mr-12 md:mr-0 md:mb-3 duration-500 w-20 h-22 rounded-xl md:block ${
                  type.type === selectedType ? classes.active : undefined
                }`}
                key={iconArray.indexOf(type)}
                onClick={() => selectTypeHandler(type.type)}
              >
                <div className='flex flex-col items-center p-4'>
                  <div className='p-1 bg-white_color rounded-full mb-2'>
                    <img className='h-8 w-8' src={type.icon} alt='type' />
                  </div>
                  <p>{type.type}</p>
                </div>
              </button>
            );
          })}
        </div>
        <motion.div
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          transition={{ duration: 0.8 }}
          initial='hidden'
          whileInView='visible'
          className={`whitespace-nowrap text-start overflow-x-auto py-3 md:overflow-x-hidden md:w-3/4 ${classes["food-container"]}`}
        >
          {filteredFoods.length > 0 ? (
            filteredFoods.map(([id, food]) => {
              return (
                <motion.div
                  style={{ translateX: `-${sliderIndex * 100}%` }}
                  key={food.id}
                  className={`inline-block ${classes["meal-card"]} md:h-full w-72 lg:w-1/3 p-5 text-start mr-5 transition duration-500`}
                >
                  <div
                    className={`flex h-full flex-col justify-end ${classes["meal-data"]}`}
                  >
                    <img
                      src={food.img}
                      alt='food'
                      className='rounded-3xl object-cover'
                    />
                    <h1 className='text-2xl font-semibold mb-2'>
                      {food.title}
                    </h1>
                    <p className='text-2xl font-bold mb-3'>
                      <span className='t text-lg text-primary_yellow'>$</span>{" "}
                      {food.price}
                    </p>
                    <Link to={id} className='flex'>
                      Order Now <ChevronRight />
                    </Link>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <h1 className='font-bold text-2xl mt-10'>Found no meals</h1>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Menu;
