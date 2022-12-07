import React from "react";
import pages from "../PagesType";
import { deleteDespesa } from "../requests/despesasRequest";
import { deleteEmpenho } from "../requests/empenhoRequest";

function DeleteConfirmationBox({ page, id, setList, closeDialogBox }) {
  return (
    <div className="deleteDialogBox">
      <section className="areYouSureSection">
        Você tem certeza que deseja excluir{" "}
        {page === pages.Despesas ? "a despesa" : "o empenho"} {id}?
      </section>
      <br />
      <section className="warningSection">
        Você realmente quer realizar esta ação ? Esse processo não pode ser
        desfeito.
      </section>
      <div className="wrapperDialogBoxButtons">
        <button
          className="cancelButton"
          onClick={() => {
            closeDialogBox(false);
          }}
        >
          Cancelar
        </button>
        <form action="/">
          <button
            className="deleteButton"
            onClick={() => {
              closeDialogBox(false);
              page === pages.Despesas
                ? deleteDespesa(id, setList)
                : deleteEmpenho(id, setList);
            }}
          >
            Excluir
          </button>
        </form>
      </div>
    </div>
  );
}

export default DeleteConfirmationBox;
