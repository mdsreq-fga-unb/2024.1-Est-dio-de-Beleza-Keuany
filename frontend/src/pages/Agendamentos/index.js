import { useEffect, useState } from 'react'; 
import { Calendar, momentLocalizer } from 'react-big-calendar'; 
import 'react-big-calendar/lib/css/react-big-calendar.css'; 
import moment from 'moment'; 
import { useDispatch, useSelector } from 'react-redux'; 
import { filterAgendamentos } from '../../store/modules/agendamento/actions'; 
import { getAllAppointments } from '../../store/modules/agendamento/sagas';
import util from '../../util'; 



const localizer = momentLocalizer(moment); 


const Agendamentos = () => {
    
   const dispatch = useDispatch();  
    //const { agendamentos } = useSelector((state) => state.agendamento)
    const [agendamentos, setAgendamentos] = useState([]);

    async function listAllAppointments() {
        const response = await getAllAppointments();
        setAgendamentos(response.data);
    }

    const formatEventos = agendamentos.map(agendamento => ({
        title: agendamento.procedureName,  
        start: moment(agendamento.appointmentSchedule)
                .utcOffset(0)
                .add(3, 'hours')
                .toDate(), 
        end: moment(agendamento.appointmentSchedule)
                .utcOffset(0)
                .add(3, 'hours')
                .add(agendamento.procedureDuration, 'minutes')

            
            .toDate(), 
    }));


    useEffect(() => {

       /* dispatch(filterAgendamentos(
            moment().weekday(0).format('YYYY-MM-DD'), 
            moment().weekday(6).format('YYYY-MM-DD'),
        )); */
        listAllAppointments();


    },[]);


    return(
        <div className="col p-5 overflow-auto h-100">
            <div className="row">
                <div className="col-12">
                    <h2 className="mb-4 mt-0">Agendamentos</h2>
                    <Calendar
                        localizer={localizer}
                        events={formatEventos} 
                        defaultView="week"
                        selectable
                        popup
                        style={{ height: 600 }}
                    />

                </div>

            </div>

        </div>
    );  
};

export default Agendamentos;  
