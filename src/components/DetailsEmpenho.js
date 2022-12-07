import React, { useState, useEffect } from "react";
import pages from "../PagesType";
import { getValorPagamentosDaDespesa } from "../requests/empenhoRequest";
import { createPagamento } from "../requests/pagamentosRequest";
import DeleteConfirmationBox from "./DeleteConfirmationBox";

function DetailsEmpenho(props) {
  const { details, setList } = props;
  const [showConfirmationDialogBox, setShowConfirmationDialogBox] =
    useState(false);
  const [valorPagamentos, setValorPagamentos] = useState(0);
  useEffect(() => {
    getValorPagamentosDaDespesa(details["numeroEmpenho"], setValorPagamentos);
  }, []);
  getValorPagamentosDaDespesa(details["numeroEmpenho"], setValorPagamentos);
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
      <section>
        {"Data do empenho: " + String(details["dataEmpenho"]).substring(0, 10)}
      </section>
      <section>{"Valor: R$" + details["valorEmpenho"]}</section>
      <section>{"Valor dos pagamentos: R$" + (valorPagamentos ?? 0)}</section>
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
