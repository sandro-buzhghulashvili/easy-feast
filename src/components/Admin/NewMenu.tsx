import React, { useEffect, useState } from "react";

import classes from "./NewMenu.module.scss";
import { Form, json, redirect } from "react-router-dom";
import useInput from "../../hooks/use-input";
import Food from "../../models/Food";

const NewMenu: React.FC = () => {
  const [formIsValid, setFormIsValid] = useState<boolean>(false);
  const {
    value: titleValue,
    hasError: titleHasError,
    isValid: titleIsValid,
    valueChangeHandler: titleChangeHandler,
    blurHandler: titleBlurHandler,
  } = useInput(stringIsValid);
  const {
    value: typeValue,
    hasError: typeHasError,
    isValid: typeIsValid,
    valueChangeHandler: typeChangeHandler,
    blurHandler: typeBlurHandler,
  } = useInput(stringIsValid);

  const {
    value: priceValue,
    hasError: priceHasError,
    isValid: priceIsValid,
    valueChangeHandler: priceChangeHandler,
    blurHandler: priceBlurHandler,
  } = useInput((value: any) => !isNaN(value) && value.trim().length > 0);

  const {
    value: imageValue,
    hasError: imageHasError,
    isValid: imageIsValid,
    valueChangeHandler: imageChangeHandler,
    blurHandler: imageBlurHandler,
  } = useInput(stringIsValid);

  const {
    value: typeImgValue,
    hasError: typeImgHasError,
    isValid: typeImgIsValid,
    valueChangeHandler: typeImgChangeHandler,
    blurHandler: typeImgBlurHandler,
  } = useInput(stringIsValid);

  const {
    value: descriptionValue,
    hasError: descriptionHasError,
    isValid: descriptionIsValid,
    valueChangeHandler: descriptionChangeHandler,
    blurHandler: descriptionBlurHandler,
  } = useInput(stringIsValid);

  function stringIsValid(value: string) {
    return value.trim().length > 0;
  }

  useEffect(() => {
    if (
      titleIsValid &&
      priceIsValid &&
      typeIsValid &&
      imageIsValid &&
      typeImgIsValid &&
      descriptionIsValid
    )
      setFormIsValid(true);
    else setFormIsValid(false);
  }, [
    titleIsValid,
    priceIsValid,
    typeIsValid,
    imageIsValid,
    typeImgIsValid,
    descriptionIsValid,
  ]);

  return (
    <Form method='post' className='container mx-auto md:w-1/2 mb-10 px-8'>
      <div
        className={`${classes["form-control"]} ${
          titleHasError ? classes.invalid : undefined
        }`}
      >
        <label htmlFor='title'>Title</label>
        <input
          type='text'
          id='title'
          name='title'
          value={titleValue}
          onChange={titleChangeHandler}
          onBlur={titleBlurHandler}
        />
      </div>
      <div
        className={`${classes["form-control"]} ${
          typeHasError ? classes.invalid : undefined
        }`}
      >
        <label htmlFor='type'>Type</label>
        <input
          type='text'
          id='type'
          name='type'
          value={typeValue}
          onChange={typeChangeHandler}
          onBlur={typeBlurHandler}
        />
      </div>
      <div
        className={`${classes["form-control"]} ${
          descriptionHasError ? classes.invalid : undefined
        }`}
      >
        <label htmlFor='description'>Description</label>
        <input
          type='text'
          id='description'
          name='description'
          value={descriptionValue}
          onChange={descriptionChangeHandler}
          onBlur={descriptionBlurHandler}
        />
      </div>
      <div
        className={`${classes["form-control"]} ${
          priceHasError ? classes.invalid : undefined
        }`}
      >
        <label htmlFor='price'>Price</label>
        <input
          type='text'
          id='price'
          name='price'
          value={priceValue}
          onChange={priceChangeHandler}
          onBlur={priceBlurHandler}
        />
      </div>
      <div
        className={`${classes["form-control"]} ${
          imageHasError ? classes.invalid : undefined
        }`}
      >
        <label htmlFor='image'>Image</label>
        <input
          type='text'
          id='image'
          name='image'
          value={imageValue}
          onChange={imageChangeHandler}
          onBlur={imageBlurHandler}
        />
      </div>
      <div
        className={`${classes["form-control"]} ${
          typeImgHasError ? classes.invalid : undefined
        }`}
      >
        <label htmlFor='typeImg'>Type Image</label>
        <input
          type='text'
          id='typeImg'
          name='typeImg'
          value={typeImgValue}
          onChange={typeImgChangeHandler}
          onBlur={typeImgBlurHandler}
        />
      </div>
      <button
        disabled={!formIsValid}
        className='px-8 py-2 mt-10 block mx-auto bg-primary_orange text-white rounded-xl disabled:cursor-not-allowed disabled:opacity-70'
      >
        Add Menu
      </button>
    </Form>
  );
};

export const action = async ({ request }: { request: any; params: any }) => {
  try {
    const formData = await request.formData();

    const menu = new Food(
      formData.get("title"),
      formData.get("type"),
      formData.get("price"),
      formData.get("image"),
      new Date().toISOString(),
      formData.get("description"),
      formData.get("typeImg")
    );

    const res = await fetch(
      "https://easy-feast-default-rtdb.firebaseio.com/foods.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(menu),
      }
    );

    if (!res.ok) {
      throw json({ message: "Could not add new menu" }, { status: 500 });
    } else {
      return redirect("/admin");
    }
  } catch {
    throw json({ message: "Could not add new menu" }, { status: 500 });
  }
};

export default NewMenu;
