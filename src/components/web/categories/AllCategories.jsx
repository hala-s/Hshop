import axios from 'axios';
import React from 'react'
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
export default function AllCategories() {
  const [page, setPage] = useState(1);
  const [categories, setCategories] = useState([]);
    const getCategories = async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/categories/active?page=${page}&limit=5`
      );
      console.log(data);
      setCategories(data.categories);
    
    };

    useEffect(() =>{
        getCategories()
        
    },[page])

  return (
    
     
      <div className="container">
      <div className="categories-title text-center my-5">
        <h2>
        Categories
        </h2>
      </div>
      <div className="row my-5">
        {categories.length? (
          categories.map ((category) => (
            <div className="col-md-4 mt-5" key={category._id}>
               <div className='category'>
                {console.log(category._id)}
      <Link to={`/products/category/${category._id}`} >
      <img src={category.image.secure_url} className='img-fluid'/></Link>  

        </div>
            </div>
          ))
        ) : (
          <p>No category</p>
        )}
      </div> 
      
     
          <div className='d-flex justify-content-center'> 
      <Stack spacing={2}>
      <Pagination count={4} color="secondary" defaultPage={page} onChange={(event, value)=>setPage(value)}/>
    </Stack>
      </div>
      </div>
      
  )
}
