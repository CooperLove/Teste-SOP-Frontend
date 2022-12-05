import React from "react";
import { createEmpenho } from "../requests/empenhoRequest";

function DetailsDespesa(props) {
  const { details, setList } = props;
  const date = new Date();
  const currentDay =
    date.getFullYear() +
    "-" +
    Number(date.getMonth() + 1) +
    "-" +
    (date.getDate() < 10 ? "0" + date.getDate() : date.getDate());
  return (
    <div className="detailsDespesa">
      <section>{"Data de protocolo: " + details["dataProtocolo"]}</section>
      <section>{"Data de vencimento: " + details["dataVencimento"]}</section>
      <section>{"Credor: " + details["credorDespesa"]}</section>
      <section>{"Descrição: " + details["descricaoDespesa"]}</section>
      <section>{"Valor: " + details["valorDespesa"]}</section>
      <section>{"Status: " + details["status"] + " " + currentDay}</section>
      <br />
      <div>
        <form action="">
          <label htmlFor="">Valor do empenho </label>
          <input type="number" id="inputValorEmpenho" required={true} />
          <br />
          <label htmlFor="">Observação </label>
          <input
            type="text"
            id="inputDescricaoEmpenho"
            maxLength={100}
            required={true}
          />
          <br />
          <button
            onClick={() => {
              const valor = document.getElementById("inputValorEmpenho").value;
              const descricao = document.getElementById(
                "inputDescricaoEmpenho"
              ).value;
              createEmpenho(
                `${date.getFullYear()}`,
                currentDay,
                valor,
                descricao,
                details["numeroProtocolo"],
                setList
              );
            }}
          >
            Criar Empenho
          </button>
        </form>
      </div>
      <br />
      <button>Ver empenhos</button>
    </div>
  );
}

export default DetailsDespesa;
