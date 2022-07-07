const can = document.getElementById('can');
const ctx = can.getContext('2d');

let bubble = [];
let pos = { x: 0, y: 0 };
let buttonDown = false;

function init() {
  resize();

  can.addEventListener('mousedown', getRandomInt);
  can.addEventListener('touchstart', getRandomInt);

  window.addEventListener('resize', resize);

  document.addEventListener('mousemove', drawLine);
  document.addEventListener('mousedown', setPosition);
  document.addEventListener('mouseup', released);

  document.addEventListener('touchstart', setPosition);
  document.addEventListener('touchmove', drawLine);
  document.addEventListener('touchend', released);
}

function getRandomInt() {
  window.randInt = Math.floor(Math.random() * Math.floor(3));
}

function released(e) {
  buttonDown = false;
}

function setPosition(e) {
  if (e.type == 'touchstart' || e.type == 'mousedown') buttonDown = true;

  if (e.type == 'touchstart' || e.type == 'touchmove') {
    pos.x = e.touches[0].clientX;
    pos.y = e.touches[0].clientY;
  } else {
    pos.x = e.clientX;
    pos.y = e.clientY;
  }
}

function resize() {
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
}

function drawLine(e) {
  if (!buttonDown) return;

  var color = '';
  // prettier-ignore
  switch (window.randInt) {
    case 1: color = 'green'; break;
    case 2: color = 'red';   break;
    case 0: color = 'blue';  break;
  }

  ctx.beginPath();

  ctx.lineWidth = 3;
  ctx.lineCap = 'round';
  ctx.strokeStyle = color;

  ctx.moveTo(pos.x, pos.y);
  setPosition(e);
  ctx.lineTo(pos.x, pos.y);

  ctx.stroke();
}

window.addEventListener('load', init());
