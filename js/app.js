const pontuacao = document.querySelector('.pontuacao');
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

    for(let i = 0; i < 5; i += 1) {

        let linhaEstradaEl = document.createElement('div');

        linhaEstradaEl.setAttribute('class', 'linhasEstrada');
        linhaEstradaEl.y = (i * 150);
        linhaEstradaEl.style.top = linhaEstradaEl.y + "px";

        jogoArea.appendChild(linhaEstradaEl);
    }

    let carroEl = document.createElement('div');
    carroEl.setAttribute('class', 'carro')
    jogoArea.appendChild(carroEl);

    jogador.x = carroEl.offsetLeft;
    jogador.y = carroEl.offsetTop;

    for(let i = 0; i < 3; i += 1) {

        let carroInimigo = document.createElement('div');

        carroInimigo.setAttribute('class', 'carroInimigo');
        carroInimigo.y = ((i + 1) * 350) * - 1;
        carroInimigo.style.top = carroInimigo.y + "px";
        carroInimigo.style.backgroundColor = corAleatoria();
        carroInimigo.style.left = Math.floor(Math.random() * 350) + "px";

        jogoArea.appendChild(carroInimigo);
    }
});

function corAleatoria() {

    function c() {

        let hex = Math.floor(Math.random() * 256).toString(16);

        return ("0" + String(hex)).substr(-2);
    }

    return "#" + c() + c() + c();
}

function emColisao(a, b) {

    aRect = a.getBoundingClientRect();
    bRect = b.getBoundingClientRect();

    return !((aRect.top > bRect.bottom) || (aRect.bottom < bRect.top) || (aRect.right < bRect.left) || (aRect.left > bRect.right));
}

function emFinalJogo() {

    jogador.start = false;
    iniciarJogo.pause();
    terminarJogo.play();

    iniciarTela.classList.remove('hide');
    iniciarTela.innerHTML = "Fim de Jogo <br> Sua pontuação final é " + jogador.pontuacao + "<br> Pressione aqui para reiniciar o jogo.";
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

function moverCarroInimigo(carroEl) {

    let carrosInimigos = document.querySelectorAll(".carroInimigo");

    carrosInimigos.forEach((item) => {

        if (emColisao(carroEl, item)) {
            
            emFinalJogo();
        }

        if (item.y >= 750) {
            
            item.y = -300;
            item.style.left = Math.floor(Math.random() * 350) + "px";
        }

        item.y += jogador.velocidade;
        item.style.top = item.y + "px";
    });
}



function jogoJogar() {

    let carroEl = document.querySelector('.carro');
    let estrada = jogoArea.getBoundingClientRect();

    if (jogador.start) {
        
        moverLinhaEstrada();
        moverCarroInimigo(carroEl);
        
        if(chaves.ArrowUp && jogador.y > (estrada.top + 70)) jogador.y -= jogador.velocidade;
        if(chaves.ArrowDown && jogador.y < (estrada.bottom - 85)) jogador.y += jogador.velocidade;
        if(chaves.ArrowLeft && jogador.x > 0) jogador.x -= jogador.velocidade;
        if(chaves.ArrowRight && jogador.x < (estrada.width - 70)) jogador.x += jogador.velocidade;

        carroEl.style.top = jogador.y + "px";
        carroEl.style.left = jogador.x + "px"; 

        window.requestAnimationFrame(jogoJogar);

        jogador.pontuacao++;

        const ps = jogador.pontuacao - 1;

        ps.innerHTML = 'Pontuação: ' + ps;

        
    }
}

document.addEventListener('keydown', (e) => {

    e.preventDefault();
    chaves[e.key] = true;

});

document.addEventListener('keyup', (e) => {

    e.preventDefault();
    chaves[e.key] = false;
})