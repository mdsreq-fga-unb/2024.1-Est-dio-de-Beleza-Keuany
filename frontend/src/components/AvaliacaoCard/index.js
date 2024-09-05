


const AvaliacaoCard = ({rating, name, comment, customerName}) =>{


    return(

      <div className="review-card">
        <div className="stars">
          {"★".repeat(rating)}
          {"☆".repeat(5 - rating)}
        </div>
        <div className="reviewer-name">{name}</div>
        <div className="comment">{comment}</div>
        <div className="customerName">{customerName}</div>
      </div>
    )
    
    }
    
    
    
    export default AvaliacaoCard;