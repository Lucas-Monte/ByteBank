import selecionaCotacao from "./imprimeCotacao.js";

const graficoDolar = document.getElementById('graficoDolar');

const graficoParaDolar =  new Chart(graficoDolar, {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: 'Dólar',
        data: [],
        borderWidth: 1
      }]
    },
  });

//faz requisições a cada 5 segundos. Define um intervalo para algo acontecer. Nesse caso, tendo como parametros a função conectaAPI e o 5000 ele irá executar a função a cada 5 segundos. A ordem do setinterval com a função dada de parametro nao afeta seu funcionamento. Portanto, ela poderia estar depois da função, o que até faria mais sentido, mas não afeta a funcionalidade estando antes.
//setInterval(() => conectaAPI(), 5000)
//o uso do async é para fazer com que a função seja assincrona, para nao travar o codigo caso o retorno da API demore.
// async function conectaAPI() {
//     //o uso do await é para esperar por uma promise (um objeto que representa a conclusão ou falha de uma operação assincrona e seu valor resultante), ou seja, ela faz com que a função pause para esperar o retorno da promise e resume a execução da função quando o valor da promise é resolvido.
//     const conecta = await fetch("https://economia.awesomeapi.com.br/json/last/USD-BRL");
//     const conectaTraduzido = await conecta.json();
//     let tempo = geraHorario()
//     let valor = conectaTraduzido.USDBRL.ask;
//     adicionarDados(graficoParaDolar, tempo, valor)
//     imprimeCotacao("dolar", valor);
// }

function geraHorario(){
    let data = new Date();
    let horario = data.getHours() + ":" + data.getMinutes() + ":" + data.getSeconds();
    console.log(horario);
    return horario;
}

function adicionarDados(grafico, legenda, dados){
    grafico.data.labels.push(legenda);
    grafico.data.datasets.forEach((dataset) => {
        dataset.data.push(dados)
    });
    grafico.update(); 
}

//worker faz com que seja possivel executar threads em segundo plano e conseguem se comunicar entre si
let workerDolar = new Worker('./script/workers/workerDolar.js');
workerDolar.postMessage('usd');

workerDolar.addEventListener("message", event => {
  let tempo = geraHorario();
  let valor = event.data.ask;
  selecionaCotacao("dolar", valor)
  adicionarDados(graficoParaDolar, tempo, valor);
})

const graficoIene = document.getElementById('graficoIene');
const graficoParaIene = new Chart(graficoIene, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Iene',
      dataset: [],
      borderWidth: 1
    }]
  },
})

let workerIene = new Worker('./script/workers/workerIene.js');
workerIene.postMessage('jpy');

workerIene.addEventListener("message", event => {
  let tempo = geraHorario();
  let valor = event.data.ask;
  selecionaCotacao("iene", valor);
  adicionarDados(graficoParaIene, tempo, valor);
})

const graficoPesoArgentino = document.getElementById('graficoPesoArgentino');
const graficoParaPesoArgentino = new Chart(graficoPesoArgentino, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Peso Argentino',
      dataset: [],
      borderWidth: 1
    }]
  },
})

let workerPesoArgentino = new Worker('./script/workers/workerPesoArgentino.js');
workerPesoArgentino.postMessage('ars');
workerPesoArgentino.addEventListener("message", event => {
  let tempo = geraHorario();
  let valor = event.data.ask;
  selecionaCotacao("peso argentino", valor);
  adicionarDados(graficoParaPesoArgentino, tempo, valor);
})

const graficoYuan = document.getElementById('graficoYuan');
const graficoParaYuan = new Chart(graficoYuan, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Yuan',
      dataset: [],
      borderWidth: 1
    }]
  }
})

let workerYuan = new Worker('./script/workers/workerYuan.js');
workerYuan.postMessage('cny');
workerYuan.addEventListener("message", event => {
  let tempo = geraHorario();
  let valor = event.data.ask;
  selecionaCotacao("yuan", valor);
  adicionarDados(graficoParaYuan, tempo, valor); 
})

