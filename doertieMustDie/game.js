const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
canvas.width = 777
canvas.height = 444

////////////////////////////////////////////////// PLAYER INPUTS
let keys = {
  enter: false,
  trackPause: false,
  arrowLeft: false,
  arrowRight: false,
  mainShoot: false,
  arrowUp: false,
}
addEventListener('keydown', ({key}) => {
  switch (key) {
    case 'Enter':
      keys.enter = true
    break
    case 'p':
      keys.trackPause = true
      track.pause()
    break
    // player movement
    case 'ArrowLeft':
      keys.arrowLeft = true
    break
    case 'ArrowRight':
      keys.arrowRight = true
    break
    case 'ArrowUp':
      keys.arrowUp = true
    break
    case 'a':
      keys.mainShoot = true
    break
  }
})
addEventListener('keyup', ({key}) => {
  switch (key) {
    case 'Enter':
      keys.enter = false
    break
    case 'p':
      keys.trackPause = false
    break
    // player movement
    case 'ArrowLeft':
      keys.arrowLeft = false
    break
    case 'ArrowRight':
      keys.arrowRight = false
    break
    case 'ArrowUp':
      keys.arrowUp = false
    break
    case 'a':
      keys.mainShoot = false
    break
  }
})

///////////////////////////////////////////////// FUNCTION
function startScreen() {
  document.querySelector('#intro').style.display = 'flex'
  document.querySelector('#intro').style.fontSize = '11px'
  setTimeout(() => {
    document.querySelector('#intro').style.fontSize = '15px'
    setTimeout(() => {
      document.querySelector('#intro').style.fontSize = '19px'
      setTimeout(() => {
        document.querySelector('#intro').style.fontSize = '23px'
        setTimeout(() => {
          document.querySelector('#intro').style.fontSize = '28px'
          setTimeout(() => {
            document.querySelector('#intro').style.fontSize = '42px'
            setTimeout(() => {
              flashie()
              setTimeout(() => {
                doertieStartscreenImg = true
                setTimeout(() => {
                  document.querySelector('#highScore').style.display = 'flex'
                  setTimeout(() => {
                    document.querySelector('#pressStart').style.display = 'flex'
                    pressEnterToGetDoertie = true
                  }, 2666) //2666
                }, 2666)//2666
              }, 2444) //2444
            }, 111)
          }, startScreenFrameRate + 22)
        }, startScreenFrameRate)
      }, startScreenFrameRate)
    }, startScreenFrameRate)
  }, startScreenFrameRate)
}

function flashie() {
  if (!startingGame) {
    document.querySelector('#intro').style.color = 'rgb(57, 255, 20)'
    document.querySelector('#intro').style.textShadow = `${glitchFX.Y}px ${glitchFX.Y}px red`
    document.querySelector('#intro').style.textShadow = `-${glitchFX.Y}px -${glitchFX.Y}px blue`
    setTimeout(() => {
      document.querySelector('#intro').style.color = 'rgb(255, 240, 31)'
      document.querySelector('#intro').style.textShadow = `${glitchFX.Y}px ${glitchFX.Y}px red`
      setTimeout(() => {
        document.querySelector('#intro').style.color = 'rgb(247, 33, 25)'
        document.querySelector('#intro').style.textShadow = `${glitchFX.Y}px ${glitchFX.Y}px red`
        setTimeout(() => {
          document.querySelector('#intro').style.textShadow = `${glitchFX.Y}px ${glitchFX.Y}px red`
          flashie()
        }, startScreenFrameRate * 2);
      }, startScreenFrameRate * 2);
    }, startScreenFrameRate * 2);
  }
}

function pressEnterToGetDoertieSeq() {
  setTimeout(() => {
    track.play()
    setTimeout(() => {
      startScreen()              
    }, 2222) //2222
  }, 1111)
}

function clearStartscreen() {
  waveGround()
  track.drumline.volume = 0.7
  doertieStartscreenImg = false
  document.querySelector('#intro').style.display = 'none'
  document.querySelector('#pressStart').style.display = 'none'
  document.querySelector('#highScore').style.display = 'none'
  setTimeout(() => {
    startingGame = true
    background.createStars()
  }, 1111)
}

function frameSeq() {
  frame++
  if (frame > 1000*60) frame = 0
}

function waveGround() {
  track.thunder.play()
  setTimeout(() => {
    glitchFX.tSpeed = 1.5
    glitchFX.quantity = 2
  }, 111);
}

function waveTransp() {
  if (score > 1111 && score < 2222) glitchFX.alpha = 0.9
  else if (score > 2222 && score < 3333) glitchFX.alpha = 0.8
  else if (score > 3333 && score < 4444) glitchFX.alpha = 0.7
  else if (score > 4444 && score < 5555) glitchFX.alpha = 0.6
  else if (score > 5555 && score < 6666) glitchFX.alpha = 0.5
  else if (score > 6666 && score < 7777) glitchFX.alpha = 0.4
  else if (score > 7777 && score < 8888) glitchFX.alpha = 0.3
  else if (score > 8888 && score < 9999) glitchFX.alpha = 0.2
  else if (score > 9999 && score < 11111) glitchFX.alpha = 0.15
  else if (score > 11111) glitchFX.alpha = 0.1
}

