class Baralho {
    constructor() {
        this.deck = [];
        this.naipes = {
            "paus": 0,
            "ouros": 1,
            "copas": 2,
            "espadas": 3
        };
        this.criarBaralho();
        this.embaralhar();
        this.pilha = this.deck;
        this.descarte = []
    }
    criarBaralho() {
        const widthS = 73;
        const heightS = 103;
        let sobreposto = 0;

        for (let naipe in this.naipes) {

            for (let i = 1; i <= 13; i++) {
                let imagem = new Imagem((widthS * (i-1)  + i*3) , (3*this.naipes[naipe] + heightS * (this.naipes[naipe])), widthS, heightS, './public/image/baralho.png')

                this.deck.push(new Carta(canvas.width *0.01,canvas.height*0.01 ,(canvas.width * 0.073), canvas.height * 0.2, i, naipe, imagem))
                sobreposto +=100;
            }
        }
    }
    embaralhar() {
        for (let i = this.deck.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1))
            let temp = this.deck[i]
            this.deck[i] = this.deck[j]
            this.deck[j] = temp
        }
    }
    compraInicial(){
        
        const comprado = this.pilha.slice(-4);
        this.pilha = this.pilha.slice(0,this.pilha.length - 4)
        return comprado;
    }
}