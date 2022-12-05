import React from "react";
import { useState } from "react";
import DetailsDespesa from "./DetailsDespesa";

function Despesa(props) {
  const { details } = props;
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
      <DetailsDespesa details={details} />
    </section>
  );
}

export default Despesa;