function startingWaveMovement() {
  if (glitchFX.wavePosY < player.posY + player.height/2) {
    glitchFX.wavePosY ++
    glitchFX.wavePosX += 2.7
    glitchFX.radius += 0.35
  }
  else if (glitchFX.wavePosY < canvas.height - 11) {
    glitchFX.wavePosY +=0.2
    glitchFX.wavePosX -= 1
    if (glitchFX.radius >= 3) glitchFX.radius -= 0.48
    if (glitchFX.wavePosX < canvas.width/2 - player.width/2 -11) showPlayer = true
  }
  else if (glitchFX.wavePosX > 50) glitchFX.wavePosX -= 1
}

function waveValue() {
  let waveValue = glitchFX.Y
  if (waveValue < 0) waveValue = -waveValue
  if (waveValue < 4) waveValue = 4
  doertieScoreUpdate = waveValue
  mainShootColor = 255 - waveValue*2
  if (mainShootColor < 0) mainShootColor = 0
  glitchFXmainshoot = glitchFX.Y
  if (glitchFXmainshoot < 0) glitchFXmainshoot = -glitchFXmainshoot
  waveValue *= 11
  player.mainShootSpeedUpdate = player.mainShootSpeed - waveValue
  if (player.mainShootSpeedUpdate < 111) player.mainShootSpeedUpdate = 111
  if (player.mainShootSpeedUpdate < 222) glitchFXfallingTime += 0.01
  if (enemyBox.enemies.length === 0) glitchFXfallingTime = 0.9
}

function starBackground() {
  stars.forEach((star) => {
    star.draw()
  })
  stars = stars.filter((star1) => !star1.del)
  if (!background.createStarsConfirm && stars.length < background.numberOfStars) {
    stars.push(new Star(Math.floor(Math.random() * canvas.width), 0))
  }
}

function enemyShootSeq() {
  if (enemyBox.enemies.length > 0 && frame % doertieShootSpeed === 0) {
    if (doertieShootRelease && score < scoreForEndBoss) {
      enemyBox.enemies[Math.floor(Math.random()*enemyBox.enemies.length)].enemyShoot()
      doertieShootRelease = false
      setTimeout(() => {
        doertieShootRelease = true
      }, doertieShootSpeed);
    }
  }
}

function drawEnemyShoots() {
  enemyShoots.forEach(enemyShootDraw => enemyShootDraw.draw())
  enemyShoots = enemyShoots.filter(enemyshoot => !enemyshoot.del)   
}

function fuckThePoliceSeq() {
  if (fuckThePoliceRelease) fuckThePolice.draw()
  if (fuckThePolice.posX > canvas.width) {
    fuckThePoliceRelease = false
    fuckThePolice.posX = 0
    fuckThePolice.posY = 111
    setTimeout(() => {
      fuckThePoliceRelease = true
    }, fuckThePoliceInterval)
  } 
}

function jointUpgradeSeq() {
  if (enemyBox.enemies.length > 0 && frame % jointItemRate === 0) {
    if (jointRelease && score < scoreForEndBoss) {
      enemyBox.enemies[Math.floor(Math.random()*enemyBox.enemies.length)].joint()
      jointRelease = false
      setTimeout(() => {
        jointRelease = true
      }, 100);
    }
  }
}

function drawJoints() {
  joints.forEach(jointDraw => jointDraw.draw())
  joints = joints.filter(joints => !joints.del)   
}

function jointTextSeq() { // player Mainshootupgrade++
  let frameSpeed = 33
  document.querySelector('#upgradeText').style.display = 'flex'
  document.querySelector('#upgradeText').style.fontSize = '11px'
  setTimeout(() => {
    document.querySelector('#upgradeText').style.fontSize = '18px'
    setTimeout(() => {
      document.querySelector('#upgradeText').style.fontSize = '26px'
      setTimeout(() => {
        document.querySelector('#upgradeText').style.fontSize = '34px'
        setTimeout(() => {
          document.querySelector('#upgradeText').style.fontSize = '42px'
          setTimeout(() => {
            document.querySelector('#upgradeText').style.fontSize = '50px'
            setTimeout(() => {
              document.querySelector('#upgradeText').style.display = 'none'
              player.mainShootUgrade++
            }, frameSpeed*22);
          }, frameSpeed);
        }, frameSpeed);
      }, frameSpeed);
    }, frameSpeed);
  }, frameSpeed);
}

function scoreGlitchSeq() {
  if (scoreGlitch) {
    let scoreFX = glitchFX.Y/5
    if (scoreFX < 0) scoreFX = -scoreFX
    let scoreFY = scoreFX/5
    document.querySelector('#score').style.textShadow = `${scoreFX}px ${scoreFY}px rgb(57, 255, 20)`
  } 
  else document.querySelector('#score').style.textShadow = '0px 0px 5px rgb(0, 220, 254, 0.7)'
}

function bossTextSeq() {
  if (bossText < doertieText.length) {
    document.getElementById('bossTextSeq').innerHTML += doertieText.charAt(bossText)
    bossText++
    setTimeout(bossTextSeq, 111)
  }
}

