const lista = document.querySelectorAll('[data-lista]');

function selecionaCotacao(nome, valor){
    lista.forEach((listaEscolhida) => {
        if(listaEscolhida.id == nome){
            imprimeCotacao(listaEscolhida, nome, valor)
        }
    })
}

function imprimeCotacao(lista, nome, valor){
    lista.innerHTML = '';
    const plurais = {
        "dolar": "dolares",
        "iene": "ienes",
        "peso argentino": "pesos argentino",
        "yuan": "yuans"
    }
    for(let multiplicador = 1; multiplicador <=1000; multiplicador *=10){
        const listaItem = document.createElement('li');
        listaItem.innerHTML = `${multiplicador} ${multiplicador == 1 ? nome : plurais[nome]}: R$${(valor * multiplicador).toFixed(2)}`;
        //apendChild faz com que seja inserido um elemento filho em um elemento pai, no caso esta sendo inserido o 'li' no 'ul' do html
        lista.appendChild(listaItem);
    }
}

export default selecionaCotacao;