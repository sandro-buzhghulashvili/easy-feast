import React, { FormEvent, useEffect, useState } from 'react';
import useInput from '../hooks/use-input';
import classes from './UpdateProfile.module.scss';

const AVATARS = [
  'https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png',
  'https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=826&t=st=1704458241~exp=1704458841~hmac=baf8754591231fbd8d11480bc61d581b0929cb650862a89689613db7349f3492',
  'https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436178.jpg?w=826&t=st=1704458265~exp=1704458865~hmac=c0ebb9785e9161aaa48b7acb701c5a4c64b2a99464c5393c65ee1242c54919bd',
  'https://img.freepik.com/free-psd/3d-illustration-person-with-long-hair_23-2149436197.jpg?w=826&t=st=1704458284~exp=1704458884~hmac=c068b8592a7a470be34cbd1932b3dc5414e65018a543dac1a9eb239ccdfb30c5',
  'https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses-green-hair_23-2149436201.jpg?w=826&t=st=1704458305~exp=1704458905~hmac=56462ecc74c1a3334ef6a30b80702075160ad9fa2af5c843703f63ef92c5eae1',
];

const UpdateProfile: React.FC<{
  onSubmit: (username: string, image: string) => void;
}> = ({ onSubmit }) => {
  const [formIsValid, setFormIsValid] = useState(false);
  const [image, setImage] = useState(AVATARS[0]);

  const {
    value: usernameValue,
    hasError: usernameHasError,
    isValid: usernameIsValid,
    valueChangeHandler: usernameChangeHandler,
    blurHandler: usernameBlurHandler,
  } = useInput((value) => value.length > 0);

  const chooseImgHandler = (img: string) => {
    setImage(img);
  };

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(usernameValue, image);
  };

  useEffect(() => {
    if (usernameIsValid) setFormIsValid(true);
    else setFormIsValid(false);
  }, [usernameIsValid]);

  return (
    <form onSubmit={submitHandler}>
      <div className="flex flex-col ">
        <h1 className="text-lg mb-5">Choose avatar</h1>
        <div
          className={`${classes.avatars} flex overflow-x-auto h-20 pb-3 mb-5`}
        >
          {AVATARS.map((avatar) => {
            return (
              <img
                className={`${
                  avatar === image ? 'border-primary_orange' : undefined
                } rounded-full border-2 border-white_color mr-4 duration-300`}
                key={avatar}
                src={avatar}
                onClick={() => chooseImgHandler(avatar)}
                alt="avatar"
              />
            );
          })}
        </div>
      </div>
      <div
        className={`flex flex-col mb-5 ${
          usernameHasError ? classes.invalid : undefined
        }`}
      >
        <label className="mb-3 text-lg" htmlFor="profileImg">
          Enter new username
        </label>
        <input
          className="text-lg p-1 border-primary_orange border-2 focus:outline-none"
          type="text"
          value={usernameValue}
          onChange={usernameChangeHandler}
          onBlur={usernameBlurHandler}
        />
      </div>
      <button
        disabled={!formIsValid}
        className={`px-3 py-2 bg-primary_orange rounded-xl text-white_color duration-300 md:hover:scale-110 ${
          !formIsValid ? 'cursor-not-allowed opacity-60' : undefined
        }`}
      >
        Change
      </button>
    </form>
  );
};

export default UpdateProfile;
