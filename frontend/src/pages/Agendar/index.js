//import { useState } from "react";
import AgendarCard from "../../components/AgendarURLQuerry";
import { Link, useNavigate } from "react-router-dom";
//import React from 'react';
import { useSearchParams } from 'react-router-dom';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { setHours, setMinutes } from 'date-fns';
 
    




const Agendamentos_Clientes = () => {
  //const [startDate, setStartDate] = useState(new Date());

  const navigate = useNavigate();

  const [startDate, setStartDate] = useState(null);

  // Definir os horários disponíveis, por exemplo, das 9h às 17h
  const isTimeSelectable = (time) => {
    const selectedHour = time.getHours();
    return selectedHour >= 9 && selectedHour <= 17;
  };

  // Definir as datas indisponíveis
  const isDateSelectable = (date) => {
    const unavailableDates = ['2024-09-10', '2024-09-15'];
    const dateString = date.toISOString().split('T')[0];
    return !unavailableDates.includes(dateString);
  };


 /* function Agendar(props) {
    const searchParams = new URLSearchParams(props.location.search);
    const nome = searchParams.get('nome');
    const tempo_estimado = searchParams.get('tempo_estimado');
    const preco = searchParams.get('preco');
  }*/

  /*function paraMeusAgendamentos(servico) {
      navigate(`/meus_agendamentos?servico=${servico}`);
  }*/

      function paraMeusAgendamentos(nome, tempo_estimado, preco, data, hora) {
        navigate(`/meus_agendamentos?servico=${nome}&tempo=${tempo_estimado}&preco=${preco}&data=${data}&hora=${hora}`);
    }
      const [searchParams] = useSearchParams();

    // Extrai o valor do parâmetro "servico" da query string
    const servico = searchParams.get('servico');
    const tempo = searchParams.get('tempo');
    const preco = searchParams.get('preco');

    
    function toggleValue() {
      const button = document.getElementById('myButton');
      
      // Mudar o valor entre true e false
      button.value = (button.value === "true") ? "false" : "true";
      
      // Exibir o valor atual no console
      console.log(button.value);
      
      // Retornar o valor atual do botão
      return button.value;
    }


    


    return(
        <div className="col p-5 overflow-auto h-100">
  <div className="d-flex flex-column vh-100">
    {/* Título ou outro conteúdo acima do card */}
    <div className="p-5">
      <div className="row">
        <div className="col-12">
       

         

  <div className="className=mb-5 mt-0">
  
      <h2>Escolher Data</h2>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        
        dateFormat="MMMM d, yyyy"
        placeholderText="Selecione data"
      />
    </div>
  


  <div className="mb-4 mt-5">
            <h1>Agendar Serviço</h1>
            {servico && (
                <p>Serviço: <strong>{servico}</strong></p>
            )}
            {tempo && (
                <p>Tempo Estimado: <strong>{tempo} minutos</strong></p>
            )}
            {preco && (
                <p>Preço: <strong>R$ {preco}</strong></p>
            )}
        </div>



        
            <div className="className=mb-5 mt-0">
    <AgendarCard
        nome={"Design Simples"} 
        tempo_estimado={20} 
        preco={35} 
        data={"06/10/2024"} 
        hora={"14:00"} 
        changePage={() => paraMeusAgendamentos("Design Simples", 20, 35, "06/10/2024", "14:00")} 
    />
</div>

<div className="mb-4 mt-5"></div>
<div className="mb-4 mt-5"></div>
<div>


<button id="myButton" value="false" onClick={() => toggleValue()} >Clique aqui</button>


</div>
</div>

<div className="mb-4 mt-5"></div>
<div className="mb-4 mt-5"></div>
                



</div>
        </div>
      </div>
    </div>
  

        
    
    );  
};

export default Agendamentos_Clientes;  
