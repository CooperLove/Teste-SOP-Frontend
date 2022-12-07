import React from "react";

function CreateDespesaModal(props) {
  const { setList, createDespesa } = props;
  return (
    <div>
      <form
        className="createDespesa"
        action=""
        onSubmit={() => {
          const tipo = document.getElementById("inputTipoDespesa").value;
          const credor = document.getElementById("inputCredorDespesa").value;
          const desc = document.getElementById(
            "inputDescricaoDespesa"
          ).innerText;
          const valor = document.getElementById("inputValorDespesa").value;
          createDespesa(tipo, credor, desc, valor, setList);
        }}
      >
        <section className="crateDespesaTitle">CRIANDO NOVA DESPESA</section>
        <div className="basicFormInput">
          <label htmlFor="" className="basicFormLabel">
            Tipo da despesa{" "}
          </label>
          <input
            className="inputTipoDespesa"
            id="inputTipoDespesa"
            type="text"
            required={true}
          />
        </div>
        <div className="basicFormInput">
          <label htmlFor="">Credor da despesa </label>
          <input id="inputCredorDespesa" type="text" required={true} />
        </div>
        <div className="basicFormInput">
          <label htmlFor="">Descrição </label>
          {/* <input id="inputDescricaoDespesa" type="text" required={true} /> */}
          {/* <textarea
            id="inputDescricaoDespesa"
            cols="30"
            rows="10"
            maxLength={100}
            required={true}
            style={{ resize: "none" }}
          ></textarea> */}
          <span
            className="textarea"
            id="inputDescricaoDespesa"
            role={"textbox"}
            contentEditable
          ></span>
        </div>
        <div className="basicFormInput">
          <label htmlFor="">Valor </label>
          <input id="inputValorDespesa" type="number" name="" required={true} />
        </div>
        <div className="wrapperCreateDespesaButtons">
          <input
            type="submit"
            className="createDespesaButton"
            value="Criar despesa"
          />
        </div>
      </form>
    </div>
  );
}

export default CreateDespesaModal;
