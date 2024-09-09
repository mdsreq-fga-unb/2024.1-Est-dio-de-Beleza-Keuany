import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import { useState } from "react";
import { useNavigate } from "react-router-dom";



const Funcionamento = () => {
    
    const navigate = useNavigate();

    const navigatePressDiasDeFuncionamnto = "/funcionamento";
    const navigatePressDiasdeAfastamento = "/afastamento";

    const [isMenuOpened, setMenuOpened] = useState(null);
    
    // Esse valor é de exemplo. Use-a para guardar os valores de retorno do GET.
    const getValues = [
        {
          "idWorkSchedule": 1,
          "dayOfWeek": "MON",
          "startTime": "08:00:00",
          "endTime": "16:00:00",
          "activeDay": 1
        },
        {
          "idWorkSchedule": 2,
          "dayOfWeek": "TUE",
          "startTime": "08:00:00",
          "endTime": "16:00:00",
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
    
    function getGradeHoraria (diaAlvo) {
        for (let index = 0; index < getValues.length; index++) {
            const dia = getValues[index];
            if (dia.dayOfWeek == diaAlvo) {
                return [dia.startTime, dia.endTime, Boolean(dia.activeDay)];
                // return example: ["10:00:00", "18:00:00", true]
            }
        }
    }
    
    function handleChanges(dayOfWeek, field, new_value) {
        for (let index = 0; index < getValues.length; index++) {
            const dia = getValues[index];
            if (dia.dayOfWeek == dayOfWeek) {
                dia[field] = new_value;
                console.log(dia);
            }
        }
    }

    function submitChanges() {
        // ADICIONAR O HTTP POST
    }

    return(
        <div className="col m-5 overflow-auto h-100">
            <div className="row">
                <div className="col-12">
                    <div className="w-100 d-flex justify-content-between">
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

            <form className="dias-da-semana row">
                <div className="col-3">
                    <div className="w-100 d-flex justify-content-between">
                        <span>Segunda-Feira</span>
                    </div>
                </div>
                <div className="col-3">
                    <div className="w-100 d-flex justify-content-between">
                        <input type="time" aria-label="time" defaultValue={getGradeHoraria("MON")[0]} onChange={(ev) => {handleChanges("MON", "startTime", String(ev.target.value))}}></input>
                    </div>
                </div>
                <div className="col-3">
                    <div className="w-100 d-flex justify-content-between">
                        <input type="time" aria-label="time" defaultValue={getGradeHoraria("MON")[1]} onChange={(ev) => {handleChanges("MON", "endTime", String(ev.target.value))}}></input>
                    </div>
                </div>
                <div className="col-3">
                    <div className="w-100 d-flex justify-content-between">
                        <input className="form-check-input" type="checkbox" defaultChecked={getGradeHoraria("MON")[2]} onChange={(ev) => {handleChanges("MON", "activeDay", String(ev.target.value))}}></input>
                    </div>
                </div>
            </form>

            <div className="dias-da-semana row">
                <div className="col-3">
                    <div className="w-100 d-flex justify-content-between">
                        <span>Terca-Feira</span>
                    </div>
                </div>
                <div className="col-3">
                    <div className="w-100 d-flex justify-content-between">
                        <input type="time" aria-label="time" defaultValue={getGradeHoraria("TUE")[0]} onChange={(ev) => {handleChanges("TUE", "startTime", String(ev.target.value))}}></input>
                    </div>
                </div>
                <div className="col-3">
                    <div className="w-100 d-flex justify-content-between">
                        <input type="time" aria-label="time" defaultValue={getGradeHoraria("TUE")[1]} onChange={(ev) => {handleChanges("TUE", "endTime", String(ev.target.value))}}></input>
                    </div>
                </div>
                <div className="col-3">
                    <div className="w-100 d-flex justify-content-between">
                        <input className="form-check-input" type="checkbox" defaultChecked={getGradeHoraria("TUE")[2]} onChange={(ev) => {handleChanges("TUE", "activeDay", String(ev.target.value))}}></input>
                    </div>
                </div>
            </div>
            <div className="dias-da-semana row">
                <div className="col-3">
                    <div className="w-100 d-flex justify-content-between">
                        <span>Quarta-Feira</span>
                    </div>
                </div>
                <div className="col-3">
                    <div className="w-100 d-flex justify-content-between">
                        <input type="time" aria-label="time" defaultValue={getGradeHoraria("WED")[0]} onChange={(ev) => {handleChanges("WED", "startTime", String(ev.target.value))}}></input>
                    </div>
                </div>
                <div className="col-3">
                    <div className="w-100 d-flex justify-content-between">
                        <input type="time" aria-label="time" defaultValue={getGradeHoraria("WED")[1]} onChange={(ev) => {handleChanges("WED", "endTime", String(ev.target.value))}}></input>
                    </div>
                </div>
                <div className="col-3">
                    <div className="w-100 d-flex justify-content-between">
                        <input className="form-check-input" type="checkbox" defaultChecked={getGradeHoraria("WED")[2]} onChange={(ev) => {handleChanges("WED", "activeDay", String(ev.target.value))}}></input>
                    </div>
                </div>
            </div>
            <div className="dias-da-semana row">
                <div className="col-3">
                    <div className="w-100 d-flex justify-content-between">
                        <span>Quinta-Feira</span>
                    </div>
                </div>
                <div className="col-3">
                    <div className="w-100 d-flex justify-content-between">
                        <input type="time" aria-label="time" defaultValue={getGradeHoraria("THU")[0]} onChange={(ev) => {handleChanges("THU", "startTime", String(ev.target.value))}}></input>
                    </div>
                </div>
                <div className="col-3">
                    <div className="w-100 d-flex justify-content-between">
                        <input type="time" aria-label="time" defaultValue={getGradeHoraria("THU")[1]} onChange={(ev) => {handleChanges("THU", "endTime", String(ev.target.value))}}></input>
                    </div>
                </div>
                <div className="col-3">
                    <div className="w-100 d-flex justify-content-between">
                        <input className="form-check-input" type="checkbox" defaultChecked={getGradeHoraria("THU")[2]} onChange={(ev) => {handleChanges("THU", "activeDay", String(ev.target.value))}}></input>
                    </div>
                </div>
            </div>
            <div className="dias-da-semana row">
                <div className="col-3">
                    <div className="w-100 d-flex justify-content-between">
                        <span>Sexta-Feira</span>
                    </div>
                </div>
                <div className="col-3">
                    <div className="w-100 d-flex justify-content-between">
                        <input type="time" aria-label="time" defaultValue={getGradeHoraria("FRI")[0]} onChange={(ev) => {handleChanges("FRI", "startTime", String(ev.target.value))}}></input>
                    </div>
                </div>
                <div className="col-3">
                    <div className="w-100 d-flex justify-content-between">
                        <input type="time" aria-label="time" defaultValue={getGradeHoraria("FRI")[0]} onChange={(ev) => {handleChanges("FRI", "endTime", String(ev.target.value))}}></input>
                    </div>
                </div>
                <div className="col-3">
                    <div className="w-100 d-flex justify-content-between">
                        <input className="form-check-input" type="checkbox" defaultChecked={getGradeHoraria("FRI")[2]} onChange={(ev) => {handleChanges("FRI", "activeDay", String(ev.target.value))}}></input>
                    </div>
                </div>
            </div>
            <div className="dias-da-semana row">
                <div className="col-3">
                    <div className="w-100 d-flex justify-content-between">
                        <span>Sábado</span>
                    </div>
                </div>
                <div className="col-3">
                    <div className="w-100 d-flex justify-content-between">
                        <input type="time" aria-label="time" defaultValue={getGradeHoraria("SAT")[0]} onChange={(ev) => {handleChanges("SAT", "startTime", String(ev.target.value))}}></input>
                    </div>
                </div>
                <div className="col-3">
                    <div className="w-100 d-flex justify-content-between">
                        <input type="time" aria-label="time" defaultValue={getGradeHoraria("SAT")[1]} onChange={(ev) => {handleChanges("SAT", "endTime", String(ev.target.value))}}></input>
                    </div>
                </div>
                <div className="col-3">
                    <div className="w-100 d-flex justify-content-between">
                        <input className="form-check-input" type="checkbox" defaultChecked={getGradeHoraria("SAT")[2]} onChange={(ev) => {handleChanges("SAT", "activeDay", String(ev.target.value))}}></input>
                    </div>
                </div>
            </div>
            <div className="dias-da-semana row">
                <div className="col-3">
                    <div className="w-100 d-flex justify-content-between">
                        <span>Domingo</span>
                    </div>
                </div>
                <div className="col-3">
                    <div className="w-100 d-flex justify-content-between">
                        <input type="time" aria-label="time" defaultValue={getGradeHoraria("SUN")[0]} onChange={(ev) => {handleChanges("SUN", "startTime", String(ev.target.value))}}></input>
                    </div>
                </div>
                <div className="col-3">
                    <div className="w-100 d-flex justify-content-between">
                        <input type="time" aria-label="time" defaultValue={getGradeHoraria("SUN")[1]} onChange={(ev) => {handleChanges("SUN", "endTime", String(ev.target.value))}}></input>
                    </div>
                </div>
                <div className="col-3">
                    <div className="w-100 d-flex justify-content-between">
                        <input className="form-check-input" type="checkbox" defaultChecked={getGradeHoraria("SUN")[2]} onChange={(ev) => {handleChanges("SUN", "activeDay", String(ev.target.value))}}></input>
                    </div>
                </div>
            </div>
            <div className="row align-items-center">
                <input type="submit" className="btn btn-primary" value="Confirmar Alterações" onClick={submitChanges}></input>
            </div>

        </div>
    ); 
};

export default Funcionamento; 
