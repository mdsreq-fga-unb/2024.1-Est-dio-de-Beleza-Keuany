import { useState } from "react";
import Rating from "react-rating-stars-component"; // Importando a biblioteca de estrelas

const AvaliacaoServicos = () => {
  const [reviews, setReviews] = useState([]);

  // Serviços simulados
  const services = [
    { id: 1, name: "Corte de Cabelo" },
    { id: 2, name: "Massagem Relaxante" },
    { id: 3, name: "Manicure" },
  ];

  // Estado para armazenar a avaliação de cada serviço
  const [avaliacoes, setAvaliacoes] = useState(
    services.reduce((acc, service) => {
      acc[service.id] = { rating: 0, comment: "", anonymous: false }; // Inicializa cada serviço com uma nota 0, comentário vazio e anonimato desmarcado
      return acc;
    }, {})
  );

  // Função para salvar a avaliação no estado local
  const handleSaveReview = (serviceId) => {
    const currentReview = avaliacoes[serviceId];
    setReviews((prevReviews) => [
      ...prevReviews,
      { serviceId, ...currentReview, serviceName: services.find(service => service.id === serviceId).name },
    ]);
    alert("Avaliação salva com sucesso!"); // Simula a ação de salvar
  };

  // Função para alterar a nota da avaliação
  const handleRatingChange = (newRating, serviceId) => {
    setAvaliacoes((prevAvaliacoes) => ({
      ...prevAvaliacoes,
      [serviceId]: { ...prevAvaliacoes[serviceId], rating: newRating },
    }));
  };

  // Função para capturar o comentário
  const handleCommentChange = (event, serviceId) => {
    setAvaliacoes((prevAvaliacoes) => ({
      ...prevAvaliacoes,
      [serviceId]: { ...prevAvaliacoes[serviceId], comment: event.target.value },
    }));
  };

  // Função para alternar o estado do anonimato
  const handleAnonymousChange = (event, serviceId) => {
    setAvaliacoes((prevAvaliacoes) => ({
      ...prevAvaliacoes,
      [serviceId]: { ...prevAvaliacoes[serviceId], anonymous: event.target.checked },
    }));
  };

  return (
    <div className="col p-5 overflow-auto h-100">
    <div className="d-flex flex-column vh-100">
    <div className="container mt-5">
      <h2>Avalie os Serviços</h2>
      <div className="row">
        {services.map((service) => (
          <div key={service.id} className="col-md-4 mb-4">
            <div className="card p-3">
              <h4>{service.name}</h4>
              <p>Deixe sua avaliação:</p>
              <Rating
                count={5}
                size={24}
                value={avaliacoes[service.id].rating}
                activeColor="#ffd700"
                onChange={(newRating) => handleRatingChange(newRating, service.id)}
              />
              <textarea
                className="form-control mt-3"
                placeholder="Deixe um comentário..."
                value={avaliacoes[service.id].comment}
                onChange={(e) => handleCommentChange(e, service.id)}
              />
              <div className="form-check mt-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id={`anonymousCheck${service.id}`}
                  checked={avaliacoes[service.id].anonymous}
                  onChange={(e) => handleAnonymousChange(e, service.id)}
                />
                <label className="form-check-label" htmlFor={`anonymousCheck${service.id}`}>
                  Avaliar anonimamente
                </label>
              </div>
              <button
                className="btn btn-primary mt-3"
                onClick={() => handleSaveReview(service.id)}
              >
                Salvar Avaliação
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Exibe avaliações salvas */}
      <div className="mt-5">
        <h3>Avaliações Salvas</h3>
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} className="card mt-3 p-3">
              <h5>{review.serviceName}</h5>
              <p>Avaliação: {review.rating} estrelas</p>
              <p>Comentário: {review.comment}</p>
              <p>{review.anonymous ? "Avaliação Anônima" : "Nome: Usuario"}</p>
            </div>
          ))
        ) : (
          <p>Nenhuma avaliação foi salva ainda.</p>
        )}
      </div>
    </div>
    </div>
    </div>
  );
};

export default AvaliacaoServicos;
