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
import { getProcedureById } from "../../store/modules/procedimento/sagas";
import { postAppointment, getAvailableSchedules, enterQueue } from "../../store/modules/agendamento/sagas";

let formattedDate;
let idAppointment = null;
let appointmentData = {
  schedule: '',
  customerName: '',
  customerPhone: ''
};

let queueData = {
  idAppointment: '',
  customerName: '',
  customerPhone: ''
}

const Agendamentos_Clientes = () => {
  const navigate = useNavigate(); // Hook para navegação
  
  const [procedimento, setProcedimento] = useState(null);
  const [agendamento, setAgendamento] = useState(null);
  const [schedules, setSchedules] = useState([]);

  const [searchParams] = useSearchParams();
  // Extrai o valor do parâmetro "servico" da query string
  const idProcedure = searchParams.get('id');

  // Função para redirecionar para outra página
  const handleRedirect = () => {
    navigate('/escolher-procedimento'); // Substitua '/nova-pagina' pela rota desejada
  
  };
  const FinalizarProcedimento = () => {
    appointmentData.schedule = null;
    appointmentData.customerName = null;

    queueData.idAppointment = null;
    queueData.customerName = null;

    console.clear();

    if (idAppointment === '0')
      navigate(`/meus_agendamentos?telefone=${appointmentData.customerPhone}`); // Substitua '/nova-pagina' pela rota desejada
    else
      navigate(`/meus_agendamentos?telefone=${queueData.customerPhone}`);
  };
  const EditarServiço = () => {
    navigate('/escolher-procedimento'); // Substitua '/nova-pagina' pela rota desejada
  
  };

  // Função para pegar as informações do procedimento escolhido
  async function findProcedure(id) {
    const response = await getProcedureById(id);
    setProcedimento(response.data);
  }

  // Função para listar os horários disponíveis para um determinado dia
  async function listAvailableSchedules(id, schedule) {
    const response = await getAvailableSchedules(id, schedule);
    setSchedules(response.data);
  }

  // Função para cadastrar um agendamento
  async function createAppointment(id, data) {
    try {
      const response = await postAppointment(id, data);
  
      if (response) {
        if (response.status === 201) {
          FinalizarProcedimento();
        }
      }
    } catch (error) {
      console.error('Erro ao criar agendamento');
    }
  }

  async function enterAppointmentQueue(data) {
    try {
      const response = await enterQueue(data);
  
      if (response) {
        if (response.status === 201) {
          FinalizarProcedimento();
        }
      }
    } catch (error) {
      console.error('Erro ao entrar na fila');
    }
  }
  
 
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


const AgendamentosModal = ({ isOpen, onClose, onFinalizarClick, modalContent }) => (
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
      <Button variant="secondary" onClick={onFinalizarClick}>
        Entrar na fila de espera
      </Button>
    </Modal.Footer>
  </Modal>
);

const PrimeiroModal = ({ isOpen, onClose, onFinalizarClick, modalData }) => 
  (
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

// Função para avançar e agendar
const handleAvancarEAgendar = () => {
  setIsPrimeiroModalOpen(false);
  if (idAppointment === '0')
    createAppointment(idProcedure, appointmentData);
  else
    enterAppointmentQueue(queueData);
  console.clear();
};

const SegundoModal = ({ isOpen, onClose }) => {
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');

  // Função para capturar o valor do campo de entrada
  const handleInputChange = (e) => {
    const newUserName = e.target.value;
    setUserName(newUserName);
    if (idAppointment === '0')
      appointmentData.customerName = newUserName;
    else
      queueData.customerName = newUserName;
  };

  // Função para capturar o valor do campo de telefone
  const handlePhoneChange = (e) => {
    const newUserPhone = e.target.value;
    setUserPhone(newUserPhone);
    if (idAppointment === '0') {
      appointmentData.customerPhone = newUserPhone;
    } else {
      queueData.customerPhone = newUserPhone;
    }
  };

  // Usar useEffect para lidar com mudanças no modal, se necessário
  useEffect(() => {
    if (!isOpen) {
      // Limpa os campos quando o modal é fechado
      setUserName('');
      setUserPhone('');
    }
  }, [isOpen]); // Executa quando isOpen mudar

  return (
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
};

const SuccessChecklistModal = ({ isOpen, onClose }) => {

  return (
    <Modal show={isOpen} onHide={onClose} centered>
      <Modal.Body>
        <div className="text-center mb-4">
          <i className="bi bi-check-circle" style={{ fontSize: '10rem', color: 'green' }}></i>
          <p>Operação Realizada com Sucesso!</p>
        </div>
        
        <p>Seu agendamento foi realizado com sucesso com Keyllane</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={FinalizarProcedimento}>
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
  
  // Definir as datas indisponíveis
  // Estado para armazenar a data selecionada
  const [selectedDate, setSelectedDate] = useState(null);

  // Função chamada ao selecionar uma data
  const handleDateChange = (date) => {
    formattedDate = date.toLocaleDateString('pt-BR');
    listAvailableSchedules(idProcedure, formattedDate);
    setSelectedDate(date);  // Atualiza o estado com a data escolhida
  };

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
    findProcedure(idProcedure);
    if (schedules.length > 0) {  // Só roda quando schedules for atualizado
        // Processar os horários disponíveis
        const updatedButtonData = schedules.reduce((acc, schedule, index) => {
            const key = `button${index + 1}`;
            acc[key] = {
                name: schedule.time,
                value: schedule.queueCount.toString(),
                idAppointment: schedule.idAppointment,
                isActive: schedule.queueCount === 0  // Define 'true' se queueCount for 0, senão 'false'
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
    }
  }, [schedules]);  // Este useEffect será ativado sempre que 'schedules' mudar
  
  // Função para alternar o valor do botão
  const toggleValue = (buttonId, e) => {
    idAppointment = e.target.getAttribute('data-id-appointment');

    if (formattedDate) {
      if (idAppointment === '0') {
        appointmentData.schedule = `${formattedDate} ${buttonData[buttonId].name}`;
      } else {
        queueData.idAppointment = idAppointment;
      }
    }

    if (buttonData[buttonId]) {
      const queueCount = parseInt(buttonData[buttonId].value, 10);
      
      if (queueCount > 0) {
        const message = `Há ${buttonData[buttonId].value} pessoas na fila de espera.`;
        setModalContent(message);
        setShowModal(true); // Abre o modal
        return;
      }
    }

    setIsPrimeiroModalOpen(true);
  };

  return(
    <div className="col p-5 overflow-auto h-100">
      <div className="d-flex flex-column vh-100">
        {/* Título ou outro conteúdo acima do card */}
        <div className="p-5">
          <div className="row">
            <div className="col-12">
            <div className="date-picker-container">
  <h2 className="title">Escolha uma Data</h2>
  <DatePicker
    selected={selectedDate}
    onChange={handleDateChange}
    dateFormat="dd/MM/yyyy"
    placeholderText="Selecione uma data"
    className="date-picker"
    minDate={new Date()}  // Adicione esta linha para impedir a seleção de datas passadas
  />
</div>


              <div className="mb-4 mt-5"></div>
              <div className="mb-4 mt-5"></div>
                <div className="mb-4 mt-5">
                <h1 className="title">Horários Disponíveis</h1>
                <div className="slider-container">
                  <Slider {...settings} className="slider">
                    {Object.keys(buttonData).map((id) => (
                      buttonData[id] && (
                        <div key={id} className="button-wrapper">
                          <button
                            id={id}
                            data-id-appointment={buttonData[id].idAppointment}
                            onClick={(e) => toggleValue(id, e)}
                            className={`appointment-button ${buttonValues[id] === 'true' ? 'active' : 'inactive'}`}
                          >
                            {buttonData[id].name}
                          </button>
                          <div className="info">
                            <p>{buttonData[id].value} pessoas na fila</p>
                          </div>
                        </div>
                      )
                    ))}
                  </Slider>
                </div>
                <div>   
                  <div>
                    <AgendamentosModal
                      isOpen={showModal}
                      onClose={() => setShowModal(false)}
                      onFinalizarClick={handleFinalizarClick} // Passa a função aqui
                      modalContent={modalContent}
                    />
                  </div>
                </div>
            </div>
          <div className="mb-4 mt-5"></div>
          <div className="mb-4 mt-5"></div>
          <div className="mb-4 mt-5"></div>
          <div className="mb-4 mt-5">
          <h1 className="procedimento-title">Procedimento Selecionado</h1>
{procedimento ? (
  <div className="procedimento-details">
    <p className="procedimento-item">
      Serviço: <strong>{procedimento.name}</strong>
    </p>
    <p className="procedimento-item">
      Tempo Estimado: <strong>{procedimento.duration} minutos</strong>
    </p>
    <p className="procedimento-item">
      Preço: <strong>{parseFloat(procedimento.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</strong>
    </p>
  </div>
) : (
  <p className="loading-message">Carregando informações do procedimento...</p>
)}

          </div>     
          <div className="mb-4 mt-5"></div>
          <div className="mb-4 mt-5"></div>
          <div className="mb-4 mt-5"></div>
          <PrimeiroModal isOpen={isPrimeiroModalOpen} onClose={handleClosePrimeiroModal} />               
          <div>
            <div>
              <div className="p-5">
                <div>
                  <PrimeiroModal 
                    isOpen={isPrimeiroModalOpen} 
                    onClose={handleClosePrimeiroModal} 
                    onFinalizarClick={handleFinalizarClick} // Passa a função aqui
                    modalData={appointmentData}
                  />     
                  <SegundoModal 
                    isOpen={isSegundoModalOpen} 
                    onClose={() => setIsSegundoModalOpen(false)}
                    modalData={appointmentData}
                  />
                </div>    
              </div>
              <SegundoModal isOpen={isSegundoModalOpen} onClose={() => setIsSegundoModalOpen(false)} />
              <SuccessChecklistModal isOpen={isSuccessModalOpen} onClose={handleCloseAllModals}  />

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
