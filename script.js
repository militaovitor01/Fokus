const html = document.querySelector('html')
const botaoFoco = document.querySelector('.app__card-button--foco')
const botaoDescansoCurto = document.querySelector('.app__card-button--curto')
const botaoDescansoLongo = document.querySelector('.app__card-button--longo')
const imagem = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const listaBotoes = document.querySelectorAll('.app__card-button')
const musicaFocoInput = document.querySelector('#alternar-musica')
const musica = new Audio('/sons/luna-rise-part-one.mp3')
const botaoStartPause = document.querySelector('#start-pause')
const somFinalizado = new Audio('/sons/beep.mp3')
const playSom = new Audio('/sons/play.wav')
const pauseSom = new Audio('/sons/pause.mp3')
let tempoDecorridoSegundos = 5
let intervaloId = null

botaoFoco.addEventListener('click', () =>{
    alterarContexto('foco')
    botaoFoco.classList.add('active')
})

botaoDescansoCurto.addEventListener('click', () =>{
    alterarContexto('descanso-curto')
    botaoDescansoCurto.classList.add('active')
})

botaoDescansoLongo.addEventListener('click', () =>{
    alterarContexto('descanso-longo')
    botaoDescansoLongo.classList.add('active')
})

musica.loop = true
musicaFocoInput.addEventListener('change', () =>{
    if(musica.paused){
        musica.play()
    }else{
        musica.pause()
    }
})

function alterarContexto(contexto) {
    listaBotoes.forEach(function(contexto){
        contexto.classList.remove('active')
    })

    html.setAttribute('data-contexto', contexto)
    imagem.setAttribute('src', `/imagens/${contexto}.png`)

    switch(contexto){
        case "foco":
            titulo.innerHTML = `
                Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>                
            `
            break;
        case "descanso-curto":
            titulo.innerHTML = `
                Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `
            break;
        case "descanso-longo":
            titulo.innerHTML = `
                Hora de voltar à superfície.<br>
                <strong class="app__title-strong">Faça uma pausa longa!</strong>
            `
        default:
            break;
    }        
}

const contagemRegressiva = () => {
    if (tempoDecorridoSegundos <= 0){
        finalizarContagem()
        somFinalizado.play()
        return
    }
    
    tempoDecorridoSegundos -= 1
    console.log('Temporizador: ' + tempoDecorridoSegundos)
}

botaoStartPause.addEventListener('click', iniciarOuPausarContagem)

function iniciarOuPausarContagem() {
    if(intervaloId){
        pauseSom.play()
        finalizarContagem()
        return
    }

    playSom.play()
    intervaloId = setInterval(contagemRegressiva, 1000)
}

function finalizarContagem(){
    clearInterval(intervaloId)
    intervaloId = null
}