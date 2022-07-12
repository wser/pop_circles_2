import { button } from './button.js';

const can = document.getElementById('can');
const ctx = can.getContext('2d');

let pos = { x: 0, y: 0 };
let buttonDown = false;
let evt = () => alert('hello');

function init() {
  resize();

  can.addEventListener('mousedown', getRandomInt, false);
  can.addEventListener('mousedown', setPosition, false);
  //can.addEventListener('mousemove', drawLine, false);
  can.addEventListener('mouseup', released, false);

  can.addEventListener('touchstart', getRandomInt, false);
  can.addEventListener('touchstart', setPosition, false);
  //can.addEventListener('touchmove', drawLine, false);
  can.addEventListener('touchend', released, false);
  // prettier-ignore
  button(can, ctx, 'start', 40, ctx.canvas.width / 2 - 100, ctx.canvas.height / 2 - 50, 200, 100, evt);
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
  ctx.closePath();

  ctx.stroke();
}

function resize() {
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
}

window.addEventListener('resize', resize());
window.addEventListener('load', init());

let circleColor, circleArea, totalArea, restartButton;
let circleFilling = false;
let end = false;
let circleSize = 0;
let totalPixl = 0;
let perct = 0;
let bg = 0;
let sat = 50;
let touchended = false;
let touchstarted = false;
const circles = [];
const diameter = 20;

/* P5.js implemented functions */
function setup() {
  pixelDensity(displayDensity());
  colorMode(RGB, 128);

  restart();

  centerCanvas();

  restartButton = createButton('restart');
  restartButton.mousePressed(restart);
}

function draw() {
  background(230); // set can background color / clear can
  //background(bg, sat, 100); // interactive background
  restartButton.hide(); // hide reset button

  if (circleFilling && !end) {
    endConditions(); // check if end condition exists

    fill(circleColor); // fill circle with color
    circle(mouseX, mouseY, circleSize); // make circle
    circleSize += diameter; // increase speed of circle diameter growth
  }

  showScore(); // display current score results in front of circles

  for (const c of circles) c.draw(); // draw all circles in the array of circles

  if (end) {
    textAlign(CENTER);
    restartButton.position(
      (windowWidth - width) / 2 + can.width / 2 - 80,
      (windowHeight - height) / 2 + can.height / 2 + 80
    );
    restartButton.size(160, 50);
    restartButton.show();

    endText();
  }
}

function touchEnded() {
  if (touches.length == 0) {
    touchended = true;
    touchstarted = false;
  }
  onEnd();
}

function mouseReleased() {
  onEnd();
}

function windowResized() {
  centerCanvas();
}

/////////////////////////////
/* custom functions*/

function handleMouseAndTouch() {
  bg = map(mouseX, 0, width, 0, 360);
  sat = map(mouseY, 0, height, 0, 100);
  circleSize = 0; // initial circle size
  circleColor = color(random(255), random(255), random(255)); // set that circle random color to fill with
  circleFilling = true; // start to fill circle
  touchstarted = true;
  touchended = false;
  return false;
}

function centerCanvas() {
  restart();
}

function restart() {
  end = false; // set to not end
  circles.length = 0; // reset array
  totalArea = 0; //reset global counter
  perct = 0;
  circleSize = 0;
  totalPixl = windowWidth * windowHeight;

  can = createCanvas(windowWidth, windowHeight); // redraw can / clear all

  strokeWeight(1); // line thickness of circle

  if (is_touch_enabled()) return can.touchStarted(() => handleMouseAndTouch());
  else return can.mousePressed(() => handleMouseAndTouch());
}

function showScore() {
  textAlign(LEFT);
  fill(50);
  textSize(12);

  text('Total pixels: ' + numberWithDots(round(totalPixl)) + ' pixels', 20, 20);
  text(
    'Colored area: ' +
      numberWithDots(round(totalArea)) +
      ' pixels || ' +
      perct +
      '%',
    20,
    40
  );
  text('Circles : ' + circles.length, 20, 60);
}

function endText() {
  textAlign(CENTER);
  fill(50);
  textSize(14);

  text(
    'FINAL SCORE: ' + numberWithDots(round(totalArea)) + ' pixels',
    can.width / 2,
    can.height / 2 - 40
  );

  text(
    'TOTAL NUMBER OF CREATED CIRCLES: ' + circles.length,
    can.width / 2,
    can.height / 2 + 20
  );

  textSize(36);
  text('YOU ARE: ' + getAwardLvl(), can.width / 2, can.height / 2);

  stroke(255, 204, 0);
  strokeWeight(4);
}

function getAwardLvl() {
  // prettier-ignore
  const awards = [
    'begginer','junior','amateur','professional','senior','expert','...you rule','amazing','insane','unbelievable','worship',
  ];
  let level = 0;
  // add calculation for award
  if (circles.length > 2 || totalArea > 5000) level = 1;
  if (circles.length > 2 || totalArea > 10000) level = 2;
  if (circles.length > 3 || totalArea > 50000) level = 3;
  if (circles.length > 4 || totalArea > 100000) level = 4;
  if (circles.length > 5 || totalArea > 500000) level = 5;
  if (circles.length > 6 || totalArea > 1000000) level = 6;
  if (circles.length > 7 || totalArea > 2000000) level = 7;
  if (circles.length > 8 || totalArea > 3000000) level = 8;
  if (circles.length > 9 || totalArea > 4000000) level = 9;
  if (circles.length > 10 || totalArea > 5000000) level = 10;

  return awards[level].toUpperCase();
}

function endConditions() {
  const overlappingCircle = getOverlappingCircle();
  if (overlappingCircle) {
    circleFilling = false; // stop filling if circles collide
    circles.splice(circles.indexOf(overlappingCircle), 1); // remove active circle and touched one
    end = true;
  }

  if (isOffCanvas()) {
    circleFilling = false; // stop drawing if is offscreen
    end = true;
  }
}

function getOverlappingCircle() {
  for (const c of circles)
    if (dist(c.x, c.y, mouseX, mouseY) < circleSize * 0.5 + c.size * 0.5 + 2)
      return c;

  return undefined;
}

function isOffCanvas() {
  return (
    mouseX < circleSize / 2 ||
    mouseX > width - circleSize / 2 ||
    mouseY < circleSize / 2 ||
    mouseY > height - circleSize / 2
  );
}

function onEnd() {
  if (circleFilling && !end) {
    circles.push(new Circle(mouseX, mouseY, circleSize, circleColor)); // if not touched, add to an array
  }
  circleFilling = false; // stop filling the circle

  calcArea(); // calculate coloured area
  return false;
}

function calcArea() {
  totalArea = 0;
  for (const c of circles) {
    circleArea = (c.size * 0.5) ** 2 * PI; // area of a every circle r2*pi
    totalArea += circleArea;
  }

  perct = ((totalArea / totalPixl) * 100).toFixed(2);
}

function numberWithDots(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function is_touch_enabled() {
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0
  );
}

class Circle {
  constructor(x, y, size, color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
  }

  draw() {
    fill(this.color);
    circle(this.x, this.y, this.size);
    //ellipse(this.x, this.y, this.size, this.size);
    if (end) this.color.setAlpha(128 + 128 * sin(millis() / 500));
  }
}
