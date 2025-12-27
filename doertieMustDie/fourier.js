class Wave {
  constructor(npY, timeSpeed) {
    this.originY = npY
    this.tSpeed = timeSpeed
    this.originX = 0
    this.t = 0
    this.quantity = 5
    this.radius = 3
    this.wave = []
    this.wavePosX = 50
    this.wavePosY = 270
    this.waveLenght = 666
  }

  update() {
    let x = this.originX
    let y = this.originY
    let lastX = this.originX
    let lastY = this.originY
    let a = this.quantity
    let r = this.radius
    for (let i = 0; i < a; i++) {
      let n = (i*2)+1
      let radius = r*(4/(n*Math.PI))
      x += radius*Math.cos(n*this.t)
      y += radius*Math.sin(n*this.t)
      
      //////////////////////////////////////////////////////////////////
      // // drawing lines
      // ctx.beginPath()
      // ctx.strokeStyle = 'rgb(57, 255, 20)'
      // ctx.lineJoin = 'round'
      // ctx.lineCap = 'round'
      // ctx.moveTo(lastX, lastY)
      // ctx.lineTo(x, y)
      // ctx.stroke()

      // // drawing circles
      // ctx.beginPath()
      // ctx.fillStyle = 'rgba(255, 255, 255, 0.2)'
      // ctx.arc(lastX, lastY, 3, 0, 2*Math.PI)
      // ctx.fill()

      // // drawing dots
      // ctx.beginPath()
      // ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)'
      // ctx.arc(lastX, lastY, radius, 0, 2*Math.PI)
      // ctx.stroke()
      lastX = x
      lastY = y
    }

    // draw waveline
    this.wave.unshift(y)
    ctx.beginPath()
    ctx.strokeStyle = 'rgb(57, 255, 20)'
    ctx.lineJoin = 'round'
    ctx.lineCap = 'round'
    ctx.fillStyle = 'white'
    ctx.moveTo(this.wavePosX, this.wave[0]+this.wavePosY)
    for (let i=0; i<this.wave.length; i++) {
      ctx.lineTo(this.wavePosX+7+i, this.wave[i]+this.wavePosY)
    }
    ctx.stroke()
    this.t += this.tSpeed
    ///////////////////////////////////////////////////////////
    // [Y]
     this.Y = lastY
    // [Y]
    // ctx.fillStyle = 'rgb(57, 255, 20)'
    // ctx.font = '17px Verdana'
    // ctx.fillText('Y: ' + this.Y, 450, 380)

    if (this.wave.length > this.waveLenght) this.wave.splice(-1, 1)
  }

  draw() {
    this.update()
  }
}