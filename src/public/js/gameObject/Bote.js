class Bote extends Player {
    constructor(x, y, baralho) {
        super(x, y, baralho)
        this.audio = new AudioGame("./public/js/assets/audio/beep_scanner.mp3", 0.07)
        this.memoria = [null, this.hands[1], null, this.hands[3]]
        this.minhaVez = false
        
    }
    inicioBot(){
        for (let i = 0; i < 2; i++) {
            this.hands[i].x = this.x
            this.hands[i].y = this.y + i * this.hands[i].height
        }
        for (let j = 2; j <= 3; j++) {
            this.hands[j].x = this.x + this.hands[j].width
            this.hands[j].y = this.y + this.hands[j].height * (j - 2)
        }
    }
    compraBot(baralho) {

        this.audio.play()
        let valores = []

        this.hands.forEach(carta => {
            if (carta)
                valores.push(carta.valor)
        })
        if (baralho.descarte.length > 1 && baralho.descarte.slice(-1)[0].valor <= 3 && baralho.descarte.slice(-1)[0].valor < Math.max(...valores)) {

            this.comprar(baralho.descarte.slice(-1)[0], baralho.descarte)
            const carta = this.hands.filter(carta => {if(carta) carta.valor == Math.max(...valores)})[0]
            //console.log(carta);

            this.memoria[this.hands.indexOf(carta)] = this.mao
            console.log(this.hands.indexOf(carta));
            this.trocar(carta, baralho.descarte)
        } else {

            this.comprar(baralho.pilha.slice(-1)[0], baralho.pilha)

            //console.log(Math.max(...valores))

            if (this.mao.valor < Math.max(...valores)) {
                const carta = this.hands.filter(carta => {if(carta) carta.valor == Math.max(...valores)})[0]
                //console.log(carta);

                console.log(this.hands.indexOf(carta));
                this.memoria[this.hands.indexOf(carta)] = this.mao
                this.trocar(carta, baralho.descarte)
            } else {
                this.descartar(baralho.descarte)
            }
        }
        this.minhaVez = false;
        player1.minhaVez = true;
        console.log("rodando");
        this.tamanhoCartasMenor(baralho.descarte[0])
    }
    tamanhoCartasMenor(exemplo) {
        this.hands.forEach(carta => {
            if(carta){

                carta.width = exemplo.width / 3 * 2;
                carta.height = exemplo.height / 3 * 2;
            }
        })
        
    }
    corteBot(descarte, pilha) {
        // this.memoria.forEach((carta) => {
        //     if (carta) {
        //         if (carta.valor == descarte.slice(-1)[0].valor) {
        //             console.log("corte bot");
        //             this.corte(carta, descarte, pilha)
        //         }
        //     }
        // })
        this.hands.forEach((carta)=>{
            if(carta)
                if (carta.valor == descarte.slice(-1)[0].valor) {
                    console.log("corte bot");
                    //this.hands[this.hands.indexOf(carta)] = null
                    this.corte(carta, descarte, pilha)
                    
                }
        })
    }

}