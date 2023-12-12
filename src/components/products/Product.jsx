import axios from 'axios';
import React, { useContext } from 'react'
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom'
import ReactImageMagnify from 'react-image-magnify';
import { CartContext } from '../web/context/Cart.jsx';


export default function Product() {
  
 const {product}= useParams();
 const getProduct= async()=>{
  const {data}= await axios.get(`${import.meta.env.VITE_API_URL}/products/${product}`)
  return data.product
 }
 const {data , isLoading}= useQuery('products',getProduct);
 if(isLoading){
  return <p>Loading...</p>
 }
 const {addToCartContext}= useContext(CartContext);
 
 
 const addToCart=async(productId) => {
  const res =await addToCartContext(productId);
 }
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-4">
{data.subImages.map((img, index)=>
<React.Fragment key={index}>
<ReactImageMagnify {...{
    smallImage: {
        alt: 'Wristwatch by Ted Baker London',
        isFluidWidth: true,
        src: img.secure_url
    },
    largeImage: {
        src:img.secure_url,
        width: 1200,
        height: 1800
    },
    enlargedImagePosition:'over' ,
       isHintEnabled: true
    
}} />
</React.Fragment>
)}
        </div>
     <div className="col-lg-4">
     <h2>{data.name}</h2>
     <p>{data.price}</p>
     <button className='btn ' onClick={()=>addToCart(data._id)}>Add to cart</button>
        </div>
     
    </div>
  
    </div>
  )
}
