const scoreEl = document.querySelector('#scoreEl')
const canvas = document.getElementById('game')
const ctx = canvas.getContext('2d')
canvas.width = 1000
canvas.height = 500

class InputHandler {
  constructor() {
    this.releaseShoot = true
    // this.startGame = false

    addEventListener('keydown', e => {
      if (((e.key === 'ArrowRight' || 
              e.key === 'ArrowLeft') && 
            game.player.keys.indexOf(e.key) === -1)
          ) {
            game.player.keys.push(e.key)
          } else if ((e.key === ' ') && this.releaseShoot === true) {
            game.player.mainShoot()
            this.releaseShoot = false
            setTimeout(() => {
              this.releaseShoot = true
            }, 100);
          }
    })
    addEventListener('keyup', e => {
      if (game.player.keys.indexOf(e.key) > -1) {
        game.player.keys.splice(game.player.keys.indexOf(e.key), 1)
      }
    })
  }

}

class Player {
  constructor() {
    const img = new Image()
    img.src = './img/Querbert.png'
    img.onload = () => {
      this.img = img
      this.scale = 1.3
      this.width = img.width * this.scale
      this.height = img.height * this.scale
      this.pos = {
        x: 0 + canvas.width/2 - this.width/2,
        y: 0 + canvas.height - this.height - 5
      }
      this.vc = 0
      this.vcMax = 9
    }
    this.keys = []
    this.projectiles = []
  }

  update() {
    //player movement
    if ((this.keys.includes('ArrowRight')) && 
         (this.pos.x + this.width < canvas.width)) this.vc = this.vcMax
    else if ((this.keys.includes('ArrowLeft')) &&
              this.pos.x > 0) this.vc = -this.vcMax
    else this.vc = 0
    this.pos.x += this.vc
    //handle projectiles
    this.projectiles.forEach(projectil => projectil.draw())
    this.projectiles = this.projectiles.filter((projectile) => !projectile.del)
  }

  draw() {
    if (this.img) {
      this.update()
      ctx.drawImage(this.img, this.pos.x, this.pos.y, this.width, this.height)
    }
  }

  mainShoot() {
    this.projectiles.push(new Projectile(this.pos.x, this.pos.y))
    playerAudio.play()
  }
}

class Projectile {
  constructor(x, y) {
    this.width = 5
    this.height = 11
    this.pos = {
      x: x + game.player.width/2 - this.width/2,
      y: y + 11
    }
    this.vc = 15
    this.del = false
  }

  update() {
    this.pos.y += -this.vc
    if (this.pos.y < canvas.height * 0.01) this.del = true
  }

  draw() {
    this.update()
    ctx.fillStyle = 'yellow'
    ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height)
  }
}

class Enemy {
  constructor({pos}) {
    this.pos = {
      x: pos.x,
      y: pos.y
    }
    const img = new Image()
    img.src = './img/doertie.png'
    img.onload = () => {
      this.img = img
      this.scale = 1.3
      this.width = img.width * this.scale
      this.height = img.height * this.scale
      this.pos = {
        x: this.pos.x,
        y: this.pos.y
      }
    }
  }

  draw({vc}) {
    if (this.img) {
      this.pos.x += vc.x
      this.pos.y += vc.y
      ctx.drawImage(this.img, this.pos.x, this.pos.y, this.width, this.height)
    }
  }

  shoot() {
    if (this.img) {
      game.enemyProjectiles.push(new EnemyProjectile(
        this.pos.x + this.width/2, 
        this.pos.y + this.height/2
      ))
    } 
  }
}

class EnemyProjectile {
  constructor(x, y) {
    this.pos = {
      x: x,
      y: y 
    }
    this.width = 6
    this.height = 11            
    this.vc = 6
  }

