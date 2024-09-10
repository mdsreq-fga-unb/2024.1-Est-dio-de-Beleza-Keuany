const ServicoCard = ({nome, tempo_estimado, preco, changePage}) =>{

    return(  
        <div className="service-card col p-5 overflow-auto h-100">
            <div className="row">
                <div className="col-6">
                    <div className="nome">{nome}</div>
                    {/*Em minutos*/}
                    <div className="tempo_estimado">Tempo Estimado: {tempo_estimado} minutos</div>
                    <div className="preco">Preço: {preco}</div>
                </div>
                <div className="col-6 botao_reservar">
                <button 
                    style={{
                        width: '150px',
                        padding: '0.5rem',
                        fontSize: '1rem',
                        borderRadius: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginLeft: 'auto',
                        marginRight: '0'
                    }}
                    className="text-white"
                    onClick={() => changePage(nome)}
                    >
                        Reservar
    </button>



                </div>
            </div>
        </div>
    );
}

export default ServicoCard;