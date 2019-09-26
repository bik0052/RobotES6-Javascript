class Vector {
  constructor (x, y) {
    this.x = x
    this.y = y
  }
}

class World {
  constructor (plan) {
    console.log(/*plan*/);
    
    this.allMyThings = []
    this.myFood = null
    this.myRobot = null
    this.initialize()
  }
  createFood (x, y) {
    // ADD CODE HERE TO STOP FOOD GOING ON TOP OF OTHER THINGS = USEFUL!!
    var newFood = new Food(this)
    newFood.setPosition(new Vector(x, y))
    this.allMyThings.push(newFood)
    this.myFood = newFood
  }
  createRobot (startingX, startingY, facing) {
    // ADD CODE HERE TO PREVENT ROBOT GOING ON TOP OF OTHER THINGS = USEFUL!!
    var newRobot = new Robot(this)
    newRobot.set(startingX, startingY, facing)
    this.allMyThings.push(newRobot)
    this.myRobot = newRobot
  }
  createBlock (newPosition) {
    // ADD CODE HERE TO PREVENT TWO BLOCKS IN THE ONE PLACE = USEFUL!!
    var newBlock = new Block(this)
    newBlock.setPosition(newPosition)
    this.allMyThings.push(newBlock)  
  }
  createHorizontalWall (startingX, startingY, endingX, endingY) {
    // ADD DEFENSIVE CODING HERE = USEFUL!!

    // block comment #4 here
    var i = startingX
    while (i <= endingX) {
      this.createBlock(new Vector(i, startingY))
      i++
    }
  }
  createVerticalWall (startingX, startingY, endingX, endingY) {
  /*
    vertical = from top to bottom!
  */
    // ADD DEFENSIVE CODING HERE = USEFUL!!

    var i = startingY
    while (i <= endingY) {
      this.createBlock(new Vector(startingX, i))
      i++
    }
  }
  deactivate () {
    this.closeButtons()
  }
  closeButtons () {
    btnT4.disabled = true
    btnT5.disabled = true
    btnT6.disabled = true
    rangeSpeed.disabled = true
    btnLeft.disabled = true
    btnMove.disabled = true
    btnRight.disabled = true
    btnEat.disabled = true
    btnAhead.disabled = true
    btnBlocked.disabled = true
    btnSniff.disabled = true
    btnRun.disabled = true
    btnTurnToFood.disabled = true
    btnGoTillBlocked.disabled = true
  }

  deleteThing (thePosition) {
    // ADD DEFENSIVE CODE HERE = USEFUL!!
    var x, y, result
    x = thePosition.x
    y = thePosition.y
    for (var i = 0; i < this.allMyThings.length; i += 1) {
      if (this.allMyThings[i].pos.x === x && this.allMyThings[i].pos.y === y) {
        result = i
        break
      }
    }

    this.display.removeThing(this.allMyThings[result])
    this.allMyThings.splice(result, 1)
    this.paint(this.display)
  }
  getFoodX () {
    return this.myFood.pos.x
  }

