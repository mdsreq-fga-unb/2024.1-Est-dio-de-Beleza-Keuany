import React from 'react';
import { Link } from 'react-router-dom';

const ServiceList = () => {
  const services = [
    { id: 1, name: "Design Simples" },
    { id: 2, name: "Micropigmentação" },
    { id: 3, name: "Desenho de Sombrancelha" },
  ];

  const baseUrl = window.location.origin; // Obtém a URL base do site

  return (
    <div className="container mt-5">
      <h2>Lista de Serviços</h2>
      <div className="row">
        {services.map(service => (
          <div key={service.id} className="col-md-4 mb-4">
            <div className="card p-3">
              <h4>{service.name}</h4>
              <p>
                <Link to={`/avaliar/${service.id}`} className="btn btn-primary">
                  Avaliar Serviço
                </Link>
              </p>
              <p>
                <strong>Link para Avaliação:</strong>
                <br />
                <a href={`${baseUrl}/avaliar/${service.id}`} target="_blank" rel="noopener noreferrer">
                  {`${baseUrl}/avaliar/${service.id}`}
                </a>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceList;
