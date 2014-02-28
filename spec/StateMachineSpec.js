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
	describe("StateMachine", function() {
		it("is defined", function() {
			expect(StateMachine).toBeDefined();
		});
	});
});
