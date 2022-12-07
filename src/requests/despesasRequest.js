function getDespesas(setDespesas) {
  fetch("http://localhost:3001/despesas")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      setDespesas(data);
    });
}

function getValorEmpenhosDaDespesa(numeroProtocolo, setValorEmpenhos) {
  fetch(`http://localhost:3001/despesas/valorEmpenhos/${numeroProtocolo}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      setValorEmpenhos(data[0]["sum"]);
    });
}

function getValorPagamentosDaDespesa(numeroProtocolo, setValorPagamentos) {
  fetch(`http://localhost:3001/despesas/valorPagamentos/${numeroProtocolo}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      setValorPagamentos(data[0]["sum"]);
    });
}

function getDespesasCredor(credor, setDespesas) {
  fetch(`http://localhost:3001/credorDespesas/${credor}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      setDespesas(data);
    });
}
function getDespesasCredorEData(credor, dataProtocolo, setDespesas) {
  const url =
    credor === undefined || credor === ""
      ? `http://localhost:3001/credorDespesas/data/${dataProtocolo}`
      : `http://localhost:3001/credorDespesas/${credor}/${dataProtocolo}`;
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      setDespesas(data);
    });
}

function createDespesa(tipo, credor, desc, valor, setDespesas) {
  let tipoDespesa = tipo;
  let credorDespesa = credor;
  let descricaoDespesa = desc;
  let valorDespesa = valor;
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
      return response.text();
    })
    .then((data) => {
      alert(data);
      getDespesas(setDespesas);
    });
}

function deleteDespesa(numProtocolo, setDespesas) {
  let numeroProtocolo = numProtocolo;
  fetch(`http://localhost:3001/despesas/${numeroProtocolo}`, {
    method: "DELETE",
  })
    .then((response) => {
      return response.text();
    })
    .then((data) => {
      alert(data);
      getDespesas(setDespesas);
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
  getValorEmpenhosDaDespesa,
  getValorPagamentosDaDespesa,
  createDespesa,
  updateDespesa,
  deleteDespesa,
};
