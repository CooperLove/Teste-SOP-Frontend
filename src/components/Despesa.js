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
  const [showMore, setShowMore] = useState(false);
  let rowData = [];
  for (const [key, value] of Object.entries(details)) {
    rowData.push(value);
  }
  rowData[2] = String(rowData[2]).substring(0, 10);
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

    rowData[3] = String(rowData[3]).substring(0, 10);
  }
  return !showMore ? (
    <ul className="despesasRow" onClick={() => setShowMore(!showMore)}>
      {rowData.map((e, index) => {
        return (
          <li key={index} className="rowData">
            {e}
          </li>
        );
      })}
    </ul>
  ) : (
    <section className="">
      <ul className="despesasRow" onClick={() => setShowMore(!showMore)}>
        {rowData.map((e, index) => {
          return (
            <li key={index} className="rowData">
              {e}
            </li>
          );
        })}
      </ul>
      {page === pages.Despesas ? (
        <DetailsDespesa
          details={details}
          status={rowData[rowData.length - 1]}
          valorEmpenhos={valorEmpenhos}
          valorPagamentos={valorPagamentos}
        />
      ) : page === pages.Empenhos ? (
        <DetailsEmpenho details={details} valorPagamentos={valorPagamentos} />
      ) : (
        <DetailsPagamento details={details} />
      )}
    </section>
  );
}

export default Despesa;
