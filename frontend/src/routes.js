import {BrowserRouter as Router, Routes as Switch, Route } from 'react-router-dom'; 
import './styles.css'; 
import Header from './components/Header'; 
import Sidebar from './components/Sidebar'; 
import Agendamentos from './pages/Agendamentos'; 
import Clientes from './pages/Clientes'; 
import Avaliacoes from './pages/Avaliacoes'


const Routes = () => {
    return (
        <>
            <Header />
            <div className="container-fluid h-100">
                <div className="row h-100">
                    <Router>
                        <Switch>
                            <Route path="/" exact element={<Agendamentos/>} />
                        </Switch>
                        <Sidebar />
                        <Switch>
                            <Route path="/agendamentos" exact element={<Agendamentos/>} />
                            <Route path="/clientes" exact element={<Clientes/>} />
                            <Route path='/avaliacoes' exact element={<Avaliacoes/>}/>
                        </Switch>    
                        
                    </Router>


                   
                </div>

            </div>
        </>
    );
};

export default Routes;    