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

    return (
        <Modal show={props.isOpen} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Editar ou Deletar Exceção para {selectedDate.toLocaleDateString('pt-BR')}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="m-2 d-flex flex-row justify-content-center">
                    <div className="p-4 d-flex flex-column align-items-center">
                        <input
                            type="time"
                            name="startTime"
                            value={formData.startTime}
                            onChange={handleInputChange}
                        />
                        <label>Início</label>
                    </div>
                    <div className="p-4 d-flex flex-column align-items-center">
                        <input
                            type="time"
                            name="endTime"
                            value={formData.endTime}
                            onChange={handleInputChange}
                        />
                        <label>Fim</label>
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
