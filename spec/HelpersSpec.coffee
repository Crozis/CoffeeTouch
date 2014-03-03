describe "CoffeeTouch.Helper", ->
  it "is defined", ->
    expect(CoffeeTouch.Helper).toBeDefined()

describe "#getDirection", ->
  leftMovement = -10
  rightMovement = 10
  upMovement = -10
  downMovement = 10
  it "is defined", ->
    expect(CoffeeTouch.Helper).toBeDefined()

  describe 'direction when movement is only in one direction', ->
    it "up", ->
      expect(CoffeeTouch.Helper.getDirection(0, upMovement)).toEqual('up')

    it "down", ->
      expect(CoffeeTouch.Helper.getDirection(0, downMovement)).toEqual('down')

    it "left", ->
      expect(CoffeeTouch.Helper.getDirection(leftMovement, 0)).toEqual('left')

    it "right", ->
      expect(CoffeeTouch.Helper.getDirection(rightMovement, 0)).toEqual('right')

  describe 'prior direction with movement in many direction', ->
    it "up", ->
      expect(CoffeeTouch.Helper.getDirection(leftMovement / 2, upMovement)).toEqual('up')

    it "down", ->
      expect(CoffeeTouch.Helper.getDirection(rightMovement / 2, downMovement)).toEqual('down')

    it "left", ->
      expect(CoffeeTouch.Helper.getDirection(leftMovement, upMovement / 2)).toEqual('left')

    it "right", ->
      expect(CoffeeTouch.Helper.getDirection(rightMovement, downMovement / 2)).toEqual('right')
