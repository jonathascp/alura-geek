import { requisicao_api } from "./js/requisicao_api.js";
import deleteApi from "./js/requisicao_api.js";

const listaDeProdutos = document.getElementById("container_produtos");
const formulario = document.getElementById("formulario");
const imagem = document.getElementById("input_imagem");
const nome = document.getElementById("input_nome");
const valor = document.getElementById("input_valor");
const apagarValores = document.getElementById("formulario_limpar");


 function renderizarProdutosNaLista(imagem,nome,valor,id)
{
    const produto = document.createElement("div");
    produto.className = "card";
    produto.innerHTML = 
    `<img src=${imagem}>
    <p id="card_nome">${nome}</p>
        <div id="card_preco">
            <p>$ ${valor}</p>
            <button value=${id} class="card_excluir"><i class="fa-solid fa-trash-can"></i></button>
        </div>`;

    return produto;
}

async function criarProduto()
{
    try 
    {
        const produtos = await requisicao_api.getApi();
        produtos.forEach(produto => 
        {
            listaDeProdutos.appendChild(renderizarProdutosNaLista(produto.imagem,produto.nome,produto.valor,produto.id));
        });

        const botaoExcluirProduto = document.querySelectorAll(".card_excluir");
        botaoExcluirProduto.forEach(produto =>
        {
            produto.addEventListener("click",(e) => deletarProduto(e));
        });

        if(produtos.length == 0)
        {
            listaDeProdutos.innerHTML = `Não existe produtos cadastrados`;
        }
        
    }

    catch(erro)
    {
        listaDeProdutos.innerHTML = `<h2>Não foi possível mostrar os produtos.</h2>`
        console.log(erro);
    }
}

function deletarProduto(e)
{
    e.preventDefault();
    const botao = e.target.closest(".card_excluir").value;
    deleteApi(botao);
}
    

formulario.addEventListener("submit",(evento) => {
    cadastrarNovoProduto(evento);
});

async function cadastrarNovoProduto(evento)
{
    evento.preventDefault();
    const produto = {
        imagem: imagem.value,
        nome: nome.value,
        valor: valor.value,
    }

    const novoProduto = JSON.stringify(produto);
    await requisicao_api.postApi(novoProduto);
}

apagarValores.addEventListener("click",(e) => apagarValoresInput(e));

function apagarValoresInput(e)
{
    e.preventDefault();
    nome.value = "";
    valor.value = "";
    imagem.value = "";
}

criarProduto();
