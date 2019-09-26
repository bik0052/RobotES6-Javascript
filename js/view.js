var food = document.createElement('img')
food.src = 'img/food.png'
var wall = document.createElement('img')
wall.src = 'img/wall.png'
var up = document.createElement('img')
up.src = 'img/up.png'
var right = document.createElement('img')
right.src = 'img/right.png'
var down = document.createElement('img')
down.src = 'img/down.png'
var left = document.createElement('img')
left.src = 'img/left.png'
var off = document.createElement('img')
off.src = 'img/off.png'

class CanvasDisplay {
  constructor (world) {
    this.canvas = document.getElementsByTagName('canvas')[0]
    this.canvas.width = WORLD_SIZE * SCALE
    this.canvas.height = this.canvas.width
    this.cx = this.canvas.getContext('2d')
    this.myWorld = world
    this.theRobot = this.myWorld.myRobot
    this.load()
  }
  load () {
  /*
   * header comment 12 here
  */
    this.myWorld.setWait(3)
    this.cx.fillStyle = '#fff'
    this.cx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    this.myWorld.paint(this)
  }
  removeThing (theThing) {
    // block comment 10 here

    var x, y
    x = (theThing.pos.x - 1) * SCALE
    y = (theThing.pos.y - 1) * SCALE
    this.cx.fillStyle = '#fff'
    this.cx.fillRect(x, y, SCALE, SCALE)
  }
  showThing (thing, position) {
    /*
     * header comment 6 here
    */
    var x, y, thisRobot, facing
    // block comment #11 here
    x = (position.x - 1) * SCALE
    y = (position.y - 1) * SCALE
    if (thing.type === 'robot') {
      thisRobot = thing
      facing = thing.facing
      if (facing === 1) {
        this.cx.drawImage(up, x, y)
      } else if (facing === 2) {
        this.cx.drawImage(right, x, y)
      } else if (facing === 3) {
        this.cx.drawImage(down, x, y)
      } else if (facing === 4) {
        this.cx.drawImage(left, x, y)
      }
      if (thisRobot.hasMoved()) {
        this.cx.fillStyle = 'red'
        this.cx.fillRect((thisRobot.lastPosition.x - 1) * SCALE, (thisRobot.lastPosition.y - 1) * SCALE, SCALE, SCALE)
      }
      if (thisRobot.isOff()) {
        this.cx.drawImage(off, x, y)
      }
      // block comment #13 here
    } else if (thing.type === 'food') {
      this.cx.drawImage(food, x, y)
    } else {
      this.cx.drawImage(wall, x, y)
    }
  }
}



