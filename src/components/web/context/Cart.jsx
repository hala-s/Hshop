import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";


export const CartContext=createContext(null);
export function CartContextProvider ({children}){
    const [count ,setCount]= useState();
    const addToCartContext =async (productId)=>{
        try{
            const token =localStorage.getItem('user token');
            const {data}= await axios.post(`${import.meta.env.VITE_API_URL}/cart`,
            {productId},
            {headers :{Authorization:`Tariq__${token}`}},
            );
            if(data.message=="success"){
                toast.success(
                    "Product Added successfully",
                    {
                      position: "top-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: false,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "light",
                    }
                  );
            }
            return data;

        }
        catch(error){
            console.log(error);
        }
    }
    const getCartContext =async ()=>{
        try{
            const token =localStorage.getItem("user token");
            const {data}= await axios.get(`${import.meta.env.VITE_API_URL}/cart`,
            {headers :{Authorization:`Tariq__${token}`}});
           setCount(data.count); 
            return data;

        }catch(error){
            console.log(error); 
        }
    }
    const removeItemContext = async (productId)=>{
        try{ const token =localStorage.getItem("user token");
        const {data}= await axios.patch(`${import.meta.env.VITE_API_URL}/cart/removeItem`,
        {productId},
        {headers :{Authorization:`Tariq__${token}`}}); 
        return data;
    }catch(error){
        console.log(error)

    }
       
    }
    const clearCartContext = async ()=>{
        try{
         const token =localStorage.getItem("user token");
        const {data}= await axios.patch(`${import.meta.env.VITE_API_URL}/cart/clear`,
        {},
        
        {headers : {Authorization:`Tariq__${token}`}}); 
        return data;
    }catch(error){
        console.log(error)

    }
       
    }
    const decreaseQuantityContext = async (productId)=>{
        try{ const token =localStorage.getItem("user token");
        const {data}= await axios.patch(`${import.meta.env.VITE_API_URL}/cart/decraseQuantity`,
        {productId},
        {headers :{Authorization:`Tariq__${token}`}}); 
        return data;
    }catch(error){
        console.log(error)

    }
       
    }
    const increaseQuantityContext = async (productId)=>{
        try{ const token =localStorage.getItem("user token");
        const {data}= await axios.patch(`${import.meta.env.VITE_API_URL}/cart/incraseQuantity`,
        {productId},
        {headers :{Authorization:`Tariq__${token}`}}); 
        return data;
    }catch(error){
        console.log(error)

    }
       
    }
    return <CartContext.Provider value={{addToCartContext ,count , getCartContext, removeItemContext, clearCartContext, decreaseQuantityContext, increaseQuantityContext}}>
{ children}
    </CartContext.Provider>;
   
}