"use strict"
class Carta {
    constructor(x,y,width, height, valor, naipe, imagem) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.valor = valor;
        this.naipe = naipe;
        this.imagem = imagem;
        this.virada = true;
        console.log(this.width,this.height)
    }
    atualizar() {

    }
    desenhar() {
        if (this.virada) {
            return ctx.drawImage(this.imagem.image, 989, 2, this.imagem.width, this.imagem.height, this.x, this.y, this.width, this.height)
        }
        this.imagem.desenhar(this.x, this.y, this.width, this.height)
        // ctx.fillStyle = "#777"
        // ctx.fillRect(this.x,this.y,this.width,this.height)

    }
    detectarClique(e) {

        if (Collision.rectangleCollision({ x: e.clientX, y: e.clientY, width: 2, height: 2 }, this)) {
            console.log("clicado")
            //this.virada = !this.virada
            return this
        }
    }
}