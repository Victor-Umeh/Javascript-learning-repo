const btn = document.querySelector("button");

function random() {
  return Math.trunc(Math.random() * 256);
}
function random2() {
  return Math.trunc(Math.random() * 256);
}
console.log(random());

btn.addEventListener("click", () => {
  const rndColor = `rgb(${random()},${random()},${random()})`;
  const rndColor2 = `rgb(${random2()},${random2()},${random2()})`;
  btn.style.backgroundColor = rndColor2;
  document.body.style.backgroundColor = rndColor;
});
