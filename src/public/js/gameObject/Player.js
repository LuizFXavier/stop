class Player{
    constructor(x,y,baralho){
        this.hands = [];
        this.x = x;
        this.y = y;
        this.mao = null;
        this.comprando = false;
        this.comprarInicio(baralho.compraInicial());
    }
    comprarInicio(cartas){
        console.log(cartas);
        
        this.hands = this.hands.concat(cartas);
        for (let i = 0; i < 2; i++) {
            this.hands[i].x = this.x + i * this.hands[i].width
            this.hands[i].y = this.y    
        }
        for (let j = 0; j < 2; j++){
            this.hands[2].x = this.x 
            this.hands[2].y = this.y + j * this.hands[j].height
            this.hands[3].x = this.x + this.hands[3].width
            this.hands[3].y = this.y + j * this.hands[j].height
        }
    }
    comprar(carta, pilha){
        if(carta){
        this.mao = carta;
        this.mao.virada = false;
        carta.x = this.x - carta.width * 2;
        carta.y = this.y;
        pilha.pop();
        this.comprando = true;
    }
    }
    trocar(carta, descarte){
        if(this.hands.indexOf(carta) != -1){
            this.hands[this.hands.indexOf(carta)].virada = false;
            descarte.push(this.hands[this.hands.indexOf(carta)])
            this.mao.x = carta.x;
            this.mao.y = carta.y;
            carta.x = canvas.width/2
            carta.y = canvas.height/2 -200;

            this.mao.virada = true
            this.hands[this.hands.indexOf(carta)] = this.mao
            this.comprando = false;
            this.mao = null;
        }

    }
}