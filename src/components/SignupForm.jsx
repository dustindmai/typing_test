import { Box, Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useTheme } from '../context/ThemeContext';
import { auth } from '../firebaseConfig';
import { Bounce, toast } from 'react-toastify';
import errorMapping from '../utils/errorMapping';

const SignupForm = ({handleClose}) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const {theme} = useTheme();

  const handleSubmit = ()=>{
    if(!email || !password || !confirmPass){
      toast.warning('Fill all Details', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce
        });
      return;
    }
    if(password !== confirmPass){
      toast.warning("Passwords do not match", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce
        });
      return;
    }

    auth.createUserWithEmailAndPassword(email, password).then((res)=>{
      toast.success('Account Created', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce
        });
        handleClose();
    }).catch((err)=>{
      toast.error(errorMapping[err.code] || 'Some error occurred', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce
        });
    })

  }
  return (
    <Box
      p={3}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}
      >
      <TextField
        variant ='outlined'
        type = 'email'
        label ='Enter Email'
        onChange = {(e) => setEmail(e.target.value)}
        InputLabelProps={{
          style: {
            color: theme.textColor
          }
        }}
        InputProps={{
          style: {
            color:theme.textColor
          }
        }}
      />

      <TextField
        variant = 'outlined'
        type = 'Password'
        label = 'Enter Password'
        onChange = {(e) => setPassword(e.target.value)}
        InputLabelProps={{
          style: {
            color: theme.textColor
          }
        }}
        InputProps={{
          style: {
            color:theme.textColor
          }
        }}
      />
      <TextField
        variant = 'outlined'
        type = 'Password'
        label = 'Confirm Password'
        onChange = {(e) => setConfirmPass(e.target.value)}
        InputLabelProps={{
          style: {
            color: theme.textColor
          }
        }}
        InputProps={{
          style: {
            color:theme.textColor
          }
        }}
      />
      <Button
        variant='contained'
        size = 'large'
        style={{background:theme.textColor, color: theme.background }}
        onClick = {handleSubmit}
      >Signup</Button>
    </Box>
  )
}

export default SignupForm