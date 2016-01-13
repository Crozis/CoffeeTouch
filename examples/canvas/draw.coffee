window.onload = ->
	$ = (element) ->
		document.getElementById element
<<<<<<< HEAD

=======
		
>>>>>>> master
	canvas = $('canvas')
	ctx = canvas.getContext("2d")
	ctx.lineCap = "round"
	ctx.lineJoin = "round"
	firsttime = true

<<<<<<< HEAD
	options =
		preventDefault: true

	$('canvas').onGesture("tap", (params) ->
=======
	$('canvas').onGesture "tap", (params) ->
>>>>>>> master
		selectPoint(params.fingers[0].x, params.fingers[0].y)
		ctx.fillStyle = "rgba(0,0,0,1)"
		ctx.beginPath()
		ctx.arc(params.fingers[0].x, params.fingers[0].y, 3, 0, Math.PI * 2,true)
		ctx.closePath()
		ctx.fill()
<<<<<<< HEAD
	, options)

  # $('canvas').onGesture("all", (name, params) ->
  #     $('debug').innerHTML = name + '<br/>' +$('debug').innerHTML

	$('canvas').onGesture("tap,tap", (params) ->
=======

  # $('canvas').onGesture "all", (name, params) ->
  #     $('debug').innerHTML = name + '<br/>' +$('debug').innerHTML
		
	$('canvas').onGesture "tap,tap", (params) ->
>>>>>>> master
		p1 = {
			x: params.fingers[0].x,
			y: params.fingers[0].y
		}
		p2 = {
			x: params.fingers[1].x,
			y: params.fingers[1].y
		}
		addTwoPoint(p1,p2)
<<<<<<< HEAD
	, options)
	$('canvas').onGesture("drag", (params) ->
=======
	
	$('canvas').onGesture "drag", (params) ->
>>>>>>> master
		if firsttime
			dragStart(params)
			firsttime = false
		else dragging(params)
<<<<<<< HEAD
	, options)

	$('canvas').onGesture("dragend", (params) ->
		dragEnd(params)
		firsttime = true
	, options)

	$('canvas').onGesture("doubletap", (params) ->
		add(params.fingers[0].x, params.fingers[0].y)
	, options)

	$('canvas').onGesture("tap,tap,tap", (params) ->
		validate()
	, options)

	$('canvas').onGesture("three:flick:down", (params) ->
		clear()
	, options)

	$('canvas').onGesture("two:spread", (params) ->
		changeRadiusSelection params.scale
	, options)

	$('canvas').onGesture("two:pinch", (params) ->
		changeRadiusSelection params.scale
	, options)

	$('canvas').onGesture("three:spread", (params) ->
		changeRadius params.scale
	, options)

	$('canvas').onGesture("three:pinch", (params) ->
		changeRadius params.scale
	, options)
=======
		
		
	$('canvas').onGesture "dragend", (params) ->
		dragEnd(params)
		firsttime = true
		
	$('canvas').onGesture "doubletap", (params) ->
		add(params.fingers[0].x, params.fingers[0].y)
		
	$('canvas').onGesture "tap,tap,tap", (params) ->
		validate()
	
	$('canvas').onGesture "three:flick:down", (params) ->
		clear()
	
	$('canvas').onGesture "two:spread", (params) ->
		changeRadiusSelection params.scale

	$('canvas').onGesture "two:pinch", (params) ->
		changeRadiusSelection params.scale
	
	$('canvas').onGesture "three:spread", (params) ->
		changeRadius params.scale

	$('canvas').onGesture "three:pinch", (params) ->
		changeRadius params.scale
>>>>>>> master

	style = {}
	allPoint = []
	point = {}
	allvalidatePoint = []
	dPoint = {}
<<<<<<< HEAD
	drag = null
=======
	drag = null	
>>>>>>> master
	style =
		curve:
			width: 4
			color: "#333"
<<<<<<< HEAD

=======
			
>>>>>>> master
		cpline:
			width: 1
			color: "#C00"
		point:
			radius: 15
<<<<<<< HEAD
			radiusSelected: 35
=======
			radiusSelected: 35 
>>>>>>> master
			width: 2
			color: "#900"
			colorSelected: "#AAA"
			fill: "rgba(200,200,200,0.5)"
			arc1: 0
			arc2: 2 * Math.PI

	addTwoPoint = (a,b) ->
		point1 =
			p:
				x: a.x
				y: a.y
			cp:
				x: (a.x + 50)
				y: (a.y + 50)
				selected: false
			validate: false
		point2 =
			p:
				x: b.x
				y: b.y
			cp:
				x: (b.x + 50)
				y: (b.y + 50)
				selected: false
			validate: false
		allPoint.push point1
		allPoint.push point2
		##default styles
		drawCanvas()
<<<<<<< HEAD

	drawCanvas = ->
		ctx.clearRect(0, 0, canvas.width, canvas.height)
=======
		
	drawCanvas = ->
		ctx.clearRect(0, 0, canvas.width, canvas.height)			
