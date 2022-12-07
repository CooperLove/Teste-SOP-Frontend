import React, { useState, useEffect } from "react";
import pages from "../PagesType";
import {
  getCredorDaDespesa,
  getValorPagamentosDaDespesa,
} from "../requests/empenhoRequest";
import { createPagamento } from "../requests/pagamentosRequest";
import DeleteConfirmationBox from "./DeleteConfirmationBox";

function DetailsEmpenho(props) {
  const { details, setList } = props;
  const [showConfirmationDialogBox, setShowConfirmationDialogBox] =
    useState(false);
  const [valorPagamentos, setValorPagamentos] = useState(0);
  const [credor, setCredor] = useState("");
  useEffect(() => {
    getCredorDaDespesa(details["numeroProtocolo"], setCredor);
    getValorPagamentosDaDespesa(details["numeroEmpenho"], setValorPagamentos);
  }, []);
  //   getCredorDaDespesa(details["numeroProtocolo"], setCredor);
  //   getValorPagamentosDaDespesa(details["numeroEmpenho"], setValorPagamentos);
  const date = new Date();
  const year = Number(String(details["anoEmpenho"]));
  const currentDay =
    date.getFullYear() +
    "-" +
    Number(date.getMonth() + 1) +
    "-" +
    (date.getDate() < 10 ? "0" + date.getDate() : date.getDate());
  console.log("Emp:", credor?.at(0)?.credor);
  return (
    <div className="detailsDespesa">
      <section>{"Nome do credor: " + credor?.at(0)?.credor ?? ""}</section>
      <section>{"Ano do empenho: " + details["anoEmpenho"]}</section>
      <section>{"Número do empenho: " + details["numeroEmpenho"]}</section>
      <section>
        {"Data do empenho: " + String(details["dataEmpenho"]).substring(0, 10)}
      </section>
      <section>{"Valor: R$" + details["valorEmpenho"]}</section>
      <section>{"Valor dos pagamentos: R$" + (valorPagamentos ?? 0)}</section>
      <section>{"Observação: " + details["observacao"]}</section>
      <br />
      <div>
        <form action="">
          <label htmlFor="">Ano do pagamento </label>
          <input
            defaultValue={year}
            type="number"
            id="inputAnoPagamento"
            min={year}
            max={year + 10}
            required={true}
          />
          <br />
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
              const ano = document.getElementById("inputAnoPagamento").value;
              const valor = document.getElementById(
                "inputValorPagamento"
              ).value;
              const descricao = document.getElementById(
                "inputObservacaoPagamento"
              ).value;
              if (valor === "" || descricao == "") return;
              createPagamento(
                `${ano}`,
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
          <br />
        </form>
        <button
          onClick={() => {
            setShowConfirmationDialogBox(true);
          }}
        >
          Excluir Empenho
        </button>
        {showConfirmationDialogBox ? (
          <DeleteConfirmationBox
            page={pages.Empenhos}
            id={details["numeroEmpenho"]}
            setList={setList}
            closeDialogBox={setShowConfirmationDialogBox}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default DetailsEmpenho;
