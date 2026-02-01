const svg = document.getElementById("svgCanvas");
const colorPicker = document.getElementById("colorPicker");
const undoBtn = document.getElementById("undoBtn");
const countDisplay = document.getElementById("count");
let circles = [];
svg.addEventListener("mousedown", function (event) {
  const pt = svg.createSVGPoint();
  pt.x = event.clientX;
  pt.y = event.clientY;
  const ctm = svg.getScreenCTM();
  if (!ctm) return;
  const svgPoint = pt.matrixTransform(ctm.inverse());
  const circle = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle"
  );
  circle.setAttribute("cx", svgPoint.x);
  circle.setAttribute("cy", svgPoint.y);
  circle.setAttribute("r", 8);
  circle.setAttribute("fill", colorPicker.value);
  svg.appendChild(circle);
  circles.push(circle);
  countDisplay.textContent = circles.length;
});
undoBtn.addEventListener("click", function () {
  if (circles.length === 0) return;
  const last = circles.pop();
  svg.removeChild(last);
  countDisplay.textContent = circles.length;
});