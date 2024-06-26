import React, { useState } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AppBar, Modal, Tabs, Tab, Box } from '@mui/material';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { useTheme } from '../context/ThemeContext';
import GoogleButton from 'react-google-button';
import { signInWithPopup, GoogleAuthProvider} from 'firebase/auth';
import { toast, Bounce } from 'react-toastify';
import errorMapping from '../utils/errorMapping';
import { auth } from '../firebaseConfig';
import LogoutIcon from '@mui/icons-material/Logout'
import {useAuthState} from 'react-firebase-hooks/auth'
import { useLocation, useNavigate } from 'react-router-dom';
const AccountCircle = () => {

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);
  const {theme} = useTheme();

  const [user]= useAuthState(auth);
  const navigate = useNavigate();
  const location = useLocation();
  const logout = () =>{
    if(location.pathname ==='/user'){
      navigate('/');
    }
    auth.signOut().then((res)=>{
      toast.success('Logged out', {
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
    }).catch((err) =>{
      toast.error('Unable to logout', {
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
  const handleModalOpen = () =>{
    if(user){
      navigate('/user');
    }
    else{
      setOpen(true);
    }
    
  }
  const handleClose = () =>{
    setOpen(false);
  }

  const handleValueChange = (e,v) =>{
    setValue(v);
  }

  const  googleProvider = new GoogleAuthProvider()

  const handleGoogleSignup = ()=>{
    signInWithPopup(auth, googleProvider).then((res)=>{
      toast.success('Google Login Successful', {
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
      toast.error(errorMapping[err.code] || 'Unable to use Google Authentication', {
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
    <div>
      <AccountCircleIcon onClick = {handleModalOpen}/>
        {user && <LogoutIcon onClick={logout}/>}
      <Modal
        open = {open}  
        onClose = {handleClose}
        style = {{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div style ={{width:'400px', textAlign: 'center', background: theme.background}}>
          <AppBar position='static' style = {{background : theme.background}}>
            <Tabs
              value={value}
              onChange = {handleValueChange}
              variant='fullWidth'
            >
              <Tab label = 'login' style={{color: theme.textColor}}></Tab>
              <Tab label = 'signup' style={{color: theme.textColor}}></Tab>
            </Tabs>
          </AppBar>
          {value === 0 && <LoginForm handleClose={handleClose}/>}
          {value === 1 && <SignupForm handleClose={handleClose}/>}

          <Box>
            <span>
              OR
            </span>
            <GoogleButton
            style = {{
              width:'100%',
              marginTop:'8px'
            }}
            onClick = {handleGoogleSignup}
            />
          </Box>
        </div>
      </Modal>
    </div>
  )
}

export default AccountCircle