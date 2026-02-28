const input = document.querySelector("#colocar-cep"); //captará o cep colocado
const botao_buscar = document.querySelector("#btn-buscar");
const infos = document.querySelector("#exibir-infos"); //infos variadas a serem exibidas

botao_buscar.addEventListener("click", pesquisarCep);

function pesquisarCep() {
  const cep = input.value.trim();
  if (cep === "") {
    infos.style.display = "block";
    infos.innerHTML = "Nenhum CEP digitado, tente outra vez.";
    return;
  }
  /*pra validar se tem mesmo 8 números */
  if (cep.length !== 8 || isNaN(cep)) {
    infos.style.display = "block";
    infos.innerHTML = "CEP inválido! Digite 8 números.";
    return;
  }
  buscarInfos(cep);
}

function buscarInfos(cep) {
  //fiquei um tempão sem essas chaves e não funcionava nem por um capeta aaaaaa
  fetch(`https://cep.awesomeapi.com.br/json/${cep}`)
    .then((retorno) => retorno.json())
    .then((dados) => {
      if (dados.code) {
        //estava tentando com classList.contains
        if (dados.code === "invalid") {
          infos.innerHTML = "CEP inválido";
        } else if (dados.code === "not_found") {
          infos.innerHTML = "CEP não encontrado!";
        }
        return;
      }

      //mostrar na tela
      infos.style.display = "block"; //pra desfazer o display none e mostrar as infos
      infos.innerHTML = `
        <div class="resultado">
          <p><strong>CEP:</strong> ${dados.cep}</p>
          <p><strong>Endereço:</strong> ${dados.address}</p>
          <p><strong>Cidade:</strong> ${dados.city}</p>
          <p><strong>Estado:</strong> ${dados.state}</p>
          <p><strong>DDD:</strong> ${dados.ddd}</p>
        </div>
      `;
    })
    .catch((erro) => {
      infos.style.display = "block"; //pra desfazer o display none e mostrar as infos
      infos.innerHTML = "Erro ao buscar CEP. Tente novamente.";
      console.error("Erro:", erro);
    });
}

console.log("Input:", input);
console.log("Botão:", botao_buscar);
console.log("Div infos:", infos);
