const html = document.querySelector('html')
const botaoFoco = document.querySelector('.app__card-button--foco')
const botaoDescansoCurto = document.querySelector('.app__card-button--curto')
const botaoDescansoLongo = document.querySelector('.app__card-button--longo')
const imagem = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const listaBotoes = document.querySelectorAll('.app__card-button')
const temporizadorTela = document.querySelector('#timer')
const musicaFocoInput = document.querySelector('#alternar-musica')
const musica = new Audio('/sons/luna-rise-part-one.mp3')
const botaoStartPause = document.querySelector('#start-pause')
const botaoStartPauseSpan = document.querySelector('#start-pause span')
const botaoStartPauseImagem = document.querySelector('#start-pause img')
const somFinalizado = new Audio('/sons/beep.mp3')
const playSom = new Audio('/sons/play.wav')
const pauseSom = new Audio('/sons/pause.mp3')
let tempoDecorridoSegundos = 10
let intervaloId = null

botaoFoco.addEventListener('click', () =>{
    tempoDecorridoSegundos = 1500
    alterarContexto('foco')
    botaoFoco.classList.add('active')
})

botaoDescansoCurto.addEventListener('click', () =>{
    tempoDecorridoSegundos = 300
    alterarContexto('descanso-curto')
    botaoDescansoCurto.classList.add('active')
})

botaoDescansoLongo.addEventListener('click', () =>{
    tempoDecorridoSegundos = 900
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
    mostrarTempo()
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
        somFinalizado.play()
        alert('Tempo finalizado!')
        const focoAtivo = html.getAttribute('data-contexto')

        if(focoAtivo) {
            const evento = new CustomEvent('FocoFinalizado')
            document.dispatchEvent(evento)
        }
        
        finalizarContagem()
        return
    }
    
    tempoDecorridoSegundos -= 1
    mostrarTempo()
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
    botaoStartPauseSpan.textContent = "Pausar"
    botaoStartPauseImagem.setAttribute('src', '/imagens/pause.png')
}

function finalizarContagem(){
    clearInterval(intervaloId)
    botaoStartPauseSpan.textContent = "Começar"
    botaoStartPauseImagem.setAttribute('src', '/imagens/play_arrow.png')
    intervaloId = null
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    temporizadorTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo() 