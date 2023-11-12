let isCalculate = true;
// let netSolarCostVal = 29900;
// Calculate Result
let energyExpenses = {
  inflationRate: [],
  electricBill: [],
  autoFuelBill: [],
  totalEnergyBill: [],
  cumulativeEnergyBill: [],
};
let energySaving = {
  solarBill: [],
  cumulativeSolarBill: [],
  solarSavings: [],
  roi: [],
};
let energyBanking = {
  investmentRateOfSolarSaving: [],
  cumulativeROI: [],
};
let sectionArr = ["section1", "section2"];
let sectionInfo = [
  ` <i class="fa-sharp fa-solid fa-circle-info"></i>
<b>Solar Tax Max</b> Lorem ipsum dolor sit amet consectetur
adipisicing elit. Illo ex atque impedit voluptates eaque incidunt modi
quaerat. Quod, praesentium vel eligendi molestias iusto ex odit, ut
obcaecati fuga aspernatur blanditiis.`,
  ` <i class="fa-sharp fa-solid fa-circle-info"></i>
<b>Energy Banking</b> Lorem ipsum dolor sit amet consectetur
adipisicing elit. Illo ex atque impedit voluptates eaque incidunt modi
quaerat. Quod, praesentium vel eligendi molestias iusto ex odit, ut
obcaecati fuga aspernatur blanditiis.`,
];
let functionArr = [calculateResult, calculateEnergyBankRes];
let counter = 0;
function calculateResult() {
  if (!isCalculate) return;
  const formattedValue = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  let estimatedHousehold = filterValue(
    document.getElementById("estimatedHousehold").value
  );
  let taxFillingStatus = document.getElementById("taxFillingStatus").value;
  let totalSolarSystemCost = filterValue(
    document.getElementById("totalSolarSystemCost").value
  );
  let taxableIncome = 1;
  let taxReturnOnLine = 1;

  let estY1Val = document.getElementById("estY1Val");
  let estY1WithSolarVal = document.getElementById("estY1WithSolarVal");
  let depreciationCarriedForwardVal = document.getElementById(
    "depreciationCarriedForwardVal"
  );

  let solarTaxCredit = document.getElementById("solarTaxCredit").value / 100;
  let state_local_utility_incentive =
    filterValue(
      document.getElementById("state_local_utility_incentive").value
    ) * 1;
  // Perform Calculations
  let estStandardDeductionEV = taxFillingStatus * 1;
  let onLine15EV = estimatedHousehold - estStandardDeductionEV;
  let d27 = taxableIncome > onLine15EV ? taxableIncome : onLine15EV;
  console.log(d27);
  let rates = [10 / 100, 12 / 100, 22 / 100, 24 / 100, 32 / 100, 35 / 100];
  console.log(rates);
  let dataDefault = {
    single: [10275.0, 41775.0, 89075.0, 170050.0, 215950.0, 539900.0],
    headOfHousehold: [14650.0, 55900.0, 89050.0, 170050.0, 215950.0, 539900.0],
    marriedFilingJoint: [
      20550.0, 83550.0, 178150.0, 340100.0, 431900.0, 647850.0,
    ],
  };
  let calculateValues1 = {
    single: [],
    headOfHousehold: [],
    marriedFilingJoint: [],
  };
  let calculateValues2 = {
    single: [],
    headOfHousehold: [],
    marriedFilingJoint: [],
  };
  let depTaxInc = d27 - totalSolarSystemCost * 0.85;
  calculateValues1["single"][0] = rates[0] * dataDefault["single"][0];
  calculateValues1["headOfHousehold"][0] =
    rates[0] * dataDefault["headOfHousehold"][0];
  calculateValues1["marriedFilingJoint"][0] =
    rates[0] * dataDefault["marriedFilingJoint"][0];

  calculateValues2["single"][0] = calculateValues1["single"][0];
  calculateValues2["headOfHousehold"][0] =
    calculateValues1["headOfHousehold"][0];
  calculateValues2["marriedFilingJoint"][0] =
    calculateValues1["marriedFilingJoint"][0];
  for (let x = 1; x < 6; x++) {
    calculateValues1["single"][x] =
      (dataDefault["single"][x] - dataDefault["single"][x - 1]) * rates[x];
    calculateValues1["headOfHousehold"][x] =
      (dataDefault["headOfHousehold"][x] -
        dataDefault["headOfHousehold"][x - 1]) *
      rates[x];
    calculateValues1["marriedFilingJoint"][x] =
      (dataDefault["marriedFilingJoint"][x] -
        dataDefault["marriedFilingJoint"][x - 1]) *
      rates[x];
    calculateValues2["single"][x] =
      calculateValues1["single"][x] + calculateValues2["single"][x - 1];
    calculateValues2["headOfHousehold"][x] =
      calculateValues1["headOfHousehold"][x] +
      calculateValues2["headOfHousehold"][x - 1];
    calculateValues2["marriedFilingJoint"][x] =
      calculateValues1["marriedFilingJoint"][x] +
      calculateValues2["marriedFilingJoint"][x - 1];
  }

  let AH19 = 0;
  let AK19 = 0;
  if (taxFillingStatus == 12950) {
    AH19 = calculateValue(
      d27,
      dataDefault["single"],
      rates,
      calculateValues2["single"]
    );
    AK19 = calculateValue(
      depTaxInc,
      dataDefault["single"],
      rates,
      calculateValues2["single"]
    );
  } else if (taxFillingStatus == 19400) {
    AH19 = calculateValue(
      d27,
      dataDefault["headOfHousehold"],
      rates,
      calculateValues2["headOfHousehold"]
    );
    AK19 = calculateValue(
      depTaxInc,
      dataDefault["headOfHousehold"],
      rates,
      calculateValues2["headOfHousehold"]
    );
  } else if (taxFillingStatus == 25900) {
    AH19 = calculateValue(
      d27,
      dataDefault["marriedFilingJoint"],
      rates,
      calculateValues2["marriedFilingJoint"]
    );
    AK19 = calculateValue(
      depTaxInc,
      dataDefault["marriedFilingJoint"],
      rates,
      calculateValues2["marriedFilingJoint"]
    );
  }
  console.log(AH19);
  // Calculate All Required Values
  let totalSolarSystemCostRes = totalSolarSystemCost;
  let solarTaxCreditPer = (solarTaxCredit * 100).toFixed(0);
  let solarTaxCreditVal = totalSolarSystemCost * 0.3;
  let solarTaxMaxExtraIncentiveVal =
    totalSolarSystemCost * solarTaxCredit + (AH19 - AK19 + 0);
  console.log(solarTaxMaxExtraIncentiveVal, AK19, AH19);
  let solarTaxMaxExtraIncentivePer = (
    (solarTaxMaxExtraIncentiveVal / totalSolarSystemCostRes) *
    100
  ).toFixed(0);
  let state_local_utility_incentiveRes = state_local_utility_incentive;
  let state_local_utility_incentivePer =
    state_local_utility_incentive / totalSolarSystemCost;
  let totalSolarIncentivePer =
    0.3 * 1 +
    solarTaxMaxExtraIncentivePer / 100 +
    state_local_utility_incentivePer * 1;
  console.log(
    solarTaxCreditPer,
    solarTaxMaxExtraIncentivePer * 1,
    state_local_utility_incentivePer
  );
  let totalSolarIncentiveVal =
    solarTaxCreditVal +
    solarTaxMaxExtraIncentiveVal +
    state_local_utility_incentiveRes;
  let netSolarCostVal = totalSolarSystemCost - totalSolarIncentiveVal;

  // Perform Calculations

  document.getElementById("totalsolarTaxCreditVal").innerHTML =
    formattedValue.format(totalSolarSystemCostRes);
  // document.querySelectorAll("#solarTaxCreditPer")[0].innerHTML =
  //   solarTaxCreditPer + "%";
  // document.querySelectorAll("#solarTaxCreditPer")[1].innerHTML =
  //   solarTaxCreditPer + "%";
  document.getElementById("solarTaxCreditVal").innerHTML =
    formattedValue.format(solarTaxCreditVal);
  document.getElementById("solarTaxMaxExtraIncentivePer").innerHTML =
    "+ " + solarTaxMaxExtraIncentivePer + "%";
  document.getElementById("solarTaxMaxExtraIncentiveVal").innerHTML =
    "+ " + formattedValue.format(solarTaxMaxExtraIncentiveVal);
  document.getElementById("state_local_utility_incentiveRes").innerHTML =
    "+ " + formattedValue.format(state_local_utility_incentiveRes);
  document.getElementById("state_local_utility_incentivePer").innerHTML =
    "+ " + (state_local_utility_incentivePer * 100).toFixed(0) + "%";
  document.getElementById("totalSolarIncentivePer").innerHTML =
    "= " + (totalSolarIncentivePer * 100).toFixed(0) + "%";
  document.getElementById("totalSolarIncentiveVal").innerHTML =
    "= " + formattedValue.format(totalSolarIncentiveVal);
  document.getElementById("netSolarCostVal").innerHTML =
    formattedValue.format(netSolarCostVal);
  document.getElementById("net_solar_cost").value =
    formattedValue.format(netSolarCostVal);
}

