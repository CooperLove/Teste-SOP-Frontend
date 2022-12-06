import React from "react";
import { useState } from "react";
import DetailsDespesa from "./DetailsDespesa";
import pages from "../PagesType";
import DetailsEmpenho from "./DetailsEmpenho";
import DetailsPagamento from "./DetailsPagamento";
import {
  getValorEmpenhosDaDespesa,
  getValorPagamentosDaDespesa,
} from "../requests/despesasRequest";

function Despesa(props) {
  const { details, setList, page } = props;
  const [valorEmpenhos, setValorEmpenhos] = useState(0);
  const [valorPagamentos, setValorPagamentos] = useState(0);
  console.log("Details: " + Array(details));
  const [showMore, setShowMore] = useState(false);
  let rowData = [];
  for (const [key, value] of Object.entries(details)) {
    rowData.push(value);
  }
  if (page === pages.Despesas) {
    getValorEmpenhosDaDespesa(rowData[0], setValorEmpenhos);
    getValorPagamentosDaDespesa(rowData[0], setValorPagamentos);
    rowData[rowData.length - 1] = valorEmpenhos ?? 0;
    const valor = rowData[rowData.length - 2];
    rowData[rowData.length - 1] =
      valorEmpenhos === null
        ? "Aguardando empenho"
        : valorEmpenhos < valor
        ? "Parcialmente empenhada"
        : valorEmpenhos >= valor && valorPagamentos == null
        ? "Aguardando pagamento"
        : valorPagamentos < valorEmpenhos
        ? "Parcialmente paga"
        : "Paga";
    console.log("hehe ", rowData[rowData.length - 1], valor);
    // console.log("Valor ", valorEmpenhos);
    // const valor = e["valorDespesa"];
  }
  return !showMore ? (
    <ul className="despesasRow" onClick={() => setShowMore(!showMore)}>
      {rowData.map((e) => {
        return <li className="rowData">{e}</li>;
      })}
    </ul>
  ) : (
    <section className="">
      <ul className="despesasRow" onClick={() => setShowMore(!showMore)}>
        {rowData.map((e) => {
          return <li className="rowData">{e}</li>;
        })}
      </ul>
      {page === pages.Despesas ? (
        <DetailsDespesa details={details} />
      ) : page === pages.Empenhos ? (
        <DetailsEmpenho details={details} />
      ) : (
        <DetailsPagamento details={details} />
      )}
    </section>
  );
}

export default Despesa;
