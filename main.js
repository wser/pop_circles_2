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

//   showScoreText(); // display current score results in front of circles

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

// function showScoreText() {
//   ctx.font = '12px Arial';

//   ctx.fillText(
//     'Total pixels: ' + numberWithDots(Math.round(totalPixl)) + ' pixels',
//     20,
//     20
//   );
//   ctx.fillText(
//     'Colored area: ' +
//       numberWithDots(Math.round(totalArea)) +
//       ' pixels || ' +
//       perct +
//       '%',
//     20,
//     40
//   );
//   ctx.fillText('Circles : ' + circles.length, 20, 60);
// }

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

// function numberWithDots(x) {
//   return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
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

var canvas = document.getElementById('can');
var context = canvas.getContext('2d');
var circles = []; // An empty array to hold our circles
let pos = { x: 0, y: 0 };

// add click handler
canvas.onclick = function (e) {
  pos = getMousePos(canvas, e);
  addCircle(pos.x, pos.y);
};

function addCircle(mouse_x, mouse_y) {
  // First, we check if there is any intersection with existing circles
  for (var i = circles.length - 1; i > 0; i--) {
    var circle = circles[i],
      distance = getDistance(circle.x, circle.y, mouse_x, mouse_y);

    // If distance is less than radius times two, then we know its a collision
    if (distance < 60) {
      circles.splice(i, 1); // Remove the element from array
    }
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
  context.clearRect(0, 0, canvas.width, canvas.height);

  for (var i = circles.length - 1; i > 0; i--) {
    var circle = circles[i];

    context.fillStyle = circle.color;
    context.beginPath();
    context.arc(circle.x, circle.y, 30, 0, 2 * Math.PI);
    context.fill();
  }
}

// Function to get distance between two points
function getDistance(x1, y1, x2, y2) {
  // Distance formula
  return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
}

function randomColor() {
  var color = [];
  for (var i = 0; i < 3; i++) {
    color.push(Math.floor(Math.random() * 256));
  }
  return 'rgb(' + color.join(',') + ')';
}

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top,
  };
}
