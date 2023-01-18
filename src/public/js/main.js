const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = canvas.width = window.innerWidth;
const CANVAS_HEIGHT = canvas.height = window.innerHeight;
const CANVAS_X = canvas.getBoundingClientRect().x
const CANVAS_Y = canvas.getBoundingClientRect().y

canvas.addEventListener('click', (e) => {
    console.log(Math.floor(e.x - CANVAS_X), Math.floor(e.y - CANVAS_Y))
})

const baralho = new Baralho();
const player1 = new Player(canvas.width / 2 - baralho.deck[0].width, canvas.height / 2 + 20, baralho);
const bot1 = new Bote(player1.x * 1.8, canvas.height / 2 - baralho.deck[0].height, baralho)
let vez = 0;

canvas.addEventListener('click', (e) => {
    console.log(e.x, e.y);
    
    if (player1.minhaVez) {
        if (player1.comprando) {

            player1.hands.forEach((carta) => {
                if (carta){

                    player1.trocar(carta.detectarClique(e), baralho.descarte)
                    // setTimeout(() => {bot1.compraBot(baralho);},2000)
                    bot1.minhaVez = true
                }
            })
            if (baralho.descarte.slice(-1)[0].detectarClique(e) && !player1.mao.descartada){

                player1.descartar(baralho.descarte)
                // setTimeout(() => {bot1.compraBot(baralho);},2000)
                bot1.minhaVez = true
            }

        } else {
            player1.comprar(baralho.pilha.slice(-1)[0].detectarClique(e), baralho.pilha)
            if (baralho.descarte.length > 1) {
                player1.comprar(baralho.descarte.slice(-1)[0].detectarClique(e), baralho.descarte)
            }
        }

    }else{
        player1.hands.forEach((carta) => {
            if (carta) {

                player1.corte(carta.detectarClique(e), baralho.descarte, baralho.pilha)
            }
        })
    }

    // if (player1.comprando) {

    //     player1.hands.forEach((carta) => {
    //         if (carta)
    //             player1.trocar(carta.detectarClique(e), baralho.descarte)
    //     })
    //     if (baralho.descarte.slice(-1)[0].detectarClique(e) && !player1.mao.descartada)
    //         player1.descartar(baralho.descarte)
    // } else {
    //     if (!player1.minhaVez) {

    //         player1.hands.forEach((carta) => {
    //             if (carta) {

    //                 player1.corte(carta.detectarClique(e), baralho.descarte, baralho.pilha)
    //             }
    //         })
    //     } else {

    //         player1.comprar(baralho.pilha.slice(-1)[0].detectarClique(e), baralho.pilha)
    //         if (baralho.descarte.length > 1) {
    //             player1.comprar(baralho.descarte.slice(-1)[0].detectarClique(e), baralho.descarte)
    //         }
    //     }
    // }

})
let controle = true
function update() {
    
    if(bot1.minhaVez && controle){
        setTimeout(() => {bot1.compraBot(baralho);controle = true},2000)
        controle = false
    }
    //console.log(bot1.minhaVez);
}

function animate() {
    update()
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    ctx.fillStyle = "#333"
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    baralho.pilha.forEach(carta => carta.desenhar())
    player1.hands.forEach(carta => { if (carta) carta.desenhar() })
    bot1.hands.forEach(carta => carta.desenhar())
    baralho.descarte.forEach(carta => carta.desenhar())

    if (player1.mao) { player1.mao.desenhar(); }
    if (bot1.mao) { bot1.mao.desenhar() }

    //baralho.pilha(-1)[0].desenhar()

    window.requestAnimationFrame(animate)
}

animate();