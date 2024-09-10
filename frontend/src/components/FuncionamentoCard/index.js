import Button from "@mui/material/Button";
import { useState } from "react";
import FuncionamentoModal from "../modalFuncionamento";

const FuncionamentoCard = ({ id, diaDaSemana, startTime, endTime, isActive }) => {
    startTime = startTime.slice(0, 5); // 'HH:MM'
    endTime = endTime.slice(0, 5); // 'HH:MM'

    const idWorkSchedule = id;

    const [isModalOpen, setModalOpen] = useState(false);
    const [modalData, setModalData] = useState({ idWorkSchedule, startTime: "", endTime: "", activeDay: false });

    let activeIcon;
    if (isActive === 1) {
        activeIcon = <span className="mdi mdi-check-circle"></span>;
    } else {
        activeIcon = <span className="mdi mdi-close-circle"></span>;
    }

    function handleOpenModal() {
        // Passa os dados diretamente da API para o modal
        setModalData({ idWorkSchedule, startTime, endTime, activeDay: Boolean(isActive) });
        setModalOpen(true);
    }

    function handleCloseModal() {
        setModalOpen(false);
    }

    return (
        <div className="dias-da-semana row">
            <div className="col-2">
                <div className="w-100 d-flex">
                    <span>{diaDaSemana}</span>
                </div>
            </div>
            <div className="col-3">
                <div className="w-100 d-flex justify-content-center">
                    <span>{startTime}</span>
                </div>
            </div>
            <div className="col-3">
                <div className="w-100 d-flex justify-content-center">
                    <span>{endTime}</span>
                </div>
            </div>
            <div className="col-2">
                <div className="w-100 d-flex justify-content-center">
                    {activeIcon}
                </div>
            </div>
            <div className="col-2">
                <div className="w-100 d-flex justify-content-center">
                    <Button
                        className="btn btn-primary"
                        onClick={handleOpenModal} // Abre o modal com os dados da API
                    >
                        <span className="mdi mdi-tag-edit"></span>
                    </Button>

                    <FuncionamentoModal
                        isOpen={isModalOpen}
                        onClose={handleCloseModal}
                        data={modalData}
                    />
                </div>
            </div>
        </div>
    );
}

export default FuncionamentoCard;


/*import Button from "@mui/material/Button";
import { useState } from "react";
import FuncionamentoModal from "../modalFuncionamento";

const FuncionamentoCard = ({ diaDaSemana, startTime, endTime, isActive }) => {
    // Remove os segundos dos horários
    const formattedStartTime = startTime.slice(0, 5); // 'HH:MM'
    const formattedEndTime = endTime.slice(0, 5); // 'HH:MM'

    const [isModalOpen, setModalOpen] = useState(false);
    const [modalData, setModalData] = useState({ startTime: "", endTime: "", activeDay: false });

    let activeIcon;
    if (isActive === 1) {
        activeIcon = <span className="mdi mdi-check-circle"></span>;
    } else {
        activeIcon = <span className="mdi mdi-close-circle"></span>;
    }

    function handleOpenModal() {
        // Passa os dados diretamente da API para o modal
        setModalData({ startTime, endTime, activeDay: Boolean(isActive) });
        setModalOpen(true);
    }

    function handleCloseModal() {
        setModalOpen(false);
    }

    return (
        <div className="dias-da-semana row">
            <div className="col-2">
                <div className="w-100 d-flex">
                    <span>{diaDaSemana}</span>
                </div>
            </div>
            <div className="col-3">
                <div className="w-100 d-flex justify-content-center">
                    <span>{formattedStartTime}</span> 
                    </div>
                    </div>
                    <div className="col-3">
                        <div className="w-100 d-flex justify-content-center">
                            <span>{formattedEndTime}</span> 
                        </div>
                    </div>
                    <div className="col-2">
                        <div className="w-100 d-flex justify-content-center">
                            {activeIcon}
                        </div>
                    </div>
                    <div className="col-2">
                        <div className="w-100 d-flex justify-content-center">
                            <Button
                                className="btn btn-primary"
                                onClick={handleOpenModal} // Abre o modal com os dados da API
                            >
                                <span className="mdi mdi-tag-edit"></span>
                            </Button>
        
                            <FuncionamentoModal
                                isOpen={isModalOpen}
                                onClose={handleCloseModal}
                                data={modalData}
                            />
                        </div>
                    </div>
                </div>
            );
        }
        
        export default FuncionamentoCard;
*/        