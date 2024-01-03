function calculate() {
  let chreq = updateError(
    "*Please select your gender",
    document.getElementById("gender")
  );
  if (!chreq) return;

  chreq = updateError("*Please enter your age", document.getElementById("age"));
  if (!chreq) return;
  chreq = updateError(
    "*Please enter your height",
    document.getElementById("heightFt")
  );
  if (!chreq) return;

  chreq = updateError(
    "*Please enter your height",
    document.getElementById("heightIn")
  );
  if (!chreq) return;

  chreq = updateError(
    "*Please enter your weight",
    document.getElementById("weightlbs")
  );
  if (!chreq) return;
  chreq = updateError(
    "*Please enter your body fat percentage",
    document.getElementById("bfp")
  );
  if (!chreq) return;

  let gender = document.getElementById("gender").value * 1;

  let weightlbs = document.getElementById("weightlbs").value * 1;
  let heightIn = document.getElementById("heightIn").value * 1;
  let heightFt = document.getElementById("heightFt").value * 1;
  let bfp = document.getElementById("bfp").value * 1;
  let weight = poundsToKilograms(weightlbs);
  let height = feetInchesToCentimeters(heightFt, heightIn);
  let age = document.getElementById("age").value * 1;
  let cactivity = document.getElementById("cactivity").value * 1;
  const BODYFATE = bfp / 100;
  let targetWeightPer = BODYFATE / 20;
  console.log(targetWeightPer, weight);
  let targetWeightLoss = targetWeightPer * weightlbs;
  let bmr = 0;
  let tdee = 0;
  let deficit_20 = 0;
  let protein = 0;
  let deficit_day = 0;
  let deficit_week = 0;
  let weightLoss = 0;
  if (gender) {
    bmr = 10 * weight + 6.25 * height - 5 * age;
    tdee = bmr * cactivity;
    deficit_20 = tdee * 0.7;
    protein = weightlbs * 0.8;
    deficit_day = tdee - deficit_20;
    deficit_week = deficit_day * 7;
    weightLoss = deficit_week / 3500;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    tdee = bmr * cactivity;
    deficit_20 = tdee * 0.7;
    protein = weightlbs * 0.8;
    deficit_day = tdee - deficit_20;
    deficit_week = deficit_day * 7;
    weightLoss = deficit_week / 3500;
  }

  document.getElementById("bmr").innerHTML = formateNumber(bmr);
  document.getElementById("tdee").innerHTML = formateNumber(tdee);
  document.getElementById("deficit_20").innerHTML = formateNumber(deficit_20);
  document.getElementById("protein").innerHTML = formateNumber(protein);
  document.getElementById("deficit_day").innerHTML = formateNumber(deficit_day);
  document.getElementById("deficit_week").innerHTML =
    formateNumber(deficit_week);
  document.getElementById("weightLoss").innerHTML = formateNumber(weightLoss);
}

function changeHeightUnit() {
  let unit =
    document.querySelector('input[name="height__unit"]:checked').value * 1;
  let heightCm = document.getElementById("height");
  let heightInch = document.getElementById("heightInc");
  if (unit) {
    // Convert from inch to cm
    heightInch.style.display = "none";
    heightCm.style.display = "block";
    heightCm.value = (heightInch.value * 1 * 2.54).toFixed(2);
  } else {
    // Convert from cm to inch
    heightInch.style.display = "block";
    heightCm.style.display = "none";
    heightInch.value = ((heightCm.value * 1) / 2.54).toFixed(2);
  }
  calculate();
}
function changeWeightUnit() {
  let unit =
    document.querySelector('input[name="weight__unit"]:checked').value * 1;
  let weightkg = document.getElementById("weight");
  let weightlbs = document.getElementById("weightlbs");
  if (unit) {
    // Convert from lbs to kg
    weightlbs.style.display = "none";
    weightkg.style.display = "block";
    weightkg.value = ((weightlbs.value * 1) / 2.205).toFixed(2);
  } else {
    // Convert from kg to lbs
    weightlbs.style.display = "block";
    weightkg.style.display = "none";
    weightlbs.value = (weightkg.value * 1 * 2.205).toFixed(2);
  }
  calculate();
}
function formateNumber(val) {
  if (isNaN(val)) return 0;
  if (!isFinite(val)) return 0;
  return formatter.format(val).replace("$", "");
}
var formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",

  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});
function poundsToKilograms(pounds) {
  // 1 pound is approximately equal to 0.453592 kilograms
  const kilograms = pounds / 2.2;
  return kilograms;
}
function feetInchesToCentimeters(feet, inches) {
  // 1 foot is equal to 30.48 centimeters
  // 1 inch is equal to 2.54 centimeters
  const centimeters = feet * 30.48 + inches * 2.54;
  return centimeters;
}
function updateError(msg, input) {
  console.log(input.value.trim() == "");
  if (input.value.trim() == "") {
    document.getElementById("error__block").innerHTML = msg;
    document.getElementById("error__block").style.display = "block";
    return false;
  }
  document.getElementById("error__block").style.display = "none";
  return true;
}
calculate();
