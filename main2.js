const canvas = document.getElementById('can');
const ctx = canvas.getContext('2d');
var circles = [];
let end = true;
let raf;
var buttonDown = false;
let resize = () => {
  ctx.canvas.width = window.innerWidth - 40;
  ctx.canvas.height = window.innerHeight - 40;
};
let getDistance = (x1, y1, x2, y2) => Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2); // Distance formula
let randomColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16);

let pts = { x: 0, y: 0 };
var ball = {
  x: pts.x,
  y: pts.y,
  radius: 0,
  color: 'blue',
  draw: function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  },
};

function clear() {
  resize();
  ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function draw() {
  ball.radius += 10;
  if (!buttonDown) {
    ball.color = randomColor();
    ball.x = pts.x;
    ball.y = pts.y;

    buttonDown = true;
  }
  ball.draw();
  raf = window.requestAnimationFrame(draw);
}

var handleTap = function (e) {
  pointerAdjust(e); // adjust pointer to device mouse||touch
  ball.radius = 0; // reset radius before next draw
  draw(); // draw balls

  addCircle(e);
  //circles.push(ball);

  //console.log(circles);

  //showScoreText(); // display current score results in front of circles
};

function addCircle(e) {
  // check if there is any intersection with existing circles
  for (var i = circles.length - 1; i > 0; i--) {
    var circle = circles[i],
      distance = getDistance(e.x, e.y, ball.x, ball.y);

    // // if distance is less than radius times two, then we know its a collision
    if (distance < circle.radius * 2) {
      circles.splice(i, 1); // Remove the element from array
      //return;
    }
    // push the new circle in the array
    // prettier-ignore
    circles.push(circle.x, circle.y, circle.radius, circle.color);
  }
  console.log(circles);
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
    ball.draw();
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

class Circle {
  constructor(x, y, size, color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
  }
}
