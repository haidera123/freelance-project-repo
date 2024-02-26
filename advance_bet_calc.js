let type = "decimal_eq";
let typeOpt = "min__loss";
let category = "";
let color = "";
let emoji = "";
let label = "";

function sliderChange(ele) {
  ele.style.background = `linear-gradient(to right, #d8a800 0%, #d8a800 ${
    ((ele.value - ele.min) / (ele.max - ele.min)) * 100
  }%, #DEE2E6 ${
    ((ele.value - ele.min) / (ele.max - ele.min)) * 100
  }%, #DEE2E6 100%)`;
  document.getElementById("conversion").value = ele.value + "%";
}
function visualCueDisplay(category) {
  document.getElementById("not_great").style.display = "none";
  document.getElementById("arbalert").style.display = "none";
  document.getElementById("decent").style.display = "none";
  document.getElementById("hot").style.display = "none";
  document.getElementById("perfect_conv").style.display = "none";
  if (category == "Not Great") {
    document.getElementById("not_great").style.display = "block";
  }
  if (category == "Decent") {
    document.getElementById("decent").style.display = "block";
  }
  if (category == "Hot") {
    document.getElementById("hot").style.display = "block";
  }
  if (category == "Arb alert") {
    document.getElementById("arbalert").style.display = "block";
  }
  if (category == "Perfect Conversion") {
    document.getElementById("perfect_conv").style.display = "block";
  }
}
function calculateInsurance() {
  document.getElementById("slider__box").style.display = "block";
  let A2 = document.getElementById("book1odd").value * 1;
  let B2 = document.getElementById("book2odd").value * 1;
  let C3 = filterVal(document.getElementById("wager").value) * 1;
  let T3 = document.getElementById("conversion__slider").value / 100;
  let L3 = C3;
  let M3 = A2;
  let N3 = L3 * M3;
  let R3 = N3;
  let P3 = B2;

  let O3 = (R3 - T3 * L3) / P3;

  let V3 = R3 - L3 - (R3 - T3 * L3) / P3;

  let Q3 = O3 * P3;
  let U3 = V3;
  let D3 = O3;
  let F3 = U3;
  let threshold = V3 / C3;

  if (threshold == 0) {
    color = "#A45EE5";
    category = "Perfect Conversion";
    label = "PROFIT";
    emoji = "💯";
  } else if (threshold < 0.4) {
    color = "#B22222";
    category = "Not Great";
    emoji = "😭";
    label = "PROFIT";
  } else if (threshold > 0.4 && threshold <= 0.5) {
    color = "#F3C753";
    category = "Decent";
    emoji = "💵";
    label = "PROFIT";
  } else {
    color = "#228b22";
    category = "Hot";
    emoji = "🔥";
    label = "PROFIT";
  }
  document.getElementById("bet").innerHTML = formatter.format(
    replaceNaNInfinityUndefined(O3)
  );
  document.getElementById("payout").innerHTML = 0;
  document.getElementById("contribution__res").innerHTML = 0;
  document.getElementById("payout").style.display = "none";
  document.getElementById("contribution__res").style.display = "none";
  document.getElementById("J4_ele").innerHTML =
    emoji + formatter.format(replaceNaNInfinityUndefined(V3)) + emoji;
  document.getElementById("J4_ele").style.color = color;
  document.getElementById("dynamic_label").style.color = color;
  document.getElementById("dynamic_label").innerText = label;

  document.getElementById("K4_ele").style.display = "none";
  visualCueDisplay(category);
}

