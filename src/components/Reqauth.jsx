import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

const Reqauth = ({children}) => {
    const user=useSelector(state=>state.user.isAuthenticated);
    console.log(user);
  if(!user){
    return  <Navigate to={"/login"} />
  }else{
    return children
  }
}

export default Reqauth
