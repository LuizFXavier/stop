class AudioGame {
    constructor(src, volume){
        this.audio = new Audio(src)
        this.audio.volume = volume
    }
    async play(tempo){
        this.audio.currentTime = tempo ?? 0
        await this.audio.play()
    }
}