>>>>>>> master
		for i in [0..allPoint.length - 1]
			if allPoint[i] and allPoint[i].validate == false
				if allPoint[i].p
					ctx.lineWidth = style.cpline.width
					ctx.strokeStyle = style.cpline.color
					ctx.beginPath()
					ctx.moveTo(allPoint[i].p.x, allPoint[i].p.y)
					ctx.lineTo(allPoint[i].cp.x, allPoint[i].cp.y)
					ctx.stroke()
					ctx.closePath()
					ctx.lineWidth = style.point.width
					ctx.strokeStyle = style.point.color
					ctx.fillStyle = style.point.fill
					ctx.beginPath()
					radius = if(allPoint[i].p.selected == true) then style.point.radiusSelected else style.point.radius
					ctx.arc(allPoint[i].p.x, allPoint[i].p.y, radius, style.point.arc1, style.point.arc2, true)
					ctx.fill()
					ctx.stroke()
					ctx.beginPath()
					radius = if(allPoint[i].cp.selected == true) then style.point.radiusSelected else style.point.radius
					ctx.arc(allPoint[i].cp.x, allPoint[i].cp.y, radius, style.point.arc1, style.point.arc2, true)
					ctx.fill()
					ctx.stroke()
					ctx.closePath()
			if allPoint[i] and allPoint[i].validate == false and allPoint[i + 1]
				ctx.lineWidth = style.curve.width
				ctx.strokeStyle = style.curve.color
				ctx.beginPath()
				ctx.moveTo(allPoint[i].p.x, allPoint[i].p.y)
				ctx.bezierCurveTo(allPoint[i].cp.x, allPoint[i].cp.y, allPoint[i + 1].cp.x, allPoint[i + 1].cp.y, allPoint[i + 1].p.x, allPoint[i + 1].p.y)
				ctx.stroke()
				ctx.closePath()
			if allPoint[i] and allPoint[i].validate == true and allPoint[i + 1] and allPoint[i].group == allPoint[i + 1].group
				ctx.lineWidth = style.curve.width
				ctx.strokeStyle = style.curve.color
				ctx.beginPath()
				ctx.moveTo(allPoint[i].p.x, allPoint[i].p.y)
				ctx.bezierCurveTo(allPoint[i].cp.x, allPoint[i].cp.y, allPoint[i + 1].cp.x, allPoint[i + 1].cp.y, allPoint[i + 1].p.x, allPoint[i + 1].p.y)
				ctx.stroke()
				ctx.closePath()

	dragStart = (event) ->
		e =
			x: event.fingers[0].x
			y: event.fingers[0].y
		dx = dy = 0
		for value of allPoint
			if allPoint[value].validate == false
				if allPoint[value].p
					dx = allPoint[value].p.x - e.x
					dy = allPoint[value].p.y - e.y
					dcx = allPoint[value].cp.x - e.x
					dcy = allPoint[value].cp.y - e.y
					if ((dx * dx) + (dy * dy) < style.point.radiusSelected * style.point.radiusSelected and allPoint[value].p.selected == true)
						drag = allPoint[value].p
						dPoint = e
						return
					if ((dcx * dcx) + (dcy * dcy) < style.point.radiusSelected * style.point.radiusSelected and allPoint[value].cp.selected == true)
						drag = allPoint[value].cp
						dPoint = e
						return
<<<<<<< HEAD

=======
	
>>>>>>> master
	dragging = (event) ->
		if drag?
			e =
				x: event.fingers[0].x
				y: event.fingers[0].y
			drag.x += e.x - dPoint.x
			drag.y += e.y - dPoint.y
			dPoint = e
			drawCanvas()
<<<<<<< HEAD

	dragEnd = (e) ->
		drag = null
		drawCanvas()

=======
				
	dragEnd = (e) ->
		drag = null
		drawCanvas()
	
>>>>>>> master
	selectPoint = (x,y) ->
		e =
			x: x
			y: y
		dx = dy = 0
		for value of allPoint
			if allPoint[value].p
				allPoint[value].p.selected = false
				allPoint[value].cp.selected = false
			if allPoint[value].validate == false
				if allPoint[value].p
					dx = allPoint[value].p.x - e.x
					dy = allPoint[value].p.y - e.y
					dcx = allPoint[value].cp.x - e.x
					dcy = allPoint[value].cp.y - e.y
					if ((dx * dx) + (dy * dy) < style.point.radius * style.point.radius)
						allPoint[value].p.selected = true
						drag = allPoint[value].p
						dPoint = e
						drawCanvas()
						return
					if ((dcx * dcx) + (dcy * dcy) < style.point.radius * style.point.radius)
						allPoint[value].cp.selected = true
						drag = allPoint[value].cp
						dPoint = e
						drawCanvas()
						return
<<<<<<< HEAD

	clear = ->
		ctx.clearRect(0, 0, canvas.width, canvas.height)
		allPoint = []

=======
			
	clear = ->
		ctx.clearRect(0, 0, canvas.width, canvas.height)
		allPoint = []
		
>>>>>>> master
	add = (x,y) ->
		point =
			p:
				x: x
				y: y
				selected: false
			cp:
				x: (x + 50)
				y: (y + 50)
				selected: false
			validate: false
		allPoint.push(point)
		drawCanvas()
<<<<<<< HEAD

=======
	
>>>>>>> master
	changeRadiusSelection = (scale) ->
		s = style.point.radiusSelected * (if scale > 1 then 1.1 else 0.9)
		if 25 < s < 80
			style.point.radiusSelected = s
		drawCanvas()
<<<<<<< HEAD

=======
	
>>>>>>> master
	changeRadius = (scale) ->
		s = style.point.radius * (if scale > 1 then 1.1 else 0.9)
		if 10 < s < 80
			style.point.radius = s
		drawCanvas()
<<<<<<< HEAD

	j = 0

=======
	
	j = 0
	
>>>>>>> master
	validate = ->
		ctx.clearRect(0, 0, canvas.width, canvas.height)
		for i in [0..allPoint.length - 1]
			allPoint[i].validate = true if allPoint[i]
			if !allPoint[i].group
				allPoint[i].group = j
		j++
		drawCanvas()

