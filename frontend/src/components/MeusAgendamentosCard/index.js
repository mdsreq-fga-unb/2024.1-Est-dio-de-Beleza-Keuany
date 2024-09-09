import React from 'react';
import { Card } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';

const MeusAgendamentosCard = ({ service, onDelete }) => {
  return (
    <Card className="mb-4">
      <Card.Body>
        <div className="d-flex align-items-center">
          <i
            className="bi bi-trash"
            style={{ fontSize: '2rem', cursor: 'pointer' }}
            onClick={() => onDelete(service.id)}
          ></i>
          <div className="ms-3">
            <Card.Title>{service.name}</Card.Title>
            <Card.Text>Tempo Estimado: {service.tempo} minutos</Card.Text>
            <Card.Text>Preço: R$ {service.preco}</Card.Text>
            <Card.Text>Data: {service.data}</Card.Text>
            <Card.Text>Hora: {service.hora}</Card.Text>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default MeusAgendamentosCard;
