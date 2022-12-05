function getDespesas(setDespesas) {
  fetch("http://localhost:3001/despesas")
    .then((response) => {
      return response.text();
    })
    .then((data) => {
      setDespesas(data);
    });
}
function getDespesasTipoDespesa(setDespesas) {
  fetch("http://localhost:3001/tipoDespesas")
    .then((response) => {
      return response.text();
    })
    .then((data) => {
      setDespesas(data);
    });
}
function getDespesasCredor(credor, setDespesas) {
  fetch(`http://localhost:3001/credorDespesas/${credor}`)
    .then((response) => {
      return response.text();
    })
    .then((data) => {
      setDespesas(data);
    });
}
function getDespesasCredorEData(credor, dataProtocolo, setDespesas) {
  console.log("Credor", credor === undefined || credor === "");
  const url =
    credor === undefined || credor === ""
      ? `http://localhost:3001/credorDespesas/data/${dataProtocolo}`
      : `http://localhost:3001/credorDespesas/${credor}/${dataProtocolo}`;
  fetch(url)
    .then((response) => {
      return response.text();
    })
    .then((data) => {
      console.log("Result: ", data);
      setDespesas(data);
    });
}

function createDespesa(setDespesas) {
  let tipoDespesa = prompt("Enter tipo despesa");
  let credorDespesa = prompt("Enter credor despesa");
  let descricaoDespesa = prompt("Enter descricao despesa");
  let valorDespesa = prompt("Enter valor despesa");
  console.log(
    JSON.stringify({
      tipoDespesa,
      credorDespesa,
      descricaoDespesa,
      valorDespesa,
    })
  );
  fetch("http://localhost:3001/novaDespesa", {
    method: "POST",
    // mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      tipoDespesa,
      credorDespesa,
      descricaoDespesa,
      valorDespesa,
    }),
  })
    .then((response) => {
      // console.log(response.text());
      return response.text();
    })
    .then((data) => {
      alert(data);
      getDespesas(setDespesas);
    });
}

function deleteDespesa() {
  let id = prompt("Enter merchant id");
  fetch(`http://localhost:3001/merchants/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      return response.text();
    })
    .then((data) => {
      alert(data);
      //   getMerchant();
    });
}

function updateDespesa(setDespesas) {
  let numeroProtocolo = prompt("Enter despesa id");
  let descricaoDespesa = prompt("Enter despesa desc");
  let status = prompt("Enter despesa status");
  fetch(`http://localhost:3001/despesas/update/${numeroProtocolo}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ numeroProtocolo, descricaoDespesa, status }),
  })
    .then((response) => {
      return response.text();
    })
    .then((data) => {
      alert(data);
      getDespesas(setDespesas);
    });
}

module.exports = {
  getDespesas,
  getDespesasCredor,
  getDespesasCredorEData,
  createDespesa,
  updateDespesa,
  deleteDespesa,
};