import AvaliacaoCard from "../../components/AvaliacaoCard";

const Avaliacoes = () => {
  return (
    <div className="col p-5 overflow-auto h-100">
      <div className="row">
        <div className="col-12">
          <h2 className="mb-4 mt-0">Avaliações</h2>
          <div className="d-flex flex-wrap">
            <AvaliacaoCard rating={3} name={"Joana"} comment={"Muito bom o servico"} />
            <AvaliacaoCard rating={4} name={"Macela"} comment={"Ambiente agradável!"} />
            <AvaliacaoCard rating={5} name={"Juvelina"} comment={"Muito bom!"} />
            <AvaliacaoCard rating={2} name={"Amanda"} comment={"Horrivel"} />
            


            {/* Adicione mais cards conforme necessário */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Avaliacoes;