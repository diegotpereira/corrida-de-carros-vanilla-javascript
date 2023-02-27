const potuacao = document.querySelector('.pontuacao');
const iniciarTela = document.querySelector('.iniciarTela');
const jogoArea = document.querySelector('.jogoArea');
const nivel = document.querySelector('.nivel');

let iniciarJogo = new Audio();
let terminarJogo = new Audio();

iniciarJogo.src = "assets/audio/game_theme.mp3";
terminarJogo.src = "assets/audio/gameOver_theme.mp3";

let nivelVelocidade = {

    facil: 7,
    moderado: 10,
    dificil: 14
}

let chaves = {

    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false
}

let jogador = { velocidade: 7, pontuacao: 0};

nivel.addEventListener('click', (e) => {

    jogador.velocidade = nivelVelocidade[e.target.id];
});

iniciarTela.addEventListener('click', () => {

    iniciarTela.classList.add('hide');
    jogoArea.innerHTML = "";

    jogador.start = true;
    iniciarJogo.play();
    iniciarJogo.loop = true;
    jogador.pontuacao = 0;

    window.requestAnimationFrame(jogoJogar)

    let carroEl = document.createElement('div');
    carroEl.setAttribute('class', 'carro')
    jogoArea.appendChild(carroEl);

    jogador.x = carroEl.offsetLeft;
    jogador.y = carroEl.offsetTop;
})


function jogoJogar() {

    let carroEl = document.querySelector('.carro');
    let estrada = jogoArea.getBoundingClientRect();

    if (jogador.start) {
        
        moverLinhaEstrada();


        carroEl.style.top = jogador.y + "px";
        carroEl.style.left = jogador.x + "px";

        if(chaves.ArrowUp && jogador.y > (estrada.top + 70)) jogador.y -= jogador.velocidade;

        
    }

    window.requestAnimationFrame(jogoJogar);

}

function moverLinhaEstrada() {

    let linhasEstrada = document.querySelectorAll('.linhasEstrada');

    linhasEstrada.forEach((item) => {

        if (item.y >= 700) {
            
            item.y -= 750;
        }

        item.y += jogador.velocidade;
        item.style.top = item.y + "px";
    });
}

document.addEventListener('keydown', (e) => {

    e.preventDefault();
    chaves[e.key] = true;

});

document.addEventListener('keyup', (e) => {

    e.preventDefault();
    chaves[e.key] = false;
})