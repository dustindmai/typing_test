import Select from "react-select";
import React, { useState } from "react";
import { themeOptions } from "../utils/themeOptions";
import { useTheme } from "../context/ThemeContext";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
const Footer = () =>{

  const {setTheme, theme} = useTheme();
  const handleChange = (e) => {
    console.log(e);
    setTheme(e.value);
    localStorage.setItem("theme", JSON.stringify(e.value));
  }
  return (
    <div className ='footer'>
      <div className = 'links'>
        <GitHubIcon onClick={()=>window.open("https://github.com/dustindmai/typing_test/tree/master","_blank")}/><LinkedInIcon  onClick={()=>window.open("https://www.linkedin.com/in/dustindmai/","_blank")}/>
      </div>
      <div className = 'themeButton'>
        <Select
          onChange = {handleChange}
          options ={themeOptions}
          menuPlacement="top"
          defaultValue={{label: theme.label, value: theme}}
          styles={{
            control:  styles => ({...styles, backgroundColor: theme.background}),
            menu: styles => ({...styles, backgroundColor: theme.background}),
            option: (styles, {isFocused}) => {
                return {
                    ...styles,
                    backgroundColor: (isFocused)? theme.background : theme.textBoxColor,
                    color: (isFocused)? theme.textColor : theme.typeBoxText,
                    cursor: 'pointer'
                }
            },
            singleValue: styles => ({...styles, color: theme.title}),
        }}
        />
      </div>
    </div>
  )
}

export default Footer