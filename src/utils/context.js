import { createContext, useContext } from "react";

export const DappContext = createContext();

export const useDappContext = () => useContext(DappContext);
