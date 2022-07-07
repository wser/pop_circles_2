let can,
  ctx,
  canX = [],
  canY = [],
  bubble = [],
  mouseIsDown = 0,
  len = 0,
  width = 500,
  height = 500;

function init() {
  can = document.getElementById('can');
  ctx = can.getContext('2d');
  can.width = width;
  can.height = height;

  can.addEventListener('mousedown', mouseDown, false);
  can.addEventListener('mousemove', mouseXY, false);
  can.addEventListener('touchstart', touchDown, false);
  can.addEventListener('touchmove', touchXY, true);
  can.addEventListener('touchend', touchUp, false);

  document.body.addEventListener('mouseup', mouseUp, false);
  document.body.addEventListener('touchcancel', touchUp, false);

  for (let i = 0; i < 4; i++) {
    bubble[i] = 0;
  }
  animate();
}

function mouseUp() {
  mouseIsDown = 0;
  mouseXY();
}

function mouseDown() {
  mouseIsDown = 1;
  mouseXY();
}

function touchDown() {
  mouseIsDown = 1;
  touchXY();
}

function touchUp() {
  //mouseIsDown = 0;
  // no touch to track, so just show state
  if (!e) e = event;
  len = e.targetTouches.length;
  // showPos();
}

function mouseXY(e) {
  if (!e) e = event;
  let rect = can.getBoundingClientRect();
  canX[0] = e.pageX - rect.left;
  canY[0] = e.pageY - rect.top;
  len = 1;
  // showPos();
}

function touchXY(e) {
  if (!e) e = event;
  e.preventDefault();
  len = e.targetTouches.length;
  let rect = can.getBoundingClientRect();
  for (let i = 0; i < len; i++) {
    canX[i] = e.targetTouches[i].pageX - rect.left;
    canY[i] = e.targetTouches[i].pageY - rect.top;
  }
  // showPos();
}

// function showPos() {
//   // large, centered, bright green text
//   ctx.font = '24pt Helvetica';
//   ctx.textAlign = 'center';
//   ctx.textBaseline = 'middle';
//   ctx.fillStyle = 'rgb(64,255,64)';
//   let str = canX + ', ' + canY;
//   if (mouseIsDown) str += ' down';
//   if (!mouseIsDown) str += ' up';
//   ctx.clearRect(0, 0, can.width, can.height);
//   // draw text at center, max length to fit on canvas
//   ctx.fillText(str, can.width / 2, can.height / 2, can.width - 10);
//   // plot cursor
//   ctx.fillStyle = 'white';
//   ctx.fillRect(canX - 5, canY - 5, 10, 10);
// }

function animate() {
  ctx.strokeStyle = 'red';
  ctx.clearRect(0, 0, can.width, can.height);
  // create a path for each bubble
  for (let i = 0; i < 4; i++) {
    bubble[i]++;
    if (bubble[i] >= can.height + 10) bubble[i] = -10;
    let y = bubble[i];
    let x = (i + 1) * 50;
    let radius = 20;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.closePath();
    // test each extant touch to see if it is on the bubble
    for (let j = 0; j < len; j++) {
      if (ctx.isPointInPath(canX[j], canY[j]) && mouseIsDown) bubble[i] = -30;
    }
    ctx.stroke();
  }
  setTimeout(animate, 40);
}

window.addEventListener('load', init());
