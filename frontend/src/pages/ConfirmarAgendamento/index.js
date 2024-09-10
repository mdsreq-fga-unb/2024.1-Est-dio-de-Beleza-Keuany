import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap'; // Assegure-se de importar o Button se necessário
import { confirmAppointment, getAppointmentById } from '../../store/modules/agendamento/sagas';
import { useNavigate } from 'react-router-dom';

const ConfirmacaoAgendamento = () => {
  const { id } = useParams(); // Obtém a ID do parâmetro da URL
  const [appointment, setAppointment] = useState();
  const navigate = useNavigate();

  const services = [
    { id: 1, name: "Design Simples" },
    { id: 2, name: "Micropigmentação" },
    { id: 3, name: "Desenho de Sobrancelha" },
  ];

  async function findAppointmentById(id) {
    const response = await getAppointmentById(id);

    if (response) {
      setAppointment(response.data);
    }
  }

  async function confirmCustomerAppointment(id) {
    try {
      const response = await confirmAppointment(id);
  
    } catch (error) {
      console.error('Erro ao confirmar agendamento');
    }
  }

  const selectedService = services.find(service => service.id === parseInt(id));

  const agendamentos = [
    {
      appointmentId: 1,
      procedureName: "Design Simples",
      appointmentStatus: "Confirmado",
      appointmentSchedule: "10:00",
      procedureDuration: 30,
      procedurePrice: 50.0,
    },
    {
      appointmentId: 2,
      procedureName: "Micropigmentação",
      appointmentStatus: "Agendado",
      appointmentSchedule: "12:00",
      procedureDuration: 60,
      procedurePrice: 120.0,
    },
    {
      appointmentId: 3,
      procedureName: "Desenho de Sobrancelha",
      appointmentStatus: "Cancelado",
      appointmentSchedule: "14:00",
      procedureDuration: 45,
      procedurePrice: 80.0,
    },
  ];

  const selectedAgendamento = agendamentos.find(agendamento => agendamento.appointmentId === parseInt(id));

  const intStatusToString = (status) => {
    switch (status) {
      case 0:
        return "Agendado";
      case 1:
        return "Confirmado";
      case 2:
        return "Finalizado";
      case 3:
        return "Cancelado";
      default:
        return "info"
    }
  }

  const formattedDateToBR = (dateString) => {
    // Extrai a data e a hora diretamente da string ISO
    const [datePart, timePart] = dateString.split('T');
    const [year, month, day] = datePart.split('-');
    const [hour, minute] = timePart.split(':');
  
    // Formata para o padrão brasileiro
    const formattedDate = `${day}/${month}/${year} ${hour}:${minute}`;
  
    return formattedDate;
  }

  const getStatusButtonVariant = (status) => {
    switch (status) {
      case "Confirmado":
        return "success";
      case "Agendado":
        return "primary";
      case "Cancelado":
        return "danger";
      case "Finalizado":
        return "secondary";
      default:
        return "info";
    }
  };

  const ServicoCard = ({ service }) => (
    <div className="service-card col p-3 overflow-auto h-100" style={{ maxWidth: '1000px', margin: 'auto' }}>
    
      <div className="row d-flex align-items-center justify-content-between">
        <div className="col-9 d-flex align-items-center">
          <div className="nome">{appointment.name}</div>
          <Button
            variant={getStatusButtonVariant(intStatusToString(appointment.status))}
            className="ms-3 text-center"
            disabled
            style={{
              fontSize: "0.8rem",
              padding: "0.2rem 0.4rem",
              minWidth: "80px",
              maxWidth: "100px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {intStatusToString(appointment.status)}
          </Button>
        </div>

        <div className="preco">
          <strong>{formattedDateToBR(appointment.schedule)} horas</strong>
        </div>
        <div className="tempo_estimado">
          Tempo Estimado: {appointment.duration} minutos
        </div>
        <div className="preco">
          Preço: {parseFloat(appointment.price).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </div>
      </div>
    </div>
   
  );

  const handleConfirm = () => {
    // Adicione a lógica para confirmar o agendamento aqui
    confirmCustomerAppointment(appointment.idAppointment);

    //alert("Agendamento confirmado!");
    window.location.reload();
    navigate(`/meus_agendamentos?telefone=${appointment.customerPhone}`);
  };

  useEffect(() => {
    findAppointmentById(id);
  }, []);

  return (
    <div className="col p-5 overflow-auto h-100">
      <div className="d-flex flex-column vh-100">
        <div className="p-5">
          <h2 className="mb-5 mt-0">Detalhes do Agendamento</h2>
          {appointment ? (
            <>
              <ServicoCard service={appointment} />
              <div className="mt-4 text-center">
                <Button
                  variant="success"
                  onClick={handleConfirm}
                >
                  Confirmar Agendamento
                </Button>
              </div>
            </>
          ) : (
            <p>Serviço não encontrado.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfirmacaoAgendamento;
