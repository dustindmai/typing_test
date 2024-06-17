import { Box, Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useTheme } from '../context/ThemeContext';
import { auth } from '../firebaseConfig';

const SignupForm = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const {theme} = useTheme();

  const handleSubmit = ()=>{
    if(!email || !password || !confirmPass){
      alert("fill all details");
      return;
    }
    if(password !== confirmPass){
      alert('password mismatch');
      return;
    }

    auth.createUserWithEmailAndPassword(email, password).then((res)=>{
      alert('user created');
    }).catch((err)=>{
      alert(err);
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