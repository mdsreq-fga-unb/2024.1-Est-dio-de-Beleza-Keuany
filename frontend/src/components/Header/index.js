import logo from '../../assets/logo.png'; 
import {Link, useLocation } from 'react-router-dom'; 

const Header = () => {
    const location = useLocation(); 
    return(
        <header >
            <div className="container-fluid d-flex justify-content-start">
            <div className="d-flex align-items-center">
            <ul className="p-0 m-0">
              
            
                <li>
                    <Link 
                        to="/" 
                        className={location.pathname === '/' ? 'active' : ''}
                        >
                        <span className="mdi mdi-home-circle"></span>
                        <text>Home</text>
                    </Link>                   
                </li>
            </ul>

            </div>
            <div className="container-fluid d-flex justify-content-end">
            <div className="d-flex align-items-center">
              
                <div className="text-right-mr-10">
                    <span className="d-block m-0 p-0 text-white">Estúdio Keuanny</span>
                </div>
                <img src={logo} alt="" />
                <span className="mdi mdi-chevron-down text-white"></span>
                <div>
                   
                </div>
                
            </div>
            
            </div>
            
            </div>
            
        </header>
    );
};

export default Header; 


 /*<ul className="p-0 m-0">
<li>
    <Link 
        to="/" 
        className={location.pathname === '/' ? 'active' : ''}
        >
        <span className="mdi mdi-calendar-check"></span>
        <text>Home</text>
    </Link>                   
</li>
</ul>*/