function lvlUpValue() {
  lvl++
  boss.startingseQ = true
  boss.posX = canvas.width/2 - boss.width/2
  boss.posY = -boss.height
  boss.vc = 1
  boss.mainShoots = []
  boss.doerties = []
  bossText = 0, doertieText
  doertieText = 'I will distroy you! You little stinky sock!!!'
  document.querySelector('#bossTextSeq').innerHTML = ''
  document.querySelector('#bossTextSeq').style.display = 'flex'
  document.querySelector('#lvlDisplay').innerHTML = `lvl ${lvl}`
  setTimeout(() => {
    document.querySelector('#lvlpp').style.display = 'flex'
    document.querySelector('#lvlpp').style.fontSize = '25px'
    setTimeout(() => {
      document.querySelector('#lvlpp').style.fontSize = '51px'
      setTimeout(() => {
        document.querySelector('#lvlpp').style.fontSize = '77px'
        setTimeout(() => {
          document.querySelector('#lvlpp').style.display = 'none'
          joints.push(new Joint(canvas.width/2, canvas.height/3)) // JOINT
          againstTHEboss *= factorAgainstTHEboss
          scoreForEndBoss = scoreForEndBoss*2.6
          boss.HPheight = 111 -1-1
          boss.HPBGheight = 111
          if (enemyBox.vcX < 0) enemyBox.vcX--
          if (enemyBox.vcX > 0) enemyBox.vcX++
          enemyShoot.vcY++
        }, 1111)
      }, 111)
    }, 111)
  }, 111)
}

function gameOverSeq() {
  setTimeout(() => {
    document.querySelector('#gameOver').style.display = 'flex'
    setTimeout(() => {
      let highestScore
      if (highestScore === undefined) highestScore = 0
      if (score >= localStorage.getItem('highestScore')) { // score >= localStorage...
        document.querySelector('.newHighScoreContainer').style.display = 'flex'
        saveHighscore()
      }
      if (score < localStorage.getItem('highestScore')) {
        document.querySelector('#pressStart').style.top = '400px'
        document.querySelector('#pressStart').style.display = 'flex'
      }
      addEventListener('keydown', e => {
        if (e.key === 'Enter' && highScoreConfirmed) window.location.reload()
      }) 
    }, 1111);
  }, 111)
}

function saveHighscore() {
  highScoreConfirmed = false
  const storageInput = document.querySelector('.storage')
  const name = document.querySelector('.name')
  const button = document.querySelector('.button')
  let highestScore = score

  storageInput.addEventListener('input', letter => {
    name.textContent = letter.target.value
  })

  const saveToLocalStorage = () => {
    localStorage.setItem('highestScore', highestScore)
    localStorage.setItem('HighScore', `${name.textContent} High Score: ${highestScore}`)
    document.querySelector('#pressStart').style.top = '400px'
    document.querySelector('#pressStart').style.display = 'flex'
    highScoreConfirmed = true
  }

  button.addEventListener('click', saveToLocalStorage)
}

///////////////////////////////////////////////// CLASSES
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
    this.alpha = 1
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
      lastX = x
      lastY = y
    }

    // draw waveline to the right
    this.wave.unshift(y)
    ctx.beginPath()
    ctx.strokeStyle = `rgba(57, 255, 20, ${this.alpha})`
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
    // [Y] get the [Y]
    this.X = lastX
    this.Y = lastY
    // [Y] get the [Y]
    // ctx.fillStyle = 'rgb(57, 255, 20)'
    // ctx.font = '17px Verdana'
    // ctx.fillText('Y: ' + this.Y, 450, 380)

    if (this.wave.length > this.waveLenght) this.wave.splice(-1, 1)
  }

  draw() {
    this.update()
  }
}

class DoertieTrack {
  constructor() {
    // Drum & Bass
    this.bassline = new Audio('./audio/bass.wav')
    this.bassline.volume = 0.9
    this.bassline.loop = true
    this.drumline = new Audio('./audio/drum.wav')
    this.drumline.volume = 0
    this.drumline.loop = true
    // FX
    this.thunder = new Audio('./audio/thunder.wav')
    this.thunder.volume = 0.7
    this.Qshoot = new Audio('./audio/Qshoot.wav')
    this.Qshoot.volume = 0.5
    this.kick = new Audio('./audio/kick.wav')
    this.kick.volume = 0.5
  }

  play() {
    this.bassline.play()
    this.drumline.play()
  }

  pause() {
    this.bassline.pause()
    this.drumline.pause()
  }
}

class Star {
  constructor(posX, posY) {
    this.posX = posX
    this.posY = posY
    this.vc = 0.5
    this.del = false
  }

  update() {
    this.posY += this.vc
    if (this.posY > canvas.height) {
      this.del = true
    } 
  }

  draw() {
    this.update()
    ctx.strokeStyle = 'white'
    ctx.beginPath()
    ctx.arc(this.posX, this.posY, 1, 0, Math.PI * 2)
    ctx.stroke()
  }
}

class StarBackground {
  constructor() {
    this.createStarsConfirm = true
    this.numberOfStars = 111/3
  }

  createStars() {
    if (this.createStarsConfirm) {
      for (let i = 0; i < this.numberOfStars; i++) {
        stars.push(new Star(
          Math.floor(Math.random() * canvas.width),
          Math.floor(Math.random() * canvas.height)
        ))
      }
      this.createStarsConfirm = false
    }
     
  }
}

