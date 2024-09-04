import foto from '../../assets/fotoKeuanny.png'; 
import {Link, useLocation } from 'react-router-dom'; 


const Sidebar = () => {
    const location = useLocation(); 

    return(
        <sidebar className="col-2 h-100">
            <img src={foto} alt="" className="img-fluid px-3 py-4" />
            <ul className="p-0 m-0">
                <li>
                    <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
                        <span className="mdi mdi-calendar-check"></span>
                        <text>Agendamentos</text>
                    </Link>                   
                </li>
                <li>
                    <Link 
                        to="/clientes"
                        className={location.pathname === '/clientes' ? 'active' : ''}
                        > 
                        <span className="mdi mdi-account-multiple"></span> 
                        <text>Clientes</text>
                    </Link>
                </li>
            </ul>
        </sidebar>
    );
};

export default Sidebar;   
