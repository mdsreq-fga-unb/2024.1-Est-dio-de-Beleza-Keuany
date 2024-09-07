
import { useSearchParams } from 'react-router-dom';
import AgendamentosModal from "../MeusAgendamentos/agendamentosModal";
//import { useEffect } from "react";
import ServicoCard from "../../components/ServicoCard";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';




export default function Agendamentos_Clientes() {

  
  const [show, setShow] = useState(false);

    // Função que controla o fechamento do modal
    const handleClose = () => setShow(false);

    // Abre o modal quando o componente é montado
    useEffect(() => {
        setShow(true);
    }, []); 

    const [openAgendarModal, setOpenAgendarModal] = useState(false);
    
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();

    // Extrai o valor do parâmetro "servico" da query string
    const servico = searchParams.get('servico');
    const tempo = searchParams.get('tempo');
    const preco = searchParams.get('preco');
    const data = searchParams.get('data');
    const hora = searchParams.get('hora');


    return(
      <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Bem-vindo!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Este é um modal que abre automaticamente quando a tela é ativada!
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>
        
        <div className="col p-5 overflow-auto h-100">
  <div className="d-flex flex-column vh-100">
    {/* Título ou outro conteúdo acima do card */}
    <div className="p-5">
      <div className="row">
        <div className="col-12">
            
          <h2 className="mb-5 mt-0">Agendamentos</h2> {/* Espaço maior aqui */}
         
          </div>
          <div>
          <AgendamentosModal
                        isOpen={openAgendarModal}
                        onClose={() => setOpenAgendarModal(false)}
                    />
          <button
    className="botao-principal"
    onClick={() => setOpenAgendarModal(true)}
>
    Adicionar Produtos
</button>


<div>
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
             {data && (
                <p>Preço: <strong>{data}</strong></p>
            )}
             {hora && (
                <p>Preço: <strong>{hora}</strong></p>
            )}
        </div>

         
</div>
</div>
        </div>
      </div>
    </div>



        
    </>
    );  
};