class Player {
  constructor() {
    const img = new Image()
    img.src = './img/Querbert.png'
    img.onload = () => {
      track.thunder.play()
      this.img = img
      this.scale = 1.2
      this.width = img.width * this.scale
      this.height = img.height * this.scale
      this.posX = canvas.width/2 - this.width/2
      this.posY = canvas.height - this.height - 15
      this.vc = 0
      this.vcMax = 7
      this.g = 0.1
    }
    this.mainShootRelease = true
    this.mainShootSpeed = 444
    // this.mainShootSpeedUpdate = this.mainShootSpeed //freak out
    this.mainShoots = []
    this.mainShootUgrade = 1
    this.mainShootAng = .3
  }

  update() {
    if (playerHandling) {
      // player movement
      if (keys.arrowLeft &&
        !keys.arrowRight &&
        this.posX > 32) this.vc = -this.vcMax
      else if (keys.arrowRight &&
            !keys.arrowLeft &&
            this.posX + this.width < canvas.width - 5) this.vc = this.vcMax
      else this.vc = 0
      this.posX += this.vc
      // mainshoot handling
      if (this.mainShootRelease && keys.mainShoot) {
      this.mainShoot()
      this.mainShootRelease = false
      setTimeout(() => {
        this.mainShootRelease = true
      }, this.mainShootSpeed);                    // change this.mainShootSpeedUpdate to freak out
      }
      this.mainShoots.forEach(mainShoot => mainShoot.draw(mainShootColor))
      this.mainShoots = this.mainShoots.filter(mainShoot => !mainShoot.del)
    }
  }

  draw() {
    if (this.img) {
      this.update()
      ctx.drawImage(this.img, this.posX, this.posY, this.width, this.height)
    }
  }

  mainShoot() {
    if (player.mainShootUgrade === 1) {
      this.mainShoots.push(new Mainshoot(this.posX + this.width/2, this.posY, 0))
      track.Qshoot.play()
    }
    if (player.mainShootUgrade === 2) {
      this.mainShoots.push(new Mainshoot(this.posX + this.width/4, this.posY, 0))
      this.mainShoots.push(new Mainshoot(this.posX + this.width/2 + this.width/4, this.posY, 0))
      track.Qshoot.play()
    }
    if (player.mainShootUgrade > 3) player.mainShootUgrade = 3
    if (player.mainShootUgrade === 3) {
      this.mainShoots.push(new Mainshoot(this.posX + this.width/4, this.posY, -this.mainShootAng))
      this.mainShoots.push(new Mainshoot(this.posX + this.width/2, this.posY, 0))
      this.mainShoots.push(new Mainshoot(this.posX + this.width/2 + this.width/4, this.posY, +this.mainShootAng))
      track.Qshoot.play()
    }
  }
}

class Mainshoot {
  constructor(posX, posY, vcX) {
    this.posX = posX
    this.posY = posY
    this.width = 4
    this.height = 11
    this.vc = 7
    this.vcX = vcX
    this.del = false
  }

  update() {
    this.posY += -this.vc
    this.posX += this.vcX
    if (this.posY < canvas.height * 0.03) this.del = true
    if (player.mainShootUgrade === 3) this.vcX += this.vcX/44
  }

  draw(mainShootColor) {
    this.update()
    ctx.fillStyle = `rgb(111, 1, 111)`
    ctx.fillRect(this.posX+glitchFXmainshoot*0.05, this.posY+glitchFXmainshoot*0.05, this.width, this.height+5)
    ctx.fillStyle = `rgb(${mainShootColor}, 255, 0)`
    ctx.fillRect(this.posX, this.posY, this.width, this.height)
  }
}

class Enemy {
  constructor(posX, posY) {
    this.x = posX
    this.y = posY
    const img = new Image()
    img.src = './img/doertie.png'
    img.onload = () => {
      this.img = img
      this.posX = this.x
      this.posY = this.y
      this.scale = 1
      this.width = img.width * this.scale
      this.height = img.height * this.scale
    }
    this.del = false
    this.vc = 0
    this.HP = 33
  }

  draw(vcx, vcy) {
    if (this.img) {
      if (this.HP < 33) this.healthBar()
      ctx.drawImage(this.img, 
        this.posX, this.posY, this.width, this.height
      )
      this.posX += vcx
      this.posY += vcy
      if (this.posY + this.height >= canvas.height) {
        setTimeout(() => {
          gameOver = true  
        }, 11)
      } 
    }
  }

  healthBar() {
    ctx.fillStyle = 'rgb(57, 255, 20)'
    ctx.fillRect(this.posX -5, this.posY, 2, this.HP)
  }

  enemyShoot() {
    track.thunder.play()
    enemyShoots.push(new EnemyShoot(this.posX + this.width/2, this.posY + this.height))
  }

  joint() {
    track.thunder.play()
    joints.push(new Joint(this.posX + this.width/2, this.posY + this.height))
  }
}

class EnemyExplosion {
  constructor(posX, posY, for1score) {
    this.posX = posX
    this.posY = posY
    this.for1score = for1score
    this.vc = 0
    const img = new Image()
    img.src = './img/doertie.png'
    img.onload = () => {
      this.img = img
      this.scale = 1
      this.width = img.width * this.scale
      this.height = img.height * this.scale
    } 
    this.del = false
    this.colorChangeR = 0
    this.colorChangeG = 222
    this.colorChangeB = 0
  }

