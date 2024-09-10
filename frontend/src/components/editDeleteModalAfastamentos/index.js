import { Modal } from "react-bootstrap";
import { patchException, deleteException } from "../../store/modules/excecao/sagas";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";

const EditDeleteAfastamentoModal = (props) => {
    const { selectedExceptionData, selectedDate, onClose } = props;
    const [formData, setFormData] = useState({
        startTime: selectedExceptionData.startTime || "08:00",
        endTime: selectedExceptionData.endTime || "16:00",
        isAvailable: selectedExceptionData.isAvailable || 1,
        idExceptionSchedule: selectedExceptionData.idExceptionSchedule || null,
    });

    async function updateException(id, data) {
        try {
            const response = await patchException(id, data);
            if (response) {
                if (response.status === 200) {
                    window.location.reload();
                }
            }
        } catch (error) {
            console.error('Erro ao cadastrar exceção');
        }
    }

    async function removeException(id) {
        try {
            const response = await deleteException(id);
            if (response) {
                if (response.status === 200) {
                    window.location.reload();
                }
            }
        } catch (error) {
            console.error('Erro ao cadastrar exceção');
        }
    }

    useEffect(() => {
        setFormData({
            startTime: selectedExceptionData.startTime || "08:00",
            endTime: selectedExceptionData.endTime || "16:00",
            isAvailable: selectedExceptionData.isAvailable || 1,
            idExceptionSchedule: selectedExceptionData.idExceptionSchedule || null,
        });
    }, [selectedExceptionData]);

    const handleInputChange = (ev) => {
        const { name, value } = ev.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleAvailabilityChange = (ev) => {
        const { value } = ev.target;
        setFormData((prevData) => ({
            ...prevData,
            isAvailable: parseInt(value), // Atualiza o valor de isAvailable (1 ou 0)
        }));
    };

    const handleUpdate = () => {
        const updatedData = {
            exceptionDate: selectedDate.toLocaleDateString('pt-BR'),
            startTime: formData.startTime,
            endTime: formData.endTime,
            isAvailable: formData.isAvailable,
        };
        updateException(selectedExceptionData.idExceptionSchedule, updatedData);
    };

    const handleDelete = () => {
        removeException(selectedExceptionData.idExceptionSchedule);
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

    return (
        <Modal show={props.isOpen} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Editar ou Deletar Exceção para {selectedDate.toLocaleDateString('pt-BR')}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
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
                        <label>Início</label>
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
                <div className="m-2 d-flex flex-column align-items-center">
                    <label>Disponibilidade</label>
                    <select
                        value={formData.isAvailable}
                        onChange={handleAvailabilityChange}
                        className="form-control"
                    >
                        <option value={1}>Disponível</option>
                        <option value={0}>Indisponível</option>
                    </select>
                </div>
                <div className="m-2 d-flex align-items-center flex-column">
                    <Button onClick={handleUpdate} className="btn btn-success m-2">Atualizar</Button>
                    <Button onClick={handleDelete} className="btn btn-danger m-2">Deletar</Button>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default EditDeleteAfastamentoModal;