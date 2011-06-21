##	State Machine
## 		Analyse all possible basic gesture of a single finger
##
## Copyright (c) 2011
## Publication date: 06/17/2011
##		Pierre Corsini (pcorsini@polytech.unice.fr)
##		Nicolas Dupont (npg.dupont@gmail.com)
##		Nicolas Fernandez (fernande@polytech.unice.fr)
##		Nima Izadi (nim.izadi@gmail.com)
##		And supervised by Raphaël Bellec (r.bellec@structure-computation.com)
##
## Permission is hereby granted, free of charge, to any person obtaining a 
## copy of this software and associated documentation files (the "Software"),
## to deal in the Software without restriction, including without limitation
## the rights to use, copy, modify, merge, publish, distribute, sublicense, 
## and/or sell copies of the Software, and to permit persons to whom the Software 
## is furnished to do so, subject to the following conditions:
## 
## The above copyright notice and this permission notice shall be included in
## all copies or substantial portions of the Software.
## 
## THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS 
## OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
## FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
## AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, 
## WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR
## IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## The role of StateMachine is to detect and communicate basics events made ​​by each finger independently, and whose composition will allow us to obtain complex events. So there are many state machine as there are fingers on the screen. 
## All the following classes correspond to states of the automaton. And in all classes, 'touchstart', 'touchmove' and 'touchend' correspond to transitions of the automaton.
class StateMachine
	constructor: (@identifier, @router)-> 
		@currentState = new NoTouch(this)
		@analyser = new Analyser
	apply: (eventName, eventObj) ->
		@currentState.apply(eventName, eventObj)

	setState: (newState) -> @currentState = newState
	getState: -> @currentState
	
class GenericState
	init: -> # Defined by subclasses

	constructor: (@machine) ->
		@eventObj = if @machine.currentState? then @machine.currentState.eventObj else {}
		this.init()

	apply: (eventName, arg) ->
		Object.merge(@eventObj, arg)
		this[eventName]()

	notify: (name) -> ## This method notifies events to the router
		@machine.router.broadcast(name, @eventObj)	

## Represents the initial state of the automaton.
class NoTouch extends GenericState
	touchstart: ->
		@machine.setState(new FirstTouch @machine) ## Makes a transition to 'FirstTouch' state during an event 'touchstart'

## Represents the first state of the automata after a touch on the screen.
class FirstTouch extends GenericState
	init: ->
		_machine = @machine
		@fixedtimer = setTimeout (->(_machine.setState new Fixed _machine)), 300

	touchend: ->
		clearTimeout @fixedtimer
		@notify "tap"
		@machine.setState new NoTouch @machine ## Makes a transition to 'NoTouch' state during an event 'touchend'

	touchmove: ->
		clearTimeout @fixedtimer
		@notify "drag"
		@machine.setState new Drag @machine ## Makes a transition to 'Drag' state during an event 'touchmove'

		
class Fixed extends GenericState
	init: ->
		@notify "fixed"

	touchend: ->
		@notify "fixedend"
		@machine.setState new NoTouch @machine ## Makes a transition to 'NoTouch' state during an event 'touchend'


class Drag extends GenericState
	init: ->
		@isTap = true
		@initialX = @eventObj.clientX ## Represent the initial position of the finger on the x-axis  
		@initialY = @eventObj.clientY ## Represent the initial position of the finger on the x-axis  
		@delta = 15
		that = this		
		setTimeout (-> that.isTap = false), 150

	touchmove: ->
		@notify "drag"

	touchend: ->
		if @isTap and (Math.abs(@eventObj.clientX - @initialX) < @delta) && (Math.abs(@eventObj.clientY - @initialY) < @delta)
			@notify "tap"
		else
			@notify "dragend"
		@machine.setState(new NoTouch @machine) ## Makes a transition to 'NoTouch' state during an event 'touchend'
