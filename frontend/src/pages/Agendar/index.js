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







const Agendamentos_Clientes = () => {

  /*const [show, setShow] = useState(false);

    // Função que controla o fechamento do modal
    const handleClose = () => setShow(false);

    // Abre o modal quando o componente é montado
    useEffect(() => {
        setShow(true);
    }, []); 

    const [openAgendarModal, setOpenAgendarModal] = useState(false);*/




  //const [startDate, setStartDate] = useState(new Date());
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

const PrimeiroModal = ({ isOpen, onClose }) => (
  <Modal show={isOpen} onHide={onClose}>
    <Modal.Header closeButton>
      <Modal.Title>Serviço adicionado</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      O que você deseja fazer agora?
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={FinalizarProcedimento}>
        Finalizar serviço
      </Button>
      <Button variant="secondary" onClick={EditarServiço}>
        Editar serviço
      </Button>
    </Modal.Footer>
  </Modal>
);
  

  const [startDate, setStartDate] = useState(null);

  // Definir os horários disponíveis, por exemplo, das 9h às 17h
 /* const isTimeSelectable = (time) => {
    const selectedHour = time.getHours();
    return selectedHour >= 9 && selectedHour <= 17;
  };*/

  // Definir as datas indisponíveis
  const isDateSelectable = (date) => {
    const unavailableDates = ['2024-09-10', '2024-09-15'];
    const dateString = date.toISOString().split('T')[0];
    return !unavailableDates.includes(dateString);
  };


 /* function Agendar(props) {
    const searchParams = new URLSearchParams(props.location.search);
    const nome = searchParams.get('nome');
    const tempo_estimado = searchParams.get('tempo_estimado');
    const preco = searchParams.get('preco');
  }*/

  /*function paraMeusAgendamentos(servico) {
      navigate(`/meus_agendamentos?servico=${servico}`);
  }*/

      function paraMeusAgendamentos(nome, tempo_estimado, preco, data, hora) {
        navigate(`/meus_agendamentos?servico=${nome}&tempo=${tempo_estimado}&preco=${preco}&data=${data}&hora=${hora}`);
    }
      const [searchParams] = useSearchParams();

    // Extrai o valor do parâmetro "servico" da query string
    const servico = searchParams.get('servico');
    const tempo = searchParams.get('tempo');
    const preco = searchParams.get('preco');


  const [isPrimeiroModalOpen, setIsPrimeiroModalOpen] = useState(false);
      
    
  const handleOpenPrimeiroModal = () => setIsPrimeiroModalOpen(true);
  const handleClosePrimeiroModal = () => setIsPrimeiroModalOpen(false);
    
      
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

  

  /*const fetchButtonData = async (buttonId) => {
    try {
      // Simulando uma chamada de API
      const simulatedApiResponse = {
        name: `Nome do botão ${buttonId}`,   // Informação 1
        value: `Valor ${Math.floor(Math.random() * 100)}`, // Informação 2
      };

      // Atualizando o estado com as informações recebidas da "API"
      setButtonData((prevData) => ({
        ...prevData,
        [buttonId]: simulatedApiResponse,
      }));
    } catch (error) {
      console.error('Erro ao buscar dados da API:', error);
    }
  };
  const buttonIds = ['button1', 'button2', 'button3', 'button4', 'button5', 'button6', 'button7', 'button8', 'button9', 'button10', 'button11', 'button12', 'button13', 'button14', 'button15', 'button16', 'button17', 'button18', 'button19']; // Exemplo de IDs de botões

  useEffect(() => {
    buttonIds.forEach((id) => fetchButtonData(id));
  }, []);

  // Carregar os valores dos botões do localStorage quando o componente for montado
  useEffect(() => {
    const savedValues = JSON.parse(localStorage.getItem('buttonValues')) || {};
    setButtonValues(savedValues);
  }, []);

  // Função para alternar o valor do botão
  const toggleValue = (buttonId) => {
    setButtonValues((prevValues) => {
      const newValue = prevValues[buttonId] === 'true' ? 'false' : 'true';
      const updatedValues = { ...prevValues, [buttonId]: newValue };
      // Mudar o valor entre true e false
      /*if (newValue === "true") {
        const button = document.getElementById(buttonId);
        button.style.backgroundColor = "green"; // Reseta a cor de fundo para o valor true
    } else {
      const button = document.getElementById(buttonId);
      button.style.backgroundColor = "red"; // Reseta a cor de fundo para o valor false
    }
      // Armazenar os valores atualizados no localStorage
      localStorage.setItem('buttonValues', JSON.stringify(updatedValues));
      
      return updatedValues;
    });
  };

  // Função para definir o valor do botão com base no argumento
 

  // Lista de botões para renderizar*/

  useEffect(() => {
    
    

    // Simular chamada de API para buscar dados dos botões
    const fetchButtonData = async () => {
      const simulatedApiResponse = {
        button1: { name: '08:00', value: '0', isActive: true },
        button2: { name: '08:30', value: '2', isActive: false },
        button3: { name: '09:00', value: '0', isActive: true },
        button4: { name: '09:30', value: '4', isActive: false },
        button5: { name: '10:00', value: '5', isActive: false },
        button6: { name: '10:30', value: '6', isActive: false },
        button7: { name: '11:00', value: '0', isActive: true },
        button8: { name: '11:30', value: '8', isActive: false },
        button9: { name: '14:00', value: '0', isActive: true },
        button10: { name: '14:30', value: '10', isActive: false },
        button11: { name: '15:00', value: '0', isActive: true },
        button12: { name: '15:30', value: '12', isActive: false },
        button13: { name: '16:00', value: '0', isActive: true },
        button14: { name: '16:30', value: '0', isActive: true },
        button15: { name: '17:00', value: '15', isActive: false },
        button16: { name: '17:30', value: '0', isActive: true },
        button17: { name: '18:00', value: '17', isActive: false },
      };
     

// Atualiza os dados dos botões
setButtonData(simulatedApiResponse);

// Atualiza os valores dos botões com os dados da API ou usa os do localStorage se disponíveis
const apiButtonValues = Object.keys(simulatedApiResponse).reduce((acc, key) => {
  acc[key] = simulatedApiResponse[key].isActive.toString(); // Converte booleano para string
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
       

         

  <div className="className=mb-5 mt-0">
  
      <h2>Escolher Data</h2>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        
        dateFormat="MMMM d, yyyy"
        placeholderText="Selecione data"
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
              backgroundColor: buttonValues[id] === 'true' ? 'green' : 'red',
              color: 'black',
              padding: '10px 20px',
              border: 'none',
              fontSize: '16px',
              cursor: 'pointer',
              borderRadius: '100px', // Botões com borda arredondada
            }}
          >
            {/* Exibe o nome do botão (da API) e o valor armazenado */}
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
     
      {/* Modal de Agendamento */}
     {/* <AgendarModal     
        isOpen={openAgendarModal}
        onClose={() => setOpenAgendarModal(false)}
      />*/}

       {/* Modal de Agendamento */}
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
    <PrimeiroModal isOpen={isPrimeiroModalOpen} onClose={handleClosePrimeiroModal} />
    
            <div className="className=mb-5 mt-0">
   

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
   

        
    
    );  
};

export default Agendamentos_Clientes;  