function calculateEnergyBankRes() {
  energyExpenses = {
    inflationRate: [],
    electricBill: [],
    autoFuelBill: [],
    totalEnergyBill: [],
    cumulativeEnergyBill: [],
  };
  energySaving = {
    solarBill: [],
    cumulativeSolarBill: [],
    solarSavings: [],
    roi: [],
  };
  energyBanking = {
    investmentRateOfSolarSaving: [],
    cumulativeROI: [],
  };
  netSolarCostVal = filterValue(
    document.getElementById("net_solar_cost").value
  );
  let inflation__rate =
    filterValue(document.getElementById("inflation__rate").value) / 100;
  let electricBill =
    filterValue(document.getElementById("electricBill").value) * 1;
  let autoFuelBill =
    filterValue(document.getElementById("autoFuelBill").value) * 1;
  let solarBill = filterValue(document.getElementById("solarBill").value) * 1;
  let invstmtRateOfSolarSaving =
    filterValue(document.getElementById("invstmtRateOfSolarSaving").value) /
    100;

  // Calculator energy expense
  energyExpenses["inflationRate"].push(inflation__rate);
  energyExpenses["electricBill"].push(electricBill * 12);
  energyExpenses["autoFuelBill"].push(autoFuelBill * 12);
  energyExpenses["totalEnergyBill"].push(
    energyExpenses["electricBill"][0] + energyExpenses["autoFuelBill"][0]
  );
  energyExpenses["cumulativeEnergyBill"].push(
    energyExpenses["totalEnergyBill"][0]
  );

  for (let x = 1; x <= 100; x++) {
    energyExpenses["inflationRate"].push(inflation__rate);
    energyExpenses["electricBill"].push(
      energyExpenses["electricBill"][x - 1] *
        (1 + energyExpenses["inflationRate"][x])
    );
    energyExpenses["autoFuelBill"].push(
      energyExpenses["autoFuelBill"][x - 1] *
        (1 + energyExpenses["inflationRate"][x])
    );
    energyExpenses["totalEnergyBill"].push(
      energyExpenses["electricBill"][x] + energyExpenses["autoFuelBill"][x]
    );
    if (x == 1) {
      // energyExpenses["cumulativeEnergyBill"].push(
      //   energyExpenses["totalEnergyBill"][x]
      // );
      energyExpenses["cumulativeEnergyBill"].push(
        energyExpenses["cumulativeEnergyBill"][x - 1] +
          energyExpenses["totalEnergyBill"][x]
      );
    } else
      energyExpenses["cumulativeEnergyBill"].push(
        energyExpenses["cumulativeEnergyBill"][x - 1] +
          energyExpenses["totalEnergyBill"][x]
      );
  }
  // Calculate Energy Savings

  energySaving["solarBill"][0] = solarBill * 12;
  energySaving["cumulativeSolarBill"][0] = energySaving["solarBill"][0];
  energySaving["solarSavings"][0] =
    energyExpenses["totalEnergyBill"][0] - energySaving["solarBill"][0];
  energySaving["roi"][0] = energySaving["solarSavings"][0] / netSolarCostVal;
  for (let x = 1; x <= 100; x++) {
    energySaving["solarBill"][x] = energySaving["solarBill"][x - 1];
    if (x == 1)
      energySaving["cumulativeSolarBill"][x] =
        energySaving["cumulativeSolarBill"][x - 1];
    else
      energySaving["cumulativeSolarBill"][x] =
        energySaving["solarBill"][x] +
        energySaving["cumulativeSolarBill"][x - 1];

    energySaving["solarSavings"][x] =
      energyExpenses["totalEnergyBill"][x] - energySaving["solarBill"][x];
    energySaving["roi"][x] = energySaving["solarSavings"][x] / netSolarCostVal;
  }

  // Caculate Energy Banking
  /*
let energyBanking = {
    investmentRateOfSolarSaving: [],
    cumulativeROI: [],
  };
  */
  energyBanking["investmentRateOfSolarSaving"][0] =
    energySaving["solarSavings"][0] * (1 + invstmtRateOfSolarSaving);
  energyBanking["cumulativeROI"][0] =
    energyBanking["investmentRateOfSolarSaving"][0] / netSolarCostVal;
  for (let x = 1; x <= 100; x++) {
    energyBanking["investmentRateOfSolarSaving"][x] =
      (energySaving["solarSavings"][x] +
        energyBanking["investmentRateOfSolarSaving"][x - 1]) *
      (1 + invstmtRateOfSolarSaving);
    energyBanking["cumulativeROI"][x] =
      energyBanking["investmentRateOfSolarSaving"][x] / netSolarCostVal;
  }
  console.log(energyExpenses, energyBanking);
  updateEnergySavingUI(energyExpenses, energyBanking);
}
function updateEnergySavingUI(energyExpenses, energyBanking) {
  const formattedValue = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  let uiEnergyExpense = [
    energyExpenses["cumulativeEnergyBill"][0],
    energyExpenses["cumulativeEnergyBill"][1],
    energyExpenses["cumulativeEnergyBill"][2],
    energyExpenses["cumulativeEnergyBill"][3],
    energyExpenses["cumulativeEnergyBill"][4],
    energyExpenses["cumulativeEnergyBill"][5],
    energyExpenses["cumulativeEnergyBill"][10],
    energyExpenses["cumulativeEnergyBill"][25],
    energyExpenses["cumulativeEnergyBill"][50],
    energyExpenses["cumulativeEnergyBill"][100],
  ];
  let uiEnergyBanking = [
    energyBanking["investmentRateOfSolarSaving"][0],
    energyBanking["investmentRateOfSolarSaving"][1],
    energyBanking["investmentRateOfSolarSaving"][2],
    energyBanking["investmentRateOfSolarSaving"][3],
    energyBanking["investmentRateOfSolarSaving"][4],
    energyBanking["investmentRateOfSolarSaving"][5],
    energyBanking["investmentRateOfSolarSaving"][10],
    energyBanking["investmentRateOfSolarSaving"][25],
    energyBanking["investmentRateOfSolarSaving"][50],
    energyBanking["investmentRateOfSolarSaving"][100],
  ];

  document.querySelectorAll("#energyExpense").forEach((el, ind) => {
    el.innerHTML = formattedValue.format(uiEnergyExpense[ind]);
    console.log(uiEnergyExpense[ind]);
  });
  document.querySelectorAll("#energyBanking").forEach((el, ind) => {
    el.innerHTML = formattedValue.format(uiEnergyBanking[ind]);
  });
}
// calculateResult();
function formatValue(inputFields) {
  let inputValue = inputFields.value;
  inputValue = inputValue.replace(/[$,]/g, ""); // remove $ and comma
  const formattedValue = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    // maximumFractionDigits: 0,
  }).format(inputValue);
  inputFields.value = formattedValue;
  calculateEnergyBankRes();
}
function formatPercentage(inputFields) {
  let inputValue = inputFields.value;
  inputValue = inputValue.replace(/[%,]/g, ""); // remove % and comma

  inputFields.value = inputValue + "%";
  calculateEnergyBankRes();
}
function calculateValue(val, data, rate, calcv2) {
  console.log(val);
  if (val <= 0) {
    return 0;
  } else if (val <= data[0]) {
    return val * rate[0];
  } else if (val <= data[1]) {
    return (val - data[0]) * rate[1] + calcv2[0];
  } else if (val <= data[2]) {
    return (val - data[1]) * rate[2] + calcv2[1];
  } else if (val <= data[3]) {
    return (val - data[2]) * rate[3] + calcv2[2];
  } else if (val <= data[4]) {
    return (val - data[3]) * rate[4] + calcv2[3];
  } else if (val <= data[5]) {
    return (val - data[4]) * rate[5] + calcv2[4];
  } else if (val > data[5]) {
    return (val - data[5]) * 0.37 + calcv2[5];
  }
}
function filterValue(inputValue) {
  const filteredValue = parseFloat(inputValue.toString().replace(/[$%,]/g, ""));
  return filteredValue;
}
function next() {
  if (!netSolarCostVal) {
    document.getElementById("err__container").style.display = "block";
    return;
  } else {
    document.getElementById("err__container").style.display = "none";
  }
  hideAll();
  unActiveAll();
  counter++;
  current();
  document.getElementById(`section${counter}`).style.display = "block";
  functionArr[counter - 1]();
  document.querySelector(".controller__info").innerHTML =
    sectionInfo[counter - 1];
  document.getElementById(`step${counter}`).style.background = "#000";
}
function hideAll() {
  sectionArr.forEach((id) => {
    console.log(id);
    document.getElementById(id).style.display = "none";
  });
}
function unActiveAll() {
  sectionArr.forEach((id, ind) => {
    document.getElementById(`step${ind + 1}`).style.background = "#ddd";
  });
}
function numberWithCommas(x) {
  return formatter.format(x);
}
function formateNumber(val) {
  if (isNaN(val)) return 0;
  if (!isFinite(val)) return 0;
  return numberWithCommas(val);
}
function pre() {
  hideAll();
  unActiveAll();
  counter--;
  current();
  functionArr[counter - 1]();
  document.querySelector(".controller__info").innerHTML =
    sectionInfo[counter - 1];
  document.getElementById(`section${counter}`).style.display = "block";
  document.getElementById(`step${counter}`).style.background = "#000";
}
function current() {
  console.log(counter);
  if (counter == 1) {
    document.querySelector("#btn__next").style.visibility = "visible";
    document.querySelector("#btn__pre").style.visibility = "hidden";
  } else {
    document.querySelector("#btn__next").style.visibility = "hidden";
    document.querySelector("#btn__pre").style.visibility = "visible";
  }
}

