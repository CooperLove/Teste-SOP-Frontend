import React from "react";
import pages from "../PagesType";
import { deleteDespesa } from "../requests/despesasRequest";

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
        <form>
          <button
            className="deleteButton"
            onClick={() => {
              closeDialogBox(false);
              deleteDespesa(id, setList);
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
