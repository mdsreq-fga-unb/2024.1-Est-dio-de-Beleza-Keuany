import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useState, useEffect } from "react";
import { patchWorkSchedule } from "../../store/modules/grade/sagas";

let formData;

const FuncionamentoModal = ({ isOpen, onClose, data, onSave }) => {
    const [editData, setEditData] = useState(data);

    useEffect(() => {
        setEditData(data);
    }, [data]);

    async function updateWorkSchedule(id, data) {
        try {
            const response = await patchWorkSchedule(id, data);
      
            if (response) {
              if (response.status === 200) {
                window.location.reload();
              }
            }
          } catch (error) {
            console.error('Erro ao atualizar grade horária');
          }
    }

    function handleSaveChanges() {
        // Apenas simula a atualização de dados
        formData = { ...editData }
        let { idWorkSchedule, ...rest } = formData;
        rest.activeDay = Number(editData.activeDay).toString();
        
        updateWorkSchedule(idWorkSchedule, rest);

        onClose(); // Fecha o modal após salvar
    }

    function handleChange(event) {
        const { name, value, type, checked } = event.target;
        setEditData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    }

    // Função para gerar horários com intervalo de 1 hora
    const generateTimeOptions = () => {
        const startHour = 8;
        const endHour = 18;
        const times = [];
        for (let hour = startHour; hour <= endHour; hour++) {
            const time = `${hour.toString().padStart(2, '0')}:00`;
            times.push(time);
        }
        return times;
    };

    const timeOptions = generateTimeOptions();

    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogTitle>Editar Horário</DialogTitle>
            <DialogContent>
                <div style={{ marginBottom: '16px' }}>
                    <label htmlFor="startTime">Horário de Início:</label>
                    <select
                        id="startTime"
                        name="startTime"
                        value={editData.startTime}
                        onChange={handleChange}
                        style={{ width: '100%' }}
                    >
                        {timeOptions.map(time => (
                            <option key={time} value={time}>
                                {time}
                            </option>
                        ))}
                    </select>
                </div>
                <div style={{ marginBottom: '16px' }}>
                    <label htmlFor="endTime">Horário de Fim:</label>
                    <select
                        id="endTime"
                        name="endTime"
                        value={editData.endTime}
                        onChange={handleChange}
                        style={{ width: '100%' }}
                    >
                        {timeOptions.map(time => (
                            <option key={time} value={time}>
                                {time}
                            </option>
                        ))}
                    </select>
                </div>
                <FormControlLabel
                    control={
                        <Checkbox
                            name="activeDay"
                            checked={editData.activeDay}
                            onChange={handleChange}
                        />
                    }
                    label="Trabalhará?"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancelar
                </Button>
                <Button onClick={handleSaveChanges} color="primary">
                    Salvar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default FuncionamentoModal;