  update() {
    this.pos.y += this.vc
    setTimeout(() => {
      this.pos.x += 2
      setTimeout(() => {
        this.pos.x += -4.4
        setTimeout(() => {
          this.pos.x += 4
          setTimeout(() => {
            this.pos.x += 3
            setTimeout(() => {
              this.pos.x += -5
            }, 22);
          }, 1000/17);
        }, 1000/13);
      }, 1000/13);
    }, 1000/13);
  }

  draw() {
    this.update()
    ctx.fillStyle = 'red'
    ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height)
  }
}

class Grid {
  constructor(addEnemyX, addEnemyY, addEnemyVC) {
    this.pos = {
      x: 0,
      y: 0
    }
    this.addEnemyVC = addEnemyVC
    this.vc = {
      x: 4 + this.addEnemyVC,
      y: 0
    }
    this.enemies = []
    this.addEnemyX = addEnemyX
    this.addEnemyY = addEnemyY
    const columns = 3 + this.addEnemyX
    const rows = 1 + this.addEnemyY
    this.width = columns * 32 * 1.5
    for (let i = 0; i < columns; i++) {
      for (let j = 0; j < rows; j++) {
        this.enemies.push(new Enemy({pos: {
          x: i * 32 * 1.5,
          y: j * 32 * 1.3
        }}))
      }
    }
  }

  update() {
    //Grid movement
    this.vc.y = 0
    if ((this.pos.x + this.width > canvas.width) ||
        (this.pos.x < 0)) {
      this.vc.x = -this.vc.x
      this.vc.y = 33
    }
    this.pos.x += this.vc.x
    this.pos.y += this.vc.y
  }

  draw() {
    this.update()
  }
}

let score = 0

class Game {
  constructor() {
    this.timer = 0
    this.timerLoopEnd = 60
    this.player = new Player()
    this.input = new InputHandler()
    this.addEnemyX = 0
    this.addEnemyY = 0
    this.addEnemyVC = 0
    this.grids = [new Grid(this.addEnemyX, this.addEnemyY, this.addEnemyVC)]
    this.enemyProjectiles = []
    this.frames = 0
    this.gameOver = false
    this.enemyShootInterval = 111
    this.killingEnemyScore = 111
  }

  update() {
    //handling enemies
    this.grids.forEach((grid, k) => {
      grid.draw()

      //enemie shoot
      if (this.frames % this.enemyShootInterval === 0 && grid.enemies.length > 0) {
        grid.enemies[Math.floor(Math.random() * grid.enemies.length)].shoot()
        enemyAudio.play()
      }
      this.enemyProjectiles.forEach(enemyProjectile => {
        enemyProjectile.draw()
        if ((enemyProjectile.pos.y + enemyProjectile.height > this.player.pos.y) &&
            (enemyProjectile.pos.x < this.player.pos.x + this.player.width) &&
            (enemyProjectile.pos.x + enemyProjectile.width > this.player.pos.x) &&
            (enemyProjectile.pos.y < this.player.pos.y + this.player.height)
          ) this.gameOver = true
      })
      
      //
      grid.enemies.forEach((enemy, i) => {
        enemy.draw({vc: grid.vc})
        if (enemy.pos.y + enemy.height >= canvas.height) this.gameOver = true
        if (score > 5555) {
          this.enemyShootInterval = 66
          if (score > 11111) {
            this.enemyShootInterval = 33
            if (score > 22222) {
              this.enemyShootInterval = 11
            }
          }
        }
        //query collisions between projectil and enemy
        this.player.projectiles.forEach((projectil, j) => {
          if (projectil.pos.y <= enemy.pos.y + enemy.height &&
              projectil.pos.x <= enemy.pos.x + enemy.width &&
              projectil.pos.x + projectil.width >= enemy.pos.x &&
              projectil.pos.y + projectil.width >= enemy.pos.y
            ) {
              const enemyFound = enemyF => enemyF === enemy
              const projectilFound = projectilF => projectilF === projectil
            if (enemyFound && projectilFound) {
              //score
              doertie.play()
              score += this.killingEnemyScore
              scoreEl.innerHTML = score
              setTimeout(() => {
                //remove enemy
                grid.enemies.splice(i, 1)
                this.player.projectiles.splice(j, 1)
                

                //create a grid with enemies
                if (grid.enemies.length === 0) {
                  setTimeout(() => {
                    this.grids.splice(k, 1)
                    this.addEnemyX += 1
                    if (this.addEnemyX > 2) { //columns + 2
                      this.addEnemyX = 2
                      this.addEnemyY += 1
                      if (this.addEnemyY > 2) { //row + 2
                        this.addEnemyY = 2
                        this.addEnemyVC += 2
                        if (this.addEnemyVC > 8) this.addEnemyVC = 8
                      }
                    }
                    this.grids.push(new Grid(this.addEnemyX, this.addEnemyY, this.addEnemyVC)) 
                  }, 10);
                }
              }, 0);
            }
          }
        })
      })
    })
    this.frames++
    if (this.frames === 1000) this.frames = 0
  }

