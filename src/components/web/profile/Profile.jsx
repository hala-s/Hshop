import React, { useContext } from 'react'
import { UserContext } from '../context/User.jsx';
import { Link, Outlet } from 'react-router-dom';
import './profile.css'

export default function Profile() {
    const {userData, Loading} = useContext(UserContext);
    if(Loading){
        return <p>Loading...</p>
    }

    console.log(userData);
  return (
    <div className="container-fluid">
  <div className="row flex-nowrap">
    <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-side sidebar">
      <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
        
        <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center  align-items-sm-start" id="menu">
          <li className="nav-item py-3">
            <Link to='' className=" px-0 text-center ">
             Info
            </Link>
          </li>
          <li className="nav-item py-3">
            <Link to='contact' className="  px-0 text-center">
            Contact
            </Link>
          </li>
        
        </ul>
        <hr />
        {/* <div className="dropdown pb-4">
          <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
            <img src="https://github.com/mdo.png" alt="hugenerd" width={30} height={30} className="rounded-circle" />
            <span className="d-none d-sm-inline mx-1">loser</span>
          </a>
          <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
            <li><a className="dropdown-item" href="#">New project...</a></li>
            <li><a className="dropdown-item" href="#">Settings</a></li>
            <li><a className="dropdown-item" href="#">Profile</a></li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li><a className="dropdown-item" href="#">Sign out</a></li>
          </ul>
        </div> */}
      </div>
    </div>
    <div className="col py-3">
        <Outlet/>
    </div>
  </div>
</div>

  )
}
