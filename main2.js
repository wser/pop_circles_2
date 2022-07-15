const canvas = document.getElementById('can');
const ctx = canvas.getContext('2d');
const pi2 = Math.PI * 2;
const circles = [];
let circleSize = 0;
let newBall = 0;
let raf;
var buttonDown = false;
// prettier-ignore
let resize = () => {ctx.canvas.width = window.innerWidth - 40;ctx.canvas.height = window.innerHeight - 40;};
let getDistance = (x1, y1, x2, y2) => Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2); // Distance formula
let randomColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16);

let pts = { x: 0, y: 0 }; // updates on buttonDown

let ball = {
  x: 0,
  y: 0,
  radius: 0,
  color: 'blue',
  drawBall: function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, pi2, false);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  },
};

class Circle {
  constructor(x, y, size, color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
  }
}

function clear() {
  resize();
  ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function draw() {
  if (!buttonDown) {
    ball.x = pts.x;
    ball.y = pts.y;
    ball.color = randomColor();
  }

  ball.drawBall();
  ball.radius += 5;
  newBall = ball.radius;
  raf = window.requestAnimationFrame(draw);
  buttonDown = true;
}

var handleTap = function (e) {
  pointerAdjust(e); // adjust pointer to device mouse||touch
  ball.radius = 0; // reset radius before next draw
  addCircle();
  //showScoreText(); // display current score results in front of circles
};

function addCircle() {
  let circle;
  console.log(newBall);
  draw(); // execute drawBall and push to array

  // go trough all circles in array
  for (var i = 0; i < circles.length; i++) {
    circle = circles[i];
    let distance = getDistance(circle.x, circle.y, pts.x, pts.y);

    //const overlappingCircle = getOverlappingCircle(circle);
    //if (overlappingCircle) circles.splice(circles.indexOf(overlappingCircle), 1);

    // // if distance is less than radius times two, then we know its a collision
    if (distance < circle.radius * 2) circles.splice(circles[i], 1); // Remove the element from array
  }
  circles.push(new Circle(ball.x, ball.y, newBall.radius, ball.color));

  //console.log(circle);

  // draw based on what circles we have in the array
  //drawCircles(); // draw balls
}

function drawCircles() {
  // We'll have to clear the canvas as it has deleted circles as well
  //ctx.clearRect(0, 0, canvas.width, canvas.height);
  clear();

  for (var i = circles.length - 1; i > 0; i--) {
    var circle = circles[i];

    ctx.fillStyle = circle.color;
    ctx.beginPath();

    ctx.arc(circle.x, circle.y, circle.radius, 0, pi2);

    ctx.fill();
  }
}

function getOverlappingCircle(circle) {
  let dist;
  for (const c of circles) {
    dist = getDistance(c.x, c.y, circle.x, circle.y);
    if (dist < circle.size * 0.5 + c.size * 0.5 + 2) {
      return c;
    }
  }

  return undefined;
}

/**
 * tap events
 */

var pointerAdjust = function (e) {
  e.preventDefault();
  var bx = e.target.getBoundingClientRect();

  // checking for touch // not work on IE or Safari
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
  // buttonDown = true;
  e.preventDefault();
  handleTap(e);
};

var tapMove = function (e) {
  if (buttonDown) {
    e.preventDefault();
    //clear();
    // ball.x = pts.x;
    // ball.y = pts.y;
    // ball.draw();
    window.cancelAnimationFrame(raf);
    buttonDown = false;
  }
};

var tapEnd = function (e) {
  window.cancelAnimationFrame(raf);
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

canvas.addEventListener('load', clear());