  draw() {
    if (this.img) {
      if (this.posY > canvas.height*explosionDel) this.del = true
      this.vc += 0.5
      this.colorChangeR += 0.5
      if (this.colorChangeR > 111) this.colorChangeR = 111
      this.colorChangeG -= 2
      if (this.colorChangeG < 1) this.colorChangeG = 1
      this.colorChangeB += 0.5
      if (this.colorChangeB > 111) this.colorChangeB = 111
      ctx.fillStyle = `rgb(${this.colorChangeR}, ${this.colorChangeG}, ${this.colorChangeB})`
      ctx.font = '17px serif'
      ctx.fillText(this.for1score, this.posX+this.vc, this.posY-this.vc*2)
      this.posY = this.posY * 1.009
      this.cutX = this.width/4
      this.cutY = this.height/4
      ///////////////////////////////////row 1
      ctx.drawImage(this.img, 
        0, 0, this.cutX, this.cutY, 
        this.posX -this.vc, this.posY -this.vc, this.cutX, this.cutY
      )
      ctx.drawImage(this.img, 
        this.cutX, 0, this.cutX, this.cutY, 
        this.posX+this.cutX -this.vc/2, this.posY -this.vc, this.cutX, this.cutY
      )
      ctx.drawImage(this.img, 
        this.cutX*2, 0, this.cutX, this.cutY, 
        this.posX+this.cutX*2 +this.vc/2, this.posY -this.vc, this.cutX, this.cutY
      )
      ctx.drawImage(this.img, 
        this.cutX*3, 0, this.cutX, this.cutY, 
        this.posX+this.cutX*3 +this.vc, this.posY -this.vc, this.cutX, this.cutY
      )
      ///////////////////////////////////row 2
      ctx.drawImage(this.img, 
        0, this.cutY, this.cutX, this.cutY, 
        this.posX -this.vc, this.posY+this.cutY -this.vc/2, this.cutX, this.cutY
      )
      ctx.drawImage(this.img, 
        this.cutX, this.cutY, this.cutX, this.cutY, 
        this.posX+this.cutX -this.vc/3, this.posY+this.cutY -this.vc/3, this.cutX, this.cutY
      )
      ctx.drawImage(this.img, 
        this.cutX*2, this.cutY, this.cutX, this.cutY, 
        this.posX+this.cutX*2 +this.vc/3, this.posY+this.cutY -this.vc/3, this.cutX, this.cutY
      )
      ctx.drawImage(this.img, 
        this.cutX*3, this.cutY, this.cutX, this.cutY, 
        this.posX+this.cutX*3 +this.vc, this.posY+this.cutY -this.vc/2, this.cutX, this.cutY
      )
      ///////////////////////////////////row 3
      ctx.drawImage(this.img, 
        0, this.cutY*2, this.cutX, this.cutY, 
        this.posX -this.vc, this.posY+this.cutY*2 +this.vc/2, this.cutX, this.cutY
      )
      ctx.drawImage(this.img, 
        this.cutX, this.cutY*2, this.cutX, this.cutY, 
        this.posX+this.cutX -this.vc/3, this.posY+this.cutY*2 +this.vc/3, this.cutX, this.cutY
      )
      ctx.drawImage(this.img, 
        this.cutX*2, this.cutY*2, this.cutX, this.cutY, 
        this.posX+this.cutX*2 +this.vc/3, this.posY+this.cutY*2 +this.vc/3, this.cutX, this.cutY
      )
      ctx.drawImage(this.img, 
        this.cutX*3, this.cutY*2, this.cutX, this.cutY, 
        this.posX+this.cutX*3 +this.vc, this.posY+this.cutY*2 +this.vc/2, this.cutX, this.cutY
      )
      ///////////////////////////////////row 4
      ctx.drawImage(this.img, 
        0, this.cutY*3, this.cutX, this.cutY, 
        this.posX -this.vc, this.posY+this.cutY*3 +this.vc, this.cutX, this.cutY
      )
      ctx.drawImage(this.img, 
        this.cutX, this.cutY*3, this.cutX, this.cutY, 
        this.posX+this.cutX -this.vc/2, this.posY+this.cutY*3 +this.vc, this.cutX, this.cutY
      )
      ctx.drawImage(this.img, 
        this.cutX*2, this.cutY*3, this.cutX, this.cutY, 
        this.posX+this.cutX*2 +this.vc/2, this.posY+this.cutY*3 +this.vc, this.cutX, this.cutY
      )
      ctx.drawImage(this.img, 
        this.cutX*3, this.cutY*3, this.cutX, this.cutY, 
        this.posX+this.cutX*3 +this.vc, this.posY+this.cutY*3 +this.vc, this.cutX, this.cutY
      )
    }
  }
}

class EnemyShoot {
  constructor(posX, posY) {
    this.posX = posX
    this.posY = posY
    this.width = 4
    this.height = 11
    this.vcY = 3
    this.del = false
  }

  update() {
    this.posY += this.vcY
    if (this.posY > canvas.height * 0.99) this.del = true
  }

  draw() {
    this.update()
    ctx.fillStyle = 'red'
    ctx.fillRect(this.posX, this.posY, this.width, this.height)
  }
}

class Joint {
  constructor(posX, posY) {
    this.posX = posX
    this.posY = posY
    this.vc = 1
    const img = new Image()
    img.src = './img/images.png'
    img.onload = () => {
      this.img = img
      this.scale = 1
      this.imgSize = 33 * this.scale
    }
    this.del = false
  }

  update() {
    this.posY += this.vc
    if (this.posY > canvas.height * 0.9) this.del = true
  }

