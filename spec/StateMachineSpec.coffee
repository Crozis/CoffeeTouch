describe "Automaton", ->
  element      = undefined
  router       = undefined
  stateMachine = undefined
  subject      = undefined
  beforeEach ->
    loadFixtures "basic.html"
    element      = $("div")[0]
    router       = new EventRouter(element)
    stateMachine = new StateMachine(0, router)

  describe "GenericState", ->
    beforeEach ->
      subject = new GenericState(stateMachine)

    it "is defined", ->
      expect(GenericState).toBeDefined()

    it "has a touchstart method", ->
      expect(subject.touchstart).toBeDefined()

    it "has a touchend method", ->
      expect(subject.touchend).toBeDefined()

    it "has a touchmove method", ->
      expect(subject.touchmove).toBeDefined()

  describe "NoTouch state", ->
    beforeEach ->
      stateMachine = new StateMachine(0, new EventRouter(element))
      subject      = new NoTouch(stateMachine)

    it "is defined", ->
      expect(NoTouch).toBeDefined()

    it "is a state", ->
      expect(subject).toBeAnInstanceOf GenericState

    it "has a touchstart method", ->
      expect(subject.touchstart).toBeDefined()

    describe "#touchstart", ->
      it "change the state of the automaton to FirstTouch state", ->
        $(subject).trigger "touchstart"
        expect(stateMachine.currentState).toBeAnInstanceOf FirstTouch

    describe "#touchmove", ->
      it "do not change the state of the automaton", ->
        $(subject).trigger "touchmove"
        expect(stateMachine.currentState).toBeAnInstanceOf NoTouch

    describe "#touchend", ->
      it "do not change the state of the automaton", ->
        $(subject).trigger "touchend"
        expect(stateMachine.currentState).toBeAnInstanceOf NoTouch

  describe "FirstTouch state", ->
    beforeEach ->
      stateMachine              = new StateMachine(0, new EventRouter(element))
      subject                   = new FirstTouch(stateMachine)
      stateMachine.currentState = subject
      stateMachine.router.grouper.analyser = notify: ->

    it "is defined", ->
      expect(NoTouch).toBeDefined()

    it "is a state", ->
      expect(subject).toBeAnInstanceOf GenericState

    it "has a touchstart method", ->
      expect(subject.touchstart).toBeDefined()

    describe "#touchstart", ->
      it "do not change the state of the automaton", ->
        $(subject).trigger "touchstart"
        expect(stateMachine.currentState).toBeAnInstanceOf FirstTouch

    describe "#touchmove", ->
      it "change the state of the automaton to FirstTouch state", ->
        $(subject).trigger "touchmove"
        expect(stateMachine.currentState).toBeAnInstanceOf Drag

    describe "#touchend", ->
      it "do not change the state of the automaton", ->
        $(subject).trigger "touchend"
        expect(stateMachine.currentState).toBeAnInstanceOf NoTouch

  describe "StateMachine", ->
    it "is defined", ->
      expect(StateMachine).toBeDefined()



