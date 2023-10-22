import React from 'react';
import {NavLink,Link} from 'react-router-dom';
import { useAuth } from '../../context/auth';
import  toast  from 'react-hot-toast';
import SearchInput from '../Form/SearchInput';
import useCategory from '../../hooks/useCategory';
import { useCart } from '../../context/cart';
import { Badge } from 'antd';
const Header = () => {
  const [auth,setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory(); 
  const handleLogout = () =>{
    setAuth({
      ...auth,user:null,token:"",

    });
    localStorage.removeItem('cart');
    localStorage.removeItem('auth');
    toast.success("Logout Successfully ");
  };
  return (
    <header>
       <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
  <div className="container-fluid">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
      <Link to="/" className="navbar-brand "  >
         ZERA.EG
        </Link>
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">
        <SearchInput />
        <li className="nav-item">
          <NavLink to="/" className="nav-link "  >
            HOME
            </NavLink>
        </li>
        
        <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to={"/categories"}
                  data-bs-toggle="dropdown"
                >
                  Categories
                </Link>
                <ul className="dropdown-menu">
                  <li>
                   
                  </li>
                  {categories?.map((c) => (
                    <li>
                      <Link
                        className="dropdown-item"
                        to={`/category/${c.slug}`}
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

        {
          !auth.user ? (<>
          <li className="nav-item">
          <NavLink to="/register" className="nav-link" href="#">
            REGISTER
            </NavLink>
        </li>

        <li className="nav-item">
          <NavLink to="/login" className="nav-link" href="#">
            LOGIN
          </NavLink>
        </li>
          
          </>) : (<>

           <li className="nav-item dropdown">
  <NavLink className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
     {auth?.user?.name}
  </NavLink>
  <ul className="dropdown-menu">
    <li><NavLink to ={`/dashboard/${auth?.user?.role === 1? 'admin' : 'user'}`} className="dropdown-item" >DASHBOARD</NavLink></li>
    <li>
    <NavLink onClick={handleLogout} to="/login" className="dropdown-item" >
            LOGOUT
          </NavLink>
    </li>
    
  </ul>
</li>

          </>)
        }
        
        <li className="nav-item">
        <Badge count={cart?.length} showZero>
      
      <NavLink to="/cart" className="nav-link">
            CART 
          </NavLink>
    </Badge>
         
        </li>
      </ul>
      
    </div>
  </div>
</nav>

    </>
    </header>
  
  );
};

export default Header;