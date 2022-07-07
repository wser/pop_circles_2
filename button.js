//Function to get the mouse position
function getMousePos(canvas, event) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  };
}
//Function to check whether a point is inside a rectangle
function isInside(pos, rect) {
  return (
    pos.x > rect.x &&
    pos.x < rect.x + rect.w &&
    pos.y < rect.y + rect.h &&
    pos.y > rect.y
  );
}
//Function that draws a button
function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
  if (typeof stroke == 'undefined') {
    stroke = true;
  }
  if (typeof radius === 'undefined') {
    radius = 5;
  }
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  if (stroke) {
    ctx.stroke();
  }
  if (fill) {
    ctx.fill();
  }
}

function button(canvas, ctx, text, fontSize, x, y, w, h) {
  //The rectangle should have x,y,width,height properties
  var rect = { x, y, w, h };
  //Binding the click event on the canvas
  canvas.addEventListener(
    'click',
    function (evt) {
      isInside(getMousePos(canvas, evt), rect)
        ? alert('clicked inside rect')
        : alert('clicked outside rect');
    },
    false
  );

  //border of button
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#000000';
  ctx.fillStyle = '#abc';

  roundRect(ctx, rect.x, rect.y, rect.w, rect.h, 5, true);

  //text decoration
  ctx.font = fontSize + 'px Georgia';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#000000';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, rect.x + rect.w / 2, rect.y + rect.h / 2);
}

export { button };
