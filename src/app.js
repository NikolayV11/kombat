const $circle = document.querySelector("#circle");
const $score = document.querySelector("#score");

let i = 0;

function start() {
  setScore(getScore());
  setImage();
}

function setScore(score) {
  localStorage.setItem("score", score);
  $score.textContent = score;
}

function getScore() {
  return Number(localStorage.getItem("score")) ?? 0;
}

function addOne() {
  setScore(getScore() + 10);
  setImage();
}

function setImage() {
  if (getScore() >= 50) {
    $circle.setAttribute("src", "./assets/lizzard.png");
  }
}

$circle.addEventListener("click", (event) => {
  const rect = $circle.getBoundingClientRect();

  i += 1;
  // координаты клика по осям X/Y
  const offsetX = event.clientX - rect.left - rect.width / 2;
  const offsetY = event.clientY - rect.top - rect.height / 2;
  // console.log(
  //   `offsetX: ${offsetX}, offsetY: ${offsetY}, rect.width: ${rect.width}, rect.height: ${rect.height}, event.clientX: ${event.clientX}`,
  // );

  // угол отклона изображения
  const DEG = 40;

  const tiltX = (offsetY / rect.height) * DEG;
  const tiltY = (offsetX / rect.width) * -DEG;

  $circle.style.setProperty("--tilt-X", `${tiltX}deg`);
  $circle.style.setProperty("--tilt-Y", `${tiltY}deg`);
  console.log(tiltX, tiltY);

  setTimeout(() => {
    $circle.style.setProperty("--tilt-X", `0deg`);
    $circle.style.setProperty("--tilt-Y", `0deg`);
  }, 300);

  // добавление +1 на изображение
  const plusOne = document.createElement("div");
  plusOne.classList.add("plus-one");
  plusOne.textContent = "+10";

  // позиционируем его где был клик
  plusOne.style.left = `${event.clientX - rect.left - 30}px`;
  plusOne.style.top = `${event.clientY - rect.top - 18}px`;

  //  добавляем к $circle наш plusOne
  $circle.parentElement.appendChild(plusOne);
  setTimeout(() => {
    plusOne.remove();
  }, 2000);
  addOne();
});

start();
