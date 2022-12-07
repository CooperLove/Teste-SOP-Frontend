import React, { useState, useEffect } from "react";
import { getCredorDoPagamento } from "../requests/pagamentosRequest";

function DetailsPagamento(props) {
  const { details, setList } = props;
  const [credor, setCredor] = useState("");
  useEffect(() => {
    getCredorDoPagamento(details["numeroEmpenho"], setCredor);
  }, []);
  const date = new Date();
  const currentDay =
    date.getFullYear() +
    "-" +
    Number(date.getMonth() + 1) +
    "-" +
    (date.getDate() < 10 ? "0" + date.getDate() : date.getDate());
  return (
    <div className="detailsDespesa">
      <section>{"Nome do credor: " + credor?.at(0)?.credor ?? ""}</section>
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
