class Bote extends Player {
    constructor(x, y, baralho) {
        super(x, y, baralho)
        this.audio = new AudioGame("./public/js/assets/audio/beep_scanner.mp3",0.07)
        this.memoria = []
        this.minhaVez = false
    }
    compraBot(baralho) {
        
        this.audio.play()
        let valores = []

        this.hands.forEach(carta => {
            if (carta)
                valores.push(carta.valor)
        })
        if (baralho.descarte.length > 1 && baralho.descarte.slice(-1)[0].valor <= 3 && baralho.descarte.slice(-1)[0].valor < Math.max(...valores)){

            this.comprar(baralho.descarte.slice(-1)[0], baralho.descarte)
            const carta = this.hands.filter(carta => carta.valor == Math.max(...valores))[0]
            //console.log(carta);
        
            this.trocar(carta, baralho.descarte)
        } else {

            this.comprar(baralho.pilha.slice(-1)[0], baralho.pilha)
    
            //console.log(Math.max(...valores))
        
            if (this.mao.valor < Math.max(...valores)) {
                const carta = this.hands.filter(carta => carta.valor == Math.max(...valores))[0]
                //console.log(carta);
        
                this.trocar(carta, baralho.descarte)
            } else {
                this.descartar(baralho.descarte)
            }
            }
            this.minhaVez = false;
            player1.minhaVez = true;
            console.log("rodando");
    }

}