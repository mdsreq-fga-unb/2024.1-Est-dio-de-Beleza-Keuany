import { Modal } from "react-bootstrap";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import { useState } from "react";

const AfastamentosModal = (props) => {
    let startTime, endTime;
    const selectedDate = props.selectedDate;

    const [modalMenuOpened, setModalMenuOpened] = useState(null);


    const handleModalPageChange = (modalPage) => {
        setModalMenuOpened(null);
        props.setModalPage(modalPage);
    }

    const openModalMenu = (ev) => {
        setModalMenuOpened(ev.currentTarget);
        // o elemento vindo é o certo, mas por algum motivo o react não aceita.
    }
    const isModalMenuOpened = () => {
        if (modalMenuOpened === null) {
            return false;
        }
        else {
            return true;
        }
    }

    const submitDayUpdate = (activeDay, startTime, endTime) => {
        if (activeDay === true) {
            // POST request, probably
            props.setModalPage("confirmação");
        } else {
            // POST request, probably

            props.setModalPage("confirmação");
        }
    }


    if (props.modalPage === "horário") {
        return (
            <Modal show={props.isOpen} onHide={props.onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Dia {selectedDate.getDate() + "/" + selectedDate.getMonth() + "/" + selectedDate.getFullYear()} selecionado</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="m-2 d-flex align-items-center flex-column">
                        <h3 className="text-center">O que deseja fazer agora?</h3>
                    </div>
                    <Button
                        className="menu-funcionamento"
                        aria-controls="modal-menu1"
                        aria-haspopup="true"
                        onClick={(event) => {openModalMenu(event)}}>
                        <span className="mdi mdi-chevron-down">Horário de Funcionamento</span> 
                    </Button>
                    <Menu
                        id="modal-menu1"
                        keepMounted
                        anchorEl={modalMenuOpened}
                        onClose={() => {setModalMenuOpened(null);}}
                        open={isModalMenuOpened()}>
                        <MenuItem onClick={() => {
                            setModalMenuOpened(null);
                            }}>
                            Horário de Funcionamento
                        </MenuItem>
                        <MenuItem onClick={() => {
                            handleModalPageChange("indisponibilidade");
                            }}>
                            Indisponibilidade
                        </MenuItem>
                    </Menu>
                    <div className="m-2 d-flex flex-row justify-content-center">
                        <div className="p-4 d-flex flex-column align-items-center">
                            <input
                            type="time"
                            defaultValue="09:10"
                            onChange={(ev) => startTime = ev.target.value}
                            ></input>
                            <label>Início</label>
                        </div>
                        <div className="p-4 d-flex flex-column align-items-center">
                            <input
                            type="time"
                            defaultValue="18:00"
                            onChange={(ev) => endTime = ev.target.value}
                            ></input>
                            <label>Fim</label>
                        </div>
                    </div>
                    <div className="m-2 d-flex align-items-center flex-column">
                        <input
                        className="btn btn-success"
                        type="submit"
                        value="Confirmar Horários"
                        onClick={() => submitDayUpdate(true, startTime, endTime)}
                        >
                        </input>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
    else if (props.modalPage === "indisponibilidade")
    {
        return (
            <Modal show={props.isOpen} onHide={props.onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Dia {selectedDate.getDate() + "/" + selectedDate.getMonth() + "/" + selectedDate.getFullYear()} selecionado</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="m-2 d-flex align-items-center flex-column">
                        <h3 className="text-center">O que deseja fazer agora?</h3>
                    </div>
                    <Button
                        className="menu-funcionamento"
                        aria-controls="modal-menu2"
                        aria-haspopup="true"
                        onClick={(event) => {openModalMenu(event)}}>
                        <span className="mdi mdi-chevron-down">Indisponibilidade</span> 
                    </Button>
                    <Menu
                        className="modal-menu2"
                        keepMounted
                        anchorEl={modalMenuOpened}
                        onClose={() => {setModalMenuOpened(null);}}
                        open={isModalMenuOpened()}>
                        <MenuItem onClick={() => {
                            setModalMenuOpened(null);
                            }}>
                            Indisponibilidade
                        </MenuItem>
                        <MenuItem onClick={() => {
                            handleModalPageChange("horário");
                            }}>
                            Horário de Funcionamento
                        </MenuItem>
                    </Menu>
                    <div className="m-2 d-flex align-items-center flex-column">
                        <input
                        className="btn btn-success"
                        type="submit"
                        value="Confirmar Indisponibilidade"
                        onClick={() => submitDayUpdate(false, null, null)}
                        >
                        </input>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
    else if (props.modalPage === "confirmação")
    {
        return (
            <Modal show={props.isOpen} onHide={props.onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Dia {selectedDate.getDate() + "/" + selectedDate.getMonth() + "/" + selectedDate.getFullYear()} selecionado</Modal.Title>
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
                        >
                        </input>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
};

export default AfastamentosModal;