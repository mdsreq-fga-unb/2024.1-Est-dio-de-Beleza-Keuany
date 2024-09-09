//import { useState } from "react";
import AgendarCard from "../../components/AgendarURLQuerry";
import { Link, useNavigate } from "react-router-dom";
//import React from 'react';
import { useSearchParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { setHours, setMinutes } from 'date-fns';
import Slider from 'react-slick'; // Importa o componente Slider do react-slick
import { Modal, Button } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';






const Agendamentos_Clientes = () => {

  




  
  const navigate = useNavigate(); // Hook para navegação

  

  // Função para redirecionar para outra página
  const handleRedirect = () => {
    navigate('/escolher-procedimento'); // Substitua '/nova-pagina' pela rota desejada
  
  };
  const FinalizarProcedimento = () => {
    navigate('/meus_agendamentos'); // Substitua '/nova-pagina' pela rota desejada
  
  };
  const EditarServiço = () => {
    navigate('/escolher-procedimento'); // Substitua '/nova-pagina' pela rota desejada
  
  };
 


  const handleOpenPrimeiroModal = () => setIsPrimeiroModalOpen(true);
  const handleClosePrimeiroModal = () => setIsPrimeiroModalOpen(false);

  // Função para abrir o SegundoModal
  const handleFinalizarClick = () => {
    setIsPrimeiroModalOpen(false); // Fecha o PrimeiroModal
    setIsSegundoModalOpen(true);  // Abre o SegundoModal
  };


  const handleCloseAllModals = () => {
    // Fechar todos os modais
    setIsPrimeiroModalOpen(false);
    setIsSegundoModalOpen(false);
    setIsSuccessModalOpen(false);
  };


const AgendamentosModal = ({ isOpen, onClose, modalContent }) => (
  <Modal show={isOpen} onHide={onClose}>
    <Modal.Header closeButton>
      <Modal.Title>Bem-vindo!</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      Ops...parece que esse horário já está agendado. Deseja entrar na fila?
    </Modal.Body>
    <Modal.Body>
      {modalContent}
    </Modal.Body>
    <Modal.Footer>
    <Button variant="secondary" onClick={handleRedirect}>
          Voltar para o agendamento
        </Button>
      <Button variant="secondary" onClick={onClose}>
        Entrar na fila de espera
      </Button>
    </Modal.Footer>
  </Modal>
);

const PrimeiroModal = ({ isOpen, onClose, onFinalizarClick }) => (
  <Modal show={isOpen} onHide={onClose}>
    <Modal.Header closeButton>
      <Modal.Title>Serviço adicionado</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      O que você deseja fazer agora?
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={onFinalizarClick}>
        Finalizar serviço
      </Button>
      <Button variant="secondary" onClick={onClose}>
        Editar serviço
      </Button>
    </Modal.Footer>
  </Modal>
);
  

const [isSegundoModalOpen, setIsSegundoModalOpen] = useState(false);
const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
const [userName, setUserName] = useState('');
const [userPhone, setUserPhone] = useState('');



// Função para capturar o valor do campo de entrada
const handleInputChange = (e) => {
  setUserName(e.target.value);
};

// Função para capturar o valor do campo de telefone
const handlePhoneChange = (e) => {
  setUserPhone(e.target.value);
};

// Função para avançar e agendar
const handleAvancarEAgendar = () => {
  setIsPrimeiroModalOpen(false);
  setIsSuccessModalOpen(true);
};

const SegundoModal = ({ isOpen, onClose }) => (
  <Modal show={isOpen} onHide={onClose}>
    <Modal.Header closeButton>
      <Modal.Title>Informações do usuário</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <p>Nome:</p>
      <input
        type="text"
        value={userName}
        onChange={handleInputChange}
        placeholder="Insira seu nome"
        className="form-control"
      />
    </Modal.Body>
    <Modal.Body>
      <p>Número do WhatsApp:</p>
      <input
        type="tel"
        value={userPhone}
        onChange={handlePhoneChange}
        placeholder="Insira seu telefone"
        className="form-control"
      />
    </Modal.Body>
    <Modal.Footer>
      <div className="d-flex flex-column w-100">
        <Button variant="secondary" onClick={handleAvancarEAgendar}>
          Avançar e agendar
        </Button>
        <div className="mb-3 mt-2"></div>
        <Button variant="secondary" onClick={handleRedirect}>
          Voltar
        </Button>
      </div>
    </Modal.Footer>
  </Modal>
);

const SuccessChecklistModal = ({ isOpen, onClose }) => (
  <Modal show={isOpen} onHide={onClose} centered>
    <Modal.Body>
      <div className="text-center mb-4">
        <i className="bi bi-check-circle" style={{ fontSize: '10rem', color: 'green' }}></i>
        <p>Operação Realizada com Sucesso!</p>
      </div>
      
      <p>Seu agendamento foi realizado com sucesso com Keyllane</p>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="success" onClick={onClose}>
        Fechar
      </Button>
    </Modal.Footer>
  </Modal>
);

  
  // Definir as datas indisponíveis
  // Estado para armazenar a data selecionada
  const [selectedDate, setSelectedDate] = useState(null);

  // Função chamada ao selecionar uma data
  const handleDateChange = (date) => {
    setSelectedDate(date);  // Atualiza o estado com a data escolhida
    registrarEvento(date);  // Chama a função para registrar o evento
  };

  // Função para registrar um evento (exemplo de ação)
  const registrarEvento = (date) => {
    console.log('Data selecionada:', date);
    // Aqui você pode realizar qualquer ação, como enviar a data para uma API, etc.
    alert(`Evento registrado para a data: ${date}`);
  };


 

     
      const [searchParams] = useSearchParams();

    // Extrai o valor do parâmetro "servico" da query string
    const servico = searchParams.get('servico');
    const tempo = searchParams.get('tempo');
    const preco = searchParams.get('preco');


  const [isPrimeiroModalOpen, setIsPrimeiroModalOpen] = useState(false);
      
    
    
      
    // Estado para armazenar os valores dos botões
  const [buttonValues, setButtonValues] = useState({});
  const [buttonData, setButtonData] = useState({});
  const [lastClickedButton, setLastClickedButton] = useState(null); // Armazena o último botão clicado
  const [showModal, setShowModal] = useState(false); // Controle do modal
  const [modalContent, setModalContent] = useState(''); // Conteúdo do modal
  

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 7
  };

  

  
  useEffect(() => {
    // Simular chamada de API para buscar dados dos botões
    const fetchButtonData = async () => {
      const simulatedApiResponse = {
        button1: { name: '08:00', value: '0' },
        button2: { name: '08:30', value: '0' },
        button3: { name: '09:00', value: '0' },
        button4: { name: '09:30', value: '0' },
        button5: { name: '10:00', value: '0' },
        button6: { name: '10:30', value: '6' },
        button7: { name: '11:00', value: '0' },
        button8: { name: '11:30', value: '8' },
        button9: { name: '14:00', value: '0' },
        button10: { name: '14:30', value: '10' },
        button11: { name: '15:00', value: '0' },
        button12: { name: '15:30', value: '12' },
        button13: { name: '16:00', value: '0' },
        button14: { name: '16:30', value: '0' },
        button15: { name: '17:00', value: '15' },
        button16: { name: '17:30', value: '0' },
        button17: { name: '18:00', value: '17' },
      };
  
      // Atualizar os dados dos botões com base no 'value'
      const updatedButtonData = Object.keys(simulatedApiResponse).reduce((acc, key) => {
        acc[key] = {
          ...simulatedApiResponse[key],
          isActive: simulatedApiResponse[key].value === '0',  // Define 'true' se value for '0', senão 'false'
        };
        return acc;
      }, {});
  
      // Atualizar o estado com os dados processados
      setButtonData(updatedButtonData);
  
      // Atualizar os valores dos botões com os dados booleanos
      const apiButtonValues = Object.keys(updatedButtonData).reduce((acc, key) => {
        acc[key] = updatedButtonData[key].isActive.toString();  // Converter booleano para string
        return acc;
      }, {});
  
      setButtonValues(apiButtonValues);
    };
  
    fetchButtonData();
  }, []);
  
    

  // Função para alternar o valor do botão
  const toggleValue = (buttonId) => {
    if (buttonData[buttonId] && buttonData[buttonId].isActive === false) {
      // Define o conteúdo do modal com o valor da API e uma mensagem curta
      const message = `Há ${buttonData[buttonId].value} pessoas na fila de espera.`;
      setModalContent(message);
      setShowModal(true); // Abre o modal
      return;
    }
  
    setButtonValues((prevValues) => {
      const newValue = prevValues[buttonId] === 'true' ? 'false' : 'true';
      const updatedValues = { ...prevValues, [buttonId]: newValue };
      
      // Se houver um último botão clicado, restaura ele para 'true' se ele veio como ativo da API
      if (lastClickedButton && buttonData[lastClickedButton]?.isActive) {
        updatedValues[lastClickedButton] = 'true';
      }
  
      // Atualiza o último botão clicado
      setLastClickedButton(buttonId);
  
      return updatedValues;
    });
  };
  
  
 
  // Lista de botões para renderizar
 
  const buttonIds = ['button1', 'button2', 'button3', 'button4', 'button5', 'button6', 'button7', 'button8', 'button9', 'button10', 'button11', 'button12', 'button13', 'button14', 'button15', 'button16', 'button17']; // Exemplo de IDs de botões


  
 

    return(
        <div className="col p-5 overflow-auto h-100">
  <div className="d-flex flex-column vh-100">
    {/* Título ou outro conteúdo acima do card */}
    <div className="p-5">
      <div className="row">
        <div className="col-12">
       

         

        <div>
      <h2>Escolha uma Data</h2>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}  // Chama a função ao alterar a data
        dateFormat="MMMM d, yyyy"
        placeholderText="Selecione uma data"
      />
    </div>

    <div className="mb-4 mt-5"></div>
    <div className="mb-4 mt-5"></div>
                


    <div className="mb-4 mt-5">
    <h1>Horários Disponíveis</h1>

    <div className="mb-4 mt-5"></div>
    <div className="mb-4 mt-5"></div>
    <div className="mb-4 mt-5"></div>
    


              
<Slider {...settings}>

      {buttonIds.map((id) => (
        <div key={id} style={{ marginBottom: '10px' }}>
          <button
  id={id}
  onClick={() => toggleValue(id)}
  style={{
    backgroundColor: buttonValues[id] === 'true' ? 'green' : 'red',  // 'true' será verde e 'false' será vermelho
    color: 'black',
    padding: '10px 20px',
    border: 'none',
    fontSize: '16px',
    cursor: 'pointer',
    borderRadius: '100px',
  }}
>
  {buttonData[id] ? `${buttonData[id].name}` : 'Carregando...'}
</button>

          <div>
            {/* Exibe as informações adicionais da API */}
            {buttonData[id] && (
              <>
                
                <p>{buttonData[id].value} pessoas na fila</p>
              </>
            )}
          </div>

        </div>
      ))}
       </Slider>
       <div>
     
   
       <div>
       <AgendamentosModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        modalContent={modalContent}
      />



                </div>

</div>
     </div>

     <div className="mb-4 mt-5"></div>
     <div className="mb-4 mt-5"></div>
     <div className="mb-4 mt-5"></div>
                


  <div className="mb-4 mt-5">
            <h1>Agendar Serviço</h1>
            {servico && (
                <p>Serviço: <strong>{servico}</strong></p>
            )}
            {tempo && (
                <p>Tempo Estimado: <strong>{tempo} minutos</strong></p>
            )}
            {preco && (
                <p>Preço: <strong>R$ {preco}</strong></p>
            )}
        </div>


       

<div className="mb-4 mt-5"></div>
    <div className="mb-4 mt-5"></div>
    <div className="mb-4 mt-5"></div>




    <button className="custom-button" onClick={handleOpenPrimeiroModal}>
      <span className="mdi">Finalizar agendamento</span>
    </button>
    <button className="custom-button" onClick={() => console.log('Outro botão clicado')}>
            <span className="mdi">Outro Botão</span>
          </button>
    <PrimeiroModal isOpen={isPrimeiroModalOpen} onClose={handleClosePrimeiroModal} />
    
            <div className="className=mb-5 mt-0">
   

<div className="mb-4 mt-5"></div>
<div className="mb-4 mt-5"></div>





<div className="mb-4 mt-5"></div>
<div className="mb-4 mt-5"></div>
                
<div className="col p-5 overflow-auto h-100">
    <div className="d-flex flex-column vh-100">
      <div className="p-5">
       
      <div className="col p-5 overflow-auto h-100">
      {/* Seu conteúdo */}

      <PrimeiroModal 
        isOpen={isPrimeiroModalOpen} 
        onClose={handleClosePrimeiroModal} 
        onFinalizarClick={handleFinalizarClick} // Passa a função aqui
      />
      
      <SegundoModal 
        isOpen={isSegundoModalOpen} 
        onClose={() => setIsSegundoModalOpen(false)} 
      />

      {/* Seu conteúdo */}
    </div>
        
         
        </div>
        <SegundoModal isOpen={isSegundoModalOpen} onClose={() => setIsSegundoModalOpen(false)} />
        <SuccessChecklistModal isOpen={isSuccessModalOpen} onClose={handleCloseAllModals}  />

        <div className="mb-4 mt-5"></div>
        <div className="mb-4 mt-5"></div>
        <div className="mb-4 mt-5"></div>
        <div className="mb-4 mt-5"></div>
      </div>
    </div>
  </div>

  

        </div>
      </div>
    </div>
    </div>
    </div>
   

        
    
    );  
};

export default Agendamentos_Clientes;  
