import {BrowserRouter as Router, Routes as Switch, Route } from 'react-router-dom'; 
import './styles.css'; 
import Header from './components/Header'; 
import Sidebar from './components/Sidebar'; 
import Agendamentos from './pages/Agendamentos'; 
import Clientes from './pages/Clientes'; 
import Home from './pages/Home'; 



const Routes = () => {
    return (
        <>
            <Router>
            <Header />
            <div className="container-fluid h-100">
                <div className="row h-100">
                   
                        <Sidebar />
                        <Switch>
                            <Route path="/agendamentos" exact element={<Agendamentos/>} />
                            <Route path="/clientes" exact element={<Clientes/>} />
                            <Route path="/" exact element={<Home/>} />

                        </Switch>    
                              
                </div>

            </div>
            </Router>   
        </>
    );
};

export default Routes;    