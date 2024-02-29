import React, { useContext, useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import Food from '../models/Food';
import { Minus, Plus, ShoppingCart } from 'lucide-react';
import { cartContext } from '../store/cart-context';
import { userContext } from '../store/user-context';
import { motion } from 'framer-motion';

export type Addon = {
  id: string;
  img: string;
  price: number;
  title: string;
  type: string;
};

const FoodPage: React.FC = () => {
  const userCtx = useContext(userContext);
  const cartCtx = useContext(cartContext);
  const [selectedAddon, setSelectedAddon] = useState<undefined | string>(
    undefined
  );
  const [addons, setAddons] = useState<Addon[] | any>([]);
  const [addonLoader, setAddonLoader] = useState<boolean>(false);
  const [addonError, setAddonError] = useState<string | boolean>(false);
  const [productQuantity, setProductQuantity] = useState<number>(1);
  const foodData = useLoaderData() as Food;

  const filteredAddons = addons.filter((addon: Addon) => {
    return addon.type === foodData.type;
  });

  console.log(addons);

  const fetchAddons = async () => {
    setAddonLoader(true);
    try {
      const res = await fetch(
        'https://easy-feast-default-rtdb.firebaseio.com/addons.json'
      );
      const data = Object.values((await res.json()) as Addon[]);

      if (!res.ok) {
        setAddonError('Could not fetch addons');
      }
      setAddonLoader(false);
      setAddons(Object.values(data[0]));
    } catch (e) {
      setAddonError('Could not fetch addons');
      setAddonLoader(false);
    }
  };

  const selectAddonHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAddon(event.target.value);
  };

  const increaseProductQuantityHandler = () => {
    setProductQuantity((prevValue) => prevValue + 1);
  };

  const decreaseProductQuantityHandler = () => {
    if (productQuantity > 1) {
      setProductQuantity((prevValue) => prevValue - 1);
    }
  };

  const handleOrder = () => {
    if (userCtx.user) {
      if (!userCtx.user.address) {
        userCtx.applyFlashMessage({
          status: 'error',
          message: 'Please save address data',
        });
        return;
      }
      const orderitem = {
        id: selectedAddon
          ? foodData.id + `/addon-${selectedAddon}`
          : foodData.id,
        title: foodData.title,
        price: foodData.price,
        addon:
          addons.filter((addon: Addon) => addon.id === selectedAddon)[0] ||
          undefined,
        address: userCtx.user?.address,
        quantity: productQuantity,
        date: new Date().toDateString(),
      };
      setProductQuantity(1);
      setSelectedAddon(undefined);
      cartCtx.addToCart(orderitem);
    } else {
      userCtx.applyFlashMessage({
        status: 'error',
        message: 'User is not logged in',
      });
    }
  };

  useEffect(() => {
    fetchAddons();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (filteredAddons.length > 0) {
      setSelectedAddon(filteredAddons[0].id);
    }
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="lg:flex lg:justify-center mb-5 mt-40"
      >
        <div className="px-5 w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 mx-auto lg:m-0">
          <img
            className="mb-5 rounded-xl h-64 lg:h-72 w-full"
            src={foodData.img}
            alt="food thumbnail"
          />
          <h1 className="text-3xl font-bold mb-5">{foodData.title}</h1>
          <div className="flex justify-between items-center mb-8">
            <h1 className="font-bold text-3xl text-primary_orange">
              <span className="text-lg mr-1">$</span>
              {Number(foodData.price).toFixed(2)}
            </h1>
            <div className="flex items-center">
              <button
                onClick={decreaseProductQuantityHandler}
                className="mr-5 p-2  border-2 border-primary_orange rounded-full"
              >
                <Minus className=" stroke-primary_orange" />
              </button>
              <span className="mr-5 text-xl w-5 font-bold">
                {productQuantity}
              </span>
              <button
                onClick={increaseProductQuantityHandler}
                className="p-2 border-2 border-primary_orange bg-primary_orange rounded-full"
              >
                <Plus className=" stroke-white_color" />
              </button>
            </div>
          </div>
          <p className="mb-5">{foodData.description}</p>
        </div>
        {addonLoader ? (
          <h1>Loading ...</h1>
        ) : !addonError ? (
          filteredAddons.length > 0 ? (
            <div className="mb-5 px-5 w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 mx-auto lg:m-0">
              <h1 className="text-2xl font-bold mb-8">Choice of Add On</h1>
              <ul className="mb-20">
                {filteredAddons.map((addon: Addon) => {
                  return (
                    <label
                      htmlFor={addon.id}
                      key={addon.id}
                      className="flex justify-between mb-5"
                    >
                      <div className="flex items-center">
                        <img
                          className="h-10 w-10 mr-2 rounded-full"
                          src={addon.img}
                          alt="addon"
                        />
                        <p className="font-bold text-base">{addon.title}</p>
                      </div>
                      <div className="flex items-center">
                        <p className="mr-3 font-bold">
                          +${Number(addon.price).toFixed(2)}
                        </p>
                        <input
                          type="radio"
                          name="addon"
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
            </div>
          ) : (
            <h1 className="text-2xl text-center h-fit md:mx-0 mx-auto font-bold mb-8">
              No Availabe addons on following menu
            </h1>
          )
        ) : (
          <h1>{addonError}</h1>
        )}
      </motion.div>
      <button
        onClick={handleOrder}
        className="mx-auto mb-20 font-bold md:hover:scale-110 duration-300 text-white_color lg:text-sm w-fit flex py-2 px-7 bg-primary_orange rounded-full items-center"
      >
        <span className="mr-3 p-3 lg:p-2 bg-white_color rounded-full">
          <ShoppingCart className="fill-primary_orange stroke-primary_orange lg:w-5 lg:h-5" />
        </span>
        ADD TO CART
      </button>
    </>
  );
};

export const loader = async ({ params }: { params: any }) => {
  try {
    const response = await fetch(
      'https://easy-feast-default-rtdb.firebaseio.com/foods/' +
        params.id +
        '.json'
    );

    return response;
  } catch (e) {}
};

export default FoodPage;