  draw() {
    if (this.img) {
      this.update()
      ctx.drawImage(this.img, 
        140, 250, 32, 32,
        this.posX, this.posY, this.imgSize, this.imgSize,
      )
    }
  }
}

class EnemyBox {
  constructor() {
    this.vcX = 1
    this.vcY = 0
    this.enemies = []
    this.columns = 7
    this.rows = 3
    this.distance = 42
    this.width = this.columns * this.distance
  }

  createEnemies(posX, posY) {
    this.posX = posX
    this.posY = posY
    for (let x=0; x<this.columns; x++) {
      for (let y=0; y<this.rows; y++) {
        this.enemies.push(new Enemy(
          this.posX + x * this.distance,
          this.posY + y * this.distance
        ))
      }
    }
  }

  update() {
    this.vcY = 0
    if (this.posX + this.width > canvas.width ||
      this.posX < 11) {
        this.vcY = 22
        this.vcX = -this.vcX
      }
    this.posY += this.vcY 
    this.posX += this.vcX
  }

  draw() {
    this.update()
  }
}

class Boss{
  constructor() {
    const img = new Image()
    img.src = './img/doertie.png'
    img.onload = () => {
      this.img = img
      this.scale = 3
      this.width = img.width * this.scale
      this.height = img.height * this.scale
      this.posX = canvas.width/2 - this.width/2
      this.posY = -this.height
      this.vc = 1
      this.startingseQ = true
      this.HPBGwidth = 8
      this.HPBGheight = 111
      this.HPwidth = 6
      this.HPheight = 109
      this.mainShoots = []
      this.mainShootRelease = true
      this.mainShootFreq = 222
      this.doerties = []
      this.doertieRelease = true
      this.doertieFreq = 3333
    }
  }

  startingSeq() {
    enemyBox.enemies = []
    player.mainShoots = []
    enemyShoots = []
    playerHandling = false
    this.posY += this.vc
    if (this.posY > 55) this.posY = 55
    if (this.posY === 55 && bossText < 1) bossTextSeq()
    if (bossText === doertieText.length) {
      setTimeout(() => {
        playerHandling = true
        document.querySelector('#bossTextSeq').style.display = 'none'
        this.startingseQ = false
      }, 1111);
    } 
  }

  startingAttack() {
    // movement
    if (
      this.posX + this.width/2 > canvas.width/2 + 111 ||
      this.posX + this.width/2 < canvas.width/2 - 111
    ) this.vc = -this.vc
    this.posX += this.vc
    // healthbar
    ctx.fillStyle = 'rgb(111, 1, 111)'
    ctx.fillRect(this.posX-this.HPBGwidth-11, this.posY, this.HPBGwidth, this.HPBGheight)
    ctx.fillStyle = 'rgb(57, 200, 20)'
    ctx.fillRect(this.posX-this.HPBGwidth-10, this.posY +1, this.HPwidth, this.HPheight)
    // mainshoot
    if (
      this.mainShootRelease &&
      player.posX < this.posX + this.width &&
      player.posX + player.width > this.posX
    ) { // BossMainShoot
      this.mainShoots.push(new BossMainShoot(
        this.posX + this.width/2 - 24,
        this.posY + this.height
      ))
      this.mainShoots.push(new BossMainShoot(
        this.posX + this.width/2 + 20,
        this.posY + this.height
      ))
      this.mainShoots.push(new BossMainShoot(
        this.posX + this.width/2 + -2,
        this.posY + this.height
      ))
      this.mainShootRelease = false
      setTimeout(() => {
        this.mainShootRelease = true
      }, this.mainShootFreq)
    }
    if (boss.HPheight === 0) { // doertieShoot
      if (
        this.doertieRelease
      ) {
        this.doerties.push(new Doertie(this.posX, this.posY))
        this.doertieRelease = false
        setTimeout(() => {
          this.doertieRelease = true
        }, this.doertieFreq);
      }
    }
  }

  draw() {
    if (this.img) {
      if (this.startingseQ) this.startingSeq()
      if (!this.startingseQ) this.startingAttack()
      ctx.drawImage(this.img, this.posX, this.posY, this.width, this.height)
    }
  }
}

class Doertie {
  constructor(posX, posY) {
    this.posX = posX
    this.posY = posY
    this.vc = 4
    this.vcX = 0
    const img = new Image()
    img.src = './img/doertie.png'
    img.onload = () => {
      this.img = img
      this.scale = 1
      this.width = img.width * this.scale
      this.height = img.height * this.scale
    }
    this.del = false
  }

  update() {
    if (this.posY < 0) this.vc = -this.vc
    if (player.posX > this.posX) this.vcX = 1
    else if (player.posX < this.posX) this.vcX = -1
    this.posX += this.vcX
    this.posY += -this.vc
    if (this.posY > canvas.height * 0.9) this.del = true
  }

  draw() {
    if (this.img) {
      this.update()
      ctx.drawImage(this.img, this.posX, this.posY, this.width, this.height)
    }
  }
}

class BossMainShoot {
  constructor(posX, posY) {
    this.posX = posX
    this.posY = posY
    this.width = 4
    this.height = 11
    this.vc = 3
    this.del = false
  }

  update() {
    this.posY += this.vc
    if (this.posY > canvas.height * 0.95) this.del = true
  }

  draw() {
    this.update()
    ctx.fillStyle = 'red'
    ctx.fillRect(this.posX, this.posY, this.width, this.height)
  }
}

