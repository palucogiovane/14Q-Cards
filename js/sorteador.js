const botaoSortear = document.querySelector('div.caixaSorteador button')
var numeroSorteado = document.querySelector('div.caixaSorteador h4')

botaoSortear.addEventListener("click", () => {
    // Captura o valor da quantidade de equipes
    var qtdEquipes = document.getElementById("qtdEquipes").value;
    
    // Verifica se a quantidade de equipes foi fornecida e é válida
    if (qtdEquipes && qtdEquipes > 0) {
        console.log(qtdEquipes);
        var roleta = []
        // Cria o array de equipes
        for (let i = 1; i <= qtdEquipes; i++) {
            roleta.push(i);
        }
        // Sorteia uma equipe aleatória
        numeroSorteado.innerHTML = "A equipe sorteada é a: " + roleta[Math.floor(Math.random() * roleta.length)];

        // Limpa o campo de input após o sorteio
        document.getElementById("qtdEquipes").value = "";
    } else {
        // Caso não seja um número válido ou o campo esteja vazio, mostra uma mensagem de erro
        numeroSorteado.innerHTML = "Por favor, insira uma quantidade válida de equipes.";
    }
});
