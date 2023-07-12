function calculate(ele) {
  let slectPrice = ele.parentNode.parentNode.children[0].children[1];
  ele.style.background = `linear-gradient(to right, #000 0%, #000 ${
    ((ele.value - ele.min) / (ele.max - ele.min)) * 100
  }%, #DEE2E6 ${
    ((ele.value - ele.min) / (ele.max - ele.min)) * 100
  }%, #DEE2E6 100%)`;
  // Result in percentage
  if (ele.id === "interest") {
    slectPrice.innerHTML = `${ele.value}%`;
  } else if (ele.id === "year") {
    slectPrice.innerHTML = `${ele.value} Years`;
  } else {
    slectPrice.innerHTML = ele.value;
  }
  calculateResult();
}

function calculateResult() {
  let unit = document.getElementById("unit").value * 1;
  if (!unit) {
    // Metric
    let widthPipe__met =
      document.getElementById("widthPipe__met").value * 1;
    let lengthPipe__met =
      document.getElementById("lengthPipe__met").value * 1;
    let wrapWidth__met =
      document.getElementById("wrapWidth__met").value * 1;
    let overlap__met = document.getElementById("overlap__met").value * 1;
    let resultInFeet =
      ((2 * (3.145 * (widthPipe__met / 2) * lengthPipe__met)) /
        (wrapWidth__met - overlap__met) /
        12 +
        overlap__met) /
      25.4;
    let resultInMeter = resultInFeet / 3.281;
    document.getElementById("imperialRes").innerHTML =
      resultInFeet.toFixed(2) + " feet";
    document.getElementById("metricRes").innerHTML =
      resultInMeter.toFixed(2) + " meters";
  } else {
    // Imperial
    let widthPipe__imp =
      document.getElementById("widthPipe__imp").value * 1;
    let lengthPipe__imp =
      document.getElementById("lengthPipe__imp").value * 1;
    let wrapWidth__imp =
      document.getElementById("wrapWidth__imp").value * 1;
    let overlap__imp = document.getElementById("overlap__imp").value * 1;
    let resultInFeet =
      (2 * (3.145 * (widthPipe__imp / 2) * lengthPipe__imp)) /
        (wrapWidth__imp - overlap__imp) /
        12 +
      overlap__imp;
    let resultInMeter = resultInFeet / 3.281;
    document.getElementById("imperialRes").innerHTML =
      resultInFeet.toFixed(2) + " feet";
    document.getElementById("metricRes").innerHTML =
      resultInMeter.toFixed(2) + " meters";
  }
  return;
}
function changeUnit() {
  let unit = document.getElementById("unit").value * 1;
  if (!unit) {
    document.getElementById("metric__container").style.display = "block";
    document.getElementById("imperial__container").style.display = "none";
  } else {
    document.getElementById("metric__container").style.display = "none";
    document.getElementById("imperial__container").style.display =
      "block";
  }
  calculateResult();
}
calculateResult();