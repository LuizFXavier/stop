class Player {
    constructor(x, y, baralho) {
        this.hands = [];
        this.x = x;
        this.y = y;
        this.mao = null;
        this.comprando = false;
        this.pontos = 0;
        this.minhaVez = true;
        this.vendoIncio = true;
        this.comprarInicio(baralho.compraInicial());
        this.somarPontos();
    }
    comprarInicio(cartas) {
        console.log(cartas);

        this.hands = this.hands.concat(cartas);
        for (let i = 0; i < 2; i++) {
            this.hands[i].x = this.x
            this.hands[i].y = this.y + i * this.hands[i].height
        }
        for (let j = 2; j <= 3; j++) {
            this.hands[j].x = this.x + this.hands[j].width
            this.hands[j].y = this.y + this.hands[j].height * (j - 2)
        }

    }
    comprarMais(pilha) {
        if (this.hands.indexOf(null) != -1) {
            pilha.slice(-1)[0].x = this.x + pilha[0].width * Math.floor(this.hands.indexOf(null) / 2)
            pilha.slice(-1)[0].y = this.hands.indexOf(null) % 2 != 0 ? this.y + pilha[0].height : this.y
            this.hands[this.hands.indexOf(null)] = pilha.slice(-1)[0]
            pilha.pop()
        }
        else {
            pilha.slice(-1)[0].x = this.x + pilha[0].width * Math.floor((this.hands.length) / 2)
            pilha.slice(-1)[0].y = this.hands.length % 2 == 0 ? this.y : this.y + pilha[0].height

            this.hands.push(pilha.slice(-1)[0])
            pilha.pop()
        }
    }
    comprar(carta, pilha) {
        if (carta) {
            console.log("comprou")
            this.mao = carta;
            this.mao.virada = false;
            carta.x = this.x - carta.width * 2;
            carta.y = this.y;
            pilha.pop();
            this.comprando = true;
        }
    }
    trocar(carta, descarte) {
        console.log(carta);
        if (this.hands.indexOf(carta) != -1) {
            this.hands[this.hands.indexOf(carta)].virada = false;
            descarte.push(this.hands[this.hands.indexOf(carta)])
            this.mao.x = carta.x;
            this.mao.y = carta.y;
            carta.x = canvas.width / 2
            carta.y = canvas.height / 2 - 200;
            //this.mao.virada = false
            this.mao.virada = true
            this.hands[this.hands.indexOf(carta)] = this.mao
            this.comprando = false;
            this.mao = null;
            
            this.minhaVez = false
        }

    }
    descartar(descarte) {
        this.mao.descartada = true;
        descarte.push(this.mao)
        descarte.slice(-1)[0].x = canvas.width / 2;
        descarte.slice(-1)[0].y = canvas.height / 2 - 200;
        this.mao = null
        this.comprando = false
        this.minhaVez = false
    }
    somarPontos() {
        this.pontos = 0;
        this.hands.forEach((carta) => {
            if (carta)
                this.pontos += carta.valor
        })
    }
    corte(carta, descarte, pilha) {
        if (!carta)
            return
        if (descarte.slice(-1)[0].valor == carta.valor) {
            carta.x = descarte[0].x
            carta.y = descarte[0].y
            carta.virada = false
            descarte.push(carta)
            this.hands[this.hands.indexOf(carta)] = null
        }
        else {
            this.comprarMais(pilha)
            //carta.virada = !carta.virada
        }
        //this.minhaVez = true
    }
    mostrarInicio() {
        setTimeout(() => {
            this.hands[1].virada = true;
            this.hands[3].virada = true;
        },1000)
        this.hands[1].virada = false;
        this.hands[3].virada = false;
        //this.vendoIncio = false
    }
    pedirStop(...outros){
        outros.forEach((jogador)=>{
            jogador.hands.forEach(carta =>{
                if(carta){
                    carta.virada = false;
                }
            })
        })
        this.hands.forEach(carta =>{
            if(carta){
                carta.virada = false;
            }
        })
        if(outros[0].pontos >= this.pontos){

            alert("Você venceu")
        }
        else{

            alert("Você perdeu")
        }
    }
}