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
import {
  getEmpenhos,
  createEmpenho,
  getEmpenhosPorData,
} from "./requests/empenhoRequest";
import {
  getPagamentos,
  createPagamento,
  getPagamentosPorData,
} from "./requests/pagamentosRequest";
import CreateDespesaModal from "./components/CreateDespesaModal";
import header from "./components/ListHeader";
import ListHeader from "./components/ListHeader";
import pages from "./PagesType";
// import {} from "./requests/";

function App() {
  const [list, setList] = useState("");
  const [createItem, setCreateItem] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [currentSearch, setCurrentSearch] = useState("");
  const [page, setPage] = useState(pages.Despesas);
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

  const getpagesList = () => {
    return page === pages.Despesas
      ? getDespesas(setList)
      : page === pages.Empenhos
      ? getEmpenhos(setList)
      : getPagamentos(setList);
  };

  const getSearchResultByCredor = (credor) => {
    return page === pages.Despesas
      ? selectedDate
        ? getDespesasCredorEData(credor, selectedDate, setList)
        : getDespesasCredor(credor, setList)
      : page === pages.Empenhos
      ? getEmpenhos(setList)
      : getPagamentos(setList);
  };

  const getSearchResultByDate = (data) => {
    return page === pages.Despesas
      ? getDespesasCredorEData(currentSearch, data, setList)
      : page === pages.Empenhos
      ? getEmpenhosPorData(data, setList)
      : getPagamentosPorData(data, setList);
  };

  return (
    <div className="wrapperDespesas">
      <div className="wrapperButtons">
        <br />
        <button
          onClick={() => {
            setCreateItem(false);
            setPage(pages.Despesas);
            getDespesas(setList);
          }}
        >
          Despesas
        </button>
        <br />
        <button
          onClick={() => {
            {
              setCreateItem(false);
              setPage(pages.Empenhos);
              getEmpenhos(setList);
            }
          }}
        >
          Empenhos
        </button>
        <br />
        <button
          onClick={() => {
            setCreateItem(false);
            setPage(pages.Pagamentos);
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
              getpagesList();
              return;
            }
            setCurrentSearch((c) => (c = e.target.value));
            getSearchResultByCredor(e.target.value);
            console.log("E" + currentSearch, selectedDate);
          }}
        />
        <input
          type="date"
          name=""
          id=""
          onChange={(e) => {
            if (e.target.value === "") {
              setSelectedDate((s) => (s = ""));
              getpagesList();
              return;
            }
            setSelectedDate((s) => {
              return (s = e.target.value);
            });
            getSearchResultByDate(e.target.value);
          }}
          max={currentDay}
        />
        <br />

        {page === pages.Despesas ? (
          <button
            onClick={() => {
              setCreateItem(true);
            }}
          >
            {"Criar " + page}
          </button>
        ) : (
          ""
        )}
      </div>
      <ListHeader page={page} />
      <section className="despesasList">
        {createItem ? (
          <CreateDespesaModal setList={setList} createDespesa={createDespesa} />
        ) : list ? (
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

              return (
                <Despesa details={details} setList={() => {}} page={page} />
              );
            })}
          </div>
        ) : (
          "Nenhum resultado encontrado"
        )}
      </section>
    </div>
  );
}
export default App;