function calculateMinLoss() {
  document.getElementById("slider__box").style.display = "none";
  document.getElementById("K4_ele").style.display = "block";
  let A2 = document.getElementById("book1odd").value * 1;
  let B2 = document.getElementById("book2odd").value * 1;
  let C4 = filterVal(document.getElementById("wager").value) * 1;
  let G4 = C4 * A2;
  let D4 = G4 / B2;
  let H4 = D4 + C4;
  let J4 = H4 - G4;
  let K4 = J4 / H4;
  let threshold = +replaceNaNInfinityUndefined(K4);
  if (threshold == 0) {
    color = "#A45EE5";
    category = "Perfect Conversion";
    label = "LOSS";
    emoji = "💯";
  } else if (threshold < 0) {
    color = "#01796F";
    category = "Arb alert";
    emoji = "💰";
    label = "PROFIT";
    if (K4 < 0) K4 *= -1;
    if (J4 < 0) J4 *= -1;
  } else if (threshold > 0 && threshold < 0.01) {
    color = "#228b22";
    category = "Hot";
    label = "LOSS";
    if (K4 > 0) K4 *= -1;
    if (J4 > 0) J4 *= -1;
    emoji = "🔥";
  } else if (threshold >= 0.01 && threshold < 0.02) {
    color = "#F3C753";
    category = "Decent";
    label = "LOSS";
    emoji = "💵";
    if (K4 > 0) K4 *= -1;
    if (J4 > 0) J4 *= -1;
  } else {
    color = "#B22222";
    category = "Not Great";
    label = "LOSS";
    emoji = "😭";
    if (K4 > 0) K4 *= -1;
    if (J4 > 0) J4 *= -1;
  }
  document.getElementById("payout").style.display = "block";
  document.getElementById("contribution__res").style.display = "block";
  document.getElementById("bet").innerHTML = formatter.format(
    replaceNaNInfinityUndefined(D4)
  );
  document.getElementById("payout").innerHTML = formatter.format(
    replaceNaNInfinityUndefined(G4)
  );
  document.getElementById("contribution__res").innerHTML = formatter.format(
    replaceNaNInfinityUndefined(H4)
  );
  if (category == "Arb alert") {
    document.getElementById("J4_ele").innerHTML =
      emoji + "+" + formatter.format(replaceNaNInfinityUndefined(J4)) + emoji;
    document.getElementById("K4_ele").innerHTML =
      "+" + (replaceNaNInfinityUndefined(K4) * 100).toFixed(2) + "%";
  } else {
    document.getElementById("J4_ele").innerHTML =
      emoji + formatter.format(replaceNaNInfinityUndefined(J4)) + emoji;
    document.getElementById("K4_ele").innerHTML =
      (replaceNaNInfinityUndefined(K4) * 100).toFixed(2) + "%";
  }

  document.getElementById("J4_ele").style.color = color;
  document.getElementById("dynamic_label").style.color = color;
  document.getElementById("dynamic_label").innerText = label;
  document.getElementById("K4_ele").style.color = color;
  visualCueDisplay(category);
}
function calculateMaxProfit() {
  document.getElementById("slider__box").style.display = "none";
  document.getElementById("K4_ele").style.display = "block";

  let A2 = document.getElementById("book1odd").value * 1;
  let B2 = document.getElementById("book2odd").value * 1;
  let C5 = filterVal(document.getElementById("wager").value) * 1;
  let D5 = (C5 * A2 - C5) / B2;
  let G5 = C5 * A2 - C5;
  let H5 = D5;
  let I5 = G5 - H5;
  let K5 = I5 / C5;
  let threshold = +replaceNaNInfinityUndefined(K5);
  if (threshold == 0) {
    color = "#A45EE5";
    category = "Perfect Conversion";
    label = "LOSS";
    emoji = "💯";
  } else if (threshold < 0.7) {
    color = "#B22222";
    category = "Not Great";
    emoji = "😭";
    label = "LOSS";
  } else if (threshold >= 0.7 && threshold <= 0.75) {
    color = "#F3C753";
    category = "Decent";
    emoji = "💵";
    label = "LOSS";
  } else {
    color = "#228b22";
    category = "Hot";
    emoji = "🔥";
    label = "LOSS";
  }
  document.getElementById("payout").style.display = "block";
  document.getElementById("contribution__res").style.display = "block";
  document.getElementById("bet").innerHTML = formatter.format(
    replaceNaNInfinityUndefined(D5)
  );
  document.getElementById("payout").innerHTML = formatter.format(
    replaceNaNInfinityUndefined(G5)
  );
  document.getElementById("contribution__res").innerHTML = formatter.format(
    replaceNaNInfinityUndefined(H5)
  );
  document.getElementById("J4_ele").innerHTML =
    emoji + formatter.format(replaceNaNInfinityUndefined(I5)) + emoji;
  document.getElementById("K4_ele").innerHTML =
    (replaceNaNInfinityUndefined(K5) * 100).toFixed(2) + "%";
  document.getElementById("J4_ele").style.color = color;
  document.getElementById("dynamic_label").style.color = color;
  document.getElementById("dynamic_label").innerText = label;
  document.getElementById("K4_ele").style.color = color;
  visualCueDisplay(category);
}
function calculate() {}
function conversionTab() {
  let book1odd = document.getElementById("book1odd_w");
  let book2odd = document.getElementById("book2odd_w");
  let book1odd_am = document.getElementById("book1odd__am_w");
  let book2odd_am = document.getElementById("book2odd__am_w");
  if (type == "american_odds") {
    hideAll();
    book1odd_am.style.display = "inline-block";
    book2odd_am.style.display = "inline-block";
  } else {
    hideAll();
    book1odd.style.display = "inline-block";
    book2odd.style.display = "inline-block";
  }
}