  draw() {
    this.update()
    this.player.draw()
  }
}


//starting values
const game = new Game()
let gameOverFrame = 133
const img = new Image()
img.src = './img/background.jpg'
img.onload = () => {
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
}


document.querySelector('#newGame').innerHTML = 'press ENTER to get doertie'
document.querySelector('#newGame').style.display = 'flex'
let flashi = 1000/11
function flashie() {
  setTimeout(() => {
    document.querySelector('#highestScore').style.color = 'red'
    setTimeout(() => {
      document.querySelector('#highestScore').style.color = 'yellow'
      setTimeout(() => {
        document.querySelector('#highestScore').style.color = 'rgb(128, 255, 0)' 
          flashie()
      }, flashi);
    }, flashi);
  }, flashi);
}
flashie()

const bgMusic1 = new Audio('./sounds/highScore.mp3')
bgMusic1.volume = 0.4
const playerAudio = new Audio('./sounds/Shoot_01.wav')
playerAudio.volume = 0.4
const enemyAudio = new Audio('./sounds/Hit_03.wav')
enemyAudio.volume = 0.6
const doertie = new Audio('./sounds/Collect_Point_01.wav')
doertie.volume = 0.5
const death = new Audio('./sounds/Hero_Death_00.wav')
death.volume = 1
const gameOverMusic = new Audio('./sounds/gameOver.mp3')
gameOverMusic.volume = 0.5


//Start Game
let start = true
addEventListener('keydown', e => {
  if ((e.key === 'Enter') && start) {
    start = false
    document.querySelector('#newGame').style.display = 'none'
    document.querySelector('#highestScore').style.display = 'none'
    document.querySelector('#highScoreContainer').style.display = 'none'
    document.querySelector('#highScore').style.display = 'none'

    animate()
    bgMusic1.play()
  }
})

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
  game.draw()

  //GAME OVER SEQ
  if (game.gameOver) {
    bgMusic1.pause()
    death.play()
    document.querySelector('#GameOver').innerHTML = 'Game Over'
    document.querySelector('#GameOver').style.display = 'flex'
    setTimeout(() => {
      document.querySelector('#GameOver').style.fontSize = '40px'
      setTimeout(() => {
        document.querySelector('#GameOver').style.fontSize = '50px'
        setTimeout(() => {
          document.querySelector('#GameOver').style.fontSize = '70px'

          setTimeout(() => {
            document.querySelector('#newGame').innerHTML = 'press ENTER and try again'
            document.querySelector('#newGame').style.display = 'flex'
            //Highscore
            death.pause()
            gameOverMusic.play()
            if (score > storedScore) {
              document.querySelector('#highScoreContainer').style.display = 'flex'
            }
            addEventListener('keydown', e => {
            //New Game
              if (e.key === 'Enter' && (confirmed || score <= storedScore)) {
                window.location.reload()
              }
            })
          }, 1111);
        }, gameOverFrame += 122);
      }, gameOverFrame);
    }, gameOverFrame);
  }
  if (game.gameOver === false) {
    requestAnimationFrame(animate)
  }
}


