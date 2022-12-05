import React from "react";

function DetailsDespesa(props) {
  const { details } = props;
  return (
    <div className="detailsDespesa">
      <section>{"Data de protocolo: " + details["dataProtocolo"]}</section>
      <section>{"Data de vencimento: " + details["dataVencimento"]}</section>
      <section>{"Credor: " + details["credorDespesa"]}</section>
      <section>{"Descrição: " + details["descricaoDespesa"]}</section>
      <section>{"Valor: " + details["valorDespesa"]}</section>
      <button>Ver empenhos</button>
    </div>
  );
}

export default DetailsDespesa;
