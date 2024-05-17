
async function getApi()
{
    const resposta = await fetch("http://localhost:3000/produtos");
    const respostaConvertida = await resposta.json();
    return respostaConvertida;
}

async function postApi(novoProdutoCadastrado)
{
    const resposta = await fetch("http://localhost:3000/produtos",{
        method: "POST",
        headers: {
            'Content-type' :  'Application/json',
        },
        body: novoProdutoCadastrado,
    })

    return resposta;
}

export default async function deleteApi(id)
{
    const resposta = await fetch(`http://localhost:3000/produtos/${id}`,{
        method:"DELETE",
    });

    return resposta;
}

export const requisicao_api = {
    getApi,postApi
}

getApi();