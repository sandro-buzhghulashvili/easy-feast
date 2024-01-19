import React, { useEffect, useState } from "react";

import classes from "./NewAddon.module.scss";
import { Form, json, redirect } from "react-router-dom";
import useInput from "../../hooks/use-input";

const NewAddon: React.FC = () => {
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

  function stringIsValid(value: string) {
    return value.trim().length > 0;
  }

  useEffect(() => {
    if (titleIsValid && typeIsValid && imageIsValid && priceIsValid)
      setFormIsValid(true);
    else setFormIsValid(false);
  }, [titleIsValid, typeIsValid, imageIsValid, priceIsValid]);
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
      <button
        disabled={!formIsValid}
        className='px-8 py-2 mt-10 block mx-auto bg-primary_orange text-white rounded-xl disabled:cursor-not-allowed disabled:opacity-70'
      >
        Add Menu
      </button>
    </Form>
  );
};

export const action = async ({ request }: { request: any }) => {
  try {
    const data = await request.formData();
    const addon = {
      id: new Date().toISOString(),
      title: data.get("title"),
      type: data.get("type"),
      price: data.get("price"),
      img: data.get("image"),
    };
    const res = await fetch(
      "https://easy-feast-default-rtdb.firebaseio.com/addons/-Nn_PdepfniS2u3fpUJU.json",
      {
        method: request.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(addon),
      }
    );

    if (!res.ok) {
      throw json({ message: "Could not add new addon" }, { status: 500 });
    } else {
      return redirect("/");
    }
  } catch {
    throw json({ message: "Could not add new addon" }, { status: 500 });
  }
};

export default NewAddon;