  getFoodY () {
    return this.myFood.pos.y
  }
  initialize () {
    this.allMyThings = []
    this.placeRobot()
    this.placeFood()
    this.setBoundry()
  }
  paint (display) {
    this.display = display
    this.allMyThings.forEach(function (thing) {
      this.display.showThing(thing, thing.pos)
    }, this)
  }
  paintRobot () {
    this.display.showThing(this.myRobot, this.myRobot.pos)
  }
  placeFood () {
    var newX, newY, foodPlace, xArray, yArray
    // block comment #5 here
    xArray = []
    yArray = []
    xArray.push(4)
    yArray.push(9)// 1
    xArray.push(4)
    yArray.push(19)// 2
    xArray.push(6)
    yArray.push(19)// 3
    xArray.push(8)
    yArray.push(19)// 4
    xArray.push(11)
    yArray.push(9)// 5
    xArray.push(11)
    yArray.push(11)// 6
    xArray.push(11)
    yArray.push(15)// 7
    xArray.push(13)
    yArray.push(19)// 8
    xArray.push(15)
    yArray.push(19)// 9
    xArray.push(17)
    yArray.push(9)// 10
    xArray.push(17)
    yArray.push(19)// 11

    // block comment #6 here
    foodPlace = Math.round(Math.random() * 10)
    newY = xArray[foodPlace]
    newX = yArray[foodPlace]
    this.createFood(newX, newY)
  }
  placeRobot () {
    var newX, newY, newPosition, robotFacing
    // block comment #7 here
    robotFacing = Math.ceil(Math.random() * 4)
    // block comment #8 here
    newX = 2 + Math.ceil(Math.random() * 3)
    // block comment #9 here
    newY = Math.ceil(Math.random() * (WORLD_SIZE - 2)) + 1
    this.createRobot(newX, newY, robotFacing)
  }
  placeWall (offsetFromLeft, gapFromTop) {
    var deletePos
    this.createVerticalWall(offsetFromLeft, 2, offsetFromLeft, WORLD_SIZE - 2)
    this.deletePos = new Vector(offsetFromLeft, gapFromTop)
    this.deleteThing(deletePos)
  }
  setBoundry () {
    this.createHorizontalWall(1, 1, WORLD_SIZE, 1)
    this.createHorizontalWall(1, WORLD_SIZE, WORLD_SIZE, WORLD_SIZE)

    this.createVerticalWall(1, 1, 1, WORLD_SIZE)
    this.createVerticalWall(WORLD_SIZE, 1, WORLD_SIZE, WORLD_SIZE)
  }
  setTask4 () {
    'use strict';
    // alert("coming!");
    var position = new Vector( 0,0 );
    this.createVerticalWall( 8,3, 8,18 );
    this.createHorizontalWall( 8,3, 18,3 );
    this.createHorizontalWall( 8,18, 18,18 );
    position.x = 19;
    position.y = Math.round(Math.random())== 1? 3:18;
    this.createBlock( position);
  }
  setTask5 () {
    'use strict';
    this.setTask4();

    var position = new Vector( 0,0 );

    this.createVerticalWall( 10,5, 10,16 );
    this.createHorizontalWall( 10,5, 18,5 );
    this.createHorizontalWall( 10,16, 18,16 );

    position.x = 19;
    position.y = Math.round(Math.random())== 1? 5:16;
    this.createBlock( position);
  }
  setTask6 () {
    'use strict';
      this.setTask5();

      var position = new Vector( 0,0 );

      this.createVerticalWall( 12,7, 12,14 );
      this.createHorizontalWall( 12,7, 18,7 );
      this.createHorizontalWall( 12,14, 18,14 );

      position.x = 19;
      position.y = Math.round(Math.random())== 1? 7:14;
      this.createBlock( position);
  }
  setWait (delayTime) {
    this.waitPeriod = delayTime * 100
  }
  whatIsAt (position) {
    var result
    this.allMyThings.forEach(function (thing) {
      if (position.x === thing.pos.x && position.y === thing.pos.y) {
        result = thing
      }
    }, this)
    return result
  }
}

class Robot {
  constructor (theWorld) {
    this.myWorld = theWorld
    this.type = 'robot'
  }
  ahead () {
    /*
      header comment 2 here
    */
    var x, y
    x = this.pos.x
    y = this.pos.y
    if (this.facing === 1) {
      y--
    } else if (this.facing === 2) {
      x++
    } else if (this.facing === 3) {
      y++
    } else if (this.facing === 4) {
      x--
    }
    return new Vector(x, y)
  }
  create () {
    this.active = true
    this.facing = 1
  }
  deactivate () {
    this.active = false
    this.myWorld.paintRobot()
    this.myWorld.deactivate()
  }
  eat () {
    /*
     * header comment 14 here
    */
    var someThingAheadOfMe = this.myWorld.whatIsAt(this.ahead())
    if (someThingAheadOfMe == null) {
      alert('WaaaAAAH! I can\'t eat nothing!')
    } else if (this.isBlockedByBlock() === true) {
      alert('WaaaAAAH! I can\'t eat the walls!')
    } else if (this.isBlockedByFood() === true) {
      alert('My favorite Food! Yummy!')
      this.myWorld.deleteThing(this.ahead())
      this.deactivate()
    } else {
      alert('Tell Mike what just went wrong, I\'m confused!')
    }
  }
  /*go () {
    // replace the message with appropriate code!
    //alert('nothing happening! Go?')
    while(this.active){
      this.turnToFood()
      if(!this.isBlockedByFood()){
        this.move()
      }else {
        this.eat()
      }
    }
  }*/

