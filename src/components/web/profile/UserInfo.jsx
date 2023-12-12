import React, { useContext } from 'react'
import { UserContext } from '../context/User.jsx';
import './profile.css'

export default function UserInfo() {
    const {userData, Loading} = useContext(UserContext);
    if(Loading){
        return <p>Loading...</p>
    }
  return (
    <div className='Userinfo text-center border vh-100 border-3'>
    <img src={userData.image.secure_url} alt="hugenerd" width={100} height={100} className="rounded-circle m-4"/>
    <h2 >{userData.userName}</h2>

     </div>
  )
}
