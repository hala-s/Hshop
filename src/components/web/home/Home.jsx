import React from 'react'
import Categories from '../categories/Categories.jsx'
import './home.css'

export default function Home() {
  return (
   <>
   <div className="home d-flex align-items-center ">
    <div className="ms-5 title text-white ">
    <h1 className='text-white m-4'>Online Shopping</h1>
<p className="w-25 ms-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, neque asperiores hic dolore rem fuga tempore beatae dolorum illo adipisci repudiandae provident nostrum delectus? Odit, natus. Explicabo, omnis aspernatur! Illum laboriosam, consequatur eius facilis voluptate obcaecati dolor omnis eos a?</p>
    </div>
   </div>
   <Categories/>
   </>
  )
}
