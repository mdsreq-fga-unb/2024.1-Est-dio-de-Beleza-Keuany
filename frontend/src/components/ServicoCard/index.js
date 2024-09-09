const ServicoCard = ({nome, tempo_estimado, preco, changePage}) =>{

    return(  
        <div className="service-card col p-5 overflow-auto h-100">
            <div className="row">
                <div className="col-6">
                    <div className="nome">{nome}</div>
                    {/*Em minutos*/}
                    <div className="tempo_estimado">Tempo Estimado: {tempo_estimado}</div>
                    <div className="preco">Preço: R$ {preco}</div>
                </div>
                <div className="col-6 botao_reservar">
                    <button className="p-3 h-8 text-white" onClick={() => changePage(nome)}>Reservar</button>
                </div>
            </div>
        </div>
    );
}

export default ServicoCard;