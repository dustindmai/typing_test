import { createContext, useContext, useState } from "react";
import {themeOptions} from "../utils/themeOptions";

const ThemeContext = createContext();

export const ThemeContextProvider = ({children})=>{
  const [theme, setTheme] = useState(themeOptions[0].value);
  const value ={
    theme,
    setTheme
  }
  return (<ThemeContext.Provider value = {value} >{children}</ThemeContext.Provider>)
}

export const useTheme =  () => useContext(ThemeContext);