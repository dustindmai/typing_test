import React, { useState } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AppBar, Modal, Tabs, Tab } from '@mui/material';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
const AccountCircle = () => {

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);
  const handleModalOpen = () =>{
    setOpen(true);
  }
  const handleClose = () =>{
    setOpen(false);
  }

  const handleValueChange = (e,v) =>{
    setValue(v);
  }
  return (
    <div>
      <AccountCircleIcon onClick = {handleModalOpen}/>

      <Modal
        open = {open}  
        onClose = {handleClose}
        style = {{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div style ={{width:'400px'}}>
          <AppBar position='static' style = {{background : 'transparent'}}>
            <Tabs
              value={value}
              onChange = {handleValueChange}
              variant='fullWidth'
            >
              <Tab label = 'login'></Tab>
              <Tab label = 'signup'></Tab>
            </Tabs>
          </AppBar>
          {value === 0 && <LoginForm/>}
          {value === 1 && <SignupForm/>}
        </div>
      </Modal>
    </div>
  )
}

export default AccountCircle