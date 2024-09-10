import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import axios from 'axios'; // Importa o axios
//import MeusAgendamentosCard from '../../components/MeusAgendamentosCard'; // Componente para exibir os serviços
import 'bootstrap-icons/font/bootstrap-icons.css';
//import { Card } from 'react-bootstrap';
import { getAppointmentsFromCustomer, cancelAppointmentCustomer } from '../../store/modules/agendamento/sagas';




export default function Agendamentos_Clientes() {
  const [isPrimeiroModalOpen, setIsPrimeiroModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [agendamentos, setAgendamentos] = useState([]);
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [buttonData, setButtonData] = useState({});
  const navigate = useNavigate();
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null); // Novo estado
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const telefone = queryParams.get('telefone');

  async function listAllCustomerAppointments(customerPhone) {
    const response = await getAppointmentsFromCustomer(customerPhone);

    if (response)
      setAgendamentos(response.data);
  }

  async function cancelAppointmentFromCustomer(id, customerPhone) {
    try {
      const response = await cancelAppointmentCustomer(id, customerPhone);

      if (response) {
        if (response.status === 200) {
          window.location.reload();
        }
      }
    } catch (error) {
      console.error('Erro ao cancelar agendamento');
    }
  }
  
  useEffect(() => {
    listAllCustomerAppointments(telefone);
  }, []); // Dependência para garantir que o telefone seja atualizado quando a URL mudar


  const handleCloseConfirmationModal = () => setIsConfirmationModalOpen(false);
  const handleShowConfirmationModal = (id) => {
    setServiceToDelete(id); // Define o serviço a ser deletado
    setIsConfirmationModalOpen(true); // Abre o modal de confirmação
  };



  const ServicoCard = ({ service, onDelete }) => {
    const getStatusButtonVariant = (status) => {
      switch (status) {
        case 'Confirmado':
          return 'success'; // Cor verde
        case 'Agendado':
          return 'primary'; // Cor azul
        case 'Cancelado':
          return 'danger';  // Cor vermelha
        case 'Finalizado':
          return 'secondary'; // Cor cinza
        default:
          return 'info';     // Cor azul clara
      }
    };
  
    return (
      <div className="service-card col p-5 overflow-auto h-100">
  <div className="row d-flex align-items-center justify-content-between">
    <div className="col-9 d-flex align-items-center">
      <div className="nome">{service.procedureName}</div>
      {/* Botão ao lado do nome do serviço exibindo o status */}
      <Button 
        variant={getStatusButtonVariant(service.appointmentStatus)} // Define a cor com base no status
        className="ms-3 text-center" // Adicione a classe para centralizar o texto
        disabled
        style={{ 
          fontSize: '0.8rem',        
          padding: '0.2rem 0.4rem',  
          minWidth: '80px',          
          maxWidth: '100px',         
          whiteSpace: 'nowrap',      
          overflow: 'hidden',        
          textOverflow: 'ellipsis',
          display: 'flex',           // Flexbox para centralizar o conteúdo
          alignItems: 'center',      // Centraliza verticalmente
          justifyContent: 'center'   // Centraliza horizontalmente  
        }}
      >
        {service.appointmentStatus}
      </Button>
    </div>

    <div className="div-meus-agendamentos col-3 text-end">
  <button 
    className="excluir" 
    onClick={() => onDelete(service.appointmentId)}
    style={{
      visibility: service.appointmentStatus !== 'Finalizado' && service.appointmentStatus !== 'Cancelado' 
        ? 'visible' 
        : 'hidden'  // Apenas esconde o botão mantendo o espaço
    }}
  >
    <i className="bi bi-trash"></i>
  </button>
</div>




    <div className="preco"><strong>{service.appointmentSchedule} horas</strong></div>
    <div className="tempo_estimado">Tempo Estimado: {service.procedureDuration} minutos</div>
    <div className="preco">Preço: {parseFloat(service.procedurePrice).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</div>
  </div>
</div>
      
    );
  };
  
  // Função para deletar item
  const handleDelete = () => {
    cancelAppointmentFromCustomer(serviceToDelete, telefone);

    setIsConfirmationModalOpen(false); // Fecha o modal após a exclusão
  };  

  return (
    <div className="col p-5 overflow-auto h-100">
      <div className="d-flex flex-column vh-100">
        <div className="p-5">
          <h2 className="mb-5 mt-0">Agendamentos</h2>
          <div className="row">
                <div className="className=mb-5 mt-0">
                    <div className="d-flex flex-column">
              {/* Aqui está o mapeamento de serviços para renderizar cada um em um card */}
              {Object.values(agendamentos).map((agendamento) => (
                 <ServicoCard 
                    key={agendamento.appointmentId} 
                    service={agendamento} 
                    onDelete={handleShowConfirmationModal} 
                 />
              ))}
            </div>
          </div>
         
          <div className="mb-4 mt-5"></div>
          <div className="mb-4 mt-5"></div>
          <div className="mb-4 mt-5"></div>
          <Modal show={isConfirmationModalOpen} onHide={handleCloseConfirmationModal} centered>
  <Modal.Header closeButton>
    <Modal.Title>Confirmação</Modal.Title>
  </Modal.Header>
  <Modal.Body className="text-center">
    {/* Ícone de perigo */}
    <i className="bi bi-exclamation-triangle" style={{ fontSize: '3rem', color: 'red' }}></i>
    <p className="mt-3">
      Tem certeza de que deseja desmarcar este agendamento?
    </p>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleCloseConfirmationModal}>Cancelar</Button>
    <Button variant="danger" onClick={handleDelete}>Deletar</Button>
  </Modal.Footer>
</Modal>


        </div>
      </div>
    </div>
    </div>
                
  );
}
