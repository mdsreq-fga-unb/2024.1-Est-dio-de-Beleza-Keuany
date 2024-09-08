import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Importa o hook useNavigate


const ModalAgendamento = ({ isOpen, onClose, modalContent }) => {
  const navigate = useNavigate(); // Inicializa o hook useNavigate

  // Função para redirecionar para outra página
  const handleRedirect = () => {
    navigate('/escolher-procedimento'); // Substitua '/nova-pagina' pela rota desejada
  
  };

  

  return (
    
        <Modal show={isOpen} onHide={onClose}>
          <Modal.Header closeButton>
            <Modal.Title>Bem-vindo!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            O que deseja fazer agora? 
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
};

export default ModalAgendamento;
