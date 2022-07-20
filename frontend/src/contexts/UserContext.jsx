/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useState } from "react";

export const UserContext = createContext();

function UserContextProvider(props) {
  const { children } = props;
  const initialValue = JSON.parse(localStorage.getItem("user"));
  const [userConnected, setUserConnected] = useState(initialValue);
  return (
    <UserContext.Provider
      value={{
        userConnected,
        setUserConnected,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
