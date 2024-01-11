import React, { ReactNode, useState } from 'react';

import User from '../models/User';
import Flash from '../models/Flash';

type AddressObject = {
  location: string;
  address: string;
  zip: string;
};

type userContextObject = {
  user: User | undefined;
  login: (userObj: User) => void;
  logout: () => void;
  flashMessage: Flash | undefined;
  applyFlashMessage: (flashConfig: Flash) => void;
  removeFlashMessage: () => void;
  saveAddress: (address: AddressObject) => void;
};

export const userContext = React.createContext<userContextObject>({
  user: undefined,
  login: (userObj: User) => {},
  logout: () => {},
  flashMessage: undefined,
  applyFlashMessage: (flashConfig: Flash) => {},
  removeFlashMessage: () => {},
  saveAddress: (address: AddressObject) => {},
});

const UserContextProvider: React.FC<{ children?: ReactNode }> = (props) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [flashMessage, setFlashMessage] = useState<Flash | undefined>(
    undefined
  );

  const loginHandler = (user: User) => {
    setUser(user);
  };

  const logoutHandler = () => {
    setUser(undefined);
  };

  const applyFlashHandler = (flashConfig: Flash) => {
    setFlashMessage(flashConfig);
  };

  const removeFlashHandler = () => {
    setFlashMessage(undefined);
  };

  const saveAddressHandler = (address: AddressObject) => {
    if (user) {
      const updatedUser: User = {
        ...user,
        address: address,
      };
      setUser(updatedUser);
    }
  };

  const contextValue: userContextObject = {
    user,
    login: loginHandler,
    logout: logoutHandler,
    flashMessage: flashMessage,
    applyFlashMessage: applyFlashHandler,
    removeFlashMessage: removeFlashHandler,
    saveAddress: saveAddressHandler,
  };

  return (
    <userContext.Provider value={contextValue}>
      {props.children}
    </userContext.Provider>
  );
};

export default UserContextProvider;
