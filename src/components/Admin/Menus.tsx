import React, { ChangeEvent, useState } from 'react';
import Food from '../../models/Food';

import classes from './Menus.module.scss';
import { Heading1, Search } from 'lucide-react';

const Menus: React.FC<{ menu: any }> = ({ menu }) => {
  const [menuItems, setMenuItems] = useState(
    paginateMenu(6, shuffleArray(menu))
  );
  const [paginationIndex, setPaginationIndex] = useState(0);

  function paginateMenu(itemsOnPage: number, arr: any[]) {
    let copyArr = arr.slice();
    const paginatedObj: any = {};
    const pages = Math.ceil(arr.length / itemsOnPage);

    if (arr.length === 0) return false;

    for (let i = 0; i < pages; i++) {
      paginatedObj[i] = copyArr.slice(0, itemsOnPage);
      copyArr = copyArr.slice(itemsOnPage);
    }
    return paginatedObj;
  }

  function shuffleArray(array: any[]) {
    const shuffledArray = [...array];

    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }

    return shuffledArray;
  }

  function paginationIndexHandler(index: number) {
    setPaginationIndex(index);
  }

  function handleFitler(e: ChangeEvent<HTMLInputElement>) {
    console.log(e.target.value);
    const filteredMenu = menu.filter((food: Food) =>
      food.title.toLowerCase().includes(e.target.value.toLocaleLowerCase())
    );
    if (filteredMenu.length > 0)
      setMenuItems(paginateMenu(6, shuffleArray(filteredMenu)));
    else setMenuItems(paginateMenu(6, []));
  }

  console.log(menuItems);
  return (
    <>
      <div className="container flex items-center flex-col md:flex-row justify-around mx-auto mb-16">
        <h1 className="text-2xl mb-5 md:mb-0 font-bold">Available Menus</h1>
        <div className="relative">
          <input
            className="border-2 border-primary_orange focus:outline-none text-lg px-3 py-2 rounded-xl"
            type="text"
            onChange={handleFitler}
          />
          <span className="absolute right-3 top-0 bottom-0 my-auto h-fit p-2 bg-primary_orange rounded-full">
            <Search className="w-5 h-5 stroke-white" />
          </span>
        </div>
      </div>
      <div
        className={`container text-center mx-auto w-11/12 sm:w-3/4 mb-10 whitespace-nowrap xl:whitespace-normal overflow-x-auto ${classes.menu}`}
      >
        <div>
          {menuItems ? (
            menuItems[paginationIndex].map((food: Food) => {
              return (
                <div
                  key={food.id}
                  className="mb-5 w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 xl:mb-10 mr-5 lg:mr-10 inline-block"
                >
                  <div className="relative mb-8">
                    <span className="absolute top-5 left-5 px-5 py-2 font-bold text-xl bg-white rounded-xl">
                      <span className="text-primary_orange mr-1 text-lg font-extrabold">
                        $
                      </span>
                      {food.price}
                    </span>
                    <img
                      className="rounded-xl h-48 w-full"
                      src={food.img}
                      alt="food thumbnail"
                    />
                    <span className="absolute -bottom-4 left-3 px-5 py-2 font-bold text-lg bg-white rounded-xl">
                      {food.type}
                    </span>
                  </div>
                  <div className="px-5">
                    <h1 className="text-lg h-8 overflow-y-auto text-left font-bold">
                      {food.title}
                    </h1>
                  </div>
                </div>
              );
            })
          ) : (
            <h1 className="text-2xl mb-10">Found no menus</h1>
          )}
        </div>
      </div>
      <div className="container mx-auto flex flex-wrap justify-center mb-20">
        {Array.from({ length: Object.keys(menuItems).length }).map(
          (_, index) => {
            return (
              <button
                onClick={() => paginationIndexHandler(index)}
                className={`px-5 py-3 font-bold ${
                  paginationIndex === index
                    ? 'bg-primary_orange text-white_color'
                    : 'bg-white border-2 border-primary_orange'
                } m-5 rounded-xl`}
                key={index}
              >
                {index + 1}
              </button>
            );
          }
        )}
      </div>
    </>
  );
};

export default Menus;
