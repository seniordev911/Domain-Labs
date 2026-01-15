import React, { useState, createContext, useContext } from "react";

export const CounterContext = createContext();
export const ThemeContext = createContext();

export const CounterProvider = props => {

    const [count, setCount] = useState({});

    return <CounterContext.Provider value={[count, setCount]} {...props} />;
};

export const ThemeProvider = props => {
    const [theme, setTheme] = useState('day-theme');
    return <ThemeContext.Provider value={[theme, setTheme]} {...props} />
}

export const useCounterStore = () => useContext(CounterContext);

export const useThemeStore = () => useContext(ThemeContext);