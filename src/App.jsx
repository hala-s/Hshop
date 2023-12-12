import React, { useContext, useEffect, useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { CartContextProvider } from "./components/web/context/Cart.jsx";
import {router} from './layouts/Routes.jsx'
import { UserContext } from "./components/web/context/User.jsx";
export default function App() {
 let {setUserToken}= useContext(UserContext);
 useEffect(()=>{
if(localStorage.getItem("user token")){
  setUserToken(localStorage.getItem("user token"));
}

 },[]);
 
  
  return (
   
       <CartContextProvider>
      <RouterProvider router={router} />
    </CartContextProvider>
   
  );
}
