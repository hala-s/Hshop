import axios from "axios";
import { createContext } from "react";
import { toast } from "react-toastify";


export const CartContext=createContext(null);
export function CartContextProvider ({children}){
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
    return <CartContext.Provider value={{addToCartContext , getCartContext, removeItemContext}}>
{ children}
    </CartContext.Provider>;
   
}