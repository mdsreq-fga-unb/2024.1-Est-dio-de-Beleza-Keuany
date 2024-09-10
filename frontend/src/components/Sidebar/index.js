import foto from '../../assets/fotoKeuanny.png'; 
import {Link, useLocation } from 'react-router-dom'; 


const Sidebar = () => {
    const location = useLocation(); 

    return(
        <sidebar className="col-sidebar col-2 h-100">
            <img src={foto} alt="" className="img-fluid px-3 py-4" />
            <ul className="p-0 m-0">
                <li>
                    <Link 
                        to="/agendamentos" 
                        className={location.pathname === '/agendamentos' ? 'active' : ''}
                        >
                        <span className="mdi mdi-calendar-check">Agendamentos</span>
                        
                    </Link>                   
                </li>
                <li>
                    <Link 
                        to="/procedimentos"
                        className={location.pathname === '/procedimentos' ? 'active' : ''}
                        > 
                        <span className="mdi mdi-account-multiple">Procedimentos</span> 
                       
                    </Link>
                    <Link 
                        to="/funcionamento"
                        className={location.pathname === '/funcionamento' ? 'active' : ''}
                        > 
                        <span className='mdi mdi-clock-alert-outline'> Funcionamento</span> 
                       
                    </Link>
                   
                    
                </li>
               
            </ul>
        </sidebar>
    );
};

export default Sidebar;   
