import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllExceptions, postException, patchException, deleteException } from "../../store/modules/excecao/sagas";
import { sessionStatus } from "../../contexts/AuthContext";
import DatePicker from "react-datepicker";
import AfastamentosModal from "../../components/modalAfastamentos";

const Afastamentos = () => {
    const navigate = useNavigate();
    const navigatePressDiasDeFuncionamnto = "/funcionamento";
    const navigatePressDiasdeAfastamento = "/afastamento";

    const [isMenuOpened, setMenuOpened] = useState(null);
    
    const [date, setDate] = useState(new Date());
    const [isModalOpened, setModalOpened] = useState(false);
    const [modalPage, setModalPage] = useState(null);

    const [exceptions, setExceptions] = useState([]);
    
    const handleDaySelection = (dateSelected) => {
        setDate(dateSelected);
        setModalOpened(true);
        setModalPage("horário");
    }

    async function listAllExceptions() {
        const response = await getAllExceptions();

        setExceptions(response.data);
    }

    /* if (exceptions)
        console.log(exceptions); */

    const getRequest = [
        {
            "idEsceptionSchedule": 1,
            "exceptionDate": "2024-09-15",
            "startTime": "08:00:00",
            "endTime": "16:00:00",
            "isAvaliable": "0"
        },
        {
            "idEsceptionSchedule": 2,
            "exceptionDate": "2024-09-16",
            "startTime": "08:00:00",
            "endTime": "16:00:00",
            "isAvaliable": "1"
        }
    ]

    useEffect(() => {
        sessionStatus(navigate)
        .then(() => listAllExceptions());
    }, []);
    
    const styleExceptions = (date) => {
        for (let index = 0; index < exceptions.length; index++) {
            const eachException = exceptions[index];
            if (date.toISOString().split('T')[0] === eachException.exceptionDate)
            {
                if (eachException.isAvaliable === 1)
                {
                    return "text-success";
                } 
                else
                {
                    return "text-danger";
                }
            }
        }
    }
    
    return(
        <div className="col p-5 overflow-auto h-100">
            <div className="row">
                <div className="col-12">
                   <div className="w-100 d-flex justify-content-between">
                        <Button
                            className="menu-funcionamento"
                            aria-controls="simple-menu"
                            aria-haspopup="true"
                            onClick={(event) => {setMenuOpened(event.currentTarget)}}>
                            <span className="mdi mdi-chevron-down">Dias de Afastamentos</span> 
                        </Button>
                        <Menu
                            keepMounted
                            anchorEl={isMenuOpened}
                            onClose={() => {setMenuOpened(null);}}
                            open={Boolean(isMenuOpened)}>
                            <MenuItem onClick={() => {
                                setMenuOpened(null);
                                navigate(navigatePressDiasdeAfastamento);
                                }}>
                                Dias de Afastamentos
                            </MenuItem>
                            <MenuItem onClick={() => {
                                setMenuOpened(null);
                                navigate(navigatePressDiasDeFuncionamnto);
                                }}>
                                Dias de Funcionamento
                            </MenuItem>
                        </Menu>
                   </div>
                </div>
            </div>
            <div className="m-2 d-flex align-items-center flex-column">
                <label>Escolha uma data para editar</label>
                <DatePicker
                    inline
                    open={true}
                    dateFormat={"dd/MM/YYYY"}
                    placeholderText="Selecione um dia"
                    selected={date}
                    onChange={(date) => handleDaySelection(date)}
                    dayClassName={(date) => styleExceptions(date)}
                >
                </DatePicker>
                <AfastamentosModal
                    isOpen={isModalOpened}
                    onClose={() => {setModalOpened(false);}}
                    selectedDate={date}
                    modalPage={modalPage}
                    setModalPage={setModalPage}
                />
            </div>
        </div>
    ); 
};

export default Afastamentos;