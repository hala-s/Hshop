import React, { useContext } from 'react'
import { UserContext } from '../context/User.jsx';
import './profile.css'


export default function UserContact() {
    const {userData, Loading} = useContext(UserContext);
    if(Loading){
        return <p>Loading...</p>
    }
  return (
    <div className='Usercontact text-center border vh-100 border-3'>
        <h2 className='m-5'>Contact</h2>
        
    <p><span className='fw-bold'>Email :</span> {userData.email}</p>
    <p><span className='fw-bold'>Phone :</span> {userData.phone}</p>

</div>
  )
}
