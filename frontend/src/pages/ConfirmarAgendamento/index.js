import React from 'react';
import { useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap'; // Assegure-se de importar o Button se necessário

const ConfirmacaoAgendamento = () => {
  const { id } = useParams(); // Obtém a ID do parâmetro da URL

  const services = [
    { id: 1, name: "Design Simples" },
    { id: 2, name: "Micropigmentação" },
    { id: 3, name: "Desenho de Sobrancelha" },
  ];

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
          <div className="nome">{service.procedureName}</div>
          <Button
            variant={getStatusButtonVariant(service.appointmentStatus)}
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
            {service.appointmentStatus}
          </Button>
        </div>

        <div className="preco">
          <strong>{service.appointmentSchedule} horas</strong>
        </div>
        <div className="tempo_estimado">
          Tempo Estimado: {service.procedureDuration} minutos
        </div>
        <div className="preco">
          Preço: {parseFloat(service.procedurePrice).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </div>
      </div>
    </div>
   
  );

  const handleConfirm = () => {
    // Adicione a lógica para confirmar o agendamento aqui
    alert("Agendamento confirmado!");
  };

  return (
    <div className="col p-5 overflow-auto h-100">
      <div className="d-flex flex-column vh-100">
        <div className="p-5">
          <h2 className="mb-5 mt-0">Detalhes do Agendamento</h2>
          {selectedAgendamento ? (
            <>
              <ServicoCard service={selectedAgendamento} />
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
