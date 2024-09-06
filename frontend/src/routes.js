import {BrowserRouter as Router, Routes as Switch, Route, useLocation } from 'react-router-dom'; 
import './styles.css'; 
import Header from './components/Header'; 
import Sidebar from './components/Sidebar'; 
import Agendamentos from './pages/Agendamentos'; 
import Clientes from './pages/Clientes'; 
import Avaliacoes from './pages/Avaliacoes';
<<<<<<< HEAD
import Home from './pages/Home'; 
=======
import Agendamentos_Clientes from './pages/Agendar';
import Autenticacao from './pages/Autenticacao';
import Servicos from './pages/Servico';
>>>>>>> dev-agendamento



const Routes = () => {
    return (
        <Router>
            <Header />
<<<<<<< HEAD
            <MainContent />
        </Router>
=======
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
                            <Route path='/agendar' exact element={<Agendamentos_Clientes/>}/>
                            <Route path='/admin' exact element={<Autenticacao/>}/>
                            <Route path='/escolher-procedimento' exact element={<Servicos/>}/>
                        </Switch>    
                        
                    </Router>


                   
                </div>

            </div>
        </>
>>>>>>> dev-agendamento
    );
};

// Componente que usa o useLocation
const MainContent = () => {
    const location = useLocation();

    // Definir quais rotas devem mostrar a Sidebar
    const showSidebar = ['/agendamentos', '/clientes'].includes(location.pathname);

    return (
        <div className="container-fluid h-100">
            <div className="row h-100">
                {/* Condicionalmente renderiza a Sidebar somente para as rotas especificadas */}
                {showSidebar && <Sidebar />}

                {/* Conteúdo principal das rotas */}
                <Switch>
                    <Route path="/" exact element={<Home />} />
                    <Route path="/avaliacoes" exact element={<Avaliacoes />} />
                    <Route path="/agendamentos" exact element={<Agendamentos />} />
                    <Route path="/clientes" exact element={<Clientes />} />
                </Switch>
            </div>
        </div>
    );
};
export default Routes;    