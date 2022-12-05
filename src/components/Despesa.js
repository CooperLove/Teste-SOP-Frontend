import React from "react";
import { useState } from "react";
import DetailsDespesa from "./DetailsDespesa";
import pages from "../PagesType";
import DetailsEmpenho from "./DetailsEmpenho";
import DetailsPagamento from "./DetailsPagamento";

function Despesa(props) {
  const { details, page } = props;
  console.log("Details: " + details);
  const [showMore, setShowMore] = useState(false);
  let rowData = [];
  for (const [key, value] of Object.entries(details)) {
    rowData.push(value);
  }

  return !showMore ? (
    <ul className="despesasRow" onClick={() => setShowMore(!showMore)}>
      {rowData.map((e) => {
        return <li className="rowData">{e?.toString()}</li>;
      })}
    </ul>
  ) : (
    <section className="">
      <ul className="despesasRow" onClick={() => setShowMore(!showMore)}>
        {rowData.map((e) => {
          return <li className="rowData">{e?.toString()}</li>;
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