  go () {
    // replace the message with appropriate code!
    //alert('nothing happening! Go?')
    while(this.active){
      if(!this.isBlockedByFood()){
        this.turnToFood()
        if(this.isBlockedByBlock()){
          this.turnRight()
        }else{
          this.move()
        }
      }else {
        this.eat()
      }
    }
  }

  goTillBlocked () {
    // replace the message with appropriate code!
    //alert('don\'t know how to do this! Go Till blocked')
    while(!this.isBlockedByBlock() && !this.isBlockedByFood()){
      this.move()
    }
  }
  hasMoved () {
    var result = !((this.lastPosition.x === this.pos.x && this.lastPosition.y === this.pos.y))
    return result
  }
  isBlocked () {
    return this.look() != null
  }
  isBlockedByBlock () {
    /*
      header comment 4 here
    */
    var result, someThing
    result = false
    someThing = this.look()

    // block comment #1 here
    if (someThing != null) {
      if (someThing.type === 'block') {
        result = true
      }
    }
    return result
  }
  isBlockedByFood () {
    /*
      header comment 5 here
    */
    var result, someThing
    result = false
    someThing = this.look()

    if (someThing != null) {
      if (someThing.type === 'food') {
        result = true
      }
    }
    return result
  }
  isOff () {
    return this.active === false
  }
  isOn () {
    return this.active === true
  }
  look () {
  /*
    header comment 13 here
  */
    return this.myWorld.whatIsAt(this.ahead())
  }
  sleep (d) {
    for (var t = Date.now(); Date.now() - t <= d;) {}
  }
  move () {
    // block comment #2 here
    if (this.active && this.isBlocked() === false) {
      this.lastPosition = this.pos

      //this.sleep(this.myWorld.waitPeriod)
      //alert(42) // slows it down and makes it visible!
      this.pos = this.ahead()
      count++
      stepCount.innerHTML = count
    } else {
      // block comment #3 here
      this.deactivate()
    }
    this.myWorld.paintRobot()
    console.log('current pos x ' + this.myWorld.allMyThings[0].pos.x + ' current pos y ' + this.myWorld.allMyThings[0].pos.y)
  }
  set (startingX, startingY, initialFacing) {
    this.pos = new Vector(startingX, startingY)
    this.lastPosition = new Vector(startingX, startingY)
    this.facing = initialFacing
    this.active = true
  }
  sniff () {
  /*
    header comment 8 here
  */
    var result = false
    if (this.facing === 1) {
      if (this.myWorld.getFoodY() < this.pos.y) {
        result = true
      }
    } else if (this.facing === 2) {
      if (this.myWorld.getFoodX() > this.pos.x) {
        result = true
      }
    } else if (this.facing === 3) {
      if (this.myWorld.getFoodY() > this.pos.y) {
        result = true
      }
    } else if (this.facing === 4) {
      if (this.myWorld.getFoodX() < this.pos.x) {
        result = true
      }
    }
    return result
  }
  turnLeft () {
  /*
    header comment 9 here
  */
    var newFacing
    if (this.active) {
      newFacing = this.facing - 1
      if (newFacing < 1) {
        newFacing = 4
      }
      this.facing = newFacing
    }
    this.myWorld.paintRobot()
  }
  turnRight () {
  /*
    header comment 10 here
  */
    var newFacing
    if (this.active) {
      newFacing = this.facing + 1
      if (newFacing > 4) {
        newFacing = 1
      }
      this.facing = newFacing
    }

    this.myWorld.paintRobot()
  }
  turnToFood () {
    // replace the message with appropriate code!
    //alert('don\'t know how to do this! Turn Towards food')

    while(!this.sniff()){
      this.turnRight()
    }
    this.myWorld.paintRobot()
  }
}
class Block {
  constructor (theWorld) {
    this.myWorld = theWorld
    this.type = 'block'
  }
  create () {
    this.selectedImage = 'img/wall.png'
  }
  set (newPosition, theWorld) {
    this.pos = newPosition
    this.myWorld = theWorld
  }
  setPosition (newPosition) {
    this.lastPosition = this.pos
    this.pos = newPosition
  }
  }
class Food {
  constructor (theWorld) {
    this.myWorld = theWorld
    this.type = 'food'
  }
  setPosition (newPosition) {
    this.lastPosition = this.pos
    this.pos = newPosition
  }
}
