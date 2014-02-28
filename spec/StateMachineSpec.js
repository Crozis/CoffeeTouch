describe("Automaton", function() {
	var element, router, stateMachine, subject, fakeEvent;

	beforeEach(function() {
		loadFixtures('basic.html');
		element			= $('div')[0];
		router			= new EventRouter(element);
		stateMachine	= new StateMachine(0, router);
	});

	describe("GenericState", function() {
		beforeEach(function() {
			subject = new GenericState(stateMachine);
		});

		it("is defined", function() {
			expect(GenericState).toBeDefined();
		});

		it("has a touchstart method", function() {
			expect(subject.touchstart).toBeDefined();
		});
		it("has a touchend method", function() {
			expect(subject.touchend).toBeDefined();
		});
		it("has a touchmove method", function() {
			expect(subject.touchmove).toBeDefined();
		});
	});

	describe("NoTouch state", function() {
		beforeEach(function () {
			stateMachine	= new StateMachine(0, new EventRouter(element));
			subject			= new NoTouch(stateMachine);
			fakeEvent		= {};
		});

		it("is defined", function() {
			expect(NoTouch).toBeDefined();
		});
		it("is a state", function() {
			expect(subject).toBeAnInstanceOf(GenericState);
		});
		it("has a touchstart method", function() {
			expect(subject.touchstart).toBeDefined();
		});

		describe("#touchstart", function() {
			it("change the state of the automaton to FirstTouch state", function() {
				subject.touchstart(fakeEvent);
				expect(stateMachine.currentState).toBeAnInstanceOf(FirstTouch);
			});
		});
		describe("#touchmove", function() {
			it("do not change the state of the automaton", function() {
				subject.touchmove(fakeEvent);
				expect(stateMachine.currentState).toBeAnInstanceOf(NoTouch);
			});
		});
		describe("#touchend", function() {
			it("do not change the state of the automaton", function() {
				subject.touchend(fakeEvent);
				expect(stateMachine.currentState).toBeAnInstanceOf(NoTouch);
			});
		});
	});

	describe("StateMachine", function() {
		it("is defined", function() {
			expect(StateMachine).toBeDefined();
		});
	});
});
