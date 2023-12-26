import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/User.jsx";
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { CartContext } from "../context/Cart.jsx";
const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    color:'white !important',
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 0',
  },
}));

export default function Navbar() {
  const {count} =useContext(CartContext);
 
  let { userToken , setUserToken, userData, setUserData } = useContext(UserContext);

  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("user token");
    setUserToken(null);
    setUserData(null);
    navigate("/");
  };
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
        <a className="navbar-brand color4C5372" href="#">
          HShop
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav m-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link"to="/allCategories">
                Categories
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to= {`/products`}>
                Products
              </Link>
            </li>
            {userToken ? (
              <li className="nav-item">
                <Link className="nav-link " to="/cart">
                  
                  <IconButton aria-label="cart">
      <StyledBadge badgeContent={count} color="secondary" top={0} >
        <ShoppingCartIcon />
      </StyledBadge>
    </IconButton>
                </Link>
              </li>
            ) : null}
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
              {userData&& <img src={userData.image.secure_url} alt="hugenerd" width={30} height={30} className="rounded-circle me-2"/>} 
               {userData!=null?userData.userName:'account'}
              </a>
              <ul className="dropdown-menu">
                {userToken == null ? (
                  <>
                    <li>
                      <Link className="dropdown-item" to="/register">
                        Register
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>

                    <li>
                      <Link className="dropdown-item" to="/login">
                        Login
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link className="dropdown-item" to="/profile">
                        profile
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>

                    <li>
                      <Link className="dropdown-item" onClick={logout}>
                        logout
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
