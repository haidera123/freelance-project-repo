let totalConstructionEstimatedValue = [0, 0, 0];
let totalCoesmeticsEstimatedValue = [0, 0, 0];
let totalFurnishingEstimatedValue = [0, 0, 0];
let totalBVDEstimatedValueConstruction = [0, 0, 0];
let totalBVDEstimatedValueCoesmetics = [0, 0, 0];
let totalBVDEstimatedValueFurnishing = [0, 0, 0];
function toggleEmail() {
  document.querySelector(".form__container--calc").style.display = "block";
  scrollAdjusted(0, 200);
}
function scrollAdjusted(xPixels, yPixels) {
  var currentX = window.scrollX || window.pageXOffset;
  var currentY = window.scrollY || window.pageYOffset;
  console.log(currentX, currentY);
  window.scrollTo(currentX + xPixels, currentY + yPixels);
}
function toggle(ele) {
  let type = ele.dataset.type;
  document.querySelectorAll(`.toggle__hide--${type}`).forEach((div) => {
    div.classList.toggle("display__none");
    if (div.classList.contains("display__none")) {
      let icon = ele.childNodes[3];
      icon.className = "fa-solid fa-angle-down";
    } else {
      let icon = ele.childNodes[3];
      icon.className = "fa-solid fa-angle-up";
    }
  });
}
function selectDiselectRow(ele, category) {
  let defaultValue = [100, 1];
  let isChecked = ele.checked;
  console.log(ele.parentNode.parentNode.parentNode.parentNode.childNodes);

  let per =
    ele.parentNode.parentNode.parentNode.parentNode.childNodes[3].childNodes[1]
      .childNodes[3].childNodes[1];
  let num =
    ele.parentNode.parentNode.parentNode.parentNode.childNodes[3].childNodes[3]
      .childNodes[3].childNodes[1];
  let parent = ele.parentNode.parentNode.parentNode.parentNode;
  if (!isChecked) {
    disableEnableAllController(!isChecked, parent, ele);
    parent.style.opacity = 1;
    if (category != "addonser") {
      per.value = "";
      num.value = "";
    }
  } else {
    disableEnableAllController(!isChecked, parent, ele);
    parent.style.opacity = 1;
    if (category != "addonser") {
      per.value = defaultValue[0];
      num.value = defaultValue[1];
    } else {
      per.value = defaultValue[0];
      num.value = 0;
    }
  }
  calculateCoesmetic();
  calculateConstruction();
  calculateFurnishing();
}
function disableEnableAllController(shouldDisable, parent, checkbox) {
  // Find all input fields inside the parent element
  let inputFields = parent.querySelectorAll("input");

  // Find all buttons inside the parent element
  let buttons = parent.querySelectorAll("button");

  // Disable each input field
  inputFields.forEach((input) => {
    input.disabled = shouldDisable;
  });

  // Disable each button
  buttons.forEach((button) => {
    button.disabled = shouldDisable;
  });
  checkbox.disabled = false;
}
function sliderChange(ele) {
  ele.style.background = `linear-gradient(to right, #000 0%, #000 ${
    ((ele.value - ele.min) / (ele.max - ele.min)) * 100
  }%, #DEE2E6 ${
    ((ele.value - ele.min) / (ele.max - ele.min)) * 100
  }%, #DEE2E6 100%)`;
  // Result in percentage
  ele.parentNode.childNodes[3].innerHTML = ele.value + "%";
  calculateConstruction(ele);
}
function calculateFurnishing() {
  let DATA = [];
  let rowCntr = 0;

  const ITEMS = [
    "Living room",
    "Primary bedroom",
    "Secondary bedroom",
    "Bathroom",
    "Office",
    "Outdoor living space",
    "Kitchen",
    "Dining room",
    "Hallway",
    "Flex room",
  ];
  const DATA_FORMULA = {
    "Living room": {
      high: function () {
        return 30000;
      },
      mid: function () {
        return this.high() * 0.7;
      },
      low: function () {
        return this.high() * 0.3;
      },
    },
    "Primary bedroom": {
      high: function () {
        return 30000;
      },
      mid: function () {
        return this.high() * 0.7;
      },
      low: function () {
        return this.high() * 0.3;
      },
    },
    "Secondary bedroom": {
      high: function () {
        return 20000;
      },
      mid: function () {
        return this.high() * 0.7;
      },
      low: function () {
        return this.high() * 0.3;
      },
    },
    Bathroom: {
      high: function () {
        return 7500;
      },
      mid: function () {
        return this.high() * 0.7;
      },
      low: function () {
        return this.high() * 0.3;
      },
    },
    Office: {
      high: function () {
        return 15000;
      },
      mid: function () {
        return this.high() * 0.7;
      },
      low: function () {
        return this.high() * 0.3;
      },
    },
    "Outdoor living space": {
      high: function () {
        return 20000;
      },
      mid: function () {
        return this.high() * 0.7;
      },
      low: function () {
        return this.high() * 0.3;
      },
    },
    Kitchen: {
      high: function () {
        return 20000;
      },
      mid: function () {
        return this.high() * 0.7;
      },
      low: function () {
        return this.high() * 0.3;
      },
    },
    "Dining room": {
      high: function () {
        return 15000;
      },
      mid: function () {
        return this.high() * 0.7;
      },
      low: function () {
        return this.high() * 0.3;
      },
    },
    Hallway: {
      high: function () {
        return 5000;
      },
      mid: function () {
        return this.high() * 0.7;
      },
      low: function () {
        return this.high() * 0.3;
      },
    },
    "Flex room": {
      high: function () {
        return 25000;
      },
      mid: function () {
        return this.high() * 0.7;
      },
      low: function () {
        return this.high() * 0.3;
      },
    },
  };
  let roomFreq = [
    document.getElementById("roomFreq__frunscp--1").value / 100,
    document.getElementById("roomFreq__frunscp--2").value / 100,
    document.getElementById("roomFreq__frunscp--3").value / 100,
    document.getElementById("roomFreq__frunscp--4").value / 100,
    document.getElementById("roomFreq__frunscp--5").value / 100,
    document.getElementById("roomFreq__frunscp--6").value / 100,
    document.getElementById("roomFreq__frunscp--7").value / 100,
    document.getElementById("roomFreq__frunscp--8").value / 100,
    document.getElementById("roomFreq__frunscp--9").value / 100,
    document.getElementById("roomFreq__frunscp--10").value / 100,
  ];

  let simRoom = [
    document.getElementById("simRoom__frunscp--1").value * 1,
    document.getElementById("simRoom__frunscp--2").value * 1,
    document.getElementById("simRoom__frunscp--3").value * 1,
    document.getElementById("simRoom__frunscp--4").value * 1,
    document.getElementById("simRoom__frunscp--5").value * 1,
    document.getElementById("simRoom__frunscp--6").value * 1,
    document.getElementById("simRoom__frunscp--7").value * 1,
    document.getElementById("simRoom__frunscp--8").value * 1,
    document.getElementById("simRoom__frunscp--9").value * 1,
    document.getElementById("simRoom__frunscp--10").value * 1,
  ];

  let items = [
    document.getElementById("livingRoom"),
    document.getElementById("primBed"),
    document.getElementById("secBed"),
    document.getElementById("bathroom"),
    document.getElementById("office"),
    document.getElementById("outLivSpace"),
    document.getElementById("kitchen-fur"),
    document.getElementById("diningRoom"),
    document.getElementById("hallway"),
    document.getElementById("flexRoom"),
  ];

  // Total Estimate Labels
  let total = [
    document.getElementById("furnishing_estimate_low_frunscp"),
    document.getElementById("furnishing_estimate_mid_frunscp"),
    document.getElementById("furnishing_estimate_high_frunscp"),
  ];

  let bvdFee = [
    document.getElementById("bvd_estimate_low_frunscp"),
    document.getElementById("bvd_estimate_mid_frunscp"),
    document.getElementById("bvd_estimate_high_frunscp"),
  ];

  let grandTotalEst = [
    document.getElementById("furnishingscop_estimate_low_frunscp"),
    document.getElementById("furnishingscop_estimate_mid_frunscp"),
    document.getElementById("furnishingscop_estimate_high_frunscp"),
  ];

  // Perform Calculations
  const RESULT_LABELS = [
    "l_m_h_1",
    "l_m_h_2",
    "l_m_h_3",
    "l_m_h_4",
    "l_m_h_5",
    "l_m_h_6",
    "l_m_h_7",
    "l_m_h_8",
    "l_m_h_9",
    "l_m_h_10",
  ];

  let results = {
    l_m_h_1: [0, 0, 0],
    l_m_h_2: [0, 0, 0],
    l_m_h_3: [0, 0, 0],
    l_m_h_4: [0, 0, 0],
    l_m_h_5: [0, 0, 0],
    l_m_h_6: [0, 0, 0],
    l_m_h_7: [0, 0, 0],
    l_m_h_8: [0, 0, 0],
    l_m_h_9: [0, 0, 0],
    l_m_h_10: [0, 0, 0],
  };
  for (let x = 0; x < 10; x++) {
    if (!items[x].checked) {
      results[RESULT_LABELS[x]] = [0, 0, 0];
    } else {
      results[RESULT_LABELS[x]] = [
        roomFreq[x] * simRoom[x] * DATA_FORMULA[ITEMS[x]].low(),
        roomFreq[x] * simRoom[x] * DATA_FORMULA[ITEMS[x]].mid(),
        roomFreq[x] * simRoom[x] * DATA_FORMULA[ITEMS[x]].high(),
      ];
    }
  }
  let furnishingEstimate = [
    results.l_m_h_1[0] +
      results.l_m_h_2[0] +
      results.l_m_h_3[0] +
      results.l_m_h_4[0] +
      results.l_m_h_5[0] +
      results.l_m_h_6[0] +
      results.l_m_h_7[0] +
      results.l_m_h_8[0] +
      results.l_m_h_9[0] +
      results.l_m_h_10[0],

    results.l_m_h_1[1] +
      results.l_m_h_2[1] +
      results.l_m_h_3[1] +
      results.l_m_h_4[1] +
      results.l_m_h_5[1] +
      results.l_m_h_6[1] +
      results.l_m_h_7[1] +
      results.l_m_h_8[1] +
      results.l_m_h_9[1] +
      results.l_m_h_10[1],
    results.l_m_h_1[2] +
      results.l_m_h_2[2] +
      results.l_m_h_3[2] +
      results.l_m_h_4[2] +
      results.l_m_h_5[2] +
      results.l_m_h_6[2] +
      results.l_m_h_7[2] +
      results.l_m_h_8[2] +
      results.l_m_h_9[2] +
      results.l_m_h_10[2],
  ];
  let labels = ["low", "mid", "high"];
  let bvdDesignEstimate = [
    furnishingEstimate[0] * 0.15,
    furnishingEstimate[0] * 0.19,
    furnishingEstimate[0] * 0.22,
  ];
  let grandTotal = [
    furnishingEstimate[0] + bvdDesignEstimate[1],
    furnishingEstimate[1] + bvdDesignEstimate[1],
    furnishingEstimate[2] + bvdDesignEstimate[1],
  ];

  totalFurnishingEstimatedValue = [
    furnishingEstimate[0],
    furnishingEstimate[1],
    furnishingEstimate[2],
  ];
  totalBVDEstimatedValueFurnishing = [
    bvdDesignEstimate[0],
    bvdDesignEstimate[1],
    bvdDesignEstimate[2],
  ];
  // UPDATE OUTPUT
  let output = document.getElementById("furnishing__output");
  let html = `
  <div class="tr">
  <div class="th">FURNISHING</div>
  <div class="th">LOW</div>
  <div class="th">MID</div>
  <div class="th">HIGH</div>
</div>
  `;
  for (let x = 0; x < 10; x++) {
    if (items[x].checked) {
      html += `
      <div class="tr">
            <div class="td">${items[x].dataset.label}</div>
            <div class="td">${formatter.format(
              returnZeroIfNotNumber(results[RESULT_LABELS[x]][0])
            )}</div>
            <div class="td">${formatter.format(
              returnZeroIfNotNumber(results[RESULT_LABELS[x]][1])
            )}</div>
            <div class="td">${formatter.format(
              returnZeroIfNotNumber(results[RESULT_LABELS[x]][2])
            )}</div>
          </div>
      `;
    }
  }

  html += `
  <div class="tr">
  <div class="th">TOTAL FURNISHING ESTIMATE</div>
  <div class="th">${formatter.format(
    returnZeroIfNotNumber(furnishingEstimate[0])
  )}</div>
  <div class="th">${formatter.format(
    returnZeroIfNotNumber(furnishingEstimate[1])
  )}</div>
  <div class="th">${formatter.format(
    returnZeroIfNotNumber(furnishingEstimate[2])
  )}</div>
</div>
  `;

  output.innerHTML = html;

  updateSummaryOutput();
  items.forEach((itm, ind) => {
    if (itm.checked) {
      DATA[rowCntr++] = [
        itm.dataset.label,
        roomFreq[ind] * 100 + "%",
        simRoom[ind],
        results[`l_m_h_${ind + 1}`][0],
        results[`l_m_h_${ind + 1}`][1],
        results[`l_m_h_${ind + 1}`][2],
      ];
    }
  });
  DATA[rowCntr++] = [
    "FURNISHING ESTIMATE",
    "",
    "",
    furnishingEstimate[0],
    furnishingEstimate[1],
    furnishingEstimate[2],
  ];
  DATA[rowCntr++] = [
    "BVD DESIGN FEE ESTIMATE",
    "",
    "",
    bvdDesignEstimate[0],
    bvdDesignEstimate[1],
    bvdDesignEstimate[2],
  ];
  DATA[rowCntr++] = [
    "FURNISHING TOTAL ESTIMATE",
    "",
    "",
    grandTotal[0],
    grandTotal[1],
    grandTotal[2],
  ];
  return DATA;
}
function calculateCoesmetic() {
  const DATA = [];
  let rowCntr = 0;
  const ITEMS = [
    "Paint (Materials & Labor)",
    "Wallpaper (Materials & Labor)",
    "Custom built ins (Meterials & Labor)",
    "Wood floors (Materials & Labor)",
    "Tile (Materials & Labor)",
  ];
  const DATA_FORMULA = {
    "Paint (Materials & Labor)": {
      high: function () {
        return 7;
      },
      mid: function () {
        return 4;
      },
      low: function () {
        return 2.5;
      },
    },
    "Wallpaper (Materials & Labor)": {
      high: function () {
        return 14;
      },
      mid: function () {
        return 9;
      },
      low: function () {
        return 4;
      },
    },
    "Custom built ins (Meterials & Labor)": {
      high: function () {
        return 125;
      },
      mid: function () {
        return 100;
      },
      low: function () {
        return 75;
      },
    },
    "Wood floors (Materials & Labor)": {
      high: function () {
        return 21;
      },
      mid: function () {
        return 13.5;
      },
      low: function () {
        return 6;
      },
    },
    "Tile (Materials & Labor)": {
      high: function () {
        return 62;
      },
      mid: function () {
        return 34;
      },
      low: function () {
        return 8;
      },
    },
  };
  let roomFreq = [
    document.getElementById("roomFreq__csmtscp--1").value / 100,
    document.getElementById("roomFreq__csmtscp--2").value / 100,
    document.getElementById("roomFreq__csmtscp--3").value / 100,
    document.getElementById("roomFreq__csmtscp--4").value / 100,
    document.getElementById("roomFreq__csmtscp--5").value / 100,
  ];

  let sqFt = [
    document.getElementById("sqft__csmtscp--1").value * 1,
    document.getElementById("sqft__csmtscp--2").value * 1,
    document.getElementById("sqft__csmtscp--3").value * 1,
    document.getElementById("sqft__csmtscp--4").value * 1,
    document.getElementById("sqft__csmtscp--5").value * 1,
  ];

  let items = [
    document.getElementById("paint"),
    document.getElementById("wallpaper"),
    document.getElementById("cutomBuiltIn"),
    document.getElementById("woodFlr"),
    document.getElementById("tile"),
  ];

  // Perform Calculations
  const RESULT_LABELS = ["l_m_h_1", "l_m_h_2", "l_m_h_3", "l_m_h_4", "l_m_h_5"];

  let results = {
    l_m_h_1: [0, 0, 0],
    l_m_h_2: [0, 0, 0],
    l_m_h_3: [0, 0, 0],
    l_m_h_4: [0, 0, 0],
    l_m_h_5: [0, 0, 0],
  };
  for (let x = 0; x < 5; x++) {
    if (!items[x].checked) {
      results[RESULT_LABELS[x]] = [0, 0, 0];
    } else {
      results[RESULT_LABELS[x]] = [
        roomFreq[x] * sqFt[x] * DATA_FORMULA[ITEMS[x]].low(),
        roomFreq[x] * sqFt[x] * DATA_FORMULA[ITEMS[x]].mid(),
        roomFreq[x] * sqFt[x] * DATA_FORMULA[ITEMS[x]].high(),
      ];
    }
  }

  let cosmeticEstimate = [
    results.l_m_h_1[0] +
      results.l_m_h_2[0] +
      results.l_m_h_3[0] +
      results.l_m_h_4[0] +
      results.l_m_h_5[0],
    results.l_m_h_1[1] +
      results.l_m_h_2[1] +
      results.l_m_h_3[1] +
      results.l_m_h_4[1] +
      results.l_m_h_5[1],
    results.l_m_h_1[2] +
      results.l_m_h_2[2] +
      results.l_m_h_3[2] +
      results.l_m_h_4[2] +
      results.l_m_h_5[2],
  ];
  // UPDATE OUTPUT
  let output = document.getElementById("coesmetic__output");
  let html = `
 <div class="tr">
 <div class="th">ADD-ON SERVICES</div>
 <div class="th">LOW</div>
 <div class="th">MID</div>
 <div class="th">HIGH</div>
</div>
 `;
  for (let x = 0; x < 5; x++) {
    if (items[x].checked) {
      html += `
     <div class="tr">
           <div class="td">${items[x].dataset.label}</div>
           <div class="td">${formatter.format(
             returnZeroIfNotNumber(results[RESULT_LABELS[x]][0])
           )}</div>
           <div class="td">${formatter.format(
             returnZeroIfNotNumber(results[RESULT_LABELS[x]][1])
           )}</div>
           <div class="td">${formatter.format(
             returnZeroIfNotNumber(results[RESULT_LABELS[x]][2])
           )}</div>
         </div>
     `;
    }
  }
  if (document.getElementById("furnishingRecIns").checked) {
    html += `
    <div class="tr">
          <div class="td">Furnishings Receiving & Installation</div>
          <div class="td">${formatter.format(
            returnZeroIfNotNumber(totalFurnishingEstimatedValue[0] * 0.25)
          )}</div>
          <div class="td">${formatter.format(
            returnZeroIfNotNumber(totalFurnishingEstimatedValue[0] * 0.25)
          )}</div>
          <div class="td">${formatter.format(
            returnZeroIfNotNumber(totalFurnishingEstimatedValue[0] * 0.25)
          )}</div>
        </div>
    `;
    html += `
    <div class="tr">
    <div class="th">TOTAL ADD-ON SERVICES ESTIMATE</div>
    <div class="th">${formatter.format(
      returnZeroIfNotNumber(
        cosmeticEstimate[0] + totalFurnishingEstimatedValue[0] * 0.25
      )
    )}</div>
    <div class="th">${formatter.format(
      returnZeroIfNotNumber(
        cosmeticEstimate[1] + totalFurnishingEstimatedValue[0] * 0.25
      )
    )}</div>
    <div class="th">${formatter.format(
      returnZeroIfNotNumber(
        cosmeticEstimate[2] + totalFurnishingEstimatedValue[0] * 0.25
      )
    )}</div>
   </div>
    `;
  } else {
    html += `
 <div class="tr">
 <div class="th">TOTAL ADD-ON SERVICES ESTIMATE</div>
 <div class="th">${formatter.format(
   returnZeroIfNotNumber(cosmeticEstimate[0])
 )}</div>
 <div class="th">${formatter.format(
   returnZeroIfNotNumber(cosmeticEstimate[1])
 )}</div>
 <div class="th">${formatter.format(
   returnZeroIfNotNumber(cosmeticEstimate[2])
 )}</div>
</div>
 `;
  }

  output.innerHTML = html;

  let bvdDesignEstimate = [
    cosmeticEstimate[0] * 0.1,
    cosmeticEstimate[0] * 0.12,
    cosmeticEstimate[0] * 0.14,
  ];

  if (document.getElementById("furnishingRecIns").checked) {
    totalCoesmeticsEstimatedValue = [
      cosmeticEstimate[0] + totalFurnishingEstimatedValue[0] * 0.25,
      cosmeticEstimate[1] + totalFurnishingEstimatedValue[0] * 0.25,
      cosmeticEstimate[2] + totalFurnishingEstimatedValue[0] * 0.25,
    ];
  } else {
    totalCoesmeticsEstimatedValue = [
      cosmeticEstimate[0],
      cosmeticEstimate[1],
      cosmeticEstimate[2],
    ];
  }
  let grandTotal = [
    totalCoesmeticsEstimatedValue[0] + bvdDesignEstimate[0],
    totalCoesmeticsEstimatedValue[1] + bvdDesignEstimate[1],
    totalCoesmeticsEstimatedValue[2] + bvdDesignEstimate[2],
  ];
  totalBVDEstimatedValueCoesmetics = [
    bvdDesignEstimate[0],
    bvdDesignEstimate[1],
    bvdDesignEstimate[2],
  ];
  updateSummaryOutput();
  items.forEach((itm, ind) => {
    if (itm.checked) {
      console.log(sqFt[ind]);
      console.log(itm.dataset.label);
      DATA[rowCntr++] = [
        itm.dataset.label,
        roomFreq[ind] * 100 + "%",
        sqFt[ind],
        results[`l_m_h_${ind + 1}`][0],
        results[`l_m_h_${ind + 1}`][1],
        results[`l_m_h_${ind + 1}`][2],
      ];
    }
  });
  if (document.getElementById("furnishingRecIns").checked) {
    DATA[rowCntr++] = [
      "Furnishings Receiving & Installation",
      "",
      "",
      totalFurnishingEstimatedValue[0] * 0.25,
      totalFurnishingEstimatedValue[0] * 0.25,
      totalFurnishingEstimatedValue[0] * 0.25,
    ];
  }
  DATA[rowCntr++] = [
    "ADD-ON SERVICES ESTIMATE",
    "",
    "",
    totalCoesmeticsEstimatedValue[0],
    totalCoesmeticsEstimatedValue[1],
    totalCoesmeticsEstimatedValue[2],
  ];
  DATA[rowCntr++] = [
    "BVD DESIGN FEE ESTIMATE",
    "",
    "",
    bvdDesignEstimate[0],
    bvdDesignEstimate[1],
    bvdDesignEstimate[2],
  ];
  DATA[rowCntr++] = [
    "ADD-ON SERVICES TOTAL ESTIMATE",
    "",
    "",
    grandTotal[0],
    grandTotal[1],
    grandTotal[2],
  ];
  return DATA;
}
function calculateConstruction() {
  const DATA = [];
  let rowCntr = 0;
  const DATA_FORMULA = {
    "Remodel Kitchen": {
      high: 150000,
      low: function () {
        return this.high * 0.25;
      },
      mid: function () {
        return this.high * 0.5;
      },
    },
    "Remodel Primary Bathroom": {
      high: 100000,
      low: function () {
        return this.high * 0.25;
      },
      mid: function () {
        return this.high * 0.5;
      },
    },
    "Remodel non-Primary Bathroom": {
      high: 50000,
      low: function () {
        return this.high * 0.3;
      },
      mid: function () {
        return this.high * 0.6;
      },
    },
  };
  let roomFreq__cntrscp_1 =
    document.getElementById("roomFreq__cntrscp--1").value / 100;
  let roomFreq__cntrscp_2 =
    document.getElementById("roomFreq__cntrscp--2").value / 100;
  let roomFreq__cntrscp_3 =
    document.getElementById("roomFreq__cntrscp--3").value / 100;

  let simRoom__cntrscp_1 =
    document.getElementById("simRoom__cntrscp--1").value * 1;
  let simRoom__cntrscp_2 =
    document.getElementById("simRoom__cntrscp--2").value * 1;
  let simRoom__cntrscp_3 =
    document.getElementById("simRoom__cntrscp--3").value * 1;

  let isKitchen = document.getElementById("kitchen").checked;
  let isPriBath = document.getElementById("primBath").checked;
  let isSecBath = document.getElementById("nonPriBath").checked;

  // Perform Calculations

  let results = {
    l_m_h_1: [0, 0, 0],
    l_m_h_2: [0, 0, 0],
    l_m_h_3: [0, 0, 0],
  };
  if (!isKitchen) {
    results.l_m_h_1 = [0, 0, 0];
  } else {
    results.l_m_h_1 = [
      roomFreq__cntrscp_1 *
        simRoom__cntrscp_1 *
        DATA_FORMULA["Remodel Kitchen"].low(),
      roomFreq__cntrscp_1 *
        simRoom__cntrscp_1 *
        DATA_FORMULA["Remodel Kitchen"].mid(),
      roomFreq__cntrscp_1 *
        simRoom__cntrscp_1 *
        DATA_FORMULA["Remodel Kitchen"].high,
    ];
  }
  if (!isPriBath) {
    results.l_m_h_2 = [0, 0, 0];
  } else {
    results.l_m_h_2 = [
      roomFreq__cntrscp_2 *
        simRoom__cntrscp_2 *
        DATA_FORMULA["Remodel Primary Bathroom"].low(),
      roomFreq__cntrscp_2 *
        simRoom__cntrscp_2 *
        DATA_FORMULA["Remodel Primary Bathroom"].mid(),
      roomFreq__cntrscp_2 *
        simRoom__cntrscp_2 *
        DATA_FORMULA["Remodel Primary Bathroom"].high,
    ];
  }
  if (!isSecBath) {
    results.l_m_h_3 = [0, 0, 0];
  } else {
    results.l_m_h_3 = [
      roomFreq__cntrscp_3 *
        simRoom__cntrscp_3 *
        DATA_FORMULA["Remodel non-Primary Bathroom"].low(),
      roomFreq__cntrscp_3 *
        simRoom__cntrscp_3 *
        DATA_FORMULA["Remodel non-Primary Bathroom"].mid(),
      roomFreq__cntrscp_3 *
        simRoom__cntrscp_3 *
        DATA_FORMULA["Remodel non-Primary Bathroom"].high,
    ];
  }
  let constructionEstimate = [
    results.l_m_h_1[0] + results.l_m_h_2[0] + results.l_m_h_3[0],
    results.l_m_h_1[1] + results.l_m_h_2[1] + results.l_m_h_3[1],
    results.l_m_h_1[2] + results.l_m_h_2[2] + results.l_m_h_3[2],
  ];

  // UPDATE OUTPUT
  let output = document.getElementById("construction__output");
  let html = `
 <div class="tr">
 <div class="th">REMODEL</div>
 <div class="th">LOW</div>
 <div class="th">MID</div>
 <div class="th">HIGH</div>
</div>
 `;

  if (isKitchen) {
    html += `
     <div class="tr">
           <div class="td">KITCHEN</div>
           <div class="td">${formatter.format(
             returnZeroIfNotNumber(results.l_m_h_1[0])
           )}</div>
           <div class="td">${formatter.format(
             returnZeroIfNotNumber(results.l_m_h_1[1])
           )}</div>
           <div class="td">${formatter.format(
             returnZeroIfNotNumber(results.l_m_h_1[2])
           )}</div>
         </div>
     `;
  }
  if (isPriBath) {
    html += `
     <div class="tr">
           <div class="td">Primary Bathroom</div>
           <div class="td">${formatter.format(
             returnZeroIfNotNumber(results.l_m_h_2[0])
           )}</div>
           <div class="td">${formatter.format(
             returnZeroIfNotNumber(results.l_m_h_2[1])
           )}</div>
           <div class="td">${formatter.format(
             returnZeroIfNotNumber(results.l_m_h_2[2])
           )}</div>
         </div>
     `;
  }
  if (isSecBath) {
    html += `
     <div class="tr">
           <div class="td">Non-Primary Bathroom</div>
           <div class="td">${formatter.format(
             returnZeroIfNotNumber(results.l_m_h_3[0])
           )}</div>
           <div class="td">${formatter.format(
             returnZeroIfNotNumber(results.l_m_h_3[1])
           )}</div>
           <div class="td">${formatter.format(
             returnZeroIfNotNumber(results.l_m_h_3[2])
           )}</div>
         </div>
     `;
  }

  html += `
 <div class="tr">
 <div class="th">TOTAL REMODEL ESTIMATE</div>
 <div class="th">${formatter.format(
   returnZeroIfNotNumber(constructionEstimate[0])
 )}</div>
 <div class="th">${formatter.format(
   returnZeroIfNotNumber(constructionEstimate[1])
 )}</div>
 <div class="th">${formatter.format(
   returnZeroIfNotNumber(constructionEstimate[2])
 )}</div>
</div>
 `;
  output.innerHTML = html;
  let bvdDesignEstimate = [
    constructionEstimate[0] * 0.1,
    constructionEstimate[0] * 0.12,
    constructionEstimate[0] * 0.14,
  ];
  let grandTotal = [
    constructionEstimate[0] + bvdDesignEstimate[0],
    constructionEstimate[1] + bvdDesignEstimate[1],
    constructionEstimate[2] + bvdDesignEstimate[2],
  ];

  totalConstructionEstimatedValue = [
    constructionEstimate[0],
    constructionEstimate[1],
    constructionEstimate[2],
  ];

  totalBVDEstimatedValueConstruction = [
    bvdDesignEstimate[0],
    bvdDesignEstimate[1],
    bvdDesignEstimate[2],
  ];
  if (isKitchen)
    DATA[rowCntr++] = [
      "KITCHEN",
      roomFreq__cntrscp_1 * 100,
      simRoom__cntrscp_1,
      results.l_m_h_1[0],
      results.l_m_h_1[1],
      results.l_m_h_1[2],
    ];
  if (isPriBath)
    DATA[rowCntr++] = [
      "Primary Bathroom",
      roomFreq__cntrscp_2 * 100,
      simRoom__cntrscp_2,
      results.l_m_h_2[0],
      results.l_m_h_2[1],
      results.l_m_h_2[2],
    ];
  if (isSecBath)
    DATA[rowCntr++] = [
      "Non-Primary Bathroom",
      roomFreq__cntrscp_3 * 100,
      simRoom__cntrscp_3,
      results.l_m_h_3[0],
      results.l_m_h_3[1],
      results.l_m_h_3[2],
    ];

  DATA[rowCntr++] = [
    "REMODEL ESTIMATE",
    "",
    "",
    constructionEstimate[0],
    constructionEstimate[1],
    constructionEstimate[2],
  ];
  DATA[rowCntr++] = [
    "BVD DESIGN ESTIMATE",
    "",
    "",
    bvdDesignEstimate[0],
    bvdDesignEstimate[1],
    bvdDesignEstimate[2],
  ];
  DATA[rowCntr++] = [
    "REMODEL TOTAL ESTIMATE",
    "",
    "",
    grandTotal[0],
    grandTotal[1],
    grandTotal[2],
  ];
  updateSummaryOutput();
  return DATA;
}
function updateSummaryOutput() {
  let DATA = [];
  let rowCntr = 0;
  const bnv__mid = document.getElementById("bnv__mid");
  // const white_glove_mid = document.querySelectorAll("#white_glove_mid");
  const grand_total_low = document.getElementById("grand_total_low");
  const grand_total_mid = document.getElementById("grand_total_mid");
  const grand_total_high = document.getElementById("grand_total_high");

  const BVD_TOTAL_VALUE = [
    totalBVDEstimatedValueConstruction[0] +
      totalBVDEstimatedValueCoesmetics[0] +
      totalBVDEstimatedValueFurnishing[0],
    totalBVDEstimatedValueConstruction[1] +
      totalBVDEstimatedValueCoesmetics[1] +
      totalBVDEstimatedValueFurnishing[1],
    totalBVDEstimatedValueConstruction[2] +
      totalBVDEstimatedValueCoesmetics[2] +
      totalBVDEstimatedValueFurnishing[2],
  ];
  let GRAND_TOTAL_VALUE;

  GRAND_TOTAL_VALUE = [
    totalConstructionEstimatedValue[0] +
      totalCoesmeticsEstimatedValue[0] +
      totalFurnishingEstimatedValue[0] +
      BVD_TOTAL_VALUE[1],
    totalConstructionEstimatedValue[1] +
      totalCoesmeticsEstimatedValue[1] +
      totalFurnishingEstimatedValue[1] +
      BVD_TOTAL_VALUE[1],
    totalConstructionEstimatedValue[2] +
      totalCoesmeticsEstimatedValue[2] +
      totalFurnishingEstimatedValue[2] +
      BVD_TOTAL_VALUE[1],
  ];

  bnv__mid.innerHTML = formatter.format(
    returnZeroIfNotNumber(BVD_TOTAL_VALUE[1])
  );

  grand_total_low.innerHTML = formatter.format(
    returnZeroIfNotNumber(GRAND_TOTAL_VALUE[0])
  );
  grand_total_mid.innerHTML = formatter.format(
    returnZeroIfNotNumber(GRAND_TOTAL_VALUE[1])
  );
  grand_total_high.innerHTML = formatter.format(
    returnZeroIfNotNumber(GRAND_TOTAL_VALUE[2])
  );

  DATA[rowCntr++] = [
    "REMODEL",
    "",
    "",
    totalConstructionEstimatedValue[0],
    totalConstructionEstimatedValue[1],
    totalConstructionEstimatedValue[2],
  ];
  DATA[rowCntr++] = [
    "COESMETIC",
    "",
    "",
    totalCoesmeticsEstimatedValue[0],
    totalCoesmeticsEstimatedValue[1],
    totalCoesmeticsEstimatedValue[2],
  ];
  DATA[rowCntr++] = [
    "FURNISHING",
    "",
    "",
    totalFurnishingEstimatedValue[0],
    totalFurnishingEstimatedValue[1],
    totalFurnishingEstimatedValue[2],
  ];
  DATA[rowCntr++] = [
    "BVD DESIGN FEE",
    "",
    "",
    BVD_TOTAL_VALUE[0],
    BVD_TOTAL_VALUE[1],
    BVD_TOTAL_VALUE[2],
  ];
  DATA[rowCntr++] = [
    "TOTAL",
    "",
    "",
    GRAND_TOTAL_VALUE[0],
    GRAND_TOTAL_VALUE[1],
    GRAND_TOTAL_VALUE[2],
  ];
  return DATA;
}
var formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",

  minimumFractionDigits: 2,
});
function filterVal(val) {
  return val.toString().replace("$", "").replace(/,/g, "").replace("%", "") * 1;
}
function returnZeroIfNotNumber(param) {
  // Check if the parameter is a number
  if (typeof param !== "number" || isNaN(param)) {
    return 0; // Return 0 if the parameter is not a number or NaN
  } else {
    return param; // Return the parameter if it is a number
  }
}
function downloadPDF() {
  const invoice = this.document.getElementById("content");
  var opt = {
    margin: 1,
    filename: "myfile.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 1 },
    jsPDF: { unit: "pt", format: "letter", orientation: "landscape" },
  };
  html2pdf().from(invoice).set(opt).save();
}

