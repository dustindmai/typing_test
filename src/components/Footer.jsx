import Select from "react-select";
import React, { useState } from "react";
import { themeOptions } from "../utils/themeOptions";
import { useTheme } from "../context/ThemeContext";

const Footer = () =>{
  const [value, setValue]= useState({})
  const {setTheme} = useTheme();
  const handleChange = (e) => {
    console.log(e);
    setValue(e.value);
    setTheme(e.value);
  }
  return (
    <div className ='footer'>
      <div className = 'links'>
        Links
      </div>
      <div className = 'themeButton'>
        <Select
          value ={value}
          onChange = {handleChange}
          options ={themeOptions}
          menuPlacement="top"
        />
      </div>
    </div>
  )
}

export default Footer