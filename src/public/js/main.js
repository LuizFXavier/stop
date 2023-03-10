// Não estão comprando por algum motivo (arrumar)
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const botaoStop = document.getElementById('botaoStop')

const CANVAS_WIDTH = canvas.width = window.innerWidth;
const CANVAS_HEIGHT = canvas.height = window.innerHeight;
const CANVAS_X = canvas.getBoundingClientRect().x
const CANVAS_Y = canvas.getBoundingClientRect().y

canvas.addEventListener('click', (e) => {
    console.log(Math.floor(e.x - CANVAS_X), Math.floor(e.y - CANVAS_Y))
})
botaoStop.style.marginLeft = "10%"
botaoStop.style.marginTop = "60%"
botaoStop.style.fontSize = "100px"
botaoStop.style.fontFamily = "comic sans ms"
botaoStop.style.color = "#F0F030"
botaoStop.style.background = "#A00000"
botaoStop.style.borderRadius = "50px"
botaoStop.style.cursor = "pointer"

const baralho = new Baralho();
const player1 = new Player(canvas.width / 2 - baralho.deck[0].width, canvas.height / 2 + 50, baralho);
const bot1 = new Bote(player1.x * 1.6, canvas.height / 2 - baralho.deck[0].height, baralho)
const bot2 = new Bote(player1.x, 0, baralho)
let vez = 0;

bot1.tamanhoCartasMenor(baralho.descarte[0])
bot1.inicioBot()
bot2.tamanhoCartasMenor(baralho.descarte[0])
bot2.inicioBot()
//player1.mostrarInicio()

botaoStop.addEventListener('click', (e) => {
    if (player1.minhaVez) {

        console.log("stop");
        player1.pedirStop(bot1, bot2)
    }
    else {
        console.log("stop errado");
        player1.comprarMais(baralho.pilha)
    }
})


canvas.addEventListener('click', (e) => { //Player jogando
    console.log(e.x, e.y);

    if (player1.minhaVez) {
        if (player1.comprando) {

            player1.hands.forEach((carta) => {
                if (carta) {

                    player1.trocar(carta.detectarClique(e), baralho.descarte)
                    // setTimeout(() => {bot1.compraBot(baralho);},2000)
                    vez = 1
                }
            })
            if (baralho.descarte.slice(-1)[0].detectarClique(e) && !player1.mao.descartada) {

                player1.descartar(baralho.descarte)
                // setTimeout(() => {bot1.compraBot(baralho);},2000)
                vez = 1
            }

        } else {
            player1.comprar(baralho.pilha.slice(-1)[0].detectarClique(e), baralho.pilha)
            if (baralho.descarte.length > 1) {
                player1.comprar(baralho.descarte.slice(-1)[0].detectarClique(e), baralho.descarte)
            }
            player1.hands.forEach((carta) => {
                if (carta) {
                    if (baralho.descarte.length > 1)
                        player1.corte(carta.detectarClique(e), baralho.descarte, baralho.pilha)
                }
            })
        }

    } else {
        player1.hands.forEach((carta) => {
            if (carta) {

                player1.corte(carta.detectarClique(e), baralho.descarte, baralho.pilha)
            }
        })
    }

})

let controle = true
function update() {


    switch (vez) {
        case 0:
            player1.minhaVez = true;
            bot1.minhaVez = false;
            bot2.minhaVez = false;
            break;

        case 1:
            player1.minhaVez = false;
            bot1.minhaVez = true;
            bot2.minhaVez = false;
            console.log("vez 1");
            break;

        case 2:
            player1.minhaVez = false;
            bot1.minhaVez = false;
            bot2.minhaVez = true;
            console.log("vez 2");
            break;
        default:
            vez = 0
    }

    if (bot1.minhaVez && controle) {
        setTimeout(() => { bot1.compraBot(baralho); controle = true; vez++; console.log("bot1 jogou"); }, 2000)
        controle = false
    }
    if (bot2.minhaVez && controle) {
        setTimeout(() => { bot2.compraBot(baralho); controle = true; vez++; console.log("bot2 jogou"); }, 2000)
        controle = false
    }
    if (baralho.pilha.length <= 0) {
        baralho.voltarPilha()
    }
    bot1.corteBot(baralho.descarte, baralho.pilha)
    player1.somarPontos();
    bot1.somarPontos();

}

function animate() {
    update()
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    ctx.fillStyle = "#333"
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    baralho.pilha.forEach(carta => carta.desenhar())
    player1.hands.forEach(carta => { if (carta) carta.desenhar() })
    bot1.hands.forEach(carta => { if (carta) carta.desenhar() })
    bot2.hands.forEach(carta => { if (carta) carta.desenhar() })
    baralho.descarte.forEach(carta => carta.desenhar())

    if (player1.mao) { player1.mao.desenhar(); }
    if (bot1.mao) { bot1.mao.desenhar() }

    //baralho.pilha(-1)[0].desenhar()

    window.requestAnimationFrame(animate)
}

animate();