function generateHTMLReport() {
  let constructionData = calculateConstruction();
  let coesmeticsData = calculateCoesmetic();
  let furnishingData = calculateFurnishing();
  let outputData = updateSummaryOutput();
  console.log(constructionData, coesmeticsData, furnishingData);
  let html = `<section style="padding: 5px; margin-bottom: 10px">
  <h2 style="font-size: 19px">REMODEL ESTIMATE</h2>
  <table
    style="
      border-collapse: collapse;
      width: 100%;
      border: 1px solid black;
    "
  >
    <tr style='background-color:#c9c7bb'>
      <th
        style="
          text-transform: uppercase;
          text-align: left;
          border: 1px solid black;
          padding: 10px;
          width:16.66%
        "
      >
        Selected Room
      </th>
      <th
        style="
          text-transform: uppercase;
          text-align: center;
          border: 1px solid black;
          padding: 10px;width:16.66%
        "
      >
        % Of Room In scope
      </th>
      <th
        style="
          text-transform: uppercase;
          text-align: center;
          border: 1px solid black;
          padding: 10px;width:16.66%
        "
      >
        Room frequency
      </th>
      <th
        style="
          text-transform: uppercase;
          text-align: center;
          border: 1px solid black;
          padding: 10px;width:16.66%
        "
      >
        Low
      </th>
      <th
        style="
          text-transform: uppercase;
          text-align: center;
          border: 1px solid black;
          padding: 10px;width:16.66%
        "
      >
        Mid
      </th>
      <th
        style="
          text-transform: uppercase;
          text-align: right;
          border: 1px solid black;
          padding: 10px;width:16.66%
        "
      >
        High
      </th>
    </tr>
    `;
  constructionData.forEach((dta) => {
    console.log(dta);
    html += `
      <tr>
      <td
        style="
          text-transform: uppercase;
          text-align: left;
          border: 1px solid black;
          padding: 10px;width:16.66%
        "
      >
        ${dta[0]}
      </td>
      <td
        style="
          text-transform: uppercase;
          text-align: center;
          border: 1px solid black;
          padding: 10px;width:16.66%
        "
      >
      ${dta[1]}
      </td>
      <td
        style="
          text-transform: uppercase;
          text-align: center;
          border: 1px solid black;
          padding: 10px;width:16.66%
        "
      >
      ${dta[2]}
      </td>
      <td
        style="
          text-transform: uppercase;
          text-align: center;
          border: 1px solid black;
          padding: 10px;width:16.66%
        "
      >
      ${formatter.format(returnZeroIfNotNumber(dta[3]))}

      </td>
      <td
        style="
          text-transform: uppercase;
          text-align: center;
          border: 1px solid black;
          padding: 10px;width:16.66%
        "
      >
      ${formatter.format(returnZeroIfNotNumber(dta[4]))}

      </td>
      <td
        style="
          text-transform: uppercase;
          text-align: right;
          border: 1px solid black;
          padding: 10px;width:16.66%
        "
      >
      ${formatter.format(returnZeroIfNotNumber(dta[5]))}
      </td>
    </tr>
      `;
  });

  html += `
  </table>
</section>`;
  html += `<section style="padding: 5px; margin-bottom: 10px">
  <h2 style="font-size: 19px">FURNISHING ESTIMATE</h2>
  <table
    style="
      border-collapse: collapse;
      width: 100%;
      border: 1px solid black;
    "
  >
    <tr style='background-color:#c9c7bb'>
      <th
        style="
          text-transform: uppercase;
          text-align: left;
          border: 1px solid black;
          padding: 10px;width:16.66%
        "
      >
        Selected Room
      </th>
      <th
        style="
          text-transform: uppercase;
          text-align: center;
          border: 1px solid black;
          padding: 10px;width:16.66%
        "
      >
        % Of Room In scope
      </th>
      <th
        style="
          text-transform: uppercase;
          text-align: center;
          border: 1px solid black;
          padding: 10px;width:16.66%
        "
      >
        Room frequency
      </th>
      <th
        style="
          text-transform: uppercase;
          text-align: center;
          border: 1px solid black;
          padding: 10px;width:16.66%
        "
      >
        Low
      </th>
      <th
        style="
          text-transform: uppercase;
          text-align: center;
          border: 1px solid black;
          padding: 10px;width:16.66%
        "
      >
        Mid
      </th>
      <th
        style="
          text-transform: uppercase;
          text-align: right;
          border: 1px solid black;
          padding: 10px;width:16.66%
        "
      >
        High
      </th>
    </tr>
    `;
  furnishingData.forEach((dta) => {
    html += `
      <tr>
      <td
        style="
          text-transform: uppercase;
          text-align: left;
          border: 1px solid black;
          padding: 10px;width:16.66%
        "
      >
        ${dta[0]}
      </td>
      <td
        style="
          text-transform: uppercase;
          text-align: center;
          border: 1px solid black;
          padding: 10px;width:16.66%
        "
      >
      ${dta[1]}
      </td>
      <td
        style="
          text-transform: uppercase;
          text-align: center;
          border: 1px solid black;
          padding: 10px;width:16.66%
        "
      >
      ${dta[2]}
      </td>
      <td
        style="
          text-transform: uppercase;
          text-align: center;
          border: 1px solid black;
          padding: 10px;width:16.66%
        "
      >
      ${formatter.format(returnZeroIfNotNumber(dta[3]))}

      </td>
      <td
        style="
          text-transform: uppercase;
          text-align: center;
          border: 1px solid black;
          padding: 10px;width:16.66%
        "
      >
      ${formatter.format(returnZeroIfNotNumber(dta[4]))}

      </td>
      <td
        style="
          text-transform: uppercase;
          text-align: right;
          border: 1px solid black;
          padding: 10px;width:16.66%
        "
      >
      ${formatter.format(returnZeroIfNotNumber(dta[5]))}
      </td>
    </tr>
      `;
  });

  html += `
  </table>
</section>`;
  html += `<section style="padding: 5px; margin-bottom: 10px">
<h2 style="font-size: 19px">ADD-ON SERVICES</h2>
<table
  style="
    border-collapse: collapse;
    width: 100%;
    border: 1px solid black;
  "
>
  <tr style='background-color:#c9c7bb'>
    <th
      style="
        text-transform: uppercase;
        text-align: left;
        border: 1px solid black;
        padding: 10px;width:16.66%
      "
    >
      Selected Add-On Service
    </th>
    <th
      style="
        text-transform: uppercase;
        text-align: center;
        border: 1px solid black;
        padding: 10px;width:16.66%
      "
    >
      % Of Room In scope
    </th>
    <th
      style="
        text-transform: uppercase;
        text-align: center;
        border: 1px solid black;
        padding: 10px;width:16.66%
      "
    >
      SQFT
    </th>
    <th
      style="
        text-transform: uppercase;
        text-align: center;
        border: 1px solid black;
        padding: 10px;width:16.66%
      "
    >
      Low
    </th>
    <th
      style="
        text-transform: uppercase;
        text-align: center;
        border: 1px solid black;
        padding: 10px;width:16.66%
      "
    >
      Mid
    </th>
    <th
      style="
        text-transform: uppercase;
        text-align: right;
        border: 1px solid black;
        padding: 10px;width:16.66%
      "
    >
      High
    </th>
  </tr>
  `;
  coesmeticsData.forEach((dta) => {
    html += `
    <tr>
    <td
      style="
        text-transform: uppercase;
        text-align: left;
        border: 1px solid black;
        padding: 10px;width:16.66%
      "
    >
      ${dta[0]}
    </td>
    <td
      style="
        text-transform: uppercase;
        text-align: center;
        border: 1px solid black;
        padding: 10px;width:16.66%
      "
    >
    ${dta[1]}
    </td>
    <td
      style="
        text-transform: uppercase;
        text-align: center;
        border: 1px solid black;
        padding: 10px;width:16.66%
      "
    >
    ${dta[2]}
    </td>
    <td
      style="
        text-transform: uppercase;
        text-align: center;
        border: 1px solid black;
        padding: 10px;width:16.66%
      "
    >
    ${formatter.format(returnZeroIfNotNumber(dta[3]))}

    </td>
    <td
      style="
        text-transform: uppercase;
        text-align: center;
        border: 1px solid black;
        padding: 10px;width:16.66%
      "
    >
    ${formatter.format(returnZeroIfNotNumber(dta[4]))}

    </td>
    <td
      style="
        text-transform: uppercase;
        text-align: right;
        border: 1px solid black;
        padding: 10px;width:16.66%
      "
    >
    ${formatter.format(returnZeroIfNotNumber(dta[5]))}
    </td>
  </tr>
    `;
  });

  html += `
</table>
</section>`;
  html += `<section style="padding: 5px; margin-bottom: 10px">
<h2 style="font-size: 19px">PROJECT MODEL RANGE</h2>
<table
  style="
    border-collapse: collapse;
    width: 100%;
    border: 1px solid black;
  "
>
  <tr style='background-color:#c9c7bb'>
    <th
      style="
        text-transform: uppercase;
        text-align: left;
        border: 1px solid black;
        padding: 10px;
      "
    >
      ESTIMATES
    </th>
    <th
      style="
        text-transform: uppercase;
        text-align: center;
        border: 1px solid black;
        padding: 10px;width:16.66%
      "
    >
       
    </th>
    <th
      style="
        text-transform: uppercase;
        text-align: center;
        border: 1px solid black;
        padding: 10px;width:16.66%
      "
    >
       
    </th>
    <th
      style="
        text-transform: uppercase;
        text-align: center;
        border: 1px solid black;
        padding: 10px;width:16.66%
      "
    >
       
    </th>
    <th
      style="
        text-transform: uppercase;
        text-align: center;
        border: 1px solid black;
        padding: 10px;width:16.66%
      "
    >
       
    </th>
    <th
      style="
        text-transform: uppercase;
        text-align: right;
        border: 1px solid black;
        padding: 10px;width:16.66%
      "
    >
       
    </th>
  </tr>
  `;
  outputData.forEach((dta) => {
    html += `
    <tr>
    <td
      style="
        text-transform: uppercase;
        text-align: left;
        border: 1px solid black;
        padding: 10px;width:16.66%
      "
    >
      ${dta[0]}
    </td>
    <td
      style="
        text-transform: uppercase;
        text-align: center;
        border: 1px solid black;
        padding: 10px;width:16.66%
      "
    >
    ${dta[1]}
    </td>
    <td
      style="
        text-transform: uppercase;
        text-align: center;
        border: 1px solid black;
        padding: 10px;width:16.66%
      "
    >
    ${dta[2]}
    </td>
    <td
      style="
        text-transform: uppercase;
        text-align: center;
        border: 1px solid black;
        padding: 10px;width:16.66%
      "
    >
    ${formatter.format(returnZeroIfNotNumber(dta[3]))}

    </td>
    <td
      style="
        text-transform: uppercase;
        text-align: center;
        border: 1px solid black;
        padding: 10px;width:16.66%
      "
    >
    ${formatter.format(returnZeroIfNotNumber(dta[4]))}

    </td>
    <td
      style="
        text-transform: uppercase;
        text-align: right;
        border: 1px solid black;
        padding: 10px;width:16.66%
      "
    >
    ${formatter.format(returnZeroIfNotNumber(dta[5]))}
    </td>
  </tr>
    `;
  });

  html += `
</table>
</section>`;
  return html;
}
function minifyHTML(html) {
  // Remove comments
  html = html.replace(/<!--[\s\S]*?-->/g, "");

  // Remove whitespace between HTML tags
  html = html.replace(/\s{2,}/g, " ");

  // Remove whitespace between attributes
  html = html.replace(/>\s+</g, "><");

  // Remove whitespace at the beginning and end of lines
  html = html.replace(/^\s+|\s+$/g, "");

  return html;
}
function updateAll() {
  calculateCoesmetic();
  calculateConstruction();
  calculateFurnishing();
}

