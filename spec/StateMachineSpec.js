describe("Automaton", function() {
	var element, router, stateMachine, subject, fakeEvent;

	beforeEach(function() {
		loadFixtures('basic.html');
		element			= $('div')[0];
		router			= new EventRouter(element);
		stateMachine	= new StateMachine(0, router);
	});
	describe("StateMachine", function() {
		it("is defined", function() {
			expect(StateMachine).toBeDefined();
		});
	});
});
