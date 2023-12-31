import React, { ReactNode, useState } from "react";

import User from "../models/User";

type userContextObject = {
  user: User | undefined;
  login: (userConfig: any) => void;
  logout: () => void;
};

export const userContext = React.createContext<userContextObject>({
  user: undefined,
  login: () => {},
  logout: () => {},
});

const UserContextProvider: React.FC<{ children?: ReactNode }> = (props) => {
  const [user, setUser] = useState(undefined);

  const loginHandler = (user: any) => {
    setUser(user);
  };

  const logoutHandler = () => {
    setUser(undefined);
  };

  const contextValue: userContextObject = {
    user,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <userContext.Provider value={contextValue}>
      {props.children}
    </userContext.Provider>
  );
};

export default UserContextProvider;
