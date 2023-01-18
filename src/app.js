import { gsap } from "gsap";

const sliderContainer = document.querySelector(".slider");
const sliderTexts = document.querySelectorAll(".slider-text");
const bgColors = ["#C6BFFA", "#D6E6E4", "#F6C985"];
const mask = document.querySelector(".mask");
const maskContainer = document.querySelector(".mask-container");
const sliderItems = document.querySelectorAll(".slider-item");
const prevButton = document.querySelector(".prev-button");
const nextButton = document.querySelector(".next-button");

let currentItem = 0;
let currentText = 0;

const changeBgColor = () => {
  gsap.to(maskContainer, {
    backgroundColor: bgColors[currentItem],
    duration: 1.5,
    ease: "power2.inOut",
  });
};

const checkCurrentText = () => {
  sliderTexts.forEach((text) => text.classList.remove("is-active"));
  sliderTexts[currentText].classList.add("is-active");
};

const translateSlider = () => {
  gsap.to(sliderContainer, {
    x: -100 * currentItem + "%",
  });
};

const animationMask = () => {
  mask.style = `animation-name: morph-${currentItem + 1}`;
};

const moveToNext = () => {
  // se suma 1 al índice actual, se divide entre el total de elementos en el slider y se toma el resto de esta 
  // operación, de esta manera se garantiza que el índice no supere el total de elementos en el slider y 
  // vuelve al primer elemento si se llega al final.
  currentItem = (currentItem + 1) % sliderItems.length;
  currentText = (currentText + 1) % sliderTexts.length;
  animationMask();
  checkCurrentText();
  changeBgColor();
  translateSlider();
};

const moveToPrev = () => {
  // Se suma el total de elementos menos 1 al índice actual y se divide entre el total de elementos en el slider (sliderItems.length)
  // y se toma el resto de esta operación, de esta manera se garantiza que el índice no sea menor a 0 y vuelve al último elemento
  //  si se llega al principio.  Ej: (0 + 3 - 1) % 3 = 2 % 3 = 2
  // De esta manera se evita tener que usar condicionales para determinar el índice anterior y siguiente en el slider 
  // y se garantiza que siempre se estará trabajando con un índice válido.
  currentItem = (currentItem + sliderItems.length - 1) % sliderItems.length;
  currentText = (currentText + sliderTexts.length - 1) % sliderTexts.length;
  animationMask();
  checkCurrentText();
  changeBgColor();
  translateSlider();
};

prevButton.addEventListener("click", moveToPrev);
nextButton.addEventListener("click", moveToNext);
checkCurrentText();
changeBgColor();
