import EditDeleteAfastamentoModal from "../../components/editDeleteModalAfastamentos";
import AfastamentosModal from "../../components/modalAfastamentos";
import { useState, useEffect } from "react";
import { getAllExceptions } from "../../store/modules/excecao/sagas";
import { sessionStatus } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";

const Afastamentos = () => {
    const navigate = useNavigate();

    const navigatePressDiasDeFuncionamnto = "/funcionamento";
    const navigatePressDiasdeAfastamento = "/afastamento";

    const [isMenuOpened, setMenuOpened] = useState(null);
    const [date, setDate] = useState(new Date());
    const [isModalOpened, setModalOpened] = useState(false);
    const [isEditDeleteModalOpened, setEditDeleteModalOpened] = useState(false);
    const [modalPage, setModalPage] = useState(null);
    const [exceptions, setExceptions] = useState([]);
    const [selectedExceptionData, setSelectedExceptionData] = useState({
        startTime: "08:00:00",
        endTime: "16:00:00",
        isAvailable: 1,
        idExceptionSchedule: null // Adicionei o idEsceptionSchedule
    });

    const handleDaySelection = (dateSelected) => {
        setDate(dateSelected);
        const localDate = new Date(dateSelected.getTime() - (dateSelected.getTimezoneOffset() * 60000));
        const formattedDate = localDate.toISOString().split('T')[0];

        const selectedException = exceptions.find(
            (exception) => exception.exceptionDate === formattedDate
        );

        if (selectedException) {
            setSelectedExceptionData({
                startTime: selectedException.startTime.substring(0,5),
                endTime: selectedException.endTime.substring(0,5),
                isAvailable: selectedException.isAvailable,
                idExceptionSchedule: selectedException.idExceptionSchedule // Passando o id da exceção
            });
            setEditDeleteModalOpened(true); // Abre o modal de edição/deleção
        } else {
            setSelectedExceptionData({
                startTime: "08:00:00",
                endTime: "16:00:00",
                isAvailable: 1,
                idExceptionSchedule: null // Reseta o idEsceptionSchedule
            });
            setModalOpened(true); // Abre o modal de criação
            setModalPage("horário");
        }
    };

    async function listAllExceptions() {
        const response = await getAllExceptions();
        if (response)
            setExceptions(response.data);
    }

    useEffect(() => {
        sessionStatus(navigate)
            .then(() => listAllExceptions());
    }, []);

    // Função que estiliza os dias do calendário com base nas exceções
    const styleExceptions = (date) => {
        for (let index = 0; index < exceptions.length; index++) {
            const eachException = exceptions[index];
            if (date.toISOString().split('T')[0] === eachException.exceptionDate) {
                if (eachException.isAvailable === 1) { // Verifique se isAvailable é string ou número
                    return "text-warning";
                } else {
                    return "text-danger";
                }
            }
        }
        return ""; // Sem classe de estilo se não houver exceção
    };

    return (
        <div className="col p-5 overflow-auto h-100">
            <div className="row">
                <div className="col-12">
                    <div className="w-100 d-flex ">
                        <Button
                            className="menu-funcionamento"
                            aria-controls="simple-menu"
                            aria-haspopup="true"
                            onClick={(event) => {setMenuOpened(event.currentTarget)}}>
                            <span className="mdi mdi-chevron-down">Dias de Afastamento</span> 
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
                                Dias de Afastamento
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
            <div className="row">
                <div className="col-12">
                    <div className="m-2 d-flex align-items-center flex-column">
                        <label>Escolha uma data para editar</label>
                        <DatePicker
                            inline
                            open={true}
                            dateFormat={"dd/MM/yyyy"}
                            selected={date}
                            onChange={(date) => handleDaySelection(date)}
                            dayClassName={(date) => styleExceptions(date)} // Aplica a função de estilo
                        />
                    </div>
                </div>
            </div>

            <AfastamentosModal
                isOpen={isModalOpened}
                onClose={() => setModalOpened(false)}
                selectedDate={date}
                modalPage={modalPage}
                setModalPage={setModalPage}
                selectedExceptionData={selectedExceptionData}
                setSelectedExceptionData={setSelectedExceptionData}
            />

            <EditDeleteAfastamentoModal
                isOpen={isEditDeleteModalOpened}
                onClose={() => setEditDeleteModalOpened(false)}
                selectedDate={date}
                selectedExceptionData={selectedExceptionData} // Passando o id da exceção junto
            />
        </div>
    );
};

export default Afastamentos;
