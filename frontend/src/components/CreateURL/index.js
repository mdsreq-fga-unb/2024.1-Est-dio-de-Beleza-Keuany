import React from 'react';

const ServiceList = () => {
  // Dados dos serviços existentes
  const services = [
    { id: 1, name: "Corte de Cabelo" },
    { id: 2, name: "Massagem Relaxante" },
    { id: 3, name: "Manicure" },
  ];

  // Dados dos novos serviços
  const newServices = [
    { id: 4, name: "Design de Sobrancelhas" },
    { id: 5, name: "Depilação" },
    { id: 6, name: "Limpeza de Pele" },
  ];

  // Combina todos os serviços em uma única lista
  const allServices = [...services, ...newServices];

  return (
    <div className="container mt-5">
      <h2>Lista de Serviços</h2>
      <div className="row">
        {allServices.map(service => (
          <div key={service.id} className="col-md-4 mb-4">
            <div className="card p-3">
              <h4>{service.name}</h4>
              {service.id <= 3 ? (
                // Para serviços com ID 1, 2 e 3, exibe apenas o link para confirmação
                <p>
                  <a href={`/confirmacao_agendamento/${service.id}`} className="btn btn-link" target="_blank" rel="noopener noreferrer">
                    Link para Confirmação
                  </a>
                </p>
              ) : (
                // Para serviços com ID 4, 5 e 6, exibe apenas o link para avaliação
                <p>
                  <a href={`/avaliar/${service.id}`} className="btn btn-link" target="_blank" rel="noopener noreferrer">
                    Link para Avaliação
                  </a>
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceList;
