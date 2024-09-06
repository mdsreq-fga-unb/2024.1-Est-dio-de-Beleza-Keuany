import { useState } from "react";
import ServicoCard from "../../components/ServicoCard";
import { Link, useNavigate } from "react-router-dom";
    
const Servicos = () => {

    const navigate = useNavigate();

    function paraAgendar(servico) {
        navigate(`/agendar?servico=${servico}`);
    }
    
    return(
        <div className="col p-5 overflow-auto h-100">
            <div className="row">
                <div className="col-12">
                    <div className="w-100 d-flex justify-content-between">
                        <h2 className="mb-4 mt-0">Selecione o Procedimento</h2>
                        <button className="btn btn-primary btn-lg">
                            <span className="mdi">Meus Agendamentos</span>
                        </button>
                    </div>
                </div>
            </div>
            <div className="row">
                <ServicoCard nome={"Design Simples"} tempo_estimado={20} preco={35} changePage={paraAgendar}></ServicoCard>
            </div>

            <div className="row">
                <ServicoCard nome={"Design Simples"} tempo_estimado={20} preco={35} changePage={paraAgendar}></ServicoCard>
            </div>
            
            {/* Adicionar mais caso queira. */}

        </div>
    );

}
export default Servicos;  
