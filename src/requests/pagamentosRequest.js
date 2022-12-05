function getPagamentos(setPagamentos) {
  fetch("http://localhost:3001/pagamentos")
    .then((response) => {
      return response.text();
    })
    .then((data) => {
      setPagamentos(data);
    });
}
function createPagamento(setPagamentos) {
  let anoPagamento = prompt("Enter ano pagamento");
  let dataPagamento = prompt("Enter data pagamento");
  let valorPagamento = prompt("Enter valor pagamento");
  let observacao = prompt("Enter observacao pagamento");
  let numeroEmpenho = prompt("Enter numero empenho pagamento");
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
      // console.log(response.text());
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
  createPagamento,
  updatePagamento,
  deletePagamento,
};
