type Direction = 'N' | 'S' | 'E' | 'W'

interface Position {
  x: number
  y: number
  direction: Direction
}

export class MarsRover {
  private readonly maxX: number
  private readonly maxY: number
  private readonly currentPosition: Position

  public constructor(
    gridSize: number[] = [10, 10],
    currentPosition: Position = {
      x: 0,
      y: 0,
      direction: 'N'
    }
  ) {
    const maxX = gridSize[0]
    const maxY = gridSize[1]
    const errors = []

    if (typeof maxX !== 'number') {
      errors.push('maxX is not a number')
    }
    if (typeof maxY !== 'number') {
      errors.push('maxY is not a number')
    }
    if (maxX <= 0 && maxY <= 0) {
      errors.push('grid must be bigger than 0,0')
    }
    if (typeof currentPosition.x !== 'number') {
      errors.push('currentPosition x is not a number')
    }
    if (typeof currentPosition.y !== 'number') {
      errors.push('currentPosition y is not a number')
    }
    if (currentPosition.x > maxX || currentPosition.x < 0) {
      errors.push(`currentPosition x: ${currentPosition.x} is off the grid!`)
    }
    if (currentPosition.y > maxY || currentPosition.y < 0) {
      errors.push(`currentPosition y: ${currentPosition.y} is off the grid!`)
    }
    if (
      currentPosition.direction !== 'N' &&
      currentPosition.direction !== 'S' &&
      currentPosition.direction !== 'E' &&
      currentPosition.direction !== 'W'
    ) {
      errors.push(`${currentPosition.direction} is not a valid direction`)
    }

    if (errors.length > 0) {
      throw new Error(errors.join(', '))
    }

    this.maxX = maxX
    this.maxY = maxY
    this.currentPosition = currentPosition
  }

  public move(instructions: string) {
    if (instructions.length === 0) {
      throw new Error('No instructions provided')
    }
    const instructionList = instructions.split('')
    this.followInstructions(instructionList)
  }

  private followInstructions(instructionList: string[]) {
    instructionList.forEach((instruction) => {
      if (instruction === 'L') {
        this.turnLeft()
      } else if (instruction === 'R') {
        this.turnRight()
      } else if (instruction === 'M') {
        this.moveForward()
      } else {
        throw new Error(`${instruction} is not a valid instruction`)
      }
    })
  }

  private turnLeft() {
    switch (this.currentPosition.direction) {
      case 'N':
        this.currentPosition.direction = 'W'
        break
      case 'S':
        this.currentPosition.direction = 'E'
        break
      case 'W':
        this.currentPosition.direction = 'S'
        break
      case 'E':
        this.currentPosition.direction = 'N'
        break
    }
  }

  private turnRight() {
    switch (this.currentPosition.direction) {
      case 'N':
        this.currentPosition.direction = 'E'
        break
      case 'S':
        this.currentPosition.direction = 'W'
        break
      case 'W':
        this.currentPosition.direction = 'N'
        break
      case 'E':
        this.currentPosition.direction = 'S'
        break
    }
  }

  private moveForward() {
    switch (this.currentPosition.direction) {
      case 'N':
        this.currentPosition.y = this.currentPosition.y + 1
        this.checkGridSize(this.currentPosition.y, this.getMaxY())
        break
      case 'S':
        this.currentPosition.y = this.currentPosition.y - 1
        this.checkGridSize(this.currentPosition.y, this.getMaxY())
        break
      case 'W':
        this.currentPosition.x = this.currentPosition.x - 1
        this.checkGridSize(this.currentPosition.x, this.getMaxX())
        break
      case 'E':
        this.currentPosition.x = this.currentPosition.x + 1
        this.checkGridSize(this.currentPosition.x, this.getMaxX())
        break
    }
  }

  private checkGridSize(position: number, max: number) {
    if (position > max || position < 0) {
      throw new Error('Rover is off the grid!')
    }
  }

  public getMaxX() {
    return this.maxX
  }

  public getMaxY() {
    return this.maxY
  }

  public getCurrentPosition() {
    return this.currentPosition
  }
}
