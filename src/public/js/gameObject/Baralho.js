class Baralho {
    constructor() {
        this.deck = [];
        this.naipes = {
            "paus": 0,
            "ouros": 1,
            "copas": 2,
            "espadas": 3
        };
        this.descarte = [];
        this.pilha = this.deck;
        this.criarBaralho();
        this.embaralhar();
    }
    criarBaralho() {
        const widthS = 73;
        const heightS = 103;
        let sobreposto = 0;

        for (let naipe in this.naipes) {

            for (let i = 1; i <= 13; i++) {
                let imagem = new Imagem((widthS * (i - 1) + i * 3), (3 * this.naipes[naipe] + heightS * (this.naipes[naipe])), widthS, heightS, './public/image/baralho.png')

                this.deck.push(new Carta(canvas.width * 0.01, canvas.height * 0.01, (canvas.width * 0.073), canvas.height * 0.2, i, naipe, imagem))
                sobreposto += 100;

            }
        }
        this.deck[25].valor = 0
        this.deck[38].valor = 0
        let imagem = new Imagem(989, 108, widthS, heightS, './public/image/baralho.png')
        console.log(this.descarte);
        this.descarte.push(new Carta(canvas.width / 2, canvas.height / 2 - 200, (canvas.width * 0.073), canvas.height * 0.2, 0, this.naipes["copas"], imagem))
        this.descarte[0].virada = false
    }
    embaralhar() {
        for (let i = this.pilha.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1))
            let temp = this.pilha[i]
            this.pilha[i] = this.pilha[j]
            this.pilha[j] = temp
        }
    }
    compraInicial() {

        const comprado = this.pilha.slice(-4);
        this.pilha = this.pilha.slice(0, this.pilha.length - 4)
        return comprado;
    }
    voltarPilha() {
        this.pilha = []
        for (let i = 1; i < this.descarte - 2; i++) {
            console.log(pilha);
            this.pilha.push(0)
        }
        for (let index = 0; index < this.pilha.length; index++) {
            this.pilha[index].x = 0
        }
        let temp = [];
        temp.push(this.descarte[0])
        temp.push(this.descarte.slice(-1)[0])
        this.descarte = temp

        //console.log(this.descarte)
        this.pilha.forEach(carta => {
            carta.x = 0;
        })
        this.embaralhar()
    }
}