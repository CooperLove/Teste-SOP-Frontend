import React, { useState } from "react";
import pages from "../PagesType";
import { deleteDespesa } from "../requests/despesasRequest";
import { createEmpenho } from "../requests/empenhoRequest";
import DeleteConfirmationBox from "./DeleteConfirmationBox";

function DetailsDespesa(props) {
  const [showConfirmationDialogBox, setShowConfirmationDialogBox] =
    useState(false);
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
