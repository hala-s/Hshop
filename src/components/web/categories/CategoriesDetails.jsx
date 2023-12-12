import axios from 'axios';
import React from 'react'
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom'
import './Categories.css'

export default function categoriesDetails() {
    const {category} =useParams();

   
    const getCategoriesDetails = async()=>{
        const {data}= await axios.get(`${import.meta.env.VITE_API_URL}/products/category/${category}`);
        return data.products;
      }
    const {data, isLoading}= useQuery('category-details', getCategoriesDetails);
    if(isLoading){
        return <p>loading... </p>
    }
  return (
    <div className='products row'>
        {data.length?data.map((product)=>
        <div className=' col-md-4' key={product._id}>
            <div className='product m-3'>
            <img src={product.mainImage.secure_url} className='img-fluid'/>
            <Link to={`/product/${product._id}`}><h2>{product.name}</h2></Link>
            </div>
            

        </div>):<p>No Product</p>}
    </div>
  )
}
