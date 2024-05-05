function calculateResult() {
  let currentAge = filterVal(document.getElementById("currentAge").value) * 1;
  let retirementAge =
    filterVal(document.getElementById("retirementAge").value) * 1;
  let salary = filterVal(document.getElementById("salary").value) * 1;
  let currentPosSize =
    filterVal(document.getElementById("currentPosSize").value) * 1;
  let employerCont =
    filterVal(document.getElementById("employerCont").value) / 100;
  let employeeCont =
    filterVal(document.getElementById("employeeCont").value) / 100;
  let currentProv = document.getElementById("currentProv").value;
  if (currentAge > retirementAge) {
    document.querySelector(".err__msg").style.display = "block";
    return;
  } else {
    document.querySelector(".err__msg").style.display = "none";
  }

  let yearTillRetirement = retirementAge - currentAge;
  let sourceFEAnalytics = 0;
  if (yearTillRetirement >= 10) {
    sourceFEAnalytics = 12.41; // If retirement age is 10 years or more away
  } else if (yearTillRetirement >= 5 && yearTillRetirement <= 9) {
    sourceFEAnalytics = 10; // If retirement age is 5-9 years away
  } else if (yearTillRetirement >= 0 && yearTillRetirement <= 4) {
    sourceFEAnalytics = 8; // If retirement age is 0-4 years away
  } else {
    sourceFEAnalytics = 0; // Default case (handle invalid input or unexpected values)
  }
  let yearsToRetirement = [];
  let periods = [];
  let CAGR = [];
  let contribution = [];
  let counter = 0;
  let age = [];
  let ageCounter = 0;
  for (let x = yearTillRetirement; x >= 0; x--) {
    age.push(currentAge + ageCounter);
    ageCounter++;
    yearsToRetirement.push(x);
    periods.push(1);
    var result;
    if (yearsToRetirement[counter] >= 10) {
      result = 12.41; // Assuming $B$12 is a variable representing the value in Excel
    } else if (yearsToRetirement[counter] <= 4) {
      result = 8; // Assuming $B$14 is a variable representing the value in Excel
    } else {
      result = 10; // Assuming $B$13 is a variable representing the value in Excel
    }
    CAGR.push(result);
    contribution.push(
      (salary * employerCont) / 12 + (salary * employeeCont) / 12
    );
    counter++;
  }
  let lumpsum = [currentPosSize];
  let futureVal = [
    FV(CAGR[0] / 1200, periods[0] * 12, -contribution[0], -lumpsum[0], 1),
  ];
  let platformFee = [0.0185];
  let platformFeeVal = [
    futureVal[0] - (futureVal[0] - futureVal[0] * platformFee[0]),
  ];
  let contributionFee = [0];
  let contributionFeeVal = [contribution[0] * 12 * contributionFee[0]];
  let totalAnnualFee = [platformFeeVal[0] + contributionFeeVal[0]];
  for (let x = 1; x < yearTillRetirement; x++) {
    lumpsum.push(futureVal[x - 1] - totalAnnualFee[x - 1]);
    futureVal.push(
      FV(CAGR[x] / 1200, periods[x] * 12, -contribution[x], -lumpsum[x], 1)
    );
    platformFee.push(0.0185);
    platformFeeVal.push(
      futureVal[x] - (futureVal[x] - futureVal[x] * platformFee[x])
    );
    contributionFee.push(0);
    contributionFeeVal.push(contribution[x] * 12 * contributionFee[x]);
    totalAnnualFee.push(platformFeeVal[x] + contributionFeeVal[x]);
  }
  return [futureVal, age];
}
function updateDynamicGraphLabel() {
  document.querySelectorAll("#dynamic__graph--label").forEach((el) => {
    var sel = document.getElementById("currentProv");
    var text = sel.options[sel.selectedIndex].text;
    el.innerHTML = text + " Pension pot";
  });
}
function changeSlider(ele, isPer, isCur) {
  let slectPrice = ele.parentNode.parentNode.children[1].children[0];

  ele.style.background = `linear-gradient(to right, #3ac9ad 0%, #3ac9ad ${
    ((ele.value - ele.min) / (ele.max - ele.min)) * 100
  }%, #DEE2E6 ${
    ((ele.value - ele.min) / (ele.max - ele.min)) * 100
  }%, #DEE2E6 100%)`;
  // Result in percentage
  if (isPer) slectPrice.value = ele.value + "%";
  else slectPrice.value = ele.value;
  if (isCur) slectPrice.value = formatter.format(ele.value);
}
function detectChangeInValue(ele) {
  let slectRange = ele.parentNode.parentNode.children[2].children[0];
  slectRange.value = filterVal(ele.value.replace("%", "")) * 1;
  slectRange.style.background = `linear-gradient(to right, #3ac9ad 0%, #3ac9ad ${
    ((slectRange.value - slectRange.min) / (slectRange.max - slectRange.min)) *
    100
  }%, #DEE2E6 ${
    ((slectRange.value - slectRange.min) / (slectRange.max - slectRange.min)) *
    100
  }%, #DEE2E6 100%)`;
}
function calculateBenchmarkResult() {
  let currentAge = filterVal(document.getElementById("currentAge").value) * 1;
  let retirementAge =
    filterVal(document.getElementById("retirementAge").value) * 1;
  let salary = filterVal(document.getElementById("salary").value) * 1;
  let currentPosSize =
    filterVal(document.getElementById("currentPosSize").value) * 1;
  let employerCont =
    filterVal(document.getElementById("employerCont").value) / 100;
  let employeeCont =
    filterVal(document.getElementById("employeeCont").value) / 100;
  let currentProv = document.getElementById("currentProv").value;
  if (currentAge > retirementAge) {
    document.querySelector(".err__msg").style.display = "block";
    return;
  } else {
    document.querySelector(".err__msg").style.display = "none";
  }

  let yearTillRetirement = retirementAge - currentAge;
  let sourceFEAnalytics = 0;
  if (yearTillRetirement >= 10) {
    sourceFEAnalytics = 12.41; // If retirement age is 10 years or more away
  } else if (yearTillRetirement >= 5 && yearTillRetirement <= 9) {
    sourceFEAnalytics = 10; // If retirement age is 5-9 years away
  } else if (yearTillRetirement >= 0 && yearTillRetirement <= 4) {
    sourceFEAnalytics = 8; // If retirement age is 0-4 years away
  } else {
    sourceFEAnalytics = 0; // Default case (handle invalid input or unexpected values)
  }
  let yearsToRetirement = [];
  let periods = [];
  let CAGR = [];
  let contribution = [];
  let counter = 0;
  for (let x = yearTillRetirement; x >= 0; x--) {
    yearsToRetirement.push(x);
    periods.push(1);
    var result = document.getElementById("currentProv").value * 1;
    CAGR.push(result);
    contribution.push(
      (salary * employerCont) / 12 + (salary * employeeCont) / 12
    );
    counter++;
  }
  let lumpsum = [currentPosSize];
  let futureVal = [
    FV(CAGR[0] / 1200, periods[0] * 12, -contribution[0], -lumpsum[0], 1),
  ];
  let platformFee = [0.0185];
  let platformFeeVal = [
    futureVal[0] - (futureVal[0] - futureVal[0] * platformFee[0]),
  ];
  let contributionFee = [0];
  let contributionFeeVal = [contribution[0] * 12 * contributionFee[0]];
  let totalAnnualFee = [platformFeeVal[0] + contributionFeeVal[0]];
  for (let x = 1; x < yearTillRetirement; x++) {
    lumpsum.push(futureVal[x - 1] - totalAnnualFee[x - 1]);
    futureVal.push(
      FV(CAGR[x] / 1200, periods[x] * 12, -contribution[x], -lumpsum[x], 1)
    );
    platformFee.push(0.0185);
    platformFeeVal.push(
      futureVal[x] - (futureVal[x] - futureVal[x] * platformFee[x])
    );
    contributionFee.push(0);
    contributionFeeVal.push(contribution[x] * 12 * contributionFee[x]);
    totalAnnualFee.push(platformFeeVal[x] + contributionFeeVal[x]);
  }
  return [futureVal, yearsToRetirement];
}
function updateGraph() {
  let arr1 = calculateResult();
  let arr2 = calculateBenchmarkResult();
  document.getElementById("eurikah__avg").innerHTML = formatYAxisLabel(
    arr1[0][arr1[0].length - 1] * 0.04
  );
  document.getElementById("uk__avg").innerHTML = formatYAxisLabel(
    arr2[0][arr2[0].length - 1] * 0.04
  );
  updateAndReloadChart(arr1[1]);
  updateChart(arr1[0], arr2[0]);
}
function FV(rate, nper, pmt, pv, type) {
  const pow = Math.pow(1 + rate, nper);
  let fv;

  pv = pv || 0;
  type = type || 0;

  if (rate) {
    fv = (pmt * (1 + rate * type) * (1 - pow)) / rate - pv * pow;
  } else {
    fv = -1 * (pv + pmt * nper);
  }
  return fv;
}
function formatYAxisLabel(num) {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];
  const regexp = /\.0+$|(?<=\.[0-9]*[1-9])0+$/;
  const item = lookup.findLast((item) => num >= item.value);
  return item
    ? (num / item.value).toFixed(0).replace(regexp, "").concat(item.symbol)
    : "0";
}
function formatLegendLabel(name) {
  const words = name.split(" ");
  const lastTwoWords = words.slice(-2).join(" ");
  const remainingText = words.slice(0, -2).join(" ");
  return `<span style="font-weight:bold">${remainingText}</span><br/><span style="font-size:10px">${lastTwoWords}</span>`; // Format legend text
}

