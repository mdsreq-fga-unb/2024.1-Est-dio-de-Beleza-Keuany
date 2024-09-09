import { useState, useEffect } from "react";
import ServicoCard from "../../components/ServicoCard";
import { useNavigate } from "react-router-dom";
import { getAllProcedures } from "../../store/modules/procedimento/sagas";

const Servicos = () => {
    const navigate = useNavigate();
    const [procedimentos, setProcedimentos] = useState([]);

    /* function paraAgendar(nome, tempo_estimado, preco, id) {
        navigate(`/agendar?id=${id}&servico=${nome}&tempo=${tempo_estimado}&preco=${preco}`);
    } */

    function paraAgendar(id) {
        navigate(`/agendar?id=${id}`);
    }

    async function listAllProcedures() {
        const response = await getAllProcedures();
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
                        <button className="custom-button" onClick={() => navigate('/meus_agendamentos')}>
                            <span className="mdi">Meus Agendamentos</span>
                        </button>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="className=mb-5 mt-0">
                    <div className="d-flex flex-column">
                        {procedimentos.map((procedimento) => (
                            <ServicoCard
                                key={procedimento.idProcedure}
                                nome={procedimento.name} 
                                tempo_estimado={procedimento.duration} 
                                preco={procedimento.price} 
                                changePage={() => paraAgendar(procedimento.idProcedure)} 
                            />
                        ))};
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Servicos;  
