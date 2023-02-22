const btn = document.querySelector("button");
//random number generator
const random = () => {
  return Math.trunc(Math.random() * 256);
};
//Function for shuffling
function shuffleN(value) {
  const shuffle = String(value).split("").reverse().join("");

  if (shuffle <= 256) {
    return Number(shuffle);
  } else {
    return random();
  }
}

const dn = random();
console.log(dn);
console.log(shuffleN(dn));

btn.addEventListener("click", () => {
  const rndColor = `rgb(${random()},${random()},${random()})`;
  const rndColor2 = `rgb(${shuffleN(dn)},${shuffleN(dn)},${shuffleN(dn)})`;

  btn.style.backgroundColor = rndColor2;
  document.body.style.backgroundColor = rndColor;
});