const initialChartOptions = {
  chart: {
    type: "line",
    backgroundColor: "#f2f4f7", // Set the background color here
  },
  title: {
    text: "You can save the report or view the graph in full screen. Click on bars",
    align: "center",
    style: {
      fontSize: "14px", // Set the font size to '14px' (you can adjust this value as needed)
    },
  },
  xAxis: {
    title: {
      text: "Age",
    },
    categories: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    gridLineWidth: 1,
    lineWidth: 0,
  },
  yAxis: {
    min: 1,
    title: {
      text: "Pension Value",
      align: "middle",
    },
    labels: {
      overflow: "justify",
      formatter: function () {
        return "£" + formatYAxisLabel(this.value);
      },
    },
    gridLineWidth: 0,
    plotLines: [
      {
        value: 360000, // Value where you want the line
        color: "#c686f8", // Color of the line
        width: 2, // Thickness of the line
        zIndex: 4, // Positioning of the line relative to plot elements
        dashStyle: "dash", // Set the line style to dashed
        label: {
          text: "PLSA Minimum", // Label for the line
          align: "right", // Alignment of the label
          style: {
            color: "#c686f8", // Styling for the label
          },
        },
      },
      {
        value: 1070000, // Value where you want the line
        color: "#8e7bf5", // Color of the line
        width: 2, // Thickness of the line
        zIndex: 4, // Positioning of the line relative to plot elements
        dashStyle: "dash", // Set the line style to dashed
        label: {
          text: "PLSA Comfortable", // Label for the line
          align: "right", // Alignment of the label
          style: {
            color: "#8e7bf5", // Styling for the label
          },
        },
      },
    ],
  },
  tooltip: {
    formatter: function () {
      const xAxisCategory = this.series.xAxis.categories[this.point.x];
      const [rangeStart, rangeEnd] = xAxisCategory.split("-");
      const formattedXAxisValue = `<b>${rangeStart}</b>`;
      const yAxisValue = this.y;
      const tooltipText = `Years to achieve<br>${formattedXAxisValue}: ${yAxisValue} <br> years`;
      return tooltipText;
    },
    valueSuffix: " years",
  },
  plotOptions: {
    line: {
      dataLabels: {
        enabled: true,
        formatter: function () {
          return "£" + formatYAxisLabel(this.y);
        },
      },
      lineWidth: 4,
      enableMouseTracking: false,
    },
    column: {
      borderRadius: "10%",
      dataLabels: {
        enabled: true,
      },
      groupPadding: 0.1,
      colorByPoint: true,
      colors: ["#3ac9ad"],
    },
  },
  legend: {
    layout: "verticle",
    align: "left",
    verticalAlign: "top",
    itemMarginBottom: 10,
    x: 70,
    y: 20,
    floating: true,
    borderWidth: 0,
    backgroundColor: "#f2f47f",
    shadow: true,
    enabled: false,
    labelFormatter: function () {
      const words = this.name.split(" ");
      const firstWord = `<b>${words[0]}</b>`;
      const secondWord = `${words[1]}`;
      const thirdWord = `${words[2]}`;
      const fourthWord = `${words[3]}`;
      const fifthWord = `<b>${words[4]}</b>`;
      const sixthWord = `<b>${words[5]}</b>`;
      return `${firstWord} ${secondWord} ${thirdWord} ${fourthWord} <br><span style="font-size:10px">${fifthWord}</span> <span style="font-size:10px">${sixthWord}</span>`;
    },
  },
  credits: {
    enabled: false,
  },
  series: [
    {
      name: "eurikah average Pension pot £100k income",
      data: [7.84, 5.1, 3.78, 3.01, 2.5, 2.14, 1.87, 1.66, 1.49, 1.35],
      color: "#3ac9ad",
    },
    {
      name: "UK Average Pension pot £7.6k income",
      data: [
        17.84, 15.1, 13.78, 13.01, 12.5, 12.14, 11.87, 11.66, 11.49, 11.35,
      ],
      color: "#99b2c6",
    },
  ],
};

