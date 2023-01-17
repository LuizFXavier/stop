class Imagem {
    constructor(x, y, width, height, url) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.image = new Image();
        this.image.src = url;
    }
    desenhar(x, y, width, height) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height, x, y, width, height);
        
    }
}