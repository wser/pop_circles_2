const canvas = document.getElementById('can');
const ctx = canvas.getContext('2d');
var raf;
var running = false;
let pts = { x: 0, y: 0 };
let resize = () => {
  ctx.canvas.width = window.innerWidth - 40;
  ctx.canvas.height = window.innerHeight - 40;
};

var ball = {
  x: pts.x,
  y: pts.y,
  radius: 25,
  color: 'blue',
  draw: function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
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
  clear();
  ball.draw();
  ball.radius += 1;

  raf = window.requestAnimationFrame(draw);
}

var handleTap = function (e) {
  pointerAdjust(e);
  //let color;
  //e.changedTouches ? (color = 'red') : (color = 'blue');

  if (!running) {
    ball.x = pts.x;
    ball.y = pts.y;
    raf = window.requestAnimationFrame(draw);
    running = true;
  }

  //addCircle(pts.x, pts.y);
  //showScoreText(); // display current score results in front of circles
};

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
  if (running) {
    e.preventDefault();
    ball.draw();
  }
};

var tapEnd = function (e) {
  window.cancelAnimationFrame(raf);
  running = false;
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
