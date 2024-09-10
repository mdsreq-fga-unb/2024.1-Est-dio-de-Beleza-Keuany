import { Modal } from "react-bootstrap";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import { useState, useEffect } from "react";
import { postException, patchException, deleteException } from "../../store/modules/excecao/sagas";

const AfastamentosModal = (props) => {
    const { startTime, endTime, isAvailable } = props.selectedExceptionData;
    const selectedDate = props.selectedDate;

    const [modalMenuOpened, setModalMenuOpened] = useState(null);
    const [formData, setFormData] = useState({
        startTime: startTime || "08:00",
        endTime: endTime || "16:00",
        isAvailable: isAvailable || 1
    });

    // Atualize os campos de horário quando o `selectedExceptionData` mudar
    useEffect(() => {
        setFormData({
            startTime: props.selectedExceptionData.startTime || "08:00",  // Atualize startTime
            endTime: props.selectedExceptionData.endTime || "16:00",      // Atualize endTime
            isAvailable: props.selectedExceptionData.isAvailable || 1     // Atualize isAvailable
        });
    }, [props.selectedExceptionData]);

    async function createException(data) {
        try {
            const response = await postException(data);
            if (response) {
                if (response.status === 201) {
                    window.location.reload();
                }
            }
        } catch (error) {
            console.error('Erro ao cadastrar exceção');
        }
    }

    const handleModalPageChange = (modalPage) => {
        setModalMenuOpened(null);
        props.setModalPage(modalPage);
    };

    const openModalMenu = (ev) => {
        setModalMenuOpened(ev.currentTarget);
    };

    const isModalMenuOpened = () => modalMenuOpened !== null;

    const submitDayUpdate = (isAvailable) => {
        const data = {
            exceptionDate: selectedDate.toLocaleDateString('pt-BR'),
            startTime: formData.startTime,
            endTime: formData.endTime,
            isAvailable: isAvailable ? "1" : "0",
        };
        //console.log(data);
        createException(data);
        //props.setModalPage("confirmação");
    };

    const handleInputChange = (ev) => {
        const { name, value } = ev.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Função para gerar horários com intervalo de 1 hora
    const generateTimeOptions = () => {
        const startHour = 8; // Começa às 8:00
        const endHour = 18; // Termina às 20:00
        const times = [];
        for (let hour = startHour; hour <= endHour; hour++) {
            const time = `${hour.toString().padStart(2, '0')}:00`;
            times.push(time);
        }
        return times;
    };

    const timeOptions = generateTimeOptions();

    if (props.modalPage === "horário") {
        return (
            <Modal show={props.isOpen} onHide={props.onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Dia {props.selectedDate.toLocaleDateString('pt-BR')} selecionado</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="m-2 d-flex align-items-center flex-column">
                        <h3 className="text-center">O que deseja fazer agora?</h3>
                    </div>
                    <Button
                        className="menu-funcionamento"
                        aria-controls="modal-menu1"
                        aria-haspopup="true"
                        onClick={openModalMenu}>
                        <span className="mdi mdi-chevron-down">Horário de Funcionamento</span> 
                    </Button>
                    <Menu
                        id="modal-menu1"
                        keepMounted
                        anchorEl={modalMenuOpened}
                        onClose={() => setModalMenuOpened(null)}
                        open={isModalMenuOpened()}>
                        <MenuItem onClick={() => handleModalPageChange("indisponibilidade")}>
                            Indisponibilidade
                        </MenuItem>
                    </Menu>
                    <div className="m-2 d-flex flex-row justify-content-center">
                        <div className="p-4 d-flex flex-column align-items-center">
                            <label>Início</label>
                            <select
                                name="startTime"
                                value={formData.startTime}
                                onChange={handleInputChange}
                                className="form-control"
                            >
                                {timeOptions.map(time => (
                                    <option key={time} value={time}>
                                        {time}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="p-4 d-flex flex-column align-items-center">
                            <label>Fim</label>
                            <select
                                name="endTime"
                                value={formData.endTime}
                                onChange={handleInputChange}
                                className="form-control"
                            >
                                {timeOptions.map(time => (
                                    <option key={time} value={time}>
                                        {time}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="m-2 d-flex align-items-center flex-column">
                        <input
                            className="btn btn-success"
                            type="submit"
                            value="Confirmar Horários"
                            onClick={() => submitDayUpdate(1)}  // Chama a função para enviar os dados e cadastrar a exceção
                        />
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
    else if (props.modalPage === "indisponibilidade") {
        return (
            <Modal show={props.isOpen} onHide={props.onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Dia {props.selectedDate.toLocaleDateString('pt-BR')} selecionado</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="m-2 d-flex align-items-center flex-column">
                        <h3 className="text-center">O que deseja fazer agora?</h3>
                    </div>
                    <Button
                        className="menu-funcionamento"
                        aria-controls="modal-menu2"
                        aria-haspopup="true"
                        onClick={openModalMenu}>
                        <span className="mdi mdi-chevron-down">Indisponibilidade</span> 
                    </Button>
                    <Menu
                        className="modal-menu2"
                        keepMounted
                        anchorEl={modalMenuOpened}
                        onClose={() => setModalMenuOpened(null)}
                        open={isModalMenuOpened()}>
                        <MenuItem onClick={() => setModalMenuOpened(null)}>
                            Indisponibilidade
                        </MenuItem>
                        <MenuItem onClick={() => handleModalPageChange("horário")}>
                            Horário de Funcionamento
                        </MenuItem>
                    </Menu>
                    <div className="m-2 d-flex align-items-center flex-column">
                        <input
                            className="btn btn-success"
                            type="submit"
                            value="Confirmar Indisponibilidade"
                            onClick={() => {
                                setFormData((prevData) => ({
                                    ...prevData,
                                    isAvailable: 0,  // Define isAvailable como 0 para indisponibilidade
                                }));
                                submitDayUpdate(0);  // Envia os dados com isAvailable = 0
                            }}
                        />
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
    else if (props.modalPage === "confirmação") {
        return (
            <Modal show={props.isOpen} onHide={props.onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Dia {props.selectedDate.toLocaleDateString('pt-BR')} selecionado</Modal.Title>  
                </Modal.Header>
                <Modal.Body>
                    <div className="m-2 d-flex align-items-center flex-column">
                        <h3 className="mdi mdi-check-circle-outline text-center">Ação Realizada!</h3>
                    </div>
                    <div className="m-2 d-flex align-items-center flex-column">
                        <input
                            className="btn btn-danger"
                            type="submit"
                            value="Fechar"
                            onClick={props.onClose}
                        />
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
};

export default AfastamentosModal;
