import { useEffect, useState } from 'react'; 
import { Calendar, momentLocalizer } from 'react-big-calendar'; 
import 'react-big-calendar/lib/css/react-big-calendar.css'; 
import moment from 'moment';
import { getAllAppointments } from '../../store/modules/agendamento/sagas';
import { sessionStatus } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap'; // Importa os componentes do react-bootstrap

const localizer = momentLocalizer(moment);

export default function Agendamentos () {
    const navigate = useNavigate();
    const [agendamentos, setAgendamentos] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false); // Estado do modal
    const [selectedEvent, setSelectedEvent] = useState(null); // Estado para armazenar o evento selecionado

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
        status: agendamento.appointmentStatus 
    }));

    if (formatEventos){
        console.log(formatEventos); 
    }


   

  
    const eventPropGetter = (event) => {
        let backgroundColor = '';
        console.log(event); 
        switch (event.status) {
            case 1:
                backgroundColor = 'green';
                break;
            case 2:
                backgroundColor = 'gray';
                break;
            case 3:
                backgroundColor = 'blue';
                break;
            case 0:
                backgroundColor = 'red';
                console.log('teste1'); 
                break;
            default:
                console.log(event.appointmentStatus); 
                return 'info'; 
            
        }

        return { style: { backgroundColor } };
    };




    const openModal = (event) => {
        setSelectedEvent(event); // Armazena informações do evento selecionado
        setModalIsOpen(true); // Abre o modal
    };

    const closeModal = () => {
        setModalIsOpen(false); // Fecha o modal
        setSelectedEvent(null); // Limpa o evento selecionado
    };

    useEffect(() => {
        sessionStatus(navigate).then(() => listAllAppointments());
    }, []);


    



    return (
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
                    onSelectEvent={openModal} // Chama a função openModal ao clicar em um evento
                    eventPropGetter={eventPropGetter} // Define a cor dos eventos com base no status
                />
            </div>
        </div>

        {/* Modal para exibir informações do evento */}
        <Modal show={modalIsOpen} onHide={closeModal} centered>
            <Modal.Header closeButton>
                <Modal.Title>Detalhes do Agendamento</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {selectedEvent && (
                    <Form>
                        <Form.Group controlId="formEventTitle">
                            <Form.Label>Nome do Procedimento</Form.Label>
                            <Form.Control type="text" readOnly value={selectedEvent.title} />
                        </Form.Group>
                        <Form.Group controlId="formEventStart">
                            <Form.Label>Data Início</Form.Label>
                            <Form.Control type="text" readOnly value={selectedEvent.start.toString()} />
                        </Form.Group>
                        <Form.Group controlId="formEventEnd">
                            <Form.Label>Data Fim</Form.Label>
                            <Form.Control type="text" readOnly value={selectedEvent.end.toString()} />
                        </Form.Group>
                    </Form>
                )}
            </Modal.Body>
            <Modal.Footer>
                {/* Botão de excluir */}
                <Button variant="danger">
                    Cancelar
                </Button>
                <Button style={{ backgroundColor: 'green', borderColor: 'green' }} onClick={closeModal}>
  Finalizar
</Button>

            </Modal.Footer>
        </Modal>
    </div>
    );  
};
