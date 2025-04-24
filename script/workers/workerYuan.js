async function conectaAPI() {
    const conecta = await fetch('https://economia.awesomeapi.com.br/last/CNY-BRL');
    const conectaTraduzido = await conecta.json();
    postMessage(conectaTraduzido.CNYBRL);
}

addEventListener("message", () => {
    conectaAPI();
    setInterval(() => conectaAPI(), 5000)
})