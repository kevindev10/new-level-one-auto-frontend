
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as Icons from "react-icons/fa";
import "./Navbar.css";
// import Button from "./Button";
import { navItems } from "./NavItems.jsx";
import logo from '../assets/Logos/Logo.jpg'



function Navbar() {
  const [mobile, setMobile] = useState(false);
  const [sidebar, setSidebar] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 1065) {
      setMobile(true);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1065) {
        setMobile(true);
      } else {
        setMobile(false);
        setSidebar(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  



  return (
    <>
      <nav className="navbar">
        <Link to="/" className="navbar-logo" onClick={() => setSidebar(false)}>
         <img className="logo-img-ios" src={logo} alt="Company logo" width= '382px' height='100%' />
        </Link>
      
        {!mobile && (
          
          <div >


                  
          <div>
         
                <div className='' style={{display:'flex' , justifyContent:'flex-end', marginBottom:'1.5%'}}>


                    <div className=" nav-item " >
                           <Link to='/'>
                           <i className="fa fa-map-marker fa-1x " aria-hidden="true" style={{fontSize:'1.0rem', color:'rgba(0,0,0, 0.7)' }}></i> &nbsp; 
                           <p style={{fontSize:'1.025rem',  }}>Nairobi.</p>
 
                           </Link>
                    </div>

                      <div className='nav-item'>
                          <a href="tel:+0712123123" className=''>
                             <i className="fas fa-mobile-alt fa-1x " style={{fontSize:'1.0rem', color:'rgba(0,0,0, 0.7)'  }}></i>  &nbsp; 
                             <p style={{fontSize:'1.025rem',  }}>0712123123</p>
                          </a>
                      </div>
              
            
                      <div  className='nav-item'>
                          <a href="mailto:leveloneauto@mail.com" target="blank" rel="noreferrer" className=''>
                              <i className="fas fa-envelope  fa-1x " style={{fontSize:'1.0rem', color:'rgba(0,0,0, 0.7)' }}></i> &nbsp;
                              <p style={{fontSize:'1.025rem',  }}>Email Us</p>
                          </a>
                      </div>
            

                   
                    
            
              </div>



            
        </div>

        
          
          <ul className="nav-items">


            {navItems.map((item) => {
              return (
                <li key={item.id} className={item.nName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>


       
        </div>
         
        )}
        {/* {!mobile && <Button />} */}

        {mobile && (
          <div className="sidebar-toggle">
            {sidebar ? (
              <Icons.FaTimes
                className="sidebar-toggle-logo"
                onClick={() => setSidebar(!sidebar)}
              />
            ) : (
              <Icons.FaBars
                className="sidebar-toggle-logo"
                onClick={() => setSidebar(!sidebar)}
              />
            )}
          </div>
        )}
      </nav>

      <div className={sidebar ? "sidebar active" : "sidebar"}>
        <ul className="sidebar-items">
          {navItems.map((item) => {
            return (
              <li
                key={item.id}
                className={item.sName}
                onClick={() => setSidebar(false)}
              >
                <Link to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
        {/* <Button onClick={() => setSidebar(false)} /> */}
      </div>
    </>
  );
}

export default Navbar;
