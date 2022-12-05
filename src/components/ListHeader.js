import React from "react";
import pages from "../PagesType";

function ListHeader(props) {
  const { page } = props;
  const header =
    page === pages.Despesas
      ? [
          "Número do protocolo",
          "Tipo",
          "Data do protocolo",
          "Vencimento",
          "Credor",
          "Descrição",
          "Valor",
          "Status",
        ]
      : page === pages.Empenhos
      ? [
          "Ano do empenho",
          "Número do empenho",
          "Data do empenho",
          "Valor",
          "Observacao",
          "Número Protocolo",
        ]
      : [
          "Ano do pagamento",
          "Número do pagamento",
          "Data do pagamento",
          "Valor",
          "Observação",
          "Número do empenho",
        ];
  return (
    <div className="listHeader">
      <ul className="listHeaderRow">
        {header.map((v) => {
          return <li className="rowData">{v}</li>;
        })}
      </ul>
    </div>
  );
}

export default ListHeader;
