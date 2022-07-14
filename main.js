// import { button } from './button.js';

// const can = document.getElementById('can');
// const ctx = can.getContext('2d');

// let circleColor, circleArea, totalArea, restartButton;
// let circleFilling = false;
// let end = false;
// let circleSize = 0;
// let totalPixl = 0;
// let perct = 0;
// let mouseX, mouseY;

// let touchended = false;
// let touchstarted = false;
// const circles = [];
// const diameter = 20;

// let pos = { x: 0, y: 0 };
// let buttonDown = false;
// let evt = () => alert('hello');

// function init() {
//   resize();
//   restart();

//   // prettier-ignore
//   restartButton = button(can, ctx, 'start', 40, ctx.canvas.width / 2 - 100, ctx.canvas.height / 2 - 50, 200, 100, evt);
//   restartButton.hide();

//   can.addEventListener('mousedown', setPosition, false);
//   can.addEventListener('mousedown', handleMouseAndTouch, false);
//   //can.addEventListener('mousemove', drawLine, false);
//   can.addEventListener('mouseup', released, false);

//   can.addEventListener('touchstart', setPosition, false);
//   can.addEventListener('touchstart', handleMouseAndTouch, false);
//   //can.addEventListener('touchmove', drawLine, false);
//   can.addEventListener('touchend', released, false);

//   if (circleFilling && !end) {
//     endConditions(); // check if end condition exists

//     new Circle(mouseX, mouseY, circleSize, circleColor);

//     ctx.fill(circleColor); // fill circle with color
//     ctx.arc(mouseX, mouseY, circleSize); // make circle
//     circleSize += diameter; // increase speed of circle diameter growth
//   }

//   for (const c of circles) c.init(); // draw all circles in the array of circles

//   if (end) {
//     restartButton.show();
//     endText();
//   }
// }

// function getRandomInt() {
//   return Math.floor(Math.random() * Math.floor(3));
// }

// function released(e) {
//   buttonDown = false;
// }

// function setPosition(e) {
//   if (e.type == 'touchstart' || e.type == 'mousedown') buttonDown = true;

//   if (e.type == 'touchstart' || e.type == 'touchmove') {
//     pos.x = e.touches[0].clientX;
//     mouseX = pos.x;
//     pos.y = e.touches[0].clientY;
//     mouseY = pos.y;
//   } else {
//     mouseX = pos.x = e.clientX;
//     mouseX = pos.x;
//     mouseY = pos.y = e.clientY;
//     mouseY = pos.y;
//   }
// }

// function resize() {
//   ctx.canvas.width = window.innerWidth;
//   ctx.canvas.height = window.innerHeight;
// }

// window.addEventListener('resize', resize());
// window.addEventListener('load', init());

// /////////////////////////////
// /* custom functions*/

// function handleMouseAndTouch() {
//   let rnd = getRandomInt();

//   let colory;
//   // prettier-ignore
//   switch (rnd) {
//     case 1: colory = 'green'; break;
//     case 2: colory = 'red';   break;
//     case 0: colory = 'blue';  break;
//   }

//   onEnd();

//   circleSize = 0; // initial circle size
//   circleColor = colory; //(random(255), random(255), random(255)); // set that circle random color to fill with
//   circleFilling = true; // start to fill circle
//   touchstarted = true;
//   touchended = false;
//   return false;
// }

// function restart() {
//   end = false; // set to not end
//   circles.length = 0; // reset array
//   totalArea = 0; //reset global counter
//   perct = 0;
//   circleSize = 0;
//   totalPixl = window.innerWidth * window.innerHeight;

//   if (!buttonDown) return;

//   ctx.clearRect(0, 0, can.width, can.height); // redraw can / clear all

//   ctx.stroke(); // line thickness of circle

//   handleMouseAndTouch();
// }

// function endConditions() {
//   const overlappingCircle = getOverlappingCircle();
//   if (overlappingCircle) {
//     circleFilling = false; // stop filling if circles collide
//     circles.splice(circles.indexOf(overlappingCircle), 1); // remove active circle and touched one
//     end = true;
//   }

