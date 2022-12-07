function getPagamentos(setPagamentos) {
  fetch("http://localhost:3001/pagamentos")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      setPagamentos(data);
    });
}

function getPagamentosPorData(data, setPagamentos) {
  fetch(`http://localhost:3001/pagamentos/data/${data}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      setPagamentos(data);
    });
}

function getCredorDoPagamento(numeroEmpenho, setCredor) {
  fetch(`http://localhost:3001/pagamentos/credores/${numeroEmpenho}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      setCredor(data);
    });
}

function createPagamento(ano, data, valor, obs, numEmpenho, setPagamentos) {
  let anoPagamento = ano;
  let dataPagamento = data;
  let valorPagamento = valor;
  let observacao = obs;
  let numeroEmpenho = numEmpenho;
  console.log(
    JSON.stringify({
      anoPagamento,
      dataPagamento,
      valorPagamento,
      observacao,
      numeroEmpenho,
    })
  );
  fetch("http://localhost:3001/novoPagamento", {
    method: "POST",
    // mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      anoPagamento,
      dataPagamento,
      valorPagamento,
      observacao,
      numeroEmpenho,
    }),
  })
    .then((response) => {
      return response.text();
    })
    .then((data) => {
      alert(data);
      getPagamentos(setPagamentos);
    });
}

function deletePagamento() {
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

function updatePagamento(setPagamentos) {
  let numeroProtocolo = prompt("Enter pagamento id");
  let descricaoPagamento = prompt("Enter pagamento desc");
  let status = prompt("Enter pagamento status");
  fetch(`http://localhost:3001/pagamentos/update/${numeroProtocolo}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ numeroProtocolo, descricaoPagamento, status }),
  })
    .then((response) => {
      return response.text();
    })
    .then((data) => {
      alert(data);
      getPagamentos(setPagamentos);
    });
}

module.exports = {
  getPagamentos,
  getPagamentosPorData,
  getCredorDoPagamento,
  createPagamento,
  updatePagamento,
  deletePagamento,
};
