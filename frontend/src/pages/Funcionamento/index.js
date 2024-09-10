import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FuncionamentoCard from "../../components/FuncionamentoCard";
import { getAllWorkSchedule, patchWorkSchedule } from "../../store/modules/grade/sagas";
import { sessionStatus } from "../../contexts/AuthContext";


const Funcionamento = () => {
    
    const navigate = useNavigate();

    const navigatePressDiasDeFuncionamnto = "/funcionamento";
    const navigatePressDiasdeAfastamento = "/afastamento";

    const [isMenuOpened, setMenuOpened] = useState(null);
    const [workSchedules, setWorkSchedules] = useState([]);

    async function listAllWorkSchedule() {
        const response = await getAllWorkSchedule();

        if (response)
            setWorkSchedules(response.data);
    }
    
    // Esse valor é de exemplo. Use-a para guardar os valores de retorno do GET.
    const valuesExample = [
        {
          "idWorkSchedule": 1,
          "dayOfWeek": "MON",
          "startTime": "09:00:00",
          "endTime": "16:00:00",
          "activeDay": 1
        },
        {
          "idWorkSchedule": 2,
          "dayOfWeek": "TUE",
          "startTime": "08:00:00",
          "endTime": "17:00:00",
          "activeDay": 0
        },
        {
          "idWorkSchedule": 3,
          "dayOfWeek": "WED",
          "startTime": "08:00:00",
          "endTime": "16:00:00",
          "activeDay": 1
        },
        {
          "idWorkSchedule": 4,
          "dayOfWeek": "THU",
          "startTime": "08:00:00",
          "endTime": "16:00:00",
          "activeDay": 0
        },
        {
          "idWorkSchedule": 5,
          "dayOfWeek": "FRI",
          "startTime": "08:00:00",
          "endTime": "16:00:00",
          "activeDay": 0
        },
        {
          "idWorkSchedule": 6,
          "dayOfWeek": "SAT",
          "startTime": "08:00:00",
          "endTime": "16:00:00",
          "activeDay": 0
        },
        {
          "idWorkSchedule": 7,
          "dayOfWeek": "SUN",
          "startTime": "08:00:00",
          "endTime": "16:00:00",
          "activeDay": 0
        }
    ];

    const translationTable = {
        "MON": "Segunda-Feira",
        "TUE": "Terça-Feira",
        "WED": "Quarta-Feira",
        "THU": "Quinta-Feira",
        "FRI": "Sexta-Feira",
        "SAT": "Sábado",
        "SUN": "Domingo"
    }
    
    function getValue(apiReturn, dayofWeek, key) {
        for (let i = 0; i < apiReturn.length; i++) {
            const cell = apiReturn[i];
            if (cell["dayOfWeek"] === dayofWeek)
            {
                return cell[key];
            }   
        }
    }

    function getGradeHoraria (diaAlvo) {
        for (let index = 0; index < valuesExample.length; index++) {
            const dia = valuesExample[index];
            if (dia.dayOfWeek === diaAlvo) {
                return [dia.startTime, dia.endTime, Boolean(dia.activeDay)];
                // return example: ["10:00:00", "18:00:00", true]
            }
        }
    }
    
    function handleChanges(dayOfWeek, field, new_value) {
        for (let index = 0; index < valuesExample.length; index++) {
            const dia = valuesExample[index];
            if (dia.dayOfWeek === dayOfWeek) {
                dia[field] = new_value;
                console.log(dia);
            }
        }
    }

    function submitChanges() {
        // ADICIONAR O HTTP POST
    }

    useEffect(() => {
        sessionStatus(navigate)
        .then(() => listAllWorkSchedule());
    }, []);

    return(
        <div className="col m-5 overflow-auto h-100">
            <div className="row">
                <div className="col-12">
                    <div className="w-100 d-flex ">
                        <Button
                            className="menu-funcionamento"
                            aria-controls="simple-menu"
                            aria-haspopup="true"
                            onClick={(event) => {setMenuOpened(event.currentTarget)}}>
                            <span className="mdi mdi-chevron-down">Dias de Funcionamento</span> 
                        </Button>
                        <Menu
                            keepMounted
                            anchorEl={isMenuOpened}
                            onClose={() => {setMenuOpened(null);}}
                            open={Boolean(isMenuOpened)}>
                            <MenuItem onClick={() => {
                                setMenuOpened(null);
                                navigate(navigatePressDiasDeFuncionamnto);
                                }}>
                                Dias de Funcionamento
                            </MenuItem>
                            <MenuItem onClick={() => {
                                setMenuOpened(null);
                                navigate(navigatePressDiasdeAfastamento);
                                }}>
                                Dias de Afastamentos
                            </MenuItem>
                        </Menu>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-2">
                    <div className="w-100 d-flex justify-content-center">
                        <span className="h5">Dias da Semana</span>
                    </div>
                </div>
                <div className="col-3">
                    <div className="w-100 d-flex justify-content-center">
                        <span className="h5">Horário de Início</span>
                    </div>
                </div>
                <div className="col-3">
                    <div className="w-100 d-flex justify-content-center">
                        <span className="h5">Horário de Fim</span>
                    </div>
                </div>
                <div className="col-2">
                    <div className="w-100 d-flex justify-content-center">
                        <span className="h5">Trabalhará?</span>
                    </div>
                </div>
                <div className="col-2">
                    <div className="w-100 d-flex justify-content-center">
                        <span className="h5">Editar</span>
                    </div>
                </div>
            </div>
            {workSchedules.map((workSchedule) => (
                <FuncionamentoCard
                    key={workSchedule.idWorkSchedule}
                    id={workSchedule.idWorkSchedule}
                    diaDaSemana={translationTable[workSchedule.dayOfWeek]}
                    startTime={workSchedule.startTime}
                    endTime={workSchedule.endTime}
                    isActive={workSchedule.activeDay}
                />
            ))}; 
        </div>
    ); 
};

export default Funcionamento; 
