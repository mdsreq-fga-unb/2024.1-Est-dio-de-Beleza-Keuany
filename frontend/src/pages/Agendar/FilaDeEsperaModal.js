/*import React, { useState } from "react";
import { TodoModal } from "./agendamentoModalStyle";


export default function AgendarModal({ isOpen, onClose }) {
    /*const [nome, setNome] = useState();
    const [precoCusto, setPrecoCusto] = useState();
    const [precoVenda, setPrecoVenda] = useState();
    const [qtdEstoque, setQtdEstoque] = useState();
    const [qtdEstoqueMin, setQtdEstoqueMin] = useState();
    const [medida, setMedida] = useState();
    const [statusVenda, setStatusVenda] = useState();*/

    //const [showConfirmation, setShowConfirmation] = useState(false); // Estado para controlar a exibição da caixa de diálogo de confirmação
    //const [data, setData] = useState(null); // Variável para armazenar os dados do formulário

    /*const handleFormSubmit = async (e) => {
        e.preventDefault();
        let statusVenda = false;
        if (parseInt(qtdEstoque) >= parseInt(qtdEstoqueMin)) {
            statusVenda = true;
        }
        console.log(statusVenda);
        const formData = {
            nome,
            precoCusto,
            precoVenda,
            qtdEstoque,
            qtdEstoqueMin,
            medida,
            statusVenda,
        };

        // Armazenar os dados do formulário na variável "data"
        setData(formData);

        // Mostrar a caixa de diálogo de confirmação
        setShowConfirmation(true);
    };*/

    /*const handleConfirmation = async (confirmed) => {
        if (confirmed) {
            if (data) {
                // Se o usuário confirmou e os dados do formulário existem
                await postProduto(data);
            }
        }

        // Fechar a caixa de diálogo de confirmação
        setShowConfirmation(false);
    };

    if (isOpen) {
        return (
            <TodoModal>
                <div className="container">
                    <div className="card">
                        <h1>Adicionar Produtos</h1>
                        
                            <div className="label-float">
                                <input
                                    type="text"
                                    id="nome"
                                    placeholder="Nome *"
                                   
                                />
                            </div>
                            <div className="label-float">
                                <input
                                    type="number"
                                    step="any"
                                    id="precoCusto"
                                    placeholder="Preço custo *"
                                    
                                   
                                />
                            </div>
                            <div className="label-float">
                                <input
                                    type="number"
                                    step="any"
                                    id="precoVenda"
                                    placeholder="Preço venda *"
                                   
                                />
                            </div>
                            <div className="label-float">
                                <input
                                    type="number"
                                    id="qtdEstoque"
                                    placeholder="Quantidade *"
                                   
                                />
                            </div>
                            <div className="label-float">
                                <input
                                    type="number"
                                    id="qtdEstoqueMin"
                                    placeholder="Quantidade mínima *"
                                    
                                />
                            </div>
                            <div className="label-float">
                                <select
                                    name="medida"
                                    id="medida"
                                    defaultValue=""
                                    
                                >
                                    <option value="" disabled hidden>
                                        Selecione uma medida:
                                    </option>
                                    <option value="UN">UN</option>
                                    <option value="KG">KG</option>
                                    <option value="G">G</option>
                                    <option value="L">L</option>
                                    <option value="mL">mL</option>
                                </select>
                            </div>
                            <div className="alinhar">
                                <input
                                    type="submit"
                                    name="Adicionar Produto"
                                    id="enviar"
                                    className="buttons"
                                />

                                <button
                                    className="button-modalc"
                                    onClick={onClose}
                                >
                                    Cancelar
                                </button>
                            </div>
                        
                    </div>
                </div>

               
               

            
            </TodoModal>
        );
    }
    return null;
}*/

import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Importa o hook useNavigate











const AgendamentosModal = ({ isOpen, onClose, modalContent }) => {
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
};

export default AgendamentosModal;