class FuckThe_polIce {
  constructor() {
    const img = new Image()
    img.src = './img/img.png'
    img.onload = () => {
      this.img = img
      this.scale = 0.8
      this.posX = 0
      this.posY = 111
      this.width = 111*this.scale
      this.height = 55.7*this.scale
      this.vc = 3
    }
  }

  update() {
    this.posX += this.vc
    this.posY += this.vc/7
  }

  draw() {
    if (this.img) {
      this.update()
      ctx.drawImage(this.img,
        290, 360, 100, 55.7,
        this.posX, this.posY, this.width, this.height
      )
    }
  }
}

class Explosion {
  constructor(posX, posY) {
    this.posX = posX
    this.posY = posY
    const img = new Image()
    img.src = './img/images.png'
    img.onload = () => {
      this.img = img
      this.width = 69
      this.height = 120
      this.frame = 0
      this.spriteX = 100
      this.spriteY = 360
      this.animationSpeed = 11
    }
  }

  update() {
    if (this.frame < this.animationSpeed*4-1) this.frame++
    if (this.frame % this.animationSpeed === 0) {
      this.spriteX += 100
    }
  }

  draw() {
    if (this.img) {
      this.update()
      ctx.drawImage(this.img,
        this.spriteX, this.spriteY, this.width, this.height,
        this.posX, this.posY, this.width, this.height  
      )
    }
  }
} 

///////////////////////////////////////////////// STARTING VALUES
const glitchFX = new Wave(1.7, 0.08)
const doertie = new Image()
doertie.src = './img/doertie.png'
const track = new DoertieTrack()
const player = new Player()
const enemy = new Enemy()
const enemyShoot = new EnemyShoot()
const enemyBox = new EnemyBox()
const enemyExplo = new EnemyExplosion()
const boss = new Boss()
const doertieRocket = new Doertie()
const joint = new Joint()
const star = new Star()
const background = new StarBackground()
const fuckThePolice = new FuckThe_polIce()
const atomExplosion = new Explosion()

let atomExplosions = []
let stars = []
let startScreenFrameRate = 42
let showPlayer = false
let mainShootColor = 255
let waveDraw = true
let scoreGlitch = false
let scoreFX = 0
let scoreFY = 0
let glitchFXmainshoot = 0
let glitchFXfallingTime = 0.9
let score = 0
let doertieScoreUpdate = 0
let doertieStartscreenImg = false
let pressEnterToGetDoertie = false
let startingGame = false
let starton51 = 51
let explosionDel = 0.8
let doertieExplosionTime = 3333
let doertieShootRelease = true
let for1doertie = 111
let enemyExplosion = []
let enemyShoots = []
let doertieShootSpeed = 111
let scoreForEndBoss = 1000
let playerHandling = true
let frame = 0
let gameOver = false
let againstTHEboss = 33
let factorAgainstTHEboss = .5
let bossText = 0, doertieText
doertieText = 'I will distroy you! You little stinky sock!!!'
let HighScore = localStorage.getItem("HighScore")
document.querySelector("#highScore").innerHTML = HighScore
let highScoreConfirmed = true
let jointRelease = true
let jointItemRate = 1111
let joints = []
let fuckThePoliceRelease = true
let fuckThePoliceInterval = 11111
let sGetAndFuckThePoliceSpeed = 111
let sGetAndFuckThePoliceToTheHellSpeed = 11
let lvl = 1

///////////////////////////////////////////////// FOR CODING
// showPlayer = true       // flase
// starton51 = 515        // 51          
// explosionDel = 0.8    // 0.8
// ssDel = 111          //
///////////////////////////////////////////////// LET THE SHOW BEGINN

