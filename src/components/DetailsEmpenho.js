import React from "react";
import { createPagamento } from "../requests/pagamentosRequest";

function DetailsEmpenho(props) {
  const { details, setList } = props;
  const date = new Date();
  const currentDay =
    date.getFullYear() +
    "-" +
    Number(date.getMonth() + 1) +
    "-" +
    (date.getDate() < 10 ? "0" + date.getDate() : date.getDate());
  console.log("Emp:", details);
  return (
    <div className="detailsDespesa">
      <section>{"Ano do empenho: " + details["anoEmpenho"]}</section>
      <section>{"Número do empenho: " + details["numeroEmpenho"]}</section>
      <section>{"Data do empenho: " + details["dataEmpenho"]}</section>
      <section>{"Valor: R$" + details["valorEmpenho"]}</section>
      <section>{"Observação: " + details["observacao"]}</section>
      <br />
      <div>
        <form action="">
          <label htmlFor="">Valor do pagamento </label>
          <input type="number" id="inputValorPagamento" required={true} />
          <br />
          <label htmlFor="">Observação </label>
          <input
            type="text"
            id="inputObservacaoPagamento"
            maxLength={100}
            required={true}
          />
          <br />
          <button
            onClick={() => {
              const valor = document.getElementById(
                "inputValorPagamento"
              ).value;
              const descricao = document.getElementById(
                "inputObservacaoPagamento"
              ).value;
              createPagamento(
                `${date.getFullYear()}`,
                currentDay,
                valor,
                descricao,
                details["numeroEmpenho"],
                setList
              );
            }}
          >
            Gerar pagamento
          </button>
        </form>
      </div>
      <br />
      <button>Ver pagamentos</button>
    </div>
  );
}

export default DetailsEmpenho;
