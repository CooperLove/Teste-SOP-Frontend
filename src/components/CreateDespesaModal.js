import React from "react";

function CreateDespesaModal(props) {
  const { setList, createDespesa } = props;
  return (
    <div>
      <section>Criando nova Despesa</section>
      <form
        action=""
        onSubmit={() => {
          const tipo = document.getElementById("inputTipoDespesa").value;
          const credor = document.getElementById("inputCredorDespesa").value;
          const desc = document.getElementById("inputDescricaoDespesa").value;
          const valor = document.getElementById("inputValorDespesa").value;
          console.log("Inputs", tipo);
          createDespesa(tipo, "qwe", "ewq", 123, setList);
        }}
      >
        <label htmlFor="">Tipo da despesa </label>
        <input id="inputTipoDespesa" type="text" required={true} />
        <label htmlFor="">Credor da despesa </label>
        <input id="inputCredorDespesa" type="text" required={true} />
        <label htmlFor="">Descrição </label>
        <input id="inputDescricaoDespesa" type="text" required={true} />
        <label htmlFor="">Valor </label>
        <input id="inputValorDespesa" type="number" name="" required={true} />
        <input type="submit" value="Criar despesa" />
      </form>
    </div>
  );
}

export default CreateDespesaModal;