pressEnterToGetDoertieSeq()
function animate() {
  frameSeq()
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = '#000'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  starBackground()
  if (lvl > 0 && score > 11111+1111) fuckThePoliceSeq()
  atomExplosion.draw()
  if (showPlayer) player.draw()
  if (waveDraw) glitchFX.draw()
  if (doertieStartscreenImg) ctx.drawImage(doertie, canvas.width/2 - 80, 50, 111, 111)
  if (pressEnterToGetDoertie && keys.enter && glitchFX.tSpeed < 0.1) clearStartscreen()
  if (glitchFX.radius > 3 && glitchFX.wavePosX < 60) glitchFX.radius -= glitchFXfallingTime
  scoreGlitchSeq()
  waveTransp()
  waveValue()
  /////////////////////////////////////////////////////////////////////
  //                                                                 //
  if (startingGame) {
    enemyExplosion.forEach(explosion => explosion.draw())
    enemyExplosion = enemyExplosion.filter(explo => !explo.del)
    atomExplosions.forEach(atomExplosion => atomExplosion.draw())
    player.mainShoots.forEach((mainShoot, l) => {                    // FUCK THE POLICE
      if (
        mainShoot.posY <= fuckThePolice.posY + fuckThePolice.height &&
        mainShoot.posX <= fuckThePolice.posX + fuckThePolice.width &&
        mainShoot.posX + mainShoot.width >= fuckThePolice.posX &&
        mainShoot.posY + mainShoot.height >= fuckThePolice.posY
      ) {
        player.mainShoots.splice(l, 1)
        fuckThePoliceRelease = false
        atomExplosions.push(new Explosion(fuckThePolice.posX, fuckThePolice.posY -80))
        setTimeout(() => {
          atomExplosions = []
          if (player.mainShootSpeed > 111) player.mainShootSpeed -= sGetAndFuckThePoliceSpeed         
          if (player.mainShootSpeed <= 111) {
            player.mainShootSpeed -= sGetAndFuckThePoliceToTheHellSpeed  // WTF
            if (player.mainShootSpeed < 1) player.mainShootSpeed = 1
            jointTextSeq()
          } 
        }, 500)
        fuckThePolice.posX = -222
        fuckThePolice.posY = 111
        setTimeout(() => {
          fuckThePoliceRelease = true
        }, fuckThePoliceInterval)
      }
    })
    startingWaveMovement()
    if (glitchFX.wavePosX < starton51) {
      document.querySelector('#lvlDisplay').style.display = 'flex'
      document.querySelector('#score').innerHTML = 'score: ' + score
      if (
        enemyBox.enemies.length === 0 && 
        frame % 111 === 0 && score < scoreForEndBoss
      ) 
      enemyBox.createEnemies(22, 9)
      // JOINT      
      // jointUpgradeSeq()
      drawJoints()
      joints.forEach((joint, k) => {
        if (joint.posY + joint.imgSize >= player.posY &&
            joint.posX + joint.imgSize >= player.posX &&
            joint.posX <= player.posX + player.width &&
            joint.posY <= player.posY + player.height
          ) {
          setTimeout(() => {
            joints.splice(k, 1)
            jointTextSeq()
          }, 0)
        }
      })
      // Enemies
      enemyBox.draw()
      enemyShootSeq()
      drawEnemyShoots()
      enemyBox.enemies.forEach((enemy, i) => {
        enemy.draw(vcX = enemyBox.vcX, vcY = enemyBox.vcY)
        enemyShoots.forEach(enemyShoot => {
          if (
            enemyShoot.posY + enemyShoot.height >= player.posY &&
            enemyShoot.posX + enemyShoot.width >= player.posX &&
            enemyShoot.posX <= player.posX + player.width &&
            enemyShoot.posY <= player.posY + player.height) {
            gameOver = true
          }
        })
        // Mainshoots
        player.mainShoots.forEach((mainShoot, j) => {
          
          if (!enemy.del &&
              mainShoot.posY <= enemy.posY + enemy.height &&
              mainShoot.posX <= enemy.posX + enemy.width &&
              mainShoot.posX + mainShoot.width >= enemy.posX &&
              mainShoot.posY + mainShoot.height >= enemy.posY
            ) {
            setTimeout(() => {
              const enemyFound = enemyBox.enemies.find((thisEnemy) => {return thisEnemy === enemy})
              const mainShootFound = player.mainShoots.find((thisShoot) => {return thisShoot === mainShoot})
              if (enemyFound && mainShootFound) {
                setTimeout(() => {
                  player.mainShoots.splice(j, 1)
                  enemy.HP -= againstTHEboss
                  if (enemy.HP <= 0) {
                    enemyBox.enemies.splice(i, 1) // enemy HP
                    for1score = Math.floor(for1doertie + doertieScoreUpdate) -4
                    enemyExplosion.push(new EnemyExplosion(enemy.posX, enemy.posY, for1score))
                    score += for1score
                    track.kick.play()
                    glitchFX.radius += 17
                    scoreGlitch = true
                    setTimeout(() => {
                      scoreGlitch = false
                    }, 111)
                  } 
                }, 0)
              }}, 0)
            glitchFXfallingTime = 0.5
          }
        })
      })
    }
  }                                                                  //
  //               ----->   THE GAME   <-----                        //
  if (score > scoreForEndBoss) {
    if (boss.HPBGheight > 0) boss.draw()
    boss.doerties.forEach((doertie) => {
      doertie.draw()
      if (
        doertie.posY + doertie.height >= player.posY &&
        doertie.posX + doertie.width >= player.posX &&
        doertie.posX <= player.posX + player.width &&
        doertie.posY <= player.posY + player.height
      ) {
        gameOver = true
      }
    })
    boss.doerties = boss.doerties.filter(thisDoertie => !thisDoertie.del)
    boss.mainShoots.forEach((bossMS) => {
      bossMS.draw()
      if (bossMS.posY + bossMS.height >= player.posY &&
          bossMS.posX + bossMS.width >= player.posX &&
          bossMS.posX <= player.posX + player.width &&
          bossMS.posY <= player.posY + player.height) {
            gameOver = true
          }
    })
    boss.mainShoots = boss.mainShoots.filter(thatMS => !thatMS.del)
    player.mainShoots.forEach((mainShoot, i) => {
      if (mainShoot.posY <= boss.posY + boss.height &&
          mainShoot.posX <= boss.posX + boss.width &&
          mainShoot.posX + mainShoot.width >= boss.posX &&
          mainShoot.posY + mainShoot.height >= boss.posY
        ) {
        player.mainShoots.splice(i, 1)
        boss.HPheight -= againstTHEboss
        if (boss.HPheight < 0) {
          boss.HPheight = 0
          boss.vc = 2
          boss.HPBGheight -= againstTHEboss
          if (boss.HPBGheight < 0) lvlUpValue()
        }
      }
    })
  }                                                                  //
  /////////////////////////////////////////////////////////////////////
  if (gameOver) gameOverSeq()
  if (!gameOver) requestAnimationFrame(animate)
}

animate()