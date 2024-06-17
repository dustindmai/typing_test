import { Box, Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useTheme } from '../context/ThemeContext';
import { auth } from '../firebaseConfig';

const LoginForm = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {theme} = useTheme();

  const handleSubmit = () =>{
    if(!email || !password){
      alert('fill all deatils');
      return;
    }
    auth.signInWithEmailAndPassword(email,password).then((res)=>{
      alert('logged in');
    }).catch((err)=>{
      alert('invalid credential');
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