function hideAll() {
  let book1odd = document.getElementById("book1odd_w");
  let book2odd = document.getElementById("book2odd_w");
  let book1odd_am = document.getElementById("book1odd__am_w");
  let book2odd_am = document.getElementById("book2odd__am_w");
  book1odd.style.display = "none";
  book2odd.style.display = "none";
  book1odd_am.style.display = "none";
  book2odd_am.style.display = "none";
}
function optionTab() {
  if (typeOpt == "min__loss") {
    calculateMinLoss();
  } else if (typeOpt == "max__profit") {
    calculateMaxProfit();
  } else {
    calculateInsurance();
  }
}
function swapInputValues() {
  if (type == "american_odds") {
    let book1odd = document.getElementById("book1odd__am");
    let book2odd = document.getElementById("book2odd__am");
    let v1 = book1odd.value;
    let temp = book2odd.value;
    let v2 = v1;
    v1 = temp;
    book1odd.value = v1;
    book2odd.value = v2;
    convertToDec();
  } else {
    let book1odd = document.getElementById("book1odd");
    let book2odd = document.getElementById("book2odd");
    let v1 = book1odd.value;
    let temp = book2odd.value;
    let v2 = v1;
    v1 = temp;
    book1odd.value = v1;
    book2odd.value = v2;
    convertToAm();
  }
}
function convertToDec() {
  let book1odd = document.getElementById("book1odd__am");
  let book2odd = document.getElementById("book2odd__am");
  let v1 = book1odd.value * 1;
  let v2 = book2odd.value * 1;
  let cv1 = v1 < 0 ? 1 - 100 / v1 : 1 + v1 / 100;
  let cv2 = v2 < 0 ? 1 - 100 / v2 : 1 + v2 / 100;
  document.getElementById("book1odd").value = replaceNaNInfinityUndefined(
    cv1.toFixed(2)
  );
  document.getElementById("book2odd").value = replaceNaNInfinityUndefined(
    cv2.toFixed(2)
  );
}
function convertToAm() {
  let book1odd = document.getElementById("book1odd");
  let book2odd = document.getElementById("book2odd");
  let v1 = book1odd.value * 1;
  let v2 = book2odd.value * 1;
  let cv1, cv2;
  if (v1 < 1) {
    cv1 = 100 / (1 - v1);
  } else {
    cv1 = 100 * (v1 - 1);
  }
  if (v2 < 1) {
    cv2 = 100 / (1 - v2);
  } else {
    cv2 = 100 * (v2 - 1);
  }
  document.getElementById("book1odd__am").value = replaceNaNInfinityUndefined(
    Math.round(cv1)
  );
  document.getElementById("book2odd__am").value = replaceNaNInfinityUndefined(
    Math.round(cv2)
  );
}
function replaceNaNInfinityUndefined(element) {
  if (isNaN(element) || !isFinite(element) || element === undefined) {
    return 0;
  } else {
    return element;
  }
}
function filterVal(val) {
  return val.toString().replace("$", "").replace(/,/g, "").replace("%", "") * 1;
}
function formatValue(inputFields) {
  let inputValue = inputFields.value;
  inputValue = inputValue.replace(/[$,]/g, "");
  const formattedValue = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(replaceNaNInfinityUndefined(inputValue));
  inputFields.value = formattedValue;
}
const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
function incrementDollarAmt(additionalVal) {
  let wager = document.getElementById("wager");
  let currentVal = filterVal(wager.value) * 1;
  currentVal += additionalVal * 1;
  console.log(currentVal);
  wager.value = formatter.format(currentVal);
}
function getCurrentDateAndTime() {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const currentDate = new Date();

  const month = months[currentDate.getMonth()];
  const day = currentDate.getDate();
  const hour = currentDate.getHours();
  const minute = currentDate.getMinutes();

  const formattedDate = `${month} ${day}`;
  const formattedTime = `${hour}:${minute < 10 ? "0" + minute : minute}`;

  return formattedDate + "\n" + formattedTime;
}
function extractNumber(inputString) {
  inputString = inputString.replace(/[\u{1F600}-\u{1F6FF}]/gu, "");

  inputString = inputString.replace(/[^\d.-]/g, "");

  let number = parseFloat(inputString);

  return isNaN(number) ? null : number;
}
function submitBet() {
  let type__betting = typeOpt.split("__");
  type__betting =
    type__betting[0].toUpperCase() + " " + type__betting[1].toUpperCase();

  console.log(type__betting, color, bet);
  let formData = new FormData();

  formData.append("date", getCurrentDateAndTime());
  formData.append("betnote", document.getElementById("betnote_inp").value);
  formData.append("type", type__betting);
  formData.append("odds1", document.getElementById("book1odd").value);
  formData.append("odds2", document.getElementById("book2odd").value);
  formData.append(
    "wager",
    extractNumber(document.getElementById("wager").value)
  );
  formData.append(
    "hedge",
    extractNumber(document.getElementById("bet").innerHTML)
  );
  formData.append(
    "payout",
    extractNumber(document.getElementById("payout").innerHTML)
  );
  formData.append(
    "contr",
    extractNumber(document.getElementById("contribution__res").innerHTML)
  );
  formData.append(
    "profit",
    extractNumber(document.getElementById("J4_ele").innerHTML)
  );
  if (typeOpt == "bet__insurance")
    formData.append("per", document.getElementById("conversion").value);
  else formData.append("per", document.getElementById("K4_ele").innerHTML);
  formData.append("bet", category);
  formData.append("color", color);

  fetch(
    "https://script.google.com/macros/s/AKfycby2Kyt4gS8bPbDTgvcHzdNWGO6D9yAl4wdLijhVuKoc82AehGSmR8fkcHNPGmqPIrKvIQ/exec",
    {
      method: "POST",
      body: formData,
      mode: "cors",
    }
  )
    .then((res) => res.text())
    .then((data) => {
      document.getElementById("small__label").style.display = "none";
      document.getElementById("submit_bet").innerHTML = "SAVE Odds";
      getLast5Bets();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
function formatNumber(number) {
  if (isNaN(number) || number === null) return "$0.00";
  if (number === 0) return "$0.00";

  const suffixes = ["", "K", "M", "B", "T"];

  const isNegative = number < 0;
  if (isNegative) number = Math.abs(number);

  const numDigits = Math.floor(Math.log10(number)) + 1;
  const suffixNum = Math.min(
    Math.floor((numDigits - 1) / 3),
    suffixes.length - 1
  );

  const scaledNumber = number / Math.pow(1000, suffixNum);
  const formattedNumber = scaledNumber.toFixed(2);

  const formattedString =
    (isNegative ? "-" : "") + "$" + formattedNumber + suffixes[suffixNum];
  return formattedString;
}

function getLast5Bets() {
  fetch(
    "https://script.google.com/macros/s/AKfycbz7Togxla7V0rU3K0GrmPMafDg6TtEEA_jwqh5TMdhNBBW1T0MMZxBnjrs4Aaj00M_EDQ/exec",
    {
      method: "GET",
      mode: "cors",
    }
  )
    .then((response) => response.text())
    .then((data) => {
      document.querySelector(".table__container--calc").style.display = "block";
      let jsonData = JSON.parse(data);
      let cntr = 0;
      let currentColor = "";
      jsonData.reverse().forEach((one, index) => {
        if (index == jsonData.length - 1) return;
        document.querySelectorAll("#date_td")[cntr].innerHTML = one.date;
        document.querySelectorAll("#betnote_td")[cntr].innerText = one.betnote;
        document.querySelectorAll("#betnote_td-m")[cntr].innerText =
          one.betnote;
        document.querySelectorAll("#type_td")[cntr].innerHTML = one.type;
        document.querySelectorAll("#odd1_td")[cntr].innerHTML = one.odds1;
        document.querySelectorAll("#odd2_td")[cntr].innerHTML = one.odds2;
        document.querySelectorAll("#wager_td")[cntr].innerHTML = formatNumber(
          replaceNaNInfinityUndefined(one.wager)
        );
        document.querySelectorAll("#hedge_td")[cntr].innerHTML = formatNumber(
          replaceNaNInfinityUndefined(one.hedge)
        );
        document.querySelectorAll("#payout_td")[cntr].innerHTML = formatNumber(
          replaceNaNInfinityUndefined(one.payout)
        );
        document.querySelectorAll("#contr_td")[cntr].innerHTML = formatNumber(
          replaceNaNInfinityUndefined(one.contr)
        );
        if (one.bet.toString().toUpperCase() === "ARB ALERT") {
          document.querySelectorAll("#profit_td")[cntr].innerHTML =
            "+" + formatNumber(replaceNaNInfinityUndefined(one.profit * 1));
          document.querySelectorAll("#per_td")[cntr].innerHTML =
            "+" + (one.per * 100).toFixed(2) + "%";
        } else {
          document.querySelectorAll("#profit_td")[cntr].innerHTML =
            formatNumber(replaceNaNInfinityUndefined(one.profit * 1));
          document.querySelectorAll("#per_td")[cntr].innerHTML =
            (one.per * 100).toFixed(2) + "%";
        }

        document.querySelectorAll("#bet_td")[cntr].innerHTML = one.bet
          .toString()
          .toUpperCase();
        currentColor = one.color;
        document.querySelectorAll("#profit_td")[cntr].style.color =
          currentColor;
        document.querySelectorAll("#per_td")[cntr].style.color = currentColor;
        document.querySelectorAll("#bet_td")[cntr].style.color = currentColor;
        cntr++;
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
function removeDefault() {
  document.querySelectorAll("#not__default").forEach((df) => {
    df.style.display = "block";
  });
  document.querySelectorAll("#default").forEach((df) => {
    df.style.display = "none";
  });
}
(() => {
  let swapBtn = document.getElementById("swap__btn");
  let conversion__slider = document.getElementById("conversion__slider");
  let inputsDec = [
    document.getElementById("book1odd"),
    document.getElementById("book2odd"),
  ];
  let inputsAm = [
    document.getElementById("book1odd__am"),
    document.getElementById("book2odd__am"),
  ];
  let wager = document.getElementById("wager");
  let conversion_tab = document.querySelectorAll("#conversion_tab");
  let submit_bet = document.getElementById("submit_bet");
  swapBtn.addEventListener("click", (e) => {
    e.preventDefault();
    swapInputValues();
    optionTab();
    removeDefault();
  });
  let incremental = document.querySelectorAll("#incremental");
  let opTab = document.querySelectorAll("#opTab");
  inputsDec.forEach((inp) => {
    inp.addEventListener("input", (e) => {
      e.preventDefault();
      convertToAm();
      optionTab();
      removeDefault();
    });
  });
  inputsAm.forEach((inp) => {
    inp.addEventListener("input", (e) => {
      e.preventDefault();
      convertToDec();
      optionTab();
      removeDefault();
    });
  });

  conversion_tab.forEach((tab) => {
    tab.addEventListener("click", (e) => {
      e.preventDefault();
      conversion_tab.forEach((tab1) => {
        tab1.classList.remove("selected__conversion");
      });
      let isSelected = tab.classList.contains("selected__conversion");
      if (!isSelected) {
        tab.classList.add("selected__conversion");
        type = tab.dataset.opt;
        conversionTab();
      }
      removeDefault();
    });
  });
  opTab.forEach((tab) => {
    tab.addEventListener("click", (e) => {
      e.preventDefault();
      opTab.forEach((tab1) => {
        tab1.classList.remove("selected__tab");
      });
      let isSelected = tab.classList.contains("selected__tab");
      if (!isSelected) {
        tab.classList.add("selected__tab");
        typeOpt = tab.dataset.opt;
        optionTab();
      }
      removeDefault();
    });
  });
  wager.addEventListener("input", (e) => {
    e.preventDefault();
    optionTab();
    removeDefault();
  });
  wager.addEventListener("change", (e) => {
    e.preventDefault();
    formatValue(wager);
    removeDefault();
  });
  incremental.forEach((incr) => {
    incr.addEventListener("click", (e) => {
      e.preventDefault();
      incrementDollarAmt(incr.dataset.incr);
      optionTab();
      removeDefault();
    });
  });
  conversion__slider.addEventListener("input", (e) => {
    e.preventDefault();
    removeDefault();

    optionTab();
  });
  submit_bet.addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("small__label").style.display = "block";
    submit_bet.innerHTML = "Please wait...";
    submitBet();
  });
  conversionTab();
  convertToAm();
  optionTab();
  getLast5Bets();
  const tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-te-toggle="tooltip"]')
  );
  tooltipTriggerList.map(
    (tooltipTriggerEl) => new te.Tooltip(tooltipTriggerEl)
  );
  document.addEventListener("DOMContentLoaded", function () {
    const inputs = document.querySelectorAll(".input__calc");

    inputs.forEach((input, index) => {
      input.addEventListener("keydown", function (e) {
        console.log(e.key);
        if (e.key === "Enter") {
          e.preventDefault();
          let nextIndex = index + 1 < inputs.length ? index + 1 : 0;
          if (inputs[nextIndex].parentNode.style.display == "none")
            nextIndex = nextIndex + 1 < inputs.length ? nextIndex + 1 : 0;
          if (inputs[nextIndex].id == "conversion")
            nextIndex = nextIndex + 1 < inputs.length ? nextIndex + 1 : 0;

          inputs[nextIndex].focus();
          console.log(inputs[nextIndex].id);
        }
      });
    });
  });
  // Check if the page has been reloaded before
  var pageReloaded = localStorage.getItem("pageReloaded");
  console.log(pageReloaded);

  // Reload the page after all HTML content is loaded if it hasn't been reloaded before
    if (!pageReloaded) {
      window.location.reload();
      localStorage.setItem("pageReloaded", "true"); // Store the flag indicating the page has been reloaded
    }
  
  console.log("Hello world");
})();
