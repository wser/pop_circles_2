import { button } from './button.js';

const can = document.getElementById('can');
const ctx = can.getContext('2d');

let pos = { x: 0, y: 0 };
let buttonDown = false;

function init() {
  resize();

  can.addEventListener('mousedown', getRandomInt, false);
  can.addEventListener('touchstart', getRandomInt, false);

  can.addEventListener('mousemove', drawLine, false);
  can.addEventListener('mousedown', setPosition, false);
  can.addEventListener('mouseup', released, false);

  can.addEventListener('touchstart', setPosition, false);
  can.addEventListener('touchmove', drawLine, false);
  can.addEventListener('touchend', released, false);

  button(can, ctx, 'start', 40, 350, 350, 200, 100);
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

function resize() {
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
}

window.addEventListener('resize', resize);
window.addEventListener('load', init());
