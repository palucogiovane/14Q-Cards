let totaisPontos = Array(8).fill(0);
let tipoGrafico = 'bar';

// Função para inicializar o gráfico
function criarGrafico() {
    Chart.defaults.font.weight = 'bold';
    Chart.defaults.font.size = 12;
    Chart.defaults.color = '#000';
    const ctx = document.getElementById('graficoPontuacao').getContext('2d');
    return new Chart(ctx, {
        type: tipoGrafico,
        data: {
            labels: ['Equipe 1', 'Equipe 2', 'Equipe 3', 'Equipe 4', 'Equipe 5', 'Equipe 6', 'Equipe 7', 'Equipe 8'],
            datasets: [{
                label: 'Pontuação das Equipes',
                data: totaisPontos,
                backgroundColor: ['#ff6961', '#77dd77', '#fdfd96', '#84b6f4', '#fdcae1', '#c5c6c8', '#4afde7', '#bc98f3'],
                borderColor: 'black',
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: tipoGrafico === 'horizontalBar' ? 'y' : 'x',
            scales: tipoGrafico === 'pie' ? {} : { x: { beginAtZero: true }},
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

let graficoEquipes = criarGrafico();

// Função para atualizar pontos e gráfico
function atualizarPontos() {
    const pontosInputs = document.querySelectorAll('.pontos');
    const retirarInputs = document.querySelectorAll('.retirar');
    const totaisInputs = document.querySelectorAll('.total');

    pontosInputs.forEach((input, index) => {
        const pontos = parseInt(input.value) || 0;
        const retirar = parseInt(retirarInputs[index].value) || 0;
        totaisPontos[index] += pontos - retirar;  // Subtrai pontos da coluna 'retirar'
        totaisInputs[index].value = totaisPontos[index];  // Atualiza o total
        input.value = '';
        retirarInputs[index].value = '';
    });

    graficoEquipes.data.datasets[0].data = totaisPontos;
    graficoEquipes.update();
}

// Adiciona evento de Enter para atualizar pontos e retirar pontos
document.querySelectorAll('.pontos, .retirar').forEach(input => {
    input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            atualizarPontos();
        }
    });
});


// Adiciona evento de Enter em cada campo de pontos
document.querySelectorAll('.pontos').forEach((input, index) => {
    input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            atualizarPontos();
        }
    });
});

// Função para resetar a tabela e o gráfico
function resetarTabelaEGrafico() {
    totaisPontos = Array(8).fill(0);
    document.querySelectorAll('.total').forEach(input => input.value = 0);
    graficoEquipes.data.datasets[0].data = totaisPontos;
    graficoEquipes.update();
}

// Função para alterar o tipo de gráfico
function alterarTipoGrafico(novoTipo) {
    tipoGrafico = novoTipo === 'horizontalBar' ? 'bar' : novoTipo;
    const indexAxis = novoTipo === 'horizontalBar' ? 'y' : 'x';

    graficoEquipes.destroy();
    graficoEquipes = new Chart(document.getElementById('graficoPontuacao').getContext('2d'), {
        type: tipoGrafico,
        data: {
            labels: ['Equipe 1', 'Equipe 2', 'Equipe 3', 'Equipe 4', 'Equipe 5', 'Equipe 6', 'Equipe 7', 'Equipe 8'],
            datasets: [{
                label: 'Pontuação das Equipes',
                data: totaisPontos,
                backgroundColor: ['#ff6961', '#77dd77', '#fdfd96', '#84b6f4', '#fdcae1', '#c5c6c8', '#4afde7', '#bc98f3'],
                borderColor: 'black',
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: indexAxis,
            scales: novoTipo === 'pie' ? {} : { x: { beginAtZero: true }},
            responsive: true,
            maintainAspectRatio: false
        }
    });
}