const chart = Highcharts.chart("container", initialChartOptions);

function updateChart(newData, newData1) {
  chart.series[0].setData(newData);
  chart.series[1].setData(newData1);
}
function updateAndReloadChart(newCategories) {
  // Update x-axis categories in initialChartOptions
  newCategories = newCategories;
  initialChartOptions.xAxis.categories = newCategories;

  // Assuming 'chart' is your Highcharts chart instance
  if (chart) {
    // If chart instance exists, update the options and redraw the chart
    chart.update(initialChartOptions);
  } else {
    // If chart instance doesn't exist, create a new chart with updated options
    chart = Highcharts.chart("chartContainer", initialChartOptions);
  }
}
function formatValue(inputFields) {
  let inputValue = inputFields.value;
  inputValue = inputValue.replace(/[£,]/g, ""); // remove $ and comma
  const formattedValue = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 0,
    // maximumFractionDigits: 0,
  }).format(inputValue);
  inputFields.value = formattedValue;
}
function formatPercentage(inputFields) {
  let inputValue = inputFields.value;
  inputValue = inputValue.replace(/[%,]/g, ""); // remove % and comma

  inputFields.value = inputValue + "%";
}
function filterVal(val) {
  return val.toString().replace("£", "").replace(/,/g, "").replace("%", "") * 1;
}
// Create our number formatter.
const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "GBP",

  // These options are needed to round to whole numbers if that's what you want.
  minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

updateGraph();
updateDynamicGraphLabel();