//   if (isOffCanvas()) {
//     circleFilling = false; // stop drawing if is offscreen
//     end = true;
//   }
// }

// function getOverlappingCircle() {
//   for (const c of circles)
//     if (dist(c.x, c.y, mouseX, mouseY) < circleSize * 0.5 + c.size * 0.5 + 2)
//       return c;

//   return undefined;
// }

// function isOffCanvas() {
//   return (
//     mouseX < circleSize / 2 ||
//     mouseX > width - circleSize / 2 ||
//     mouseY < circleSize / 2 ||
//     mouseY > height - circleSize / 2
//   );
// }

// function onEnd() {
//   if (circleFilling && !end) {
//     circles.push(new Circle(mouseX, mouseY, circleSize, circleColor)); // if not touched, add to an array
//   }
//   circleFilling = false; // stop filling the circle

//   calcArea(); // calculate coloured area
//   return false;
// }

// function calcArea() {
//   totalArea = 0;
//   for (const c of circles) {
//     circleArea = (c.size * 0.5) ** 2 * Math.PI; // area of a every circle r2*pi
//     totalArea += circleArea;
//   }

//   perct = ((totalArea / totalPixl) * 100).toFixed(2);
// }

// class Circle {
//   constructor(x, y, size, color) {
//     this.x = x;
//     this.y = y;
//     this.size = size;
//     this.color = color;
//   }

//   draw() {
//     fill(this.color);
//     circle(this.x, this.y, this.size);
//     //ellipse(this.x, this.y, this.size, this.size);
//     if (end) this.color.setAlpha(128 + 128 * sin(millis() / 500));
//   }
// }
////////////////////////////////////////////////
////////////////////////////////////////////////

/**
 * TODO: classes
 *  GameFrame
 *  InputHandler
 *  Circle
 */
// Get the canvas and 2d context
var canvas = document.getElementById('can'),
  ctx = canvas.getContext('2d'),
  circles = [], // An empty array to hold our circles
  buttonDown = false,
  totalPixl = 0,
  totalArea = 0,
  perct = 0,
  radius = 15;

let pts = { x: 0, y: 0 };
let init = () => cls();
let numberWithDots = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
let getDistance = (x1, y1, x2, y2) => Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2); // Distance formula
// let randomColor = () => '#' + (((1 << 24) * Math.random()) | 0).toString(16);
let randomColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16);
let resize = () => {
  ctx.canvas.width = window.innerWidth - 20;
  ctx.canvas.height = window.innerHeight - 20;
};

// clear
let cls = function () {
  resize();
  //ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'lightgray'; // fill canvas with color
  ctx.fillRect(0, 0, canvas.width, canvas.height);
};

var handleTap = function (e) {
  pointerAdjust(e);
  //let color;
  //e.changedTouches ? (color = 'red') : (color = 'blue');
  addCircle(pts.x, pts.y);
  showScoreText(); // display current score results in front of circles
};

function addCircle(mouse_x, mouse_y) {
  // First, we check if there is any intersection with existing circles
  for (var i = circles.length - 1; i > 0; i--) {
    var circle = circles[i],
      distance = getDistance(circle.x, circle.y, mouse_x, mouse_y);

    // If distance is less than radius times two, then we know its a collision
    if (distance < radius * 2) circles.splice(i, 1); // Remove the element from array
  }

  // Second, we push the new circle in the array
  circles.push({
    x: mouse_x,
    y: mouse_y,
    color: randomColor(),
  });

  // Third, we draw based on what circles we have in the array
  drawCircles();
}

function drawCircles() {
  // We'll have to clear the canvas as it has deleted circles as well
  //ctx.clearRect(0, 0, canvas.width, canvas.height);
  cls();

  for (var i = circles.length - 1; i > 0; i--) {
    radius = 0;
    var circle = circles[i];

    ctx.fillStyle = circle.color;
    ctx.beginPath();

    if (buttonDown) radius += 10;
    ctx.arc(circle.x, circle.y, radius, 0, 2 * Math.PI);
    ctx.fill();
  }
}

