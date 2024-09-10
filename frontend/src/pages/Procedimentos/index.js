import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap';
import { getAllProcedures, postProcedure, patchProcedure, deleteProcedure } from '../../store/modules/procedimento/sagas';
import 'bootstrap-icons/font/bootstrap-icons.css';

let procedureData = {
  name: '',
  duration: '',
  price: ''
}

export default function Procedimentos() {
    const [isPrimeiroModalOpen, setIsPrimeiroModalOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [isSuccessRemoveModalOpen, setIsSuccessRemoveModalOpen] = useState(false);

    const [procedimentos, setProcedimentos] = useState([]);
    const [userName, setUserName] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [buttonData, setButtonData] = useState({});
    const [newService, setNewService] = useState({
      name: '',
      duration: '',
      price: ''
    });
    const [isAddServiceModalOpen, setIsAddServiceModalOpen] = useState(false);
    const [isEditServiceModalOpen, setIsEditServiceModalOpen] = useState(false);
    const [editingService, setEditingService] = useState(null);
    const navigate = useNavigate();
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [serviceToDelete, setServiceToDelete] = useState(null);

    async function listAllProcedures() {
      const response = await getAllProcedures();
      if (response)
          setProcedimentos(response.data);
    }

    async function createProcedure(data) {
      try {
        const response = await postProcedure(data);
    
        if (response) {
          if (response.status === 201) {
            window.location.reload();
          }
        }
      } catch (error) {
        console.error('Erro ao criar procedimento');
      }
    }

    async function updateProcedure(id, data) {
      try {
        const response = await patchProcedure(id, data);
    
        if (response) {
          if (response.status === 200) {
            window.location.reload();
          }
        }
      } catch (error) {
        console.error('Erro ao atualizar procedimento');
      }
    }

    async function removeProcedure(id) {
      try {
        const response = await deleteProcedure(id);
    
        if (response) {
          if (response.status === 200) {
            window.location.reload();
          }
        }
      } catch (error) {
        console.error('Erro ao remover procedimento');
      }
    }

   
    const handleCloseConfirmationModal = () => setIsConfirmationModalOpen(false);
    const handleShowConfirmationModal = (id) => {
      setServiceToDelete(id);
      setIsConfirmationModalOpen(true);
    };  

    const handleShowAddServiceModal = () => setIsAddServiceModalOpen(true);
    const handleCloseAddServiceModal = () => setIsAddServiceModalOpen(false);

    const handleShowEditServiceModal = (service) => {
      setEditingService(service);
     
      setIsEditServiceModalOpen(true);
    };

    const handleCloseEditServiceModal = () => {
      setIsEditServiceModalOpen(false);
      setEditingService(null);
    };

    const handleSaveEditService = () => {
      procedureData.duration = editingService.duration;
      procedureData.name = editingService.name;
      procedureData.price = editingService.price;
      const idProcedure = editingService.idProcedure;
      console.log(procedureData);
      console.log(idProcedure);

      updateProcedure(idProcedure, procedureData);

      setIsEditServiceModalOpen(false);
      setEditingService(null);
    };

    const handleDelete = async () => {
      console.log(serviceToDelete);
      removeProcedure(serviceToDelete);
      setIsConfirmationModalOpen(false);
      
      // Abrir o modal de sucesso
      //setIsSuccessRemoveModalOpen(true);
    };

    const handleAddService = () => {
      createProcedure(newService);
      
      setIsAddServiceModalOpen(false);
    };

    const fetchButtonData = async () => {
      try {
        const simulatedApiResponse = {
          service1: { id: '1', name: 'Design Facial', tempo: 30, preco: 100 },
          service2: { id: '2', name: 'Massagem Relaxante', tempo: 60, preco: 150 },
          service3: { id: '3', name: 'Tratamento Capilar', tempo: 45, preco: 200 }
        };
        setButtonData(simulatedApiResponse);
      } catch (error) {
        console.error('Erro ao buscar dados dos serviços:', error);
      }
    };

    useEffect(() => {
      listAllProcedures();
      //fetchButtonData();
    }, []);

    const ServicoCard = ({ service, onDelete, onEdit }) => {
      return (
          <div className="servico-card-container col p-5 overflow-auto h-100">
              <div className="row d-flex align-items-center justify-content-between">
                  <div className="col-9 d-flex align-items-center">
                      <div className="nome">{service.name}</div>
                  </div>
  
                  <div className="col-3 botoes-container">
                      <button className="botao-editar me-2" onClick={() => onEdit(service)}>
                          <i className="bi bi-pencil"></i>
                      </button>
                      <button className="botao-excluir" onClick={() => onDelete(service.idProcedure)}>
                          <i className="bi bi-trash"></i>
                      </button>
                  </div>
  
                  <div className="tempo_estimado">Tempo: {service.duration} minutos</div>
                  <div className="preco">Preço: R$ {service.price}</div>
              </div>
          </div>
      );
  };
  
    

    return (
        <div className="col p-5 overflow-auto h-100">
            <div className="d-flex flex-column vh-100">
            <div className="p-5">
            <div className="row">
                <div className="col-12">
                   <div className="w-100 d-flex justify-content-between">
                    <h2 className="mb-4 mt-0">Procedimentos</h2>
                    <div>
                        <button className="btn btn-primary btn-lg" onClick={handleShowAddServiceModal}>
                            <span className="mdi mdi-plus">Adicionar novo procedimento</span>
                        </button> 
                    </div>
                   </div>
            </div>
            
            <div className="row">
                <div className="className=mb-5 mt-0">
                    <div className="d-flex flex-column">
                        {Object.values(procedimentos).map((service) => (
                           <ServicoCard
                             key={service.idProcedure}
                             service={service}
                             onDelete={handleShowConfirmationModal}
                             onEdit={handleShowEditServiceModal}
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
                    <i className="bi bi-exclamation-triangle" style={{ fontSize: '3rem', color: 'red' }}></i>
                    <p className="mt-3">
                        Tem certeza de que deseja remover esse procedimento?
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseConfirmationModal}>Cancelar</Button>
                    <Button variant="danger" onClick={handleDelete}>Deletar</Button>
                </Modal.Footer>
            </Modal>

            {/* Modal para adicionar novo procedimento */}
            <Modal show={isAddServiceModalOpen} onHide={handleCloseAddServiceModal} centered>
              <Modal.Header closeButton>
                <Modal.Title>Adicionar Procedimento</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group controlId="formServiceName">
                    <Form.Label>Nome do Procedimento</Form.Label>
                    <Form.Control type="text" value={newService.name} onChange={(e) => setNewService({ ...newService, name: e.target.value })} />
                  </Form.Group>
                  <Form.Group controlId="formServiceTime">
                    <Form.Label>Tempo Estimado (min)</Form.Label>
                    <Form.Control type="number" value={newService.duration} onChange={(e) => setNewService({ ...newService, duration: e.target.value })} />
                  </Form.Group>
                  <Form.Group controlId="formServicePrice">
                    <Form.Label>Preço (R$)</Form.Label>
                    <Form.Control type="number" value={newService.price} onChange={(e) => setNewService({ ...newService, price: e.target.value })} />
                  </Form.Group>
                  
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseAddServiceModal}>Cancelar</Button>
                <Button variant="primary" onClick={handleAddService}>Adicionar</Button>
              </Modal.Footer>
            </Modal>

            <Modal show={isEditServiceModalOpen} onHide={handleCloseEditServiceModal} centered>
              <Modal.Header closeButton>
                <Modal.Title>Editar Procedimento</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {editingService && (
                  <Form>
                    <Form.Group controlId="formEditServiceName">
                      <Form.Label>Nome do Procedimento</Form.Label>
                      <Form.Control
                        type="text"
                        value={editingService.name}
                        onChange={(e) => setEditingService({ ...editingService, name: e.target.value })}
                      />
                    </Form.Group>
                    <Form.Group controlId="formEditServiceTime">
                      <Form.Label>Tempo Estimado (min)</Form.Label>
                      <Form.Control
                        type="number"
                        value={editingService.duration}
                        onChange={(e) => setEditingService({ ...editingService, duration: e.target.value })}
                      />
                    </Form.Group>
                    <Form.Group controlId="formEditServicePrice">
                      <Form.Label>Preço (R$)</Form.Label>
                      <Form.Control
                        type="number"
                        value={editingService.price}
                        onChange={(e) => setEditingService({ ...editingService, price: e.target.value })}
                      />
                    </Form.Group>
                  </Form>
                )}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseEditServiceModal}>Cancelar</Button>
                <Button variant="primary" onClick={handleSaveEditService}>Salvar</Button>
              </Modal.Footer>
            </Modal>

            <Modal show={isSuccessModalOpen} onHide={() => setIsSuccessModalOpen(false)} centered>
              <Modal.Header closeButton>
                <Modal.Title>Sucesso</Modal.Title>
              </Modal.Header>
              <Modal.Body className="text-center">
                <i className="bi bi-check-circle" style={{ fontSize: '3rem', color: 'green' }}></i>
                <p className="mt-3">
                  Procedimento adicionado com sucesso!
                </p>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setIsSuccessModalOpen(false)}>Fechar</Button>
              </Modal.Footer>
            </Modal>

            <Modal show={isSuccessRemoveModalOpen} onHide={() => setIsSuccessRemoveModalOpen(false)} centered>
              <Modal.Header closeButton>
                <Modal.Title>Sucesso</Modal.Title>
              </Modal.Header>
              <Modal.Body className="text-center">
                <i className="bi bi-check-circle" style={{ fontSize: '3rem', color: 'green' }}></i>
                <p className="mt-3">
                  Procedimento removido com sucesso!
                </p>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setIsSuccessRemoveModalOpen(false)}>Fechar</Button>
              </Modal.Footer>
            </Modal>

          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
