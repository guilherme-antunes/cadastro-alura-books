// UTILIZANDO O .THEN, .CATCH E O .FINALLY
// var consultaCEP = fetch("https://viacep.com.br/ws/01001000/json/")
//   .then((resposta) => resposta.json)
//   .then((r) => {
//     // msg pra error
//     if (r.erro) {
//       throw Error(" Esse cep non existe!");
//     } else
//     console.log(r);
//   })
//   .catch((erro) => console.log(erro))
//   .finally(mensagem => console.log('processo concluído!'));

// console.log(consultaCEP);

// UTILIZANDO ASYNC E AWAIT
// o async await, que funciona de forma semelhante ao then mas o código fica mais “bonito”. Esse “embelezamento” em códigos é o que chamamos de syntax sugar.

async function buscaEndereco(cep) {
  var mensagemErro = document.getElementById('erro');
  mensagemErro.innerHTML = "";
  try {
    var consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    var consultaCEPConvertida = await consultaCEP.json();
    if (consultaCEPConvertida.erro){
      throw Error('CEP não existente!');
    }
    var cidade = document.getElementById('cidade');
    var logradouro = document.getElementById('endereco');
    var estado = document.getElementById('estado');

    cidade.value = consultaCEPConvertida.localidade;
    logradouro.value = consultaCEPConvertida.logradouro;
    estado.value = consultaCEPConvertida.uf;

    console.log(consultaCEPConvertida);
    return consultaCEPConvertida;
  } catch (erro) {
    mensagemErro.innerHTML = `<p> CEP inválido. Tente novamente! </p>`
    console.log(erro)
  }
}
  // // É isso que o promise.all fez, ele nos ajudou a fazer várias requisições ao mesmo tempo.
  // let ceps = ['01001000', '01001001'];
  // let conjuntoCeps = ceps.map(valores => buscaEndereco(valores));
  // Promise.all(conjuntoCeps).then(respostas => console.log(respostas));
  
  var cep = document.getElementById('cep');
  cep.addEventListener("focusout", ()=> buscaEndereco(cep.value));
  