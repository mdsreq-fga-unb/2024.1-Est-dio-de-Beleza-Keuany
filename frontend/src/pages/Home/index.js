//import HomeCard from './components/HomeCard'; 
//import logo from '../../assets/logo.png'; 
import newLogo from '../../assets/newLogo.png'; 
import redesSociais from '../../assets/redesSociais.png'; 
import testa from '../../assets/testa.png';
 



const Home = () => {
    return (
        <div className="col p-5 overflow-auto h-100">
            <div className="d-flex flex-column vh-100">
        {/* Título ou outro conteúdo acima do card */}
        <div className="p-5">
            <div className="row">
                <div className="col-12">
                    <div className="w-100 d-flex justify-content-between">
                    <img src={newLogo} alt="" className="img-fluid w-2"/>
                    <div>
                    <img src={redesSociais} alt="" className="img-fluid w-2"/>
                        
                    </div>
                    </div>
                </div>
            </div>
        </div>
        



        <div className="d-flex justify-content-center align-items-start vh-100">
            <div className="service-card p-5 overflow-auto h-99 w-100" style={{ marginBottom: '100px' }}>
            
            <div className="d-flex align-items-center">
              
            <div className="col-6">
                        {<p>O estúdio de design de sobrancelhas Keuany é um
                        espaço especializado em cuidar e realçar a 
                        beleza do olhar através da modelagem e 
                        manutenção das sobrancelhas. Neste ambiente,
                        profissionais capacitados utilizam técnicas 
                        personalizadas para cada cliente, levando em
                        consideração o formato do rosto, estilo pessoal
                        e características naturais das sobrancelhas. 
                        O estúdio oferece serviços como limpeza, 
                        modelagem, tintura, e técnicas avançadas como
                        micropigmentação e henna, proporcionando um 
                        atendimento exclusivo e confortável em um espaço acolhedor
                        e moderno. O objetivo principal é destacar a beleza natural
                        de cada pessoa, garantindo um resultado harmonioso
                        e duradouro.</p>}
                    </div>
                <div className="container-fluid d-flex justify-content-end">
                <img src={testa} alt="" />
                </div> 
                <div>
                   
                </div>
                
            </div>
            
                </div>
            </div>
        </div>
        </div> 
        
    );
};

export default Home;
