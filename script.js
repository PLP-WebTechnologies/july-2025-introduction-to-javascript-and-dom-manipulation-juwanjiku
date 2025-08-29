// ---variables and a simple conditional---
const appName = "Simple JS demo";
let itemCount = 0;
const title = document.getElementById("title");
const greeting = new Date().getHours() < 12 ? "Good morning" : "Hello";
title.textContent = 'Hi! Welcome to javascript.';   // DOM interaction

// ---wiring up buttons---
document.getElementById("calcBtn").addEventListener("click", handleCalc);
document.getElementById("addBtn").addEventListener("click", addItem);
document.getElementById("goBtn").addEventListener("click", startCountdown);

// ---functions ---
function parseNumbers(str) {
  // loop: build an array via for...of
  const out = [];
  for (const piece of str.split(/[,\s]+/).filter(Boolean)) {
    const n = Number(piece);
    if (!Number.isNaN(n)) out.push(n);
  }
  return out;
}

function calcStats(arr) {
  // loop: classic for...of to aggregate
  let sum = 0, min = Infinity, max = -Infinity;
  for (const n of arr) {
    sum += n;
    if (n < min) min = n;
    if (n > max) max = n;
  }
  // loop: index-based for to count evens/odds
  let evens = 0, odds = 0;
  for (let i = 0; i < arr.length; i++) (arr[i] % 2 === 0 ? evens++ : odds++);
  return { sum, avg: arr.length ? sum / arr.length : 0, min, max, evens, odds };
}

// ---functions + DOM interactions ---
function handleCalc() {
  const nums = parseNumbers(document.getElementById("nums").value);
  const s = calcStats(nums);
  document.getElementById("stats").textContent =
    nums.length
      ? `Count: ${nums.length} | Sum: ${s.sum} | Avg: ${s.avg.toFixed(2)} | Min: ${s.min} | Max: ${s.max} | Evens: ${s.evens} | Odds: ${s.odds}`
      : "Please enter some numbers."; // DOM interaction
}

function addItem() {
  const input = document.getElementById("item");
  const txt = input.value.trim();
  if (!txt) return;

  const li = document.createElement("li"); // DOM interaction
  itemCount++;
  li.textContent = `${itemCount}. ${txt}`;
  document.getElementById("list").appendChild(li); // DOM interaction
  input.value = "";

  // Refresh indices (DOM loop)
  [...document.getElementById("list").children].forEach((el, i) => {
    el.dataset.index = i + 1;
  });
}

function startCountdown() {
  let n = Math.max(1, Number(document.getElementById("start").value) || 5);
  const out = document.getElementById("count");
  out.textContent = `Starting at ${n}…`;
  const id = setInterval(() => {
    out.textContent = n === 0 ? "Lift off!" : `…${n}`;
    if (n-- === 0) clearInterval(id);
  }, 300); // DOM interaction
}
