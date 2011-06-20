## Methods helper for the Analyzer
##
## Copyright (c) 2011
## Publication date: 06/17/2011
##		Pierre Corsini (pcorsini@polytech.unice.fr)
##		Nicolas Dupont (npg.dupont@gmail.com)
##		Nicolas Fernandez (fernande@polytech.unice.fr)
##		Nima Izadi (nim.izadi@gmail.com)	
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

# OK
Object.swap = (obj1, obj2) ->
	temp = obj2
	obj2 = obj1
	obj1 = obj2

# OK
distanceBetweenTwoPoints = (x1, y1, x2, y2) -> 
	Math.sqrt(((x2 - x1) * (x2 - x1)) + ((y2 - y1) * (y2 - y1)))

# COMMENT: Si on a une diagonale (deltaX == deltaY et != 0) le comportement est à préciser dans la doc de la fonction.
#          On peut envisager d'ailleurs trois quadrant pour le déplacement plutôt que deux : horizontal, diagonal et vertical... Si cela apporte quelquechose.
getDirection = (deltaX, deltaY) ->
	if deltaX == deltaY == 0
		return "unknown"
	if Math.abs(deltaX) > Math.abs(deltaY)
		## Horizontal
		if deltaX < 0 then "left" else "right"
	else
		if deltaY < 0 then "up" else "down"


# OK
getDragDirection = (finger) ->
	deltaX = finger.params.x - finger.positions[finger.positionCount - 1].x
	deltaY = finger.params.y - finger.positions[finger.positionCount - 1].y
	getDirection deltaX, deltaY	

# COMMENT:  Pensez à systématiquement commenter ce type de fermetures même simple, peu de developpeurs on l'habitude de lire des fermetures 
#           comme cela et peuvent se demander ce que fait vraiment cette fonction même si cela a l'air simple. 
digit_name = (->
	names = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten']
	(n) -> 
		names[n])()
