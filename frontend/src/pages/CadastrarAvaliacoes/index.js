import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Rating from 'react-rating-stars-component';

const AvaliacaoServicos = () => {
  const [reviews, setReviews] = useState([]);
  const { id } = useParams(); // Obtém a ID do parâmetro da URL

  // Serviços simulados
  const services = [
    { id: 4, name: "Design Simples" },
    { id: 5, name: "Micropigmentação" },
    { id: 6, name: "Desenho de Sombrancelha" },
  ];

  // Filtra o serviço com base na ID extraída da URL
  const selectedService = services.find(service => service.id === parseInt(id));

  // Estado para armazenar a avaliação do serviço selecionado
  const [avaliacao, setAvaliacao] = useState({
    rating: 0,
    comment: "",
    anonymous: false,
  });

  // Função para salvar a avaliação no estado local
  const handleSaveReview = () => {
    setReviews((prevReviews) => [
      ...prevReviews,
      { ...avaliacao, serviceId: selectedService.id, serviceName: selectedService.name },
    ]);
    alert("Avaliação salva com sucesso!"); // Simula a ação de salvar
  };

  // Função para alterar a nota da avaliação
  const handleRatingChange = (newRating) => {
    setAvaliacao((prevAvaliacao) => ({
      ...prevAvaliacao,
      rating: newRating,
    }));
  };

  // Função para capturar o comentário
  const handleCommentChange = (event) => {
    setAvaliacao((prevAvaliacao) => ({
      ...prevAvaliacao,
      comment: event.target.value,
    }));
  };

  // Função para alternar o estado do anonimato
  const handleAnonymousChange = (event) => {
    setAvaliacao((prevAvaliacao) => ({
      ...prevAvaliacao,
      anonymous: event.target.checked,
    }));
  };

  return (
    <div className="col p-5 overflow-auto h-100">
      <div className="d-flex flex-column vh-100">
        <div className="container mt-5">
          {selectedService ? (
            <>
              <h2>Avalie o Serviço: {selectedService.name}</h2>
              <div className="card p-3">
                <p>Deixe sua avaliação:</p>
                <Rating
                  count={5}
                  size={24}
                  value={avaliacao.rating}
                  activeColor="#ffd700"
                  onChange={handleRatingChange}
                />
                <textarea
                  className="form-control mt-3"
                  placeholder="Deixe um comentário..."
                  value={avaliacao.comment}
                  onChange={handleCommentChange}
                />
                <div className="form-check mt-3">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="anonymousCheck"
                    checked={avaliacao.anonymous}
                    onChange={handleAnonymousChange}
                  />
                  <label className="form-check-label" htmlFor="anonymousCheck">
                    Avaliar anonimamente
                  </label>
                </div>
                <button
                  className="btn btn-primary mt-3"
                  onClick={handleSaveReview}
                >
                  Salvar Avaliação
                </button>
              </div>
            </>
          ) : (
            <p>Serviço não encontrado.</p>
          )}

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
