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

describe "#digit_name", ->
  it '0 returns zero', ->
    expect(CoffeeTouch.Helper.digit_name(0)).toEqual('zero')
  it '1 returns one', ->
    expect(CoffeeTouch.Helper.digit_name(1)).toEqual('one')
  it '2 returns two', ->
    expect(CoffeeTouch.Helper.digit_name(2)).toEqual('two')
  it '3 returns three', ->
    expect(CoffeeTouch.Helper.digit_name(3)).toEqual('three')
  it '4 returns four', ->
    expect(CoffeeTouch.Helper.digit_name(4)).toEqual('four')
  it '5 returns five', ->
    expect(CoffeeTouch.Helper.digit_name(5)).toEqual('five')
  it '6 returns six', ->
    expect(CoffeeTouch.Helper.digit_name(6)).toEqual('six')
  it '7 returns seven', ->
    expect(CoffeeTouch.Helper.digit_name(7)).toEqual('seven')
  it '8 returns eight', ->
    expect(CoffeeTouch.Helper.digit_name(8)).toEqual('eight')
  it '9 returns nine', ->
    expect(CoffeeTouch.Helper.digit_name(9)).toEqual('nine')
  it '10 returns ten', ->
    expect(CoffeeTouch.Helper.digit_name(10)).toEqual('ten')
