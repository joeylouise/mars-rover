import { MarsRover } from '.'

describe('Mars Rover', () => {
  describe('errors when', () => {
    test('gridSize and currentPosition are not correct types', () => {
      expect(() => {
        // @ts-expect-error
        new MarsRover(['5', '5'], { x: '1', y: '2', direction: 'B' })
      }).toThrow(
        'maxX is not a number, maxY is not a number, currentPosition x is not a number, currentPosition y is not a number, B is not a valid direction'
      )
    })

    test('gridSize is [0,0]', () => {
      expect(() => {
        new MarsRover([0, 0])
      }).toThrow('grid must be bigger than 0,0')
    })

    test('currentPosition is off the grid', () => {
      expect(() => {
        new MarsRover([5, 5], { x: 6, y: 4, direction: 'E' })
      }).toThrow('currentPosition x: 6 is off the grid!')
    })

    test('no instructions provided', () => {
      const marsRover = new MarsRover([5, 5], { x: 2, y: 2, direction: 'N' })
      expect(() => marsRover.move('')).toThrow('No instructions provided')
    })

    test('given an invalid instruction', () => {
      const marsRover = new MarsRover([5, 5], { x: 2, y: 2, direction: 'N' })
      expect(() => marsRover.move('MPR')).toThrow(
        'P is not a valid instruction'
      )
    })

    test('given an instruction that moves the rover off the grid', () => {
      const marsRover = new MarsRover([5, 5], { x: 5, y: 5, direction: 'N' })
      expect(() => marsRover.move('M')).toThrow('Rover is off the grid!')
    })
  })

  describe('creates a MarsRover', () => {
    test('with default gridSize 10x10 and position 0,0,N when no arguments passed', () => {
      const marsRover = new MarsRover()
      expect(marsRover.getMaxX()).toEqual(10)
      expect(marsRover.getMaxY()).toEqual(10)
      expect(marsRover.getCurrentPosition()).toEqual({
        x: 0,
        y: 0,
        direction: 'N'
      })
    })

    test('with correct grid size and position when arguments are passed', () => {
      const marsRover = new MarsRover([5, 5], { x: 1, y: 2, direction: 'N' })
      expect(marsRover.getMaxX()).toEqual(5)
      expect(marsRover.getMaxY()).toEqual(5)
      expect(marsRover.getCurrentPosition()).toEqual({
        x: 1,
        y: 2,
        direction: 'N'
      })
    })
  })

  describe('when instructions are provided', () => {
    describe('and starting direction is N', () => {
      test('changes direction to W when instruction is L', () => {
        const marsRover = new MarsRover([5, 5], { x: 1, y: 2, direction: 'N' })
        marsRover.move('L')
        expect(marsRover.getCurrentPosition().direction).toEqual('W')
      })
      test('changes direction to E when instruction is R', () => {
        const marsRover = new MarsRover([5, 5], { x: 1, y: 2, direction: 'N' })
        marsRover.move('R')
        expect(marsRover.getCurrentPosition().direction).toEqual('E')
      })
      test('moves up one when instruction is M', () => {
        const marsRover = new MarsRover([5, 5], { x: 1, y: 2, direction: 'N' })
        marsRover.move('M')
        expect(marsRover.getCurrentPosition().y).toEqual(3)
      })
    })
    describe('and starting direction is W', () => {
      test('changes direction to S when instruction is L', () => {
        const marsRover = new MarsRover([5, 5], { x: 1, y: 2, direction: 'W' })
        marsRover.move('L')
        expect(marsRover.getCurrentPosition().direction).toEqual('S')
      })
      test('changes direction to N when instruction is R', () => {
        const marsRover = new MarsRover([5, 5], { x: 1, y: 2, direction: 'W' })
        marsRover.move('R')
        expect(marsRover.getCurrentPosition().direction).toEqual('N')
      })
      test('moves one to the left when instruction is M', () => {
        const marsRover = new MarsRover([5, 5], {
          x: 1,
          y: 2,
          direction: 'W'
        })
        marsRover.move('M')
        expect(marsRover.getCurrentPosition().x).toEqual(0)
      })
    })
    describe('and starting direction is S', () => {
      test('changes direction to E when instruction is L', () => {
        const marsRover = new MarsRover([5, 5], { x: 1, y: 2, direction: 'S' })
        marsRover.move('L')
        expect(marsRover.getCurrentPosition().direction).toEqual('E')
      })
      test('changes direction to W when instruction is R', () => {
        const marsRover = new MarsRover([5, 5], { x: 1, y: 2, direction: 'S' })
        marsRover.move('R')
        expect(marsRover.getCurrentPosition().direction).toEqual('W')
      })
      test('moves down one when instruction is M', () => {
        const marsRover = new MarsRover([5, 5], { x: 1, y: 2, direction: 'S' })
        marsRover.move('M')
        expect(marsRover.getCurrentPosition().y).toEqual(1)
      })
    })
    describe('and starting direction is E', () => {
      test('changes direction to N when instruction is L', () => {
        const marsRover = new MarsRover([5, 5], { x: 1, y: 2, direction: 'E' })
        marsRover.move('L')
        expect(marsRover.getCurrentPosition().direction).toEqual('N')
      })
      test('changes direction to S when instruction is R', () => {
        const marsRover = new MarsRover([5, 5], { x: 1, y: 2, direction: 'E' })
        marsRover.move('R')
        expect(marsRover.getCurrentPosition().direction).toEqual('S')
      })
      test('moves one to the right when instruction is M', () => {
        const marsRover = new MarsRover([5, 5], {
          x: 1,
          y: 2,
          direction: 'E'
        })
        marsRover.move('M')
        expect(marsRover.getCurrentPosition().x).toEqual(2)
      })
    })

    test('outputs the correct position from test data 1', () => {
      const marsRover = new MarsRover([5, 5], { x: 1, y: 2, direction: 'N' })
      marsRover.move('LMLMLMLMM')
      expect(marsRover.getCurrentPosition()).toEqual({
        x: 1,
        y: 3,
        direction: 'N'
      })
    })

    test('outputs the correct position from test data 2', () => {
      const marsRover = new MarsRover([5, 5], { x: 3, y: 3, direction: 'E' })
      marsRover.move('MMRMMRMRRM')
      expect(marsRover.getCurrentPosition()).toEqual({
        x: 5,
        y: 1,
        direction: 'E'
      })
    })
  })
})