(function () {
  const inputsConstruction = [
    document.getElementById("roomFreq__cntrscp--1"),
    document.getElementById("roomFreq__cntrscp--2"),
    document.getElementById("roomFreq__cntrscp--3"),
    document.getElementById("simRoom__cntrscp--1"),
    document.getElementById("simRoom__cntrscp--2"),
    document.getElementById("simRoom__cntrscp--3"),
    document.getElementById("kitchen"),
    document.getElementById("primBath"),
    document.getElementById("nonPriBath"),
  ];
  const inputCoesmetics = [
    document.getElementById("roomFreq__csmtscp--1"),
    document.getElementById("roomFreq__csmtscp--2"),
    document.getElementById("roomFreq__csmtscp--3"),
    document.getElementById("roomFreq__csmtscp--4"),
    document.getElementById("roomFreq__csmtscp--5"),
    document.getElementById("sqft__csmtscp--1"),
    document.getElementById("sqft__csmtscp--2"),
    document.getElementById("sqft__csmtscp--3"),
    document.getElementById("sqft__csmtscp--4"),
    document.getElementById("sqft__csmtscp--5"),
    document.getElementById("paint"),
    document.getElementById("wallpaper"),
    document.getElementById("cutomBuiltIn"),
    document.getElementById("woodFlr"),
    document.getElementById("tile"),
  ];
  const inputFurnishing = [
    document.getElementById("roomFreq__frunscp--1"),
    document.getElementById("roomFreq__frunscp--2"),
    document.getElementById("roomFreq__frunscp--3"),
    document.getElementById("roomFreq__frunscp--4"),
    document.getElementById("roomFreq__frunscp--5"),
    document.getElementById("roomFreq__frunscp--6"),
    document.getElementById("roomFreq__frunscp--7"),
    document.getElementById("roomFreq__frunscp--8"),
    document.getElementById("roomFreq__frunscp--9"),
    document.getElementById("roomFreq__frunscp--10"),
    document.getElementById("simRoom__frunscp--1"),
    document.getElementById("simRoom__frunscp--2"),
    document.getElementById("simRoom__frunscp--3"),
    document.getElementById("simRoom__frunscp--4"),
    document.getElementById("simRoom__frunscp--5"),
    document.getElementById("simRoom__frunscp--6"),
    document.getElementById("simRoom__frunscp--7"),
    document.getElementById("simRoom__frunscp--8"),
    document.getElementById("simRoom__frunscp--9"),
    document.getElementById("simRoom__frunscp--10"),
    document.getElementById("livingRoom"),
    document.getElementById("primBed"),
    document.getElementById("secBed"),
    document.getElementById("bathroom"),
    document.getElementById("office"),
    document.getElementById("outLivSpace"),
    document.getElementById("kitchen-fur"),
    document.getElementById("diningRoom"),
    document.getElementById("hallway"),
    document.getElementById("flexRoom"),
  ];
  const checkBoxes = [
    document.getElementById("kitchen"),
    document.getElementById("primBath"),
    document.getElementById("nonPriBath"),
    document.getElementById("livingRoom"),
    document.getElementById("primBed"),
    document.getElementById("secBed"),
    document.getElementById("bathroom"),
    document.getElementById("office"),
    document.getElementById("outLivSpace"),
    document.getElementById("kitchen-fur"),
    document.getElementById("diningRoom"),
    document.getElementById("hallway"),
    document.getElementById("flexRoom"),
  ];
  const checkBoxAddOnSer = [
    document.getElementById("paint"),
    document.getElementById("wallpaper"),
    document.getElementById("cutomBuiltIn"),
    document.getElementById("woodFlr"),
    document.getElementById("tile"),
  ];
  checkBoxes.forEach((cb) => {
    cb.addEventListener("change", (e) => {
      selectDiselectRow(cb, "none");
    });
  });
  checkBoxAddOnSer.forEach((cb) => {
    cb.addEventListener("change", (e) => {
      selectDiselectRow(cb, "addonser");
    });
  });

  inputsConstruction.forEach((inp) => {
    inp.addEventListener("input", updateAll);
    inp.addEventListener("change", updateAll);
  });

  inputCoesmetics.forEach((inp) => {
    inp.addEventListener("input", updateAll);
    inp.addEventListener("change", updateAll);
  });

  inputFurnishing.forEach((inp) => {
    inp.addEventListener("input", updateAll);
    inp.addEventListener("change", updateAll);
  });

  document
    .getElementById("contact-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      // these IDs from the previous steps
      document.getElementById("btn__submit").value = "Please wait...";
      document.getElementById("btn__submit").disabled = true;
      this.html.value = minifyHTML(generateHTMLReport());
      emailjs.sendForm("service_nqm1ori", "template_xya7oh9", this).then(
        () => {
          document.getElementById("btn__submit").value = "Please check inbox";
          document.getElementById("btn__submit").disabled = false;
          console.log("SUCCESS!");
        },
        (error) => {
          console.log("FAILED...", error);
          document.getElementById("btn__submit").value = "Please try again!";
          document.getElementById("btn__submit").disabled = false;
        }
      );
    });
  checkBoxes.forEach((cb) => {
    selectDiselectRow(cb, "none");
  });
  checkBoxAddOnSer.forEach((cb) => {
    selectDiselectRow(cb, "addonser");
  });
  calculateCoesmetic();
  calculateConstruction();
  calculateFurnishing();
})();
