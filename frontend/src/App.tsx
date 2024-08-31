import { useState } from 'react';
import './App.css';
import { Card } from './components/card/card';
import { foodItem } from './interface/FoodData';


function App() {
  const data = foodItem;  

  return (
      <div className="container">
        <h1>Estúdio Keuanny</h1> 
        <div className="card-grid">
          {data.map(foodData => 
            <Card 
              price={foodData.price} 
              title={foodData.title} 
              image={foodData.image}
              />
            )
          }
          
        </div> 

        

      </div>
        
  )
}

export default App
