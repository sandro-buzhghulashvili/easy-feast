import { useContext, useEffect, useState } from 'react';
import classes from './Address.module.scss';
import { userContext } from '../store/user-context';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

type AddressObject = {
  location: string;
  address: string;
  zip: string;
};

export default function AddressPage() {
  const navigate = useNavigate();
  const ctx = useContext(userContext);
  const [locationValue, setLocationValue] = useState(
    ctx.user?.address?.location || ''
  );
  const [addressValue, setAddressValue] = useState(
    ctx.user?.address?.address || ''
  );
  const [zipValue, setZipValue] = useState(ctx.user?.address?.zip || '');

  const locationValueHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocationValue(event.target.value);
  };
  const addressValueHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddressValue(event.target.value);
  };
  const zipValueHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setZipValue(event.target.value);
  };

  const updateAddressData = async (addressValue: AddressObject) => {
    try {
      const res = await fetch(
        'https://easy-feast-default-rtdb.firebaseio.com/users.json'
      );
      const userEntries = Object.entries(await res.json());
      const user = userEntries.find(([id, user]: [id: any, user: any]) => {
        if (ctx.user) {
          if (user.id === ctx.user.id) {
            return id;
          }
        }
      });
      let userId: undefined | string = undefined;
      if (user) userId = user[0];

      if (res.ok) {
        fetch(
          'https://easy-feast-default-rtdb.firebaseio.com/users/' +
            userId +
            '.json',
          {
            method: 'PATCH',
            body: JSON.stringify({
              address: addressValue,
            }),
          }
        );
      }
      console.log(userId);
    } catch {
      ctx.applyFlashMessage({
        status: 'error',
        message: 'Could not save address data',
      });
    }
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (
      locationValue.trim().length === 0 ||
      addressValue.trim().length === 0 ||
      zipValue.trim().length === 0
    ) {
      ctx.applyFlashMessage({
        status: 'error',
        message: 'Please fill the form',
      });
    } else {
      const addressObj = {
        location: locationValue,
        address: addressValue,
        zip: zipValue,
      };
      updateAddressData(addressObj);
      ctx.saveAddress(addressObj);
      navigate('/');
      ctx.applyFlashMessage({
        status: 'success',
        message: 'Successfully saved address data',
      });
    }
    console.log(locationValue, addressValue, zipValue);
  };

  useEffect(() => {
    if (!ctx.user) {
      navigate('../');
      ctx.applyFlashMessage({
        status: 'error',
        message: 'User is not logged in',
      });
    }
  }, []);

  return (
    <motion.form
      initial={{ opacity: 0, y: 300 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${classes.form} px-10 mb-10 sm:px-20 md:w-1/2 md:mx-auto lg:w-5/12 mt-40`}
      onSubmit={submitHandler}
    >
      <div>
        <label htmlFor="location">Location</label>
        <input
          type="text"
          id="location"
          value={locationValue}
          onChange={locationValueHandler}
        />
      </div>
      <div>
        <label htmlFor="address">Address</label>
        <input
          type="text"
          id="address"
          value={addressValue}
          onChange={addressValueHandler}
        />
      </div>
      <div>
        <label htmlFor="zip">ZIP Code</label>
        <input
          type="text"
          id="zip"
          value={zipValue}
          onChange={zipValueHandler}
        />
      </div>
      <button className="mt-2 px-7 py-3 text-lg bg-primary_orange text-white_color rounded-lg">
        Save
      </button>
    </motion.form>
  );
}
