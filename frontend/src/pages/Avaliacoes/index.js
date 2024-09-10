import AvaliacaoCard from "../../components/AvaliacaoCard";
import { getAllReviews } from "../../store/modules/avaliacao/sagas";
import { useEffect, useState } from "react";


const Avaliacoes = () => {
  const [reviews, setReviews] = useState([]);

  async function listAllReviews() {
    const response = await getAllReviews();
    if (response)
      setReviews(response.data);
  }

  useEffect(() => {
    listAllReviews();
  }, []);

  return (
    <div className="col p-5 overflow-auto h-100">
      <div className="row">
        <div className="col-12">
          <h2 className="mb-4 mt-0">Avaliações</h2>
          <div className="d-flex flex-wrap">
            {reviews.map((review) => (
              <AvaliacaoCard
                key={review.idReview}
                rating={review.rating}
                name={review.name}
                comment={review.comment}
                customerName={review.customerName}
              />
            ))};
          </div>
        </div>
      </div>
    </div>
  );
};

export default Avaliacoes;