(() => {
  // hideAll();
  // unActiveAll();
  // next();
  calculateEnergyBankRes();
})();

function downloadPDF() {
  var doc = new jsPDF("l", "mm", [370, 200]);
  // Add title at the top
  let topTitle = doc.splitTextToSize(`SOLAR TAX MAX™`);
  doc.setTextColor(6, 6, 104).setFontSize(18).text(topTitle, 170, 10);
  doc.autoTable({
    theme: "striped",
    styles: {
      fontSize: 10,
    },

    startY: 20,
    head: [["SOLAR TAX MAX™", "Inputs"]],
    body: [
      [
        "Adjusted Gross Income",
        document.getElementById("estimatedHousehold").value,
      ],
      [
        "Tax Filing Status",
        document.getElementById("taxFillingStatus").options[
          document.getElementById("taxFillingStatus").selectedIndex
        ].text,
      ],
      [
        "Total Solar System Cost",
        document.getElementById("totalSolarSystemCost").value,
      ],
      [
        "State, Local, & Utility Incentives",
        document.getElementById("state_local_utility_incentive").value,
      ],
    ],
  });
  doc.autoTable({
    theme: "striped",
    styles: {
      fontSize: 10,
    },

    startY: 80,
    head: [["SOLAR TAX MAX™", "Outputs"]],
    body: [
      [
        "Total Solar System Cost",
        document.getElementById("totalsolarTaxCreditVal").innerHTML,
      ],
      ["Solar Tax Credit %", `X ${document.getElementById("solarTaxCreditPer").innerHTML}`],
      ["Solar Tax Credit $", document.getElementById("solarTaxCreditVal").innerHTML],
      [
        "Solar Tax Max™ Extra Incentives",
        `${document.getElementById("solarTaxMaxExtraIncentiveVal").innerHTML}`,
      ],
      [
        "State Local Utility Incentives",
        `${document.getElementById("state_local_utility_incentiveRes").innerHTML}`,
      ],
      ["Total Solar Incentives", document.getElementById("totalSolarIncentiveVal").innerHTML],
      ["Net Solar Costs", document.getElementById("netSolarCostVal").innerHTML],
    ],
  });
  doc.addPage();

  // Add title at the top
  topTitle = doc.splitTextToSize(`Energy Banking Plan™`);
  doc.setTextColor(6, 6, 104).setFontSize(18).text(topTitle, 170, 10);
  doc.autoTable({
    theme: "striped",
    styles: {
      fontSize: 10,
    },

    startY: 20,
    head: [["Energy Banking Plan™", "Inputs"]],
    body: [
      ["Net Solar Costs", document.getElementById("net_solar_cost").value],
      ["Inflation Rate", document.getElementById("inflation__rate").value],
      ["Electric Bill", document.getElementById("electricBill").value],
      ["Auto-Fuel Bill", document.getElementById("autoFuelBill").value],
      ["Solar Loan Payment (High)", document.getElementById("solarBill").value],
      [
        "Investment Rate of Solar Savings",
        document.getElementById("invstmtRateOfSolarSaving").value,
      ],
    ],
  });

  //   // Background Color
  doc.setTextColor(255, 255, 255);

  doc.setFillColor(192, 57, 43);
  doc.rect(14, 75, 152, 15, "F");
  // let splitTitle = doc.splitTextToSize(`Note: We can add some text here...`);
  // doc.setTextColor(90, 90, 90).setFontSize(11).text(splitTitle, 25, 20);

  let splitTitle = doc.splitTextToSize(`Lifetime Energy Expenses`, 180);
  // Inputs
  doc.setTextColor(255, 255, 255).setFontSize(15).text(splitTitle, 70, 85);
  // Energy Saving
  doc.setFillColor(20, 164, 15);
  doc.rect(153, 75, 118, 15, "F");

  splitTitle = doc.splitTextToSize(`Energy Savings`, 180);
  doc.setTextColor(255, 255, 255).setFontSize(15).text(splitTitle, 200, 85);
  // Energy Banking
  doc.setFillColor(8, 57, 197);
  doc.rect(271, 75, 85, 15, "F");

  splitTitle = doc.splitTextToSize(`Energy Banking Plan™`, 180);
  // Inputs
  doc.setTextColor(255, 255, 255).setFontSize(15).text(splitTitle, 300, 85);
  doc.autoTable({
    theme: "plain",
    styles: {
      fontSize: 10,
    },

    startY: 90,
    head: [
      [
        "",
        "Inflation Rate",
        "Electric Bill",
        "Auto-Fuel Bill",
        "Total Energy Bill",
        "Cumulative Energy Bill",
        "Solar Bill",
        "Comulative Solar Bill",
        "Solar Savings",
        "ROI",
        "Investment Rate of Solar Savings",
        "Cumulative ROI",
      ],
    ],

    body: [
      [
        "Today",
        `${energyExpenses["inflationRate"][0] * 100}%`,
        `${formattedValue.format(energyExpenses["electricBill"][0])}`,
        `${formattedValue.format(energyExpenses["autoFuelBill"][0])}`,
        `${formattedValue.format(energyExpenses["totalEnergyBill"][0])}`,
        `${formattedValue.format(energyExpenses["cumulativeEnergyBill"][0])}`,
        `${formattedValue.format(energySaving["solarBill"][0])}`,
        `${formattedValue.format(energySaving["cumulativeSolarBill"][0])}`,
        `${formattedValue.format(energySaving["solarSavings"][0])}`,
        `${(energySaving["roi"][0] * 100).toFixed(2)}%`,
        `${formattedValue.format(
          energyBanking["investmentRateOfSolarSaving"][0]
        )}`,
        `${(energyBanking["cumulativeROI"][0] * 100).toFixed(0)}%`,
      ],

      [
        "Year 1",
        `${energyExpenses["inflationRate"][1] * 100}%`,
        `${formattedValue.format(energyExpenses["electricBill"][1])}`,
        `${formattedValue.format(energyExpenses["autoFuelBill"][1])}`,
        `${formattedValue.format(energyExpenses["totalEnergyBill"][1])}`,
        `${formattedValue.format(energyExpenses["cumulativeEnergyBill"][1])}`,
        `${formattedValue.format(energySaving["solarBill"][1])}`,
        `${formattedValue.format(energySaving["cumulativeSolarBill"][1])}`,
        `${formattedValue.format(energySaving["solarSavings"][1])}`,
        `${(energySaving["roi"][1] * 100).toFixed(2)}%`,
        `${formattedValue.format(
          energyBanking["investmentRateOfSolarSaving"][1]
        )}`,
        `${(energyBanking["cumulativeROI"][1] * 100).toFixed(0)}%`,
      ],
      [
        "Year 2",
        `${energyExpenses["inflationRate"][2] * 100}%`,
        `${formattedValue.format(energyExpenses["electricBill"][2])}`,
        `${formattedValue.format(energyExpenses["autoFuelBill"][2])}`,
        `${formattedValue.format(energyExpenses["totalEnergyBill"][2])}`,
        `${formattedValue.format(energyExpenses["cumulativeEnergyBill"][2])}`,
        `${formattedValue.format(energySaving["solarBill"][2])}`,
        `${formattedValue.format(energySaving["cumulativeSolarBill"][2])}`,
        `${formattedValue.format(energySaving["solarSavings"][2])}`,
        `${(energySaving["roi"][2] * 100).toFixed(2)}%`,
        `${formattedValue.format(
          energyBanking["investmentRateOfSolarSaving"][2]
        )}`,
        `${(energyBanking["cumulativeROI"][2] * 100).toFixed(0)}%`,
      ],
      [
        "Year 3",
        `${energyExpenses["inflationRate"][3] * 100}%`,
        `${formattedValue.format(energyExpenses["electricBill"][3])}`,
        `${formattedValue.format(energyExpenses["autoFuelBill"][3])}`,
        `${formattedValue.format(energyExpenses["totalEnergyBill"][3])}`,
        `${formattedValue.format(energyExpenses["cumulativeEnergyBill"][3])}`,
        `${formattedValue.format(energySaving["solarBill"][3])}`,
        `${formattedValue.format(energySaving["cumulativeSolarBill"][3])}`,
        `${formattedValue.format(energySaving["solarSavings"][3])}`,
        `${(energySaving["roi"][3] * 100).toFixed(2)}%`,
        `${formattedValue.format(
          energyBanking["investmentRateOfSolarSaving"][3]
        )}`,
        `${(energyBanking["cumulativeROI"][3] * 100).toFixed(0)}%`,
      ],
      [
        "Year 4",
        `${energyExpenses["inflationRate"][4] * 100}%`,
        `${formattedValue.format(energyExpenses["electricBill"][4])}`,
        `${formattedValue.format(energyExpenses["autoFuelBill"][4])}`,
        `${formattedValue.format(energyExpenses["totalEnergyBill"][4])}`,
        `${formattedValue.format(energyExpenses["cumulativeEnergyBill"][4])}`,
        `${formattedValue.format(energySaving["solarBill"][4])}`,
        `${formattedValue.format(energySaving["cumulativeSolarBill"][4])}`,
        `${formattedValue.format(energySaving["solarSavings"][4])}`,
        `${(energySaving["roi"][4] * 100).toFixed(2)}%`,
        `${formattedValue.format(
          energyBanking["investmentRateOfSolarSaving"][4]
        )}`,
        `${(energyBanking["cumulativeROI"][4] * 100).toFixed(0)}%`,
      ],
      [
        "Year 5",
        `${energyExpenses["inflationRate"][5] * 100}%`,
        `${formattedValue.format(energyExpenses["electricBill"][5])}`,
        `${formattedValue.format(energyExpenses["autoFuelBill"][5])}`,
        `${formattedValue.format(energyExpenses["totalEnergyBill"][5])}`,
        `${formattedValue.format(energyExpenses["cumulativeEnergyBill"][5])}`,
        `${formattedValue.format(energySaving["solarBill"][5])}`,
        `${formattedValue.format(energySaving["cumulativeSolarBill"][5])}`,
        `${formattedValue.format(energySaving["solarSavings"][5])}`,
        `${(energySaving["roi"][5] * 100).toFixed(2)}%`,
        `${formattedValue.format(
          energyBanking["investmentRateOfSolarSaving"][5]
        )}`,
        `${(energyBanking["cumulativeROI"][5] * 100).toFixed(0)}%`,
      ],
      [
        "Year 10",
        `${energyExpenses["inflationRate"][10] * 100}%`,
        `${formattedValue.format(energyExpenses["electricBill"][10])}`,
        `${formattedValue.format(energyExpenses["autoFuelBill"][10])}`,
        `${formattedValue.format(energyExpenses["totalEnergyBill"][10])}`,
        `${formattedValue.format(energyExpenses["cumulativeEnergyBill"][10])}`,
        `${formattedValue.format(energySaving["solarBill"][10])}`,
        `${formattedValue.format(energySaving["cumulativeSolarBill"][10])}`,
        `${formattedValue.format(energySaving["solarSavings"][10])}`,
        `${(energySaving["roi"][10] * 100).toFixed(2)}%`,
        `${formattedValue.format(
          energyBanking["investmentRateOfSolarSaving"][10]
        )}`,
        `${(energyBanking["cumulativeROI"][10] * 100).toFixed(0)}%`,
      ],
      [
        "Year 25",
        `${energyExpenses["inflationRate"][25] * 100}%`,
        `${formattedValue.format(energyExpenses["electricBill"][25])}`,
        `${formattedValue.format(energyExpenses["autoFuelBill"][25])}`,
        `${formattedValue.format(energyExpenses["totalEnergyBill"][25])}`,
        `${formattedValue.format(energyExpenses["cumulativeEnergyBill"][25])}`,
        `${formattedValue.format(energySaving["solarBill"][25])}`,
        `${formattedValue.format(energySaving["cumulativeSolarBill"][25])}`,
        `${formattedValue.format(energySaving["solarSavings"][25])}`,
        `${(energySaving["roi"][25] * 100).toFixed(2)}%`,
        `${formattedValue.format(
          energyBanking["investmentRateOfSolarSaving"][25]
        )}`,
        `${(energyBanking["cumulativeROI"][25] * 100).toFixed(0)}%`,
      ],
      [
        "Year 50",
        `${energyExpenses["inflationRate"][50] * 100}%`,
        `${formattedValue.format(energyExpenses["electricBill"][50])}`,
        `${formattedValue.format(energyExpenses["autoFuelBill"][50])}`,
        `${formattedValue.format(energyExpenses["totalEnergyBill"][50])}`,
        `${formattedValue.format(energyExpenses["cumulativeEnergyBill"][50])}`,
        `${formattedValue.format(energySaving["solarBill"][50])}`,
        `${formattedValue.format(energySaving["cumulativeSolarBill"][50])}`,
        `${formattedValue.format(energySaving["solarSavings"][50])}`,
        `${(energySaving["roi"][50] * 100).toFixed(2)}%`,
        `${formattedValue.format(
          energyBanking["investmentRateOfSolarSaving"][50]
        )}`,
        `${(energyBanking["cumulativeROI"][50] * 100).toFixed(0)}%`,
      ],
      [
        "Year 100",
        `${energyExpenses["inflationRate"][100] * 100}%`,
        `${formattedValue.format(energyExpenses["electricBill"][100])}`,
        `${formattedValue.format(energyExpenses["autoFuelBill"][100])}`,
        `${formattedValue.format(energyExpenses["totalEnergyBill"][100])}`,
        `${formattedValue.format(energyExpenses["cumulativeEnergyBill"][100])}`,
        `${formattedValue.format(energySaving["solarBill"][100])}`,
        `${formattedValue.format(energySaving["cumulativeSolarBill"][100])}`,
        `${formattedValue.format(energySaving["solarSavings"][100])}`,
        `${(energySaving["roi"][100] * 100).toFixed(2)}%`,
        `${formattedValue.format(
          energyBanking["investmentRateOfSolarSaving"][100]
        )}`,
        `${(energyBanking["cumulativeROI"][100] * 100).toFixed(0)}%`,
      ],
    ],
  });

  doc.save("Solar_Tax_Max_Report");
}
const formattedValue = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});
calculateResult();
calculateEnergyBankRes();
