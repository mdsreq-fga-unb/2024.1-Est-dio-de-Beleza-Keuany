import {BrowserRouter as Router, Routes as Switch, Route, useLocation } from 'react-router-dom'; 
import './styles.css'; 
import Header from './components/Header'; 
import Sidebar from './components/Sidebar'; 
import Agendamentos from './pages/Agendamentos'; 
import Clientes from './pages/Clientes'; 
import Avaliacoes from './pages/Avaliacoes';
import Home from './pages/Home'; 



const Routes = () => {
    return (
        <Router>
            <Header />
            <MainContent />
        </Router>
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