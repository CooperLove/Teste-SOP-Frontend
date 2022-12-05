function getEmpenhos(setEmpenhos) {
  console.log("GET Empenhos");
  fetch("http://localhost:3001/empenhos")
    .then((response) => {
      return response.text();
    })
    .then((data) => {
      setEmpenhos(data);
    });
}
function createEmpenho(setEmpenhos) {
  let anoEmpenho = prompt("Enter ano empenho");
  let dataEmpenho = prompt("Enter data empenho");
  let valorEmpenho = prompt("Enter valor empenho");
  let observacao = prompt("Enter descricao empenho");
  let numeroProtocolo = prompt("Enter numero protocolo empenho");
  console.log(
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
    });
}

function deleteEmpenho() {
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
  createEmpenho,
  updateEmpenho,
  deleteEmpenho,
};