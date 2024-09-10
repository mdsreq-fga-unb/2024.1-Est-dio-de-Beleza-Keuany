import logo from '../../assets/logo.png'; 
import {Link, useLocation } from 'react-router-dom'; 

const Header = () => {
    const location = useLocation(); 
    return(
        <header >
            <div className="container-fluid d-flex justify-content-start">
            <div className="d-flex align-items-center">
            <ul className="p-0 m-0 d-flex list-unstyled">
              
            
                <li className="mx-3">
                    <Link 
                        to="/" 
                        className={location.pathname === '/' ? 'active' : ''}
                        >
                        <span className="mdi mdi-home-circle">Home</span>
                    
                    </Link>                   
                </li>
                <li className="mx-3">
                    <Link 
                        to="/avaliacoes"
                        className={location.pathname === '/avaliacoes' ? 'active' : ''}
                        > 
                        <span className="mdi mdi-star-box">Avaliações</span> 
                       
                    </Link>
                </li>
                <li className="mx-3">
                    <Link 
                        to="/escolher-procedimento"
                        className={location.pathname === '/escolher-procedimento' ? 'active' : ''}
                        > 
                        <span className="mdi mdi-calendar-check">Agendamento</span> 
                       
                    </Link>
                </li>
                <li className="mx-3">
                    <Link 
                        to="/admin"
                        className={location.pathname === '/admin' ? 'active' : ''}
                        > 
                        <span className="mdi mdi-account-multiple">Login</span> 
                       
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
                
            </div>
            
            </div>
            
            </div>
            
        </header>
    );
};

export default Header; 


 