import React from 'react'
import AccountCircle from './AccountCircle'
import logo from '../utils/geniusmode.png'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate();
  const handleOnClick = () =>{
    navigate('/');
  }
  return (
    <div className='header'>
      <div className="logo">
        <img src={logo} alt="Logo" style={{width:'100px', marginBottom:'1rem'}} onClick={handleOnClick}/>
      </div>
      <div className="user-icon">
        <AccountCircle></AccountCircle>
      </div>
    </div>
  )
}

export default Header