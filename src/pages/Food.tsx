import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Food from "../models/Food";
import { Minus, Plus, ShoppingCart } from "lucide-react";

type Addon = {
  id: string;
  img: string;
  price: number;
  title: string;
  type: string;
};

const FoodPage: React.FC = () => {
  const [selectedAddon, setSelectedAddon] = useState<undefined | string>(
    undefined
  );
  const [addons, setAddons] = useState<Addon | any>([]);
  const [addonLoader, setAddonLoader] = useState<boolean>(false);
  const [addonError, setAddonError] = useState<string | boolean>(false);
  const [productQuantity, setProductQuantity] = useState<number>(0);
  const foodData = useLoaderData() as Food;

  const filteredAddons =
    addons.filter((addon: Addon) => addon.type === foodData.type) || [];

  console.log(selectedAddon);

  const fetchAddons = async () => {
    setAddonLoader(true);
    try {
      const res = await fetch(
        "https://easy-feast-default-rtdb.firebaseio.com/addons.json"
      );
      const data = Object.values((await res.json()) as Addon[])[0];

      if (!res.ok) {
        setAddonError("Could not fetch addons");
      }
      setAddonLoader(false);
      setAddons(data);
    } catch (e) {
      setAddonError("Could not fetch addons");
      setAddonLoader(false);
    }
  };

  const selectAddonHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAddon(event.target.value);
  };

  useEffect(() => {
    fetchAddons();
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (filteredAddons.length > 0) {
      setSelectedAddon(filteredAddons[0].id);
    }
  }, []);

  console.log(foodData);
  return (
    <div className='lg:flex lg:justify-center mb-20'>
      <div className='px-5 w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3 mx-auto lg:m-0'>
        <img
          className='mb-5 rounded-xl h-64 lg:h-72 w-full'
          src={foodData.img}
          alt='food thumbnail'
        />
        <h1 className='text-3xl font-bold mb-5'>{foodData.title}</h1>
        <div className='flex justify-between items-center mb-8'>
          <h1 className='font-bold text-3xl text-primary_orange'>
            <span className='text-lg mr-1'>$</span>
            {Number(foodData.price).toFixed(2)}
          </h1>
          <div className='flex items-center'>
            <button className='mr-5 p-2  border-2 border-primary_orange rounded-full'>
              <Minus className=' stroke-primary_orange' />
            </button>
            <span className='mr-5 text-xl font-bold'>{productQuantity}</span>
            <button className='p-2 border-2 border-primary_orange bg-primary_orange rounded-full'>
              <Plus className=' stroke-white_color' />
            </button>
          </div>
        </div>
        <p className='mb-5'>{foodData.description}</p>
      </div>
      {addonLoader ? (
        <h1>Loading ...</h1>
      ) : !addonError ? (
        <div className='mb-5 px-5 w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3 mx-auto lg:m-0'>
          <h1 className='text-2xl font-bold mb-8'>Choice of Add On</h1>
          <ul className='mb-20'>
            {filteredAddons.map((addon: Addon) => {
              return (
                <label
                  htmlFor={addon.id}
                  key={addon.id}
                  className='flex justify-between mb-5'
                >
                  <div className='flex items-center'>
                    <img
                      className='h-10 w-10 mr-2 rounded-full'
                      src={addon.img}
                      alt='addon'
                    />
                    <p className='font-bold text-base'>{addon.title}</p>
                  </div>
                  <div className='flex items-center'>
                    <p className='mr-3 font-bold'>
                      +${Number(addon.price).toFixed(2)}
                    </p>
                    <input
                      type='radio'
                      name='addon'
                      value={addon.id}
                      checked={addon.id === selectedAddon}
                      id={addon.id}
                      onChange={selectAddonHandler}
                    />
                  </div>
                </label>
              );
            })}
          </ul>
          <button className='mx-auto font-bold md:hover:scale-110 duration-300 text-white_color lg:text-sm w-fit flex py-2 px-7 bg-primary_orange rounded-full items-center'>
            <span className='mr-3 p-3 lg:p-2 bg-white_color rounded-full'>
              <ShoppingCart className='fill-primary_orange stroke-primary_orange lg:w-5 lg:h-5' />
            </span>
            ADD TO CART
          </button>
        </div>
      ) : (
        <h1>{addonError}</h1>
      )}
    </div>
  );
};

export const loader = async ({ params }: { params: any }) => {
  try {
    const response = await fetch(
      "https://easy-feast-default-rtdb.firebaseio.com/foods/" +
        params.id +
        ".json"
    );

    return response;
  } catch (e) {}
};

export default FoodPage;
