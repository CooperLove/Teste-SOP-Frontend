import React from "react";

function DetailsPagamento(props) {
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
      <section>{"Ano do pagamento: " + details["anoPagamento"]}</section>
      <section>{"Número do pagamento: " + details["numeroPagamento"]}</section>
      <section>{"Data do pagamento: " + details["dataPagamento"]}</section>
      <section>{"Valor: R$" + details["valorPagamento"]}</section>
      <section>{"Observação: " + details["observacao"]}</section>
      <section>{"Número do empenho: " + details["numeroEmpenho"]}</section>
    </div>
  );
}

export default DetailsPagamento;
