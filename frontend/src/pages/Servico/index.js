import { useState, useEffect } from "react";
import ServicoCard from "../../components/ServicoCard";
import { useNavigate } from "react-router-dom";
import { getAllProcedures } from "../../store/modules/procedimento/sagas";
import { Modal, Button, Form } from "react-bootstrap"; // Adicionado



const Servicos = () => {
    const navigate = useNavigate();
    const [procedimentos, setProcedimentos] = useState([]);
    const [showModal, setShowModal] = useState(false); // Estado para controlar o modal
    const [telefone, setTelefone] = useState(""); // Estado para armazenar o número de telefone
    const [error, setError] = useState(""); // Estado para armazenar a mensagem de erro

    // Abre o modal
    const handleOpenModal = () => {
        setShowModal(true);
    };

    // Fecha o modal
    const handleCloseModal = () => {
        setShowModal(false);
        setError(""); // Limpa a mensagem de erro ao fechar
    };

    // Função para validar o número de telefone
    const handleConfirmPhone = () => {
        if (telefone.trim() === "") {
            setError("Por favor, insira um número de telefone válido.");
        } else {
            // Se o telefone for válido, fecha o modal e navega para 'Meus Agendamentos'
            setShowModal(false);
            navigate(`/meus_agendamentos?telefone=${encodeURIComponent(telefone)}`);
        }
    };

    // Função para capturar o número de telefone do input
    const handlePhoneChange = (e) => {
        setTelefone(e.target.value);
    };

    /* function paraAgendar(nome, tempo_estimado, preco, id) {
        navigate(`/agendar?id=${id}&servico=${nome}&tempo=${tempo_estimado}&preco=${preco}`);
    } */

    function paraAgendar(id) {
        navigate(`/agendar?id=${id}`);
    }

    async function listAllProcedures() {
        const response = await getAllProcedures();
        if (response)
            setProcedimentos(response.data);
    }

    useEffect(() => {
        listAllProcedures();
    }, []);
    
    return(
        <div className="col p-5 overflow-auto h-100">
            <div className="row">
                <div className="col-12">
                    <div className="w-100 d-flex justify-content-between">
                        <h2 className="mb-4 mt-0">Selecione o Procedimento</h2>
                        <button className="custom-button" onClick={handleOpenModal}>
                            <span className="mdi">Meus Agendamentos</span>
                        </button>
                    </div>
                </div>
            </div>
            <div className="row">
    <div className="container-limite mb-5 mt-0">
        <div className="d-flex flex-column">
            {procedimentos.map((procedimento) => (
                <ServicoCard
                    key={procedimento.idProcedure}
                    nome={procedimento.name} 
                    tempo_estimado={procedimento.duration} 
                    preco={parseFloat(procedimento.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} 
                    changePage={() => paraAgendar(procedimento.idProcedure)} 
                />
            ))}
        </div>
    </div>
</div>


             {/* Modal para solicitar o número de telefone */}
             <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirme o seu  número de telefone</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Por favor, escreva o número de celular usado para agendar o serviço. 
                </Modal.Body>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formTelefone">
                            <Form.Label>Número de Telefone</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Digite seu número de telefone"
                                value={telefone}
                                onChange={handlePhoneChange}
                                isInvalid={!!error}
                            />
                            <Form.Control.Feedback type="invalid">
                                {error}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleConfirmPhone}>
                        Confirmar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
export default Servicos;  
