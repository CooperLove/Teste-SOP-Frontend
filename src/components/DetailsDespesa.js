import React, { useState, useEffect } from "react";
import pages from "../PagesType";
import {
  deleteDespesa,
  getValorEmpenhosDaDespesa,
  getValorPagamentosDaDespesa,
} from "../requests/despesasRequest";
import { createEmpenho } from "../requests/empenhoRequest";
import DeleteConfirmationBox from "./DeleteConfirmationBox";

function DetailsDespesa(props) {
  const { details, setList, status, valorEmpenhos, valorPagamentos } = props;
  const [showConfirmationDialogBox, setShowConfirmationDialogBox] =
    useState(false);
  const date = new Date();
  const currentDay =
    date.getFullYear() +
    "-" +
    Number(date.getMonth() + 1) +
    "-" +
    (date.getDate() < 10 ? "0" + date.getDate() : date.getDate());
  return (
    <div className="detailsDespesa">
      <section>
        {"Data de protocolo: " +
          String(details["dataProtocolo"]).substring(0, 10)}
      </section>
      <section>
        {"Data de vencimento: " +
          String(details["dataVencimento"]).substring(0, 10)}
      </section>
      <section>{"Credor: " + details["credorDespesa"]}</section>
      <section>{"Descrição: " + details["descricaoDespesa"]}</section>
      <section>{"Valor: R$" + details["valorDespesa"]}</section>
      <section>{"Status: " + status}</section>
      <section>{"Valor total dos empenhos: R$" + (valorEmpenhos ?? 0)}</section>
      <section>
        {"Valor total dos pagamentos: R$" + (valorPagamentos ?? 0)}
      </section>
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
          <br />
          <br />
        </form>
        <form>
          <button>Ver empenhos</button>
          <br />
        </form>
        <button
          onClick={() => {
            setShowConfirmationDialogBox(true);
          }}
        >
          Excluir despesa
        </button>
      </div>
      {showConfirmationDialogBox ? (
        <DeleteConfirmationBox
          page={pages.Despesas}
          id={details["numeroProtocolo"]}
          setList={setList}
          closeDialogBox={setShowConfirmationDialogBox}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default DetailsDespesa;