function growCircle(r) {
  r = radius;
}

/**
 * award area
 */
// function getAwardLvl() {
//   // prettier-ignore
//   const awards = [
//     'begginer','junior','amateur','professional','senior','expert','...you rule','amazing','insane','unbelievable','worship',
//   ];
//   let level = 0;
//   // add calculation for award
//   if (circles.length > 2 || totalArea > 5000) level = 1;
//   if (circles.length > 2 || totalArea > 10000) level = 2;
//   if (circles.length > 3 || totalArea > 50000) level = 3;
//   if (circles.length > 4 || totalArea > 100000) level = 4;
//   if (circles.length > 5 || totalArea > 500000) level = 5;
//   if (circles.length > 6 || totalArea > 1000000) level = 6;
//   if (circles.length > 7 || totalArea > 2000000) level = 7;
//   if (circles.length > 8 || totalArea > 3000000) level = 8;
//   if (circles.length > 9 || totalArea > 4000000) level = 9;
//   if (circles.length > 10 || totalArea > 5000000) level = 10;

//   return awards[level].toUpperCase();
// }

/**
 * Text functions
 */
function showScoreText() {
  ctx.font = '12px Arial';
  ctx.fillStyle = 'red';
  // prettier-ignore
  ctx.fillText(
    'Total pixels: ' + numberWithDots(Math.round(totalPixl)) + ' pixels', 20, 20
  );
  // prettier-ignore
  ctx.fillText(
    'Colored area: ' +
      numberWithDots(Math.round(totalArea)) + ' pixels || ' + perct + '%',
    20, 40
  );
  let amount = circles.length ? circles.length - 1 : 1;
  ctx.fillText('Circles : ' + amount, 20, 60);
}

// function endText() {
//   ctx.font = '14px Arial';

//   ctx.fillText(
//     'FINAL SCORE: ' + numberWithDots(Math.round(totalArea)) + ' pixels',
//     can.width / 2,
//     can.height / 2 - 40
//   );

//   ctx.fillText(
//     'TOTAL NUMBER OF CREATED CIRCLES: ' + circles.length,
//     can.width / 2,
//     can.height / 2 + 20
//   );

//   ctx.font = '36px Arial';
//   ctx.fillText('YOU ARE: ' + getAwardLvl(), can.width / 2, can.height / 2);

//   ctx.strokeStyle = `rgb(255, 204, 0)`;
//   ctx.lineWidth = 4;
//   ctx.stroke();
// }

/**
 * tap events
 */

var pointerAdjust = function (e) {
  e.preventDefault();
  var bx = e.target.getBoundingClientRect();

  // checking for touch
  if (e.changedTouches) {
    pts.x = e.changedTouches[0].clientX;
    pts.y = e.changedTouches[0].clientY;
  } else {
    //assuming mouse
    pts.x = e.clientX;
    pts.y = e.clientY;
  }
  // adjust to make values relative to target element
  // to which this handler is attached to rather than window
  pts.x -= bx.left;
  pts.y -= bx.top;
};

var tapStart = function (e) {
  cls();
  buttonDown = true;
  e.preventDefault();
  handleTap(e);
};

var tapMove = function (e) {
  if (buttonDown) {
    e.preventDefault();
    handleTap(e);
  }
};

var tapEnd = function (e) {
  //console.log(e.timeStamp);
  buttonDown = false;
};

/**
 * attach events to canvas
 */
canvas.addEventListener('touchstart', tapStart, false);
canvas.addEventListener('touchmove', tapMove, false);
canvas.addEventListener('touchend', tapEnd, false);

canvas.addEventListener('mousedown', tapStart, false);
canvas.addEventListener('mousemove', tapMove, false);
canvas.addEventListener('mouseup', tapEnd, false);

canvas.addEventListener('load', init());
