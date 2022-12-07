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
  const year = Number(String(details["dataProtocolo"]).substring(0, 4));
  const currentDay =
    date.getFullYear() +
    "-" +
    Number(date.getMonth() + 1) +
    "-" +
    (date.getDate() < 10 ? "0" + date.getDate() : date.getDate());
  return (
    <div className="detailsDespesa">
      <section className="dataCredorDespesaSection">
        <section className="baseDespesaComponent">
          {"Data de protocolo: " +
            String(details["dataProtocolo"]).substring(0, 10)}
        </section>
        <section className="baseDespesaComponent">
          {"Data de vencimento: " +
            String(details["dataVencimento"]).substring(0, 10)}
        </section>
        <section className="baseDespesaComponent">
          {"Credor: " + details["credorDespesa"]}
        </section>
      </section>
      <section className="descStatusDespesaSection">
        <section className="baseDespesaComponent">
          {"Descrição: " + details["descricaoDespesa"]}
        </section>
        <section className="baseDespesaComponent">
          {"Status: " + status}
        </section>
        <section className="baseDespesaComponent"></section>
      </section>
      <section className="valoresDespesaSection">
        <section className="baseDespesaComponent">
          {"Valor: R$" + details["valorDespesa"]}
        </section>
        <section className="baseDespesaComponent">
          {"Valor total dos empenhos: R$" + (valorEmpenhos ?? 0)}
        </section>
        <section className="baseDespesaComponent">
          {"Valor total dos pagamentos: R$" + (valorPagamentos ?? 0)}
        </section>
      </section>
      <br />
      <div>
        <form action="">
          <label htmlFor="">Ano do empenho </label>
          <input
            defaultValue={year}
            type="number"
            id="inputAnoEmpenho"
            min={year}
            max={year + 10}
            required={true}
          />
          <br />
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
              const ano = document.getElementById("inputAnoEmpenho").value;
              const valor = document.getElementById("inputValorEmpenho").value;
              const descricao = document.getElementById(
                "inputDescricaoEmpenho"
              ).value;
              console.log(ano, valor, descricao);
              if (valor === "" || descricao === "") return;
              createEmpenho(
                `${ano}`,
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
