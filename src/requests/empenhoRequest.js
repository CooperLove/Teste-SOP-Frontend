function getEmpenhos(setEmpenhos) {
  console.log("GET Empenhos");
  fetch("http://localhost:3001/empenhos")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      setEmpenhos(data);
    });
}

function getEmpenhosPorData(data, setEmpenhos) {
  console.log("GET Empenhos");
  fetch(`http://localhost:3001/empenhos/data/${data}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      setEmpenhos(data);
    });
}

function getValorPagamentosDaDespesa(numeroEmpenho, setValorPagamentos) {
  console.log("GET Emp - valor pagamentos ", numeroEmpenho);
  fetch(`http://localhost:3001/empenhos/valorPagamentos/${numeroEmpenho}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log("Data - ", data);
      setValorPagamentos(data[0]["sum"]);
    });
}

function getCredorDaDespesa(numeroProtocolo, setCredor) {
  console.log("GET Emp - credor ", numeroProtocolo);
  fetch(`http://localhost:3001/empenhos/credores/${numeroProtocolo}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log("Data - ", data);
      setCredor(data);
    });
}

function createEmpenho(ano, data, valor, obs, numProtocolo, setEmpenhos) {
  let anoEmpenho = ano;
  let dataEmpenho = data;
  let valorEmpenho = valor;
  let observacao = obs;
  let numeroProtocolo = numProtocolo;
  console.log(
    "Create Empenho ",
    JSON.stringify({
      anoEmpenho,
      dataEmpenho,
      valorEmpenho,
      observacao,
      numeroProtocolo,
    })
  );
  fetch("http://localhost:3001/novoEmpenho", {
    method: "POST",
    // mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      anoEmpenho,
      dataEmpenho,
      observacao,
      valorEmpenho,
      numeroProtocolo,
    }),
  })
    .then((response) => {
      // console.log(response.text());
      return response.text();
    })
    .then((data) => {
      alert(data);
      getEmpenhos(setEmpenhos);
    })
    .catch((error) => {
      console.log("Error empenho", error);
    });
}

function deleteEmpenho(numeroEmpenho) {
  fetch(`http://localhost:3001/empenhos/${numeroEmpenho}`, {
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

function updateEmpenho(setEmpenhos) {
  let numeroProtocolo = prompt("Enter empenho id");
  let descricaoEmpenho = prompt("Enter empenho desc");
  let status = prompt("Enter empenho status");
  fetch(`http://localhost:3001/empenhos/update/${numeroProtocolo}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ numeroProtocolo, descricaoEmpenho, status }),
  })
    .then((response) => {
      return response.text();
    })
    .then((data) => {
      alert(data);
      getEmpenhos(setEmpenhos);
    });
}

module.exports = {
  getEmpenhos,
  getEmpenhosPorData,
  getValorPagamentosDaDespesa,
  getCredorDaDespesa,
  createEmpenho,
  updateEmpenho,
  deleteEmpenho,
};
