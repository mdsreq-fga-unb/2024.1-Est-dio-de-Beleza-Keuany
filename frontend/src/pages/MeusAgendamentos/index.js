//import AgendarCard from "../../components/AgendarURLQuerry/index"; 
//import { useSearchParams } from 'react-router-dom';
//import AgendamentosModal from "../MeusAgendamentos/agendamentosModal";
//import { useEffect } from "react";
//import ServicoCard from "../../components/ServicoCard";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Importa ícones do Bootstrap






export default function Agendamentos_Clientes() {

    const [isPrimeiroModalOpen, setIsPrimeiroModalOpen] = useState(false);
    const [userName, setUserName] = useState(''); // Estado para armazenar o nome do usuário
    const [userPhone, setUserPhone] = useState(''); // Estado para armazenar o número de telefone
    const handleOpenPrimeiroModal = () => setIsPrimeiroModalOpen(true);
    const handleClosePrimeiroModal = () => setIsPrimeiroModalOpen(false);
   
  

    const navigate = useNavigate(); // Hook para navegação

  

  // Função para redirecionar para outra página
  const handleRedirect = () => {
    navigate('/escolher-procedimento'); // Substitua '/nova-pagina' pela rota desejada
  
  };

  // Função para capturar o valor do campo de entrada
  const handleInputChange = (e) => {
    setUserName(e.target.value); // Atualiza o estado com o valor digitado
  };

     // Função para capturar o valor do campo de telefone
  const handlePhoneChange = (e) => {
    setUserPhone(e.target.value); // Atualiza o estado com o número de telefone digitado
  };



  const PrimeiroModal = ({ isOpen, onClose }) => (
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
        <p>Número do WhattsApp:</p>
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
        <Button variant="secondary" onClick={handleRedirect}>
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
    
  const SuccessChecklistModal = ({ isOpen, onClose }) => {
    return (
      <Modal show={isOpen} onHide={onClose} centered>
        <Modal.Header>
        <Modal.Body>
          <div className="text-center mb-4">
          {/* Ícone de sucesso principal */}
          <i className="bi bi-check-circle" style={{ fontSize: '10rem', color: 'green' }}></i>
       <p>Operação Realizada com Sucesso!</p>
       </div> </Modal.Body>
        </Modal.Header>
        <Modal.Body>
        <p>Seu agendamento foi realizado com sucesso com Keyllane </p>
        </Modal.Body>
        
        {Object.keys(buttonData).map((buttonId) => (
          <div key={buttonId} className="text-center mb-4">
            <h2>{buttonData[buttonId].name}</h2>
            <p>Tempo Estimado: {buttonData[buttonId].tempo} minutos</p>
            <p>Preço: R$ {buttonData[buttonId].preco}</p>
            <p>Data: {buttonData[buttonId].data}</p>
            <p>Hora: {buttonData[buttonId].hora}</p>
          </div>
        ))}
               
        <Modal.Body>
        <p></p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={onClose}>
            Fechar
          </Button>
          <SuccessChecklistModal isOpen={isModalOpen} onClose={handleCloseModal} />
        </Modal.Footer>
      </Modal>
    );
  };
  
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleShowModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
    const [buttonValues, setButtonValues] = useState({});
    const [buttonData, setButtonData] = useState({});

  
    useEffect(() => {
    
    

        // Simular chamada de API para buscar dados dos botões
        const fetchButtonData = async () => {
          const simulatedApiResponse = {
            button1: { name: 'Design', tempo: 20, preco: 35, data: "06/05/2024", hora: "14:00" },
          };
         
    
    // Atualiza os dados dos botões
    setButtonData(simulatedApiResponse);
    
    
    
    
    
    //setButtonValues(apiButtonValues);
    };
        
        fetchButtonData();
      }, []);
    
    
         
   

    return(
     
            
        
        <div className="col p-5 overflow-auto h-100">
  <div className="d-flex flex-column vh-100">
    {/* Título ou outro conteúdo acima do card */}
    <div className="p-5">
      <div className="row">
        <div className="col-12">
            
          <h2 className="mb-5 mt-0">Agendamentos</h2> {/* Espaço maior aqui */}
         
          </div>

         
    <div className="mb-4 mt-5"></div>

        
        <div className="d-flex justify-content-center align-items-start vh-100">
            <div className="service-card p-5 overflow-auto h-99 w-100" style={{ marginBottom: '100px' }}>
            
            <div className="d-flex align-items-center">


    {Object.keys(buttonData).map((buttonId) => (
          <div key={buttonId} className="mb-4">
            <h2>{buttonData[buttonId].name}</h2>
            <p>Tempo Estimado: {buttonData[buttonId].tempo} minutos</p>
            <p>Preço: R$ {buttonData[buttonId].preco}</p>
            <p>Data: {buttonData[buttonId].data}</p>
            <p>Hora: {buttonData[buttonId].hora}</p>
          </div>
        ))}

</div>
</div>
</div>

    
            <div className="className=mb-5 mt-0">
   

            
   

    <button className="custom-button" onClick={handleOpenPrimeiroModal}>
      <span className="mdi">Finalizar agendamento</span>
    </button>
    <PrimeiroModal isOpen={isPrimeiroModalOpen} onClose={handleClosePrimeiroModal} />  
    
    <div className="mb-4 mt-5"></div>
    <div className="mb-4 mt-5"></div>

    <div className="container mt-5">
      <Button onClick={handleShowModal} variant="primary">
        Realizar Operação
      </Button>

      <SuccessChecklistModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
   
    <div className="mb-4 mt-5"></div>
        <div className="mb-4 mt-5"></div>
        <div className="mb-4 mt-5"></div>
        <div className="mb-4 mt-5"></div>


    </div>
</div>
</div>


        </div>
        
      </div>
    
     
     
     
    
   
    );  
};

