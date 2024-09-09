import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import axios from 'axios'; // Importa o axios
//import MeusAgendamentosCard from '../../components/MeusAgendamentosCard'; // Componente para exibir os serviços
import 'bootstrap-icons/font/bootstrap-icons.css';
//import { Card } from 'react-bootstrap';




export default function Agendamentos_Clientes() {
  const [isPrimeiroModalOpen, setIsPrimeiroModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [buttonData, setButtonData] = useState({});
  const navigate = useNavigate();
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null); // Novo estado
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const telefone = queryParams.get('telefone');
    console.log("Telefone recebido:", telefone);  // Exibe o telefone no console
  }, [location.search]); // Dependência para garantir que o telefone seja atualizado quando a URL mudar


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
            <div className="nome">{service.name}</div>
            {/* Botão ao lado do nome do serviço exibindo o status */}
            <Button 
            variant={getStatusButtonVariant(service.status)} // Define a cor com base no status
            className="ms-3" 
            disabled
            style={{ 
              fontSize: '0.8rem',        
              padding: '0.2rem 0.4rem',  
              minWidth: '80px',          
              maxWidth: '100px',         
              whiteSpace: 'nowrap',      
              overflow: 'hidden',        
              textOverflow: 'ellipsis'  
            }}>
            {service.status}
          </Button>
        </div>
        <div className="col-2 text-end">
          {/* Condiciona a exibição do botão de exclusão com base no status */}
          {service.status !== 'Finalizado' && (
            <button className="custom-button" onClick={() => onDelete(service.id)}>
                <i className="bi bi-trash" style={{ fontSize: '1.5rem', color: 'red' }}></i>
              </button>
          )}
        </div>
            <div className="tempo_estimado">Tempo: {service.tempo} minutos</div>
            <div className="preco">Preço: R$ {service.preco}</div>
            <div className="preco">Data: {service.data}</div>
            <div className="preco">Status: {service.status}</div>
          </div>
         
        </div>
      
    );
  };
  
  

  
  // Função para deletar item
  const handleDelete = () => {
    console.log(`Item com id ${serviceToDelete} removido`);
    setButtonData((prevData) => {
      const updatedData = { ...prevData };
      delete updatedData[serviceToDelete]; // Remove o serviço
      return updatedData;
    });
    setIsConfirmationModalOpen(false); // Fecha o modal após a exclusão
  };
  

  // Função para buscar dados dos serviços
  const fetchButtonData = async () => {
    try {
      // Simulação de uma resposta da API com 3 serviços
      const simulatedApiResponse = {
        service1: { id: '1', name: 'Design Facial', tempo: 30, preco: 100, data: '10/10/2024', hora: '09:00', status: 'Confirmado' },
        service2: { id: '2', name: 'Massagem Relaxante', tempo: 60, preco: 150, data: '10/10/2024', status: 'Finalizado' },
        service3: { id: '3', name: 'Tratamento Capilar', tempo: 45, preco: 200, data: '11/10/2024', status: 'Agendado' }
      };
      setButtonData(simulatedApiResponse);
    } catch (error) {
      console.error('Erro ao buscar dados dos serviços:', error);
    }
  };

  useEffect(() => {
    fetchButtonData();
  }, []);

  

  return (
    <div className="col p-5 overflow-auto h-100">
      <div className="d-flex flex-column vh-100">
        <div className="p-5">
          <h2 className="mb-5 mt-0">Agendamentos</h2>
          <div className="row">
                <div className="className=mb-5 mt-0">
                    <div className="d-flex flex-column">
              {/* Aqui está o mapeamento de serviços para renderizar cada um em um card */}
              {Object.values(buttonData).map((service) => (
                 <ServicoCard key={service.id} service={service} onDelete={handleShowConfirmationModal} />
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
