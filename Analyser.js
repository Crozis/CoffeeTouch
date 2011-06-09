(function() {
  /*
  #------------------------------------------------------------------------------------------------------------------------------ State
  */  var Analyser, Drag, EventGrouper, EventRouter, FingerGesture, FirstTouch, Fixed, GenericState, NoTouch, StateMachine, distanceBetweenTwoPoints, getDirection;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  StateMachine = (function() {
    function StateMachine(identifier, router) {
      this.identifier = identifier;
      this.router = router;
      this.currentState = new NoTouch(this);
      this.analyser = new Analyser;
    }
    StateMachine.prototype.apply = function(eventName, eventObj) {
      return this.currentState.apply(eventName, eventObj);
    };
    StateMachine.prototype.setState = function(newState) {
      return this.currentState = newState;
    };
    StateMachine.prototype.getState = function() {
      return this.currentState;
    };
    return StateMachine;
  })();
  GenericState = (function() {
    GenericState.prototype.description = function() {
      return "Generic state";
    };
    GenericState.prototype.init = function() {};
    function GenericState(machine) {
      this.machine = machine;
      if (this.machine.currentState != null) {
        this.eventObj = this.machine.currentState.eventObj;
      } else {
        this.eventObj = {};
      }
      this.init();
    }
    GenericState.prototype.apply = function(eventName, arg) {
      Object.merge(this.eventObj, arg);
      return this[eventName]();
    };
    GenericState.prototype.touchstart = function() {};
    GenericState.prototype.touchmove = function() {};
    GenericState.prototype.touchend = function() {};
    GenericState.prototype.notify = function(name) {
      return this.machine.router.broadcast(name, this.eventObj);
    };
    return GenericState;
  })();
  NoTouch = (function() {
    function NoTouch() {
      NoTouch.__super__.constructor.apply(this, arguments);
    }
    __extends(NoTouch, GenericState);
    NoTouch.prototype.description = function() {
      return "NoTouch state";
    };
    NoTouch.prototype.touchstart = function() {
      return this.machine.setState(new FirstTouch(this.machine));
    };
    return NoTouch;
  })();
  FirstTouch = (function() {
    function FirstTouch() {
      FirstTouch.__super__.constructor.apply(this, arguments);
    }
    __extends(FirstTouch, GenericState);
    FirstTouch.prototype.description = function() {
      return "FirstTouch state";
    };
    FirstTouch.prototype.init = function() {
      var _machine;
      _machine = this.machine;
      this.fixedtimer = setTimeout((function() {
        return _machine.setState(new Fixed(_machine));
      }), 500);
      this.eventObj.initX = this.eventObj.clientX;
      return this.eventObj.initY = this.eventObj.clientY;
    };
    FirstTouch.prototype.touchend = function() {
      clearTimeout(this.fixedtimer);
      this.notify("tap");
      return this.machine.setState(new NoTouch(this.machine));
    };
    FirstTouch.prototype.touchmove = function() {
      clearTimeout(this.fixedtimer);
      this.notify("drag");
      return this.machine.setState(new Drag(this.machine));
    };
    return FirstTouch;
  })();
  Fixed = (function() {
    function Fixed() {
      Fixed.__super__.constructor.apply(this, arguments);
    }
    __extends(Fixed, GenericState);
    Fixed.prototype.description = function() {
      return "Fixed state";
    };
    Fixed.prototype.init = function() {
      return this.notify("fixed");
    };
    return Fixed;
  })();
  Drag = (function() {
    function Drag() {
      Drag.__super__.constructor.apply(this, arguments);
    }
    __extends(Drag, GenericState);
    Drag.prototype.description = function() {
      return "Drag state";
    };
    Drag.prototype.init = function() {
      var that;
      this.isTap = true;
      this.initialX = this.eventObj.clientX;
      this.initialY = this.eventObj.clientY;
      this.delta = 25;
      that = this;
      return setTimeout((function() {
        return that.isTap = false;
      }), 150);
    };
    Drag.prototype.touchmove = function() {
      return this.notify("drag");
    };
    Drag.prototype.touchend = function() {
      if (this.isTap && (Math.abs(this.eventObj.clientX - this.initialX) < this.delta) && (Math.abs(this.eventObj.clientY - this.initialY) < this.delta)) {
        this.notify("tap");
      } else {
        this.notify("dragend");
      }
      return this.machine.setState(new NoTouch(this.machine));
    };
    return Drag;
  })();
  
function dump(arr,level) {
		var dumped_text = "["
		for(var item in arr) {
			var value = arr[item];
			if(typeof(value)=='function') continue;
			dumped_text += item + "=" + value + " ";
		}

	return dumped_text + "]";
}
function print_r(obj) {
  win_print_r = window.open('about:blank', 'win_print_r');
  win_print_r.document.write('<html><body>');
  r_print_r(obj, win_print_r);
  win_print_r.document.write('</body></html>');
 }

 function r_print_r(theObj, win_print_r) {
  if(theObj.constructor == Array ||
   theObj.constructor == Object){
   if (win_print_r == null)
    win_print_r = window.open('about:blank', 'win_print_r');
   }
   for(var p in theObj){
    if(theObj[p].constructor == Array||
     theObj[p].constructor == Object){
     win_print_r.document.write("<li>["+p+"] =>"+typeof(theObj)+"</li>");
     win_print_r.document.write("<ul>")
     r_print_r(theObj[p], win_print_r);
     win_print_r.document.write("</ul>")
    } else {
     win_print_r.document.write("<li>["+p+"] =>"+theObj[p]+"</li>");
    }
   }
  win_print_r.document.write("</ul>")
 }

Object.prototype.keys = function ()
{
  var keys = [];
  for(var i in this) if (this.hasOwnProperty(i))
  {
    keys.push(i);
  }
  return keys;
}

Object.merge = function(destination, source) {
    for (var property in source) {
        if (source.hasOwnProperty(property)) {
            destination[property] = source[property];
        }
    }
    return destination;
};
;
  EventRouter = (function() {
    function EventRouter(element) {
      var that;
      this.element = element;
      this.grouper = new EventGrouper;
      this.machines = {};
      that = this;
      this.element.addEventListener("touchstart", function(event) {
        return that.touchstart(event);
      });
      this.element.addEventListener("touchend", function(event) {
        return that.touchend(event);
      });
      this.element.addEventListener("touchmove", function(event) {
        return that.touchmove(event);
      });
    }
    EventRouter.prototype.touchstart = function(event) {
      var i, iMachine, _i, _len, _ref, _results;
      event.preventDefault();
      _ref = event.changedTouches;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        i = _ref[_i];
        _results.push(!(this.machines[i.identifier] != null) ? (iMachine = new StateMachine(i.identifier, this), iMachine.apply("touchstart", i), this.machines[i.identifier] = iMachine, this.fingerCount = event.touches.length) : void 0);
      }
      return _results;
    };
    EventRouter.prototype.touchend = function(event) {
      var exists, iMKey, iTouch, _i, _j, _len, _len2, _ref, _ref2, _results;
      event.preventDefault();
      _ref = this.machines.keys();
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        iMKey = _ref[_i];
        iMKey = parseInt(iMKey);
        exists = false;
        _ref2 = event.touches;
        for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
          iTouch = _ref2[_j];
          if (iTouch.identifier === iMKey) {
            exists = true;
          }
        }
        _results.push(!exists ? (this.machines[iMKey].apply("touchend", {}), delete this.machines[iMKey]) : void 0);
      }
      return _results;
    };
    EventRouter.prototype.touchmove = function(event) {
      var i, iMachine, _i, _len, _ref, _results;
      event.preventDefault();
      _ref = event.changedTouches;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        i = _ref[_i];
        if (!(this.machines[i.identifier] != null)) {
          iMachine = new StateMachine(i.identifier, this);
          iMachine.apply("touchstart", i);
          this.machines[i.identifier] = iMachine;
        }
        _results.push(this.machines[i.identifier].apply("touchmove", i));
      }
      return _results;
    };
    EventRouter.prototype.broadcast = function(name, eventObj) {
      return this.grouper.receive(name, eventObj, this.fingerCount, this.element);
    };
    return EventRouter;
  })();
  EventGrouper = (function() {
    function EventGrouper() {
      this.savedTap = {};
    }
    EventGrouper.prototype.receive = function(name, eventObj, fingerCount, element) {
      if (this.fingerCount !== fingerCount) {
        this.fingerCount = fingerCount;
        this.analyser = new Analyser(this.fingerCount, element);
      }
      if (name === "tap") {
        if ((this.savedTap[eventObj.identifier] != null) && ((new Date().getTime()) - this.savedTap[eventObj.identifier].time) < 400) {
          this.send("doubleTap", eventObj);
        } else {
          this.savedTap[eventObj.identifier] = {};
          this.savedTap[eventObj.identifier].event = eventObj;
          this.savedTap[eventObj.identifier].time = new Date().getTime();
        }
      }
      return this.send(name, eventObj);
    };
    EventGrouper.prototype.send = function(name, eventObj) {
      return this.analyser.notify(eventObj.identifier, name, eventObj);
    };
    return EventGrouper;
  })();
  Object.swap = function(obj1, obj2) {
    var temp;
    temp = obj2;
    obj2 = obj1;
    return obj1 = obj2;
  };
  distanceBetweenTwoPoints = function(x1, y1, x2, y2) {
    return Math.sqrt(((x2 - x1) * (x2 - x1)) + ((y2 - y1) * (y2 - y1)));
  };
  getDirection = function(deltaX, deltaY) {
    if (deltaX > 0 && deltaY < 0) {
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        return "right";
      } else {
        return "up";
      }
    }
    if (deltaX > 0 && deltaY > 0) {
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        return "right";
      } else {
        return "down";
      }
    }
    if (deltaX < 0 && deltaY < 0) {
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        return "left";
      } else {
        return "up";
      }
    }
    if (deltaX < 0 && deltaY > 0) {
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        return "left";
      } else {
        return "down";
      }
    }
    return "diagonal";
  };
  FingerGesture = (function() {
    function FingerGesture(fingerId, gestureName, eventObj) {
      var date;
      this.fingerId = fingerId;
      this.gestureName = gestureName;
      date = new Date();
      this.params = {};
      this.params.startX = eventObj.clientX;
      this.params.startY = eventObj.clientY;
      this.params.timeStart = date.getTime();
      this.params.timeElasped = 0;
      this.updatePosition(eventObj);
    }
    FingerGesture.prototype.update = function(gestureName, eventObj) {
      var date;
      this.gestureName = gestureName;
      date = new Date();
      this.params.timeElasped = date.getTime() - this.params.timeStart;
      return this.updatePosition(eventObj);
    };
    FingerGesture.prototype.updatePosition = function(eventObj) {
      this.params.x = eventObj.clientX;
      return this.params.y = eventObj.clientY;
    };
    return FingerGesture;
  })();
  Analyser = (function() {
    function Analyser(totalNbFingers, targetElement) {
      this.totalNbFingers = totalNbFingers;
      this.targetElement = targetElement;
      this.fingersArray = {};
      this.fingers = [];
      this.firstAnalysis = true;
    }
    Analyser.prototype.notify = function(fingerID, gestureName, eventObj) {
      this.eventObj = eventObj;
      if (this.fingersArray[fingerID] != null) {
        this.fingersArray[fingerID].update(gestureName, this.eventObj);
      } else {
        this.fingersArray[fingerID] = new FingerGesture(fingerID, gestureName, this.eventObj);
        this.fingers.push(this.fingersArray[fingerID]);
      }
      if (_.size(this.fingersArray) === this.totalNbFingers) {
        return this.analyse(this.totalNbFingers);
      }
    };
    Analyser.prototype.analyse = function(nbFingers) {
      switch (nbFingers) {
        case 1:
          return this.oneFingerGesture(this.fingersArray);
        case 2:
          return this.twoFingersGesture(this.fingersArray);
        case 3:
          return this.threeFingersGesture(this.fingersArray);
        case 4:
          return this.fourFingersGesture(this.fingersArray);
        case 5:
          return this.fiveFingersGeture(this.fingersArray);
        default:
          throw "We do not analyse more than 5 fingers";
      }
    };
    /*----------------------------------------------------------------------------------------------------------------
    	## One Finger Gesture
    	*/
    Analyser.prototype.oneFingerGesture = function() {
      var deltaX, deltaY, finger, key;
      for (key in this.fingersArray) {
        if (this.fingersArray.hasOwnProperty(key)) {
          finger = this.fingersArray[key];
        }
      }
      this.informations = {
        first: finger.params,
        global: {}
      };
      switch (finger.gestureName) {
        case "tap":
          this.informations.global.type = "tap";
          break;
        case "doubleTap":
          this.informations.global.type = "doubleTap";
          break;
        case "fixed":
          this.informations.global.type = "fixed";
          break;
        case "drag":
          deltaX = finger.params.x - finger.params.startX;
          deltaY = finger.params.y - finger.params.startY;
          this.informations.global.type = getDirection(deltaX, deltaY);
      }
      return this.targetElement.trigger(this.informations.global.type, this.informations);
    };
    /*----------------------------------------------------------------------------------------------------------------
    	## Two Finger Gesture
    	*/
    Analyser.prototype.twoFingersGesture = function() {
      var a1, a2, b1, b2, deltaX, deltaX1, deltaX2, deltaY, deltaY1, deltaY2, gestureName, i, key, type;
      i = 0;
      gestureName = "";
      if (this.firstAnalysis) {
        for (key in this.fingersArray) {
          if (this.fingersArray.hasOwnProperty(key)) {
            i++;
            if (i === 1) {
              this.firstFinger = this.fingersArray[key];
            }
            if (i === 2) {
              this.secondFinger = this.fingersArray[key];
            }
          }
        }
        if (Math.abs(this.secondFinger.params.startX - this.firstFinger.params.startX) < 20) {
          if (this.firstFinger.params.startY > this.secondFinger.params.startY) {
            Object.swap(this.firstFinger, this.secondFinger);
          }
        } else if (this.firstFinger.params.startX > this.secondFinger.params.startX) {
          Object.swap(this.firstFinger, this.secondFinger);
        }
        this.informations = {
          first: this.firstFinger.params,
          second: this.secondFinger.params,
          global: {
            scale: 1,
            initialDistance: distanceBetweenTwoPoints(this.firstFinger.params.startX, this.firstFinger.params.startY, this.secondFinger.params.startX, this.secondFinger.params.startY)
          }
        };
        this.informations.global.distance = distanceBetweenTwoPoints(this.firstFinger.params.x, this.firstFinger.params.y, this.secondFinger.params.x, this.secondFinger.params.y);
        this.firstAnalysis = false;
      }
      gestureName = this.firstFinger.gestureName + "," + this.secondFinger.gestureName;
      switch (gestureName) {
        case "tap,tap":
          this.informations.global.type = "tap,tap";
          this.targetElement.trigger("two:tap", this.informations);
          break;
        case "doubleTap,doubleTap":
          this.informations.global.type = "" + this.firstFinger.gestureName + "," + this.secondFinger.gestureName;
          this.targetElement.trigger("two:doubleTap", this.informations);
          break;
        case "fixed,tap":
        case "tap,fixed":
          this.informations.global.type = "" + this.firstFinger.gestureName + "," + this.secondFinger.gestureName;
          break;
        case "fixed,doubleTap":
        case "doubleTap,fixed":
          this.informations.global.type = "" + this.firstFinger.gestureName + "," + this.secondFinger.gestureName;
          break;
        case "fixed,drag":
        case "drag,fixed":
          this.informations.global.distance = distanceBetweenTwoPoints(this.firstFinger.params.x, this.firstFinger.params.y, this.secondFinger.params.x, this.secondFinger.params.y);
          if (this.firstFinger.gestureName === "fixed") {
            deltaX = this.secondFinger.params.x - this.secondFinger.params.startX;
            deltaY = this.secondFinger.params.y - this.secondFinger.params.startY;
            this.informations.global.type = "fixed," + (getDirection(deltaX, deltaY));
          } else {
            deltaX = this.firstFinger.params.x - this.firstFinger.params.startX;
            deltaY = this.firstFinger.params.y - this.firstFinger.params.startY;
            this.informations.global.type = "" + (getDirection(deltaX, deltaY)) + ",fixed";
          }
          break;
        case "doubleTap,doubleTap":
          this.informations.global.type = "doubleTap,doubleTap";
          break;
        case "fixed,fixed":
          this.informations.global.type = "fixed,fixed";
          break;
        case "drag,drag":
          this.informations.global.distance = distanceBetweenTwoPoints(this.firstFinger.params.x, this.firstFinger.params.y, this.secondFinger.params.x, this.secondFinger.params.y);
          this.informations.global.scale = this.informations.global.distance / this.informations.global.initialDistance;
          a1 = (this.firstFinger.params.startY - this.firstFinger.params.y) / (this.firstFinger.params.startX - this.firstFinger.params.x);
          a2 = (this.secondFinger.params.y - this.secondFinger.params.startY) / (this.secondFinger.params.x - this.secondFinger.params.startX);
          b1 = this.firstFinger.params.y - (a1 * this.firstFinger.params.x);
          b2 = this.secondFinger.params.y - (a2 * this.secondFinger.params.x);
          if (this.informations.global.scale < 0.8) {
            this.informations.global.type = "pinch";
          } else if (this.informations.global.scale > 1.2) {
            this.informations.global.type = "spread";
          } else {
            deltaX1 = this.firstFinger.params.x - this.firstFinger.params.startX;
            deltaY1 = this.firstFinger.params.y - this.firstFinger.params.startY;
            deltaX2 = this.secondFinger.params.x - this.secondFinger.params.startX;
            deltaY2 = this.secondFinger.params.y - this.secondFinger.params.startY;
            type = "" + (getDirection(deltaX1, deltaY1)) + "," + (getDirection(deltaX2, deltaY2));
            switch (type) {
              case "right,left":
                this.informations.global.type = "rotate:cw";
                break;
              case "left,right":
                this.informations.global.type = "rotate:ccw";
                break;
              case "up,down":
                this.informations.global.type = "rotate:cw";
                break;
              case "down,up":
                this.informations.global.type = "rotate:ccw";
                break;
              default:
                this.informations.global.type = type;
            }
          }
      }
      return this.targetElement.trigger(this.informations.global.type, this.informations);
    };
    /*----------------------------------------------------------------------------------------------------------------
    	## Three Finger Gesture
    	*/
    Analyser.prototype.threeFingersGesture = function() {
      var gestureName, i;
      i = 0;
      gestureName = "";
      if (this.firstAnalysis) {
        this.fingers = this.fingers.sort(function(a, b) {
          return a.params.startX - b.params.startX;
        });
        this.informations = {
          first: this.fingers[0].params,
          second: this.fingers[1].params,
          third: this.fingers[2].params,
          global: {}
        };
        this.firstAnalysis = false;
      }
      gestureName = "" + this.fingers[0].gestureName + "," + this.fingers[1].gestureName + "," + this.fingers[2].gestureName;
      switch (gestureName) {
        case "tap,tap,tap":
          this.informations.global.type = "tap,tap,tap";
          this.targetElement.trigger("three:tap", this.informations);
          break;
        case "fixed,fixed,fixed":
          this.informations.global.type = "fixed,fixed,fixed";
          this.targetElement.trigger("three:fixed", this.informations);
      }
      return this.targetElement.trigger(this.informations.global.type, this.informations);
    };
    return Analyser;
  })();
  window.onload = function() {
    var $, xAngle, yAngle;
    $ = function(element) {
      return document.getElementById(element);
    };
    yAngle = 0;
    new EventRouter(document.getElementById("body"));
    xAngle = 0;
    yAngle = 0;
    $('body').bind("left", function(a, params) {
      yAngle -= 90;
      return $('cube').style.webkitTransform = " rotateX(" + xAngle + "deg) rotateY(" + yAngle + "deg)";
    });
    $('body').bind("right", function(a, params) {
      yAngle += 90;
      return $('cube').style.webkitTransform = "rotateX(" + xAngle + "deg) rotateY(" + yAngle + "deg)";
    });
    $('body').bind("up", function(a, params) {
      xAngle += 90;
      return $('cube').style.webkitTransform = "rotateX(" + xAngle + "deg) rotateY(" + yAngle + "deg)";
    });
    return $('body').bind("down", function(a, params) {
      xAngle += 90;
      return $('cube').style.webkitTransform = "rotateX(" + xAngle + "deg) rotateY(" + yAngle + "deg)";
    });
  };
}).call(this);
