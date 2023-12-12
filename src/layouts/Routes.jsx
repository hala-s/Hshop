
import HomeDashboard from "../components/dashboard/home/Home.jsx";
import CategoriesDashboard from "../components/dashboard/categories/Categories.jsx";
import Categories from '../components/web/categories/Categories.jsx';
import Home from '../components/web/home/Home.jsx';
import DasboardLayout from './DasboardLayout';
import Layout from './Layout.jsx';
import { createBrowserRouter } from "react-router-dom";
import Register from "../components/web/register/Register.jsx";
import Login from "../components/web/login/Login.jsx";
import Cart from "../components/web/cart/Cart.jsx";
import Product from "../components/products/Product.jsx";
import CategoriesDetails from "../components/web/categories/CategoriesDetails.jsx";
import ProtectedRoute from "../components/web/protectedRoute/ProtectedRoute.jsx";
import Profile from "../components/web/profile/Profile.jsx";
import UserInfo from "../components/web/profile/UserInfo.jsx";
import UserContact from "../components/web/profile/UserContact.jsx";
import SendCode from "../components/web/auth/SendCode.jsx";
import ForgetPassword from "../components/web/auth/ForgetPassword.jsx";

export  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
  
      children:[
        {
          path:'register',
         element:<Register/>
        },
        {
          path:'profile',
         element:
         <ProtectedRoute>
          <Profile/>
          </ProtectedRoute>,
          children:[
            {
              index:true,
              element:<UserInfo/>
            },
            {
              path:'contact',
              element:<UserContact/>
            }
          ]
        },
        {
          path:'login',
         element:
            <Login />
         
        },{
          path:'/sendCode',
          element:<SendCode/>
        },
        {
          path:"forgetPassword",
          element:<ForgetPassword/>
        },
        {
         index:true ,
          element:<Home/>
        },
        {
          path:'categories',
          element:<Categories/>,
        },
        {
          path:'cart',
          element:
          <ProtectedRoute>
            <Cart/>
          </ProtectedRoute>,
        },
        {
          path:'products/category/:category',
          element:<CategoriesDetails />
        },
        {
          path:'product/:product',
          element:<Product/>
        },
        {
          path:'*',
          element:<h2>404 Page Not Found...user</h2>
        }
      ]
    },
    {
      path: "/dashboard",
      element:<DasboardLayout/>,
      children:[
        {
          path:'home',
          element:<HomeDashboard/>
        },
        {
          path:'categories',
          element:<CategoriesDashboard/>
        },
          {
            path:'*',
            element:<h2>404 Page Not Found...dashboard</h2>
          }
        
      ]
    },
  ]);