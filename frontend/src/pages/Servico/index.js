import { useState } from "react";
import ServicoCard from "../../components/ServicoCard";
import { Link, useNavigate } from "react-router-dom";
 
    
const Servicos = () => {

    const navigate = useNavigate();

    function paraAgendar(nome, tempo_estimado, preco) {
        navigate(`/agendar?servico=${nome}&tempo=${tempo_estimado}&preco=${preco}`);
    }
    
    return(
        <div className="col p-5 overflow-auto h-100">
            <div className="row">
                <div className="col-12">
                    <div className="w-100 d-flex justify-content-between">
                        <h2 className="mb-4 mt-0">Selecione o Procedimento</h2>
                        <button className="custom-button" onClick={() => navigate('/meus_agendamentos')}>
                            <span className="mdi">Meus Agendamentos</span>
                        </button>
                    </div>
                </div>
            </div>
            <div className="row">
            <div className="className=mb-5 mt-0">
    <ServicoCard 
        nome={"Design Simples"} 
        tempo_estimado={20} 
        preco={35} 
        changePage={() => paraAgendar("Design Simples", 20, 35)} 
    />
</div>

            </div>

            <div className="row">
            <div className="mb-4 mt-5">
    <ServicoCard 
        nome={"Design Simples"} 
        tempo_estimado={20} 
        preco={35} 
        changePage={() => paraAgendar("Design Simples", 20, 35)} 
    />
</div>

            </div>
            
            {/* Adicionar mais caso queira. */}

        </div>
    );

}
export default Servicos;  
