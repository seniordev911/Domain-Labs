import { useState } from "react";
import { DappContext } from "./context";

const ContextProvider = ({ children }) => {

  return (
    <DappContext.Provider
      value={{
      }}
    >
      {children}
    </DappContext.Provider>
  );
};

export default ContextProvider;
