import { Box, Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useTheme } from '../context/ThemeContext';
import { auth } from '../firebaseConfig';
import { Bounce, toast } from 'react-toastify';

const LoginForm = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {theme} = useTheme();

  const handleSubmit = () =>{
    if(!email || !password){
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
    auth.signInWithEmailAndPassword(email,password).then((res)=>{
      toast.success('Logged In', {
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
    }).catch((err)=>{
      toast.error('Invalid Credentials', {
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

      <Button
        variant='contained'
        size = 'large'
        style={{background:theme.textColor, color: theme.background }}
        onClick={handleSubmit}
      >Login</Button>
    </Box>
  )
}

export default LoginForm