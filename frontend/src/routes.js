import { BrowserRouter as Router, Routes as Switch, Route, useLocation } from 'react-router-dom';
import './styles.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Agendamentos from './pages/Agendamentos';
import Procedimentos from './pages/Procedimentos';
import Avaliacoes from './pages/Avaliacoes';
import MeusAgendamentos from './pages/MeusAgendamentos';
import Home from './pages/Home';
import CadastrarAvaliacoes from './pages/CadastrarAvaliacoes';
import Agendamentos_Clientes from './pages/Agendar';
import Autenticacao from './pages/Autenticacao';
import Servicos from './pages/Servico';
import Funcionamento from './pages/Funcionamento';
import Afastamentos from './pages/Afastamentos';
import ServiceList from './components/CreateURL';
import ConfirmacaoAgendamento from './pages/ConfirmarAgendamento';



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
    const showSidebar = ['/agendamentos', '/procedimentos', '/funcionamento', '/afastamento'].includes(location.pathname);

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
                    <Route path="/procedimentos" exact element={<Procedimentos />} />
                    <Route path='/agendar' exact element={<Agendamentos_Clientes />} />
                    <Route path='/admin' exact element={<Autenticacao />} />
                    <Route path='/escolher-procedimento' exact element={<Servicos />} />
                    <Route path='/meus_agendamentos' exact element={<MeusAgendamentos />} />
                    <Route path='/funcionamento' exact element={<Funcionamento/>} />
                    <Route path='/afastamento' exact element={<Afastamentos/>} />
                    <Route path='/avaliar/:id' exact element={<CadastrarAvaliacoes/>} />
                    <Route path="/createurl" element={<ServiceList />} />
                    <Route path="/confirmacao_agendamento/:id" element={<ConfirmacaoAgendamento/>} />
                </Switch>
            </div>
        </div>
    );
};
export default Routes;    