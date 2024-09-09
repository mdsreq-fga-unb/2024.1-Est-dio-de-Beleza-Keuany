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
import { postAppointment, getAvailableSchedules } from "../../store/modules/agendamento/sagas";

let formattedDate;
let appointmentData = {
  schedule: '',
  customerName: '',
  customerPhone: ''
};

const Agendamentos_Clientes = () => {
  const navigate = useNavigate(); // Hook para navegação
  
  const [procedimento, setProcedimento] = useState(null);
  const [agendamento, setAgendamento] = useState(null);
  const [schedules, setSchedules] = useState([]);

  const [searchParams] = useSearchParams();
  // Extrai o valor do parâmetro "servico" da query string
  const idProcedure = searchParams.get('id');
  /* if (schedules)
    console.log(schedules); */
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
    const response = await postAppointment(id, data);

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

const SegundoModal = ({ isOpen, onClose, modalData }) => (
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
      <Button variant="success" onClick={FinalizarProcedimento}>
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

  

  
  /* useEffect(() => {
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
    
    findProcedure(idProcedure);
    fetchButtonData();
  }, []); */

  useEffect(() => {
    findProcedure(idProcedure);
    if (schedules.length > 0) {  // Só roda quando schedules for atualizado
        // Processar os horários disponíveis
        const updatedButtonData = schedules.reduce((acc, schedule, index) => {
            const key = `button${index + 1}`;
            acc[key] = {
                name: schedule.time,
                value: schedule.queueCount.toString(),
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
  const toggleValue = (buttonId) => {
    if (formattedDate) {
      appointmentData.schedule = `${formattedDate} ${buttonData[buttonId].name}`;
      console.log(appointmentData);
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

  
    /* setButtonValues((prevValues) => {
      const newValue = prevValues[buttonId] === 'true' ? 'false' : 'true';
      const updatedValues = { ...prevValues, [buttonId]: newValue };
      
      // Se houver um último botão clicado, restaura ele para 'true' se ele veio como ativo da API
      if (lastClickedButton && buttonData[lastClickedButton]?.isActive) {
        updatedValues[lastClickedButton] = 'true';
      }
  
      // Atualiza o último botão clicado
      setLastClickedButton(buttonId);
  
      return updatedValues;
    }); */
  };

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
                    dateFormat="dd/MM/yyyy"
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
                      {Object.keys(buttonData).map((id) => (
                        buttonData[id] && (
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
                              {buttonData[id].name}
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
                        )
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
            {procedimento ? (
              <>
                <p>Serviço: <strong>{procedimento.name}</strong></p>
                <p>Tempo Estimado: <strong>{procedimento.duration} minutos</strong></p>
                <p>Preço: <strong>{parseFloat(procedimento.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</strong></p>
              </>
            ): (
              <p>Carregando informações do procedimento...</p>
            )}
          </div>     
          <div className="mb-4 mt-5"></div>
          <div className="mb-4 mt-5"></div>
          <div className="mb-4 mt-5"></div>
          {/* <button className="custom-button" onClick={handleOpenPrimeiroModal}>
            <span className="mdi">Finalizar agendamento</span>
          </button> */}
          <PrimeiroModal isOpen={isPrimeiroModalOpen} onClose={handleClosePrimeiroModal} />               
          <div>
            <div>
              <div className="p-5">
                <div>
                  {/* Seu conteúdo */}
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
                  {/* Seu conteúdo */}
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
