import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation, Pagination , Autoplay} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import './Categories.css'
import { Link } from 'react-router-dom';





export default function Categories() {
  const getCategories = async()=>{
    const {data}= await axios.get(`${import.meta.env.VITE_API_URL}/categories/active?page=1&limit=5`);
    return data;
  }
 const query= useQuery('web_categories', getCategories);
 if(query.isLoading){
 return <h2>Loading....</h2>
 }
  return (

    <div className='container my-5'>
       <div className="categories-title text-center my-5">
        <h2>
        Categories
        </h2>
        </div>
 <Swiper
       modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={50}
      slidesPerView={4}
      navigation
      loop={true}
      autoplay={{
        delay:1000
      }}
      pagination={{
         clickable: true,
        }}
      
      className='m-5 pb-5'
    >
       {query.data?.categories.length? query.data?.categories.map((category)=> 
      <SwiperSlide key={category._id}>
        <div className='category'>
      <Link to={`products/category/${category._id}`} >
      <img src={category.image.secure_url} className='img-fluid'/></Link>  

        </div>
      </SwiperSlide>
      ):<h2>no data</h2>}
    </Swiper>

    </div>
  )
}
