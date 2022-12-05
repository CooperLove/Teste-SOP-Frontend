import React, { useState, useEffect } from "react";
import "./styles/App.css";
import {
  createDespesa,
  getDespesas,
  updateDespesa,
  deleteDespesa,
  getDespesasCredor,
  getDespesasCredorEData,
} from "./requests/despesasRequest";
import Despesa from "./components/Despesa";
import { getEmpenhos, createEmpenho } from "./requests/empenhoRequest";
import { getPagamentos, createPagamento } from "./requests/pagamentosRequest";
// import {} from "./requests/";

function App() {
  const currentPage = {
    Despesas: "Despesas",
    Empenhos: "Empenhos",
    Pagamentos: "Pagamentos",
  };
  const [list, setList] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [currentSearch, setCurrentSearch] = useState("");
  const [page, setPage] = useState(currentPage.Despesas);
  useEffect(() => {
    getDespesas(setList);
  }, []);
  let headers = [];
  const date = new Date();
  const currentDay =
    date.getFullYear() +
    "-" +
    Number(date.getMonth() + 1) +
    "-" +
    (date.getDate() < 10 ? "0" + date.getDate() : date.getDate());

  const getCurrentPageList = () => {
    return page === currentPage.Despesas
      ? getDespesas(setList)
      : page === currentPage.Empenhos
      ? getEmpenhos(setList)
      : getPagamentos(setList);
  };

  return (
    <div className="wrapperDespesas">
      <div className="wrapperButtons">
        <br />
        <button
          onClick={() => {
            setPage(currentPage.Despesas);
            getDespesas(setList);
          }}
        >
          Despesas
        </button>
        <br />
        <button
          onClick={() => {
            {
              setPage(currentPage.Empenhos);
              getEmpenhos(setList);
            }
          }}
        >
          Empenhos
        </button>
        <br />
        <button
          onClick={() => {
            setPage(currentPage.Pagamentos);
            getPagamentos(setList);
          }}
        >
          Pagamentos
        </button>
        <br />
        <input
          type="text"
          placeholder="Pesquisar por tipo ou credor"
          onChange={(e) => {
            if (e.target.value === "") {
              setCurrentSearch("");
              getCurrentPageList();
              return;
            }
            setCurrentSearch(
              (currentSearch) => (currentSearch = e.target.value)
            );
            selectedDate
              ? getDespesasCredorEData(e.target.value, selectedDate, setList)
              : getDespesasCredor(e.target.value, setList);
            console.log("E" + currentSearch.current, selectedDate.current);
          }}
        />
        <input
          type="date"
          name=""
          id=""
          onChange={(e) => {
            if (e.target.value === "") {
              selectedDate("");
              getCurrentPageList();
              return;
            }
            setSelectedDate((s) => {
              return (s = e.target.value);
            });
            getDespesasCredorEData(currentSearch, e.target.value, setList);
          }}
          max={currentDay}
        />
        <br />

        <button
          onClick={() => {
            page === currentPage.Despesas
              ? createDespesa(setList)
              : page === currentPage.Empenhos
              ? createEmpenho(setList)
              : createPagamento(setList);
          }}
        >
          {"Criar " + page}
        </button>
      </div>
      <section className="despesasList">
        {list ? (
          <div className="tableBody">
            {list.split(/},{/g).map((m) => {
              let fields = m.split(",");
              let details = {};
              fields.map((f) => {
                f = f.replace(/\[\{/g, "").replace(/\}\]/g, "");
                f = f.split(":");
                f[0] = f[0].replace(/"/g, "");
                f[1] = f[1]?.replace(/"/g, " ");
                details[f[0]] = f[1]?.trim();
                headers.push(f[0]);
              });
              // console.log(details);

              return <Despesa details={details} />;
              {
                /* <tr className="tableHeader">
                    {headers.map((h) => {
                      return <td>{h}</td>;
                    })}
                  </tr> */
              }

              // return <Despesa details={details} />;
            })}
          </div>
        ) : (
          "There is no merchant data available"
        )}
      </section>
    </div>
  );
}
export default App;
