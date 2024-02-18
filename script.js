let IsLoan1 = true;
function convertCommaToDot(input) {
  if (typeof input !== "number" && typeof input !== "string") {
    return input;
  }

  const inputString = input.toString();

  if (inputString.includes(",")) {
    const replacedInput = inputString.replace(",", ".");
    return parseFloat(replacedInput);
  } else {
    return parseFloat(input);
  }
}
function calculateLoan2() {
  let amountL2 = convertStringIntoNumber(document.getElementById("amount-l2"));
  let repaymentPeriodYrL2 = convertStringIntoNumber(
    document.getElementById("repaymentPeriodYr-l2")
  );
  let repaymentPeriodMoL2 = convertStringIntoNumber(
    document.getElementById("repaymentPeriodMo-l2")
  );
  let interestRateL2 =
    convertCommaToDot(document.getElementById("interestRate-l2").value) / 100;
  console.log(interestRateL2);
  let establishmentFeeL2 = convertStringIntoNumber(
    document.getElementById("establishmentFee-l2")
  );
  let installmentFeePerTermL2 = convertStringIntoNumber(
    document.getElementById("installmentFeePerTerm-l2")
  );
  let installmentFeePerYrL2 = convertStringIntoNumber(
    document.getElementById("installmentFeePerYear-l2")
  );
  let includingFeeInLoanAmount2 = document.getElementById("loan2").checked;
  let D7 = repaymentPeriodYrL2 + repaymentPeriodMoL2 / 12;
  let D8 = 0;

  let overViewLoanArray = new Array(10);
  overViewLoanArray[0] = includingFeeInLoanAmount2
    ? establishmentFeeL2 + amountL2
    : amountL2;
  overViewLoanArray[1] = ifError(
    PMT(
      interestRateL2 / installmentFeePerYrL2,
      (D7 - D8) * installmentFeePerYrL2,
      overViewLoanArray[0]
    ) *
      -1 +
      installmentFeePerTermL2
  );
  overViewLoanArray[2] = ifError(
    overViewLoanArray[1] * installmentFeePerYrL2 * (D7 - D8) +
      overViewLoanArray[1] * D8 * installmentFeePerYrL2
  );
  overViewLoanArray[7] = installmentFeePerTermL2 * installmentFeePerYrL2 * D7;
  overViewLoanArray[3] = ifError(
    overViewLoanArray[2] - overViewLoanArray[0] - overViewLoanArray[7]
  );
  overViewLoanArray[4] = establishmentFeeL2;
  overViewLoanArray[5] =
    overViewLoanArray[3] + overViewLoanArray[4] + overViewLoanArray[7];
  overViewLoanArray[6] = ifError(overViewLoanArray[5] / amountL2);
  overViewLoanArray[8] = RATE(
    +(D7 * installmentFeePerYrL2),
    -overViewLoanArray[1],
    +amountL2
  );
  overViewLoanArray[9] =
    Math.pow(1 + overViewLoanArray[8], installmentFeePerYrL2) - 1;

  console.log(overViewLoanArray);

  let overViewLoanResult = [
    overViewLoanArray[0],
    D7,
    interestRateL2,
    overViewLoanArray[9],
    overViewLoanArray[1],
    overViewLoanArray[5],
    overViewLoanArray[2],
    overViewLoanArray[6],
    D7 * installmentFeePerYrL2,
    installmentFeePerYrL2,
    installmentFeePerTermL2,
    overViewLoanArray[7],
    overViewLoanArray[4],
    overViewLoanArray[3],
    overViewLoanArray[8],
    includingFeeInLoanAmount2 ? "Ja" : "Nei",
  ];

  let loanDetailsObject = new Array();
  let amountOfItems = D7 * installmentFeePerYrL2;

  let terimNo = 1;
  let interestAndInstallmentFee =
    (overViewLoanArray[0] * interestRateL2) / installmentFeePerYrL2 +
    installmentFeePerTermL2;
  let installment =
    overViewLoanArray[0] > overViewLoanArray[1]
      ? overViewLoanArray[1]
      : overViewLoanArray[0] + interestAndInstallmentFee;
  let deduction =
    terimNo > D8 * installmentFeePerYrL2
      ? installment - interestAndInstallmentFee
      : 0;
  let remainingDebt = overViewLoanArray[0] - deduction;
  loanDetailsObject[0] = {
    terim: terimNo,
    interestAndInstallmentFee: interestAndInstallmentFee,
    installment: installment,
    deduction: deduction,
    remainingDebt: remainingDebt,
  };
  for (let x = 1; x < amountOfItems; x++) {
    loanDetailsObject[x] = {
      terim: 0,
      interestAndInstallmentFee: 0,
      installment: 0,
      deduction: 0,
      remainingDebt: 0,
    };

    loanDetailsObject[x].terim = x + 1;
    loanDetailsObject[x].interestAndInstallmentFee =
      (loanDetailsObject[x - 1].remainingDebt * interestRateL2) /
        installmentFeePerYrL2 +
      installmentFeePerTermL2;

    loanDetailsObject[x].installment =
      loanDetailsObject[x - 1].remainingDebt > overViewLoanArray[1]
        ? overViewLoanArray[1]
        : loanDetailsObject[x - 1].remainingDebt +
          loanDetailsObject[x].interestAndInstallmentFee;
    loanDetailsObject[x].deduction = 0;
    loanDetailsObject[x].remainingDebt = 0;
    loanDetailsObject[x].deduction =
      loanDetailsObject[x].terim > D8 * installmentFeePerYrL2
        ? loanDetailsObject[x].installment -
          loanDetailsObject[x].interestAndInstallmentFee
        : 0;
    loanDetailsObject[x].remainingDebt =
      loanDetailsObject[x - 1].remainingDebt - loanDetailsObject[x].deduction;
  }
  console.log(loanDetailsObject);
  updateLoanRes(
    overViewLoanResult,
    loanDetailsObject,
    "tableLoan2",
    ".loan2__res"
  );
}

function calculateLoan1() {
  let amountL1 = convertStringIntoNumber(document.getElementById("amount-l1"));
  let repaymentPeriodYrL1 = convertStringIntoNumber(
    document.getElementById("repaymentPeriodYr-l1")
  );
  let repaymentPeriodMoL1 = convertStringIntoNumber(
    document.getElementById("repaymentPeriodMo-l1")
  );
  let interestRateL1 =
    convertCommaToDot(document.getElementById("interestRate-l1").value) / 100;
  let establishmentFeeL1 = convertStringIntoNumber(
    document.getElementById("establishmentFee-l1")
  );
  let installmentFeePerTermL1 = convertStringIntoNumber(
    document.getElementById("installmentFeePerTerm-l1")
  );
  let installmentFeePerYrL1 = convertStringIntoNumber(
    document.getElementById("installmentFeePerYr-l1")
  );
  let D = document.getElementById("loan1").checked;
  let D7 = repaymentPeriodYrL1 + repaymentPeriodMoL1 / 12;
  let D8 = 0;
  console.log(D7);

  let overViewLoanArray = new Array(10);
  overViewLoanArray[0] = D ? establishmentFeeL1 + amountL1 : amountL1;
  overViewLoanArray[1] = ifError(
    PMT(
      interestRateL1 / installmentFeePerYrL1,
      (D7 - D8) * installmentFeePerYrL1,
      overViewLoanArray[0]
    ) *
      -1 +
      installmentFeePerTermL1
  );
  overViewLoanArray[2] = ifError(
    overViewLoanArray[1] * installmentFeePerYrL1 * (D7 - D8) +
      overViewLoanArray[1] * D8 * installmentFeePerYrL1
  );
  overViewLoanArray[7] = installmentFeePerTermL1 * installmentFeePerYrL1 * D7;
  overViewLoanArray[3] = ifError(
    overViewLoanArray[2] - overViewLoanArray[0] - overViewLoanArray[7]
  );
  overViewLoanArray[4] = establishmentFeeL1;
  overViewLoanArray[5] =
    overViewLoanArray[3] + overViewLoanArray[4] + overViewLoanArray[7];
  overViewLoanArray[6] = ifError(overViewLoanArray[5] / amountL1);
  overViewLoanArray[8] = RATE(
    +(D7 * installmentFeePerYrL1),
    -overViewLoanArray[1],
    +amountL1
  );
  overViewLoanArray[9] =
    Math.pow(1 + overViewLoanArray[8], installmentFeePerYrL1) - 1;

  let overViewLoanResult = [
    overViewLoanArray[0],
    D7,
    interestRateL1,
    overViewLoanArray[9],
    overViewLoanArray[1],
    overViewLoanArray[5],
    overViewLoanArray[2],
    overViewLoanArray[6],
    D7 * installmentFeePerYrL1,
    installmentFeePerYrL1,
    installmentFeePerTermL1,
    overViewLoanArray[7],
    overViewLoanArray[4],
    overViewLoanArray[3],
    overViewLoanArray[8],
    D ? "Ja" : "Nei",
  ];

  let loanDetailsObject = new Array();
  let amountOfItems = D7 * installmentFeePerYrL1;

  let terimNo = 1;
  let interestAndInstallmentFee =
    (overViewLoanArray[0] * interestRateL1) / installmentFeePerYrL1 +
    installmentFeePerTermL1;
  let installment =
    overViewLoanArray[0] > overViewLoanArray[1]
      ? overViewLoanArray[1]
      : overViewLoanArray[0] + interestAndInstallmentFee;
  let deduction =
    terimNo > D8 * installmentFeePerYrL1
      ? installment - interestAndInstallmentFee
      : 0;
  let remainingDebt = overViewLoanArray[0] - deduction;
  loanDetailsObject[0] = {
    terim: terimNo,
    interestAndInstallmentFee: interestAndInstallmentFee,
    installment: installment,
    deduction: deduction,
    remainingDebt: remainingDebt,
  };
  for (let x = 1; x < amountOfItems; x++) {
    loanDetailsObject[x] = {
      terim: 0,
      interestAndInstallmentFee: 0,
      installment: 0,
      deduction: 0,
      remainingDebt: 0,
    };
    loanDetailsObject[x].terim = x + 1;
    loanDetailsObject[x].interestAndInstallmentFee =
      (loanDetailsObject[x - 1].remainingDebt * interestRateL1) /
        installmentFeePerYrL1 +
      installmentFeePerTermL1;
    loanDetailsObject[x].installment =
      loanDetailsObject[x - 1].remainingDebt > overViewLoanArray[1]
        ? overViewLoanArray[1]
        : loanDetailsObject[x - 1].remainingDebt +
          loanDetailsObject[x].interestAndInstallmentFee;
    loanDetailsObject[x].deduction = 0;
    loanDetailsObject[x].remainingDebt = 0;
    loanDetailsObject[x].deduction =
      loanDetailsObject[x].terim > D8 * installmentFeePerYrL1
        ? loanDetailsObject[x].installment -
          loanDetailsObject[x].interestAndInstallmentFee
        : 0;
    loanDetailsObject[x].remainingDebt =
      loanDetailsObject[x - 1].remainingDebt - loanDetailsObject[x].deduction;
  }

  updateLoanRes(
    overViewLoanResult,
    loanDetailsObject,
    "tableLoan1",
    ".loan1__res"
  );
}

function checkLoan1Input() {
  let isReturn = false;
  let arrayInputFields = new Array();
  arrayInputFields[0] = document.getElementById("amount-l1");
  arrayInputFields[1] = document.getElementById("interestRate-l1");
  arrayInputFields[2] = document.getElementById("establishmentFee-l1");
  arrayInputFields[3] = document.getElementById("installmentFeePerTerm-l1");
  arrayInputFields[4] = document.getElementById("installmentFeePerYr-l1");
  arrayInputFields.forEach((inp) => {
    // To check error 1 by 1
    if (!isReturn) {
      if (!inp.value || inp.value == "") {
        inp.parentNode.style.border = "3PX solid #c0392b";
        document.querySelector(".err__msg").innerHTML = "Skriv inn et tall";
        document.querySelector(".error__container").style.display = "block";
        isReturn = true;
      } else {
        inp.parentNode.style.border = "3PX solid transparent";
        document.querySelector(".error__container").style.display = "none";
      }
    }
  });
  let yr = document.getElementById("repaymentPeriodYr-l1");
  let mo = document.getElementById("repaymentPeriodMo-l1");
  if (!isReturn) {
    if ((!yr.value || yr.value == 0) && (!mo.value || mo.value == 0)) {
      yr.parentNode.style.border = "3PX solid #c0392b";
      mo.parentNode.style.border = "3PX solid #c0392b";
      document.querySelector(".err__msg").innerHTML =
        "Skriv inn år, måned, eller begge deler";
      document.querySelector(".error__container").style.display = "block";
      isReturn = true;
    } else {
      yr.parentNode.style.border = "3PX solid transparent";
      mo.parentNode.style.border = "3PX solid transparent";
      document.querySelector(".error__container").style.display = "none";
    }
  }

  if (!isReturn) isReturn = checkForBndr(1, "installmentFeePerYr-l1");
  console.log(isReturn);
  return isReturn;
}
function checkLoan2Input() {
  let isReturn = false;
  let arrayInputFields = new Array();
  arrayInputFields[0] = document.getElementById("amount-l2");
  arrayInputFields[1] = document.getElementById("interestRate-l2");
  arrayInputFields[2] = document.getElementById("establishmentFee-l2");
  arrayInputFields[3] = document.getElementById("installmentFeePerTerm-l2");
  arrayInputFields[4] = document.getElementById("installmentFeePerYear-l2");
  arrayInputFields.forEach((inp) => {
    // To check error 1 by 1
    if (!isReturn) {
      if (!inp.value || inp.value == "") {
        inp.parentNode.style.border = "3PX solid #c0392b";
        document.querySelector(".err__msg").innerHTML = "Skriv inn et tall";
        document.querySelector(".error__container").style.display = "block";
        isReturn = true;
      } else {
        inp.parentNode.style.border = "3PX solid transparent";
        document.querySelector(".error__container").style.display = "none";
      }
    }
  });
  let yr = document.getElementById("repaymentPeriodYr-l2");
  let mo = document.getElementById("repaymentPeriodMo-l2");
  if (!isReturn) {
    if ((!yr.value || yr.value == 0) && (!mo.value || mo.value == 0)) {
      yr.parentNode.style.border = "3PX solid #c0392b";
      mo.parentNode.style.border = "3PX solid #c0392b";
      document.querySelector(".err__msg").innerHTML =
        "Skriv inn år, måned, eller begge deler";
      document.querySelector(".error__container").style.display = "block";
      isReturn = true;
    } else {
      yr.parentNode.style.border = "3PX solid transparent";
      mo.parentNode.style.border = "3PX solid transparent";
      document.querySelector(".error__container").style.display = "none";
    }
  }
  if (!isReturn) isReturn = checkForBndr(2, "installmentFeePerYear-l2");
  console.log(isReturn);
  return isReturn;
}
function checkForBndr(lonNo, id) {
  let isError = false;
  let arrayInputFields = new Array();
  arrayInputFields[0] = document.getElementById(`amount-l${lonNo}`);
  arrayInputFields[2] = document.getElementById(`repaymentPeriodYr-l${lonNo}`);
  arrayInputFields[3] = document.getElementById(`repaymentPeriodMo-l${lonNo}`);
  arrayInputFields[1] = document.getElementById(`interestRate-l${lonNo}`);
  arrayInputFields[4] = document.getElementById(`establishmentFee-l${lonNo}`);
  arrayInputFields[5] = document.getElementById(
    `installmentFeePerTerm-l${lonNo}`
  );
  arrayInputFields[6] = document.getElementById(id);
  arrayInputFields.forEach((inp) => {
    let min = inp.dataset.bndr.toString().split("-")[0] * 1;
    let max = inp.dataset.bndr.toString().split("-")[1] * 1;
    if (!isError) {
      if (
        +inp.value.split(" ").join("") * 1 < min ||
        +inp.value.split(" ").join("") * 1 > max
      ) {
        inp.parentNode.style.border = "3PX solid #c0392b";
        document.querySelector(".err__msg").innerHTML =
          "Skriv inn et tall mellom " + min + " og " + formatNumber(max);
        isError = true;
        document.querySelector(".error__container").style.display = "block";
      } else {
        document.querySelector(".error__container").style.display = "none";
        inp.parentNode.style.border = "3PX solid transparent";
      }
    }
  });
  return isError;
}
function setTheValuesForLoan2() {
  let amountL1 = document.getElementById("amount-l1").value;
  let repaymentPeriodYrL1 = document.getElementById(
    "repaymentPeriodYr-l1"
  ).value;
  let repaymentPeriodMoL1 = document.getElementById(
    "repaymentPeriodMo-l1"
  ).value;
  let interestRateL1 = document.getElementById("interestRate-l1").value;
  let establishmentFeeL1 = document.getElementById("establishmentFee-l1").value;
  let installmentFeePerTermL1 = document.getElementById(
    "installmentFeePerTerm-l1"
  ).value;
  let installmentFeePerYrL1 = document.getElementById(
    "installmentFeePerYr-l1"
  ).value;
  let includingFeeInLoanAmount = document.getElementById("loan1").checked;

  document.getElementById("amount-l2").value = amountL1;
  document.getElementById("repaymentPeriodYr-l2").value = repaymentPeriodYrL1;
  document.getElementById("repaymentPeriodMo-l2").value = repaymentPeriodMoL1;
  document.getElementById("interestRate-l2").value = interestRateL1;
  document.getElementById("establishmentFee-l2").value = establishmentFeeL1;
  document.getElementById("installmentFeePerTerm-l2").value =
    installmentFeePerTermL1;
  document.getElementById("installmentFeePerYear-l2").value =
    installmentFeePerYrL1;
  document.getElementById("loan2").checked = includingFeeInLoanAmount;

  calculateLoan2();
}

function checkLoanCalculations() {
  if (IsLoan1) {
    if (checkLoan1Input()) {
      return;
    }
    calculateLoan1();
  } else {
    if (checkLoan1Input() || checkLoan2Input()) {
      return;
    }
    calculateLoan1();
    calculateLoan2();
    tableRowEquality("tableLoan1", "tableLoan2");
    removeTerimRowDynamicallyOnWindowSize();
  }
  document.querySelector(".output__container").style.display = "block";
  scrollToResult();
}
function tableRowEquality(t1Id, t2Id) {
  let table1 = document.getElementById(t1Id).getElementsByTagName("tbody")[0]
    .childNodes.length;
  let table2 = document.getElementById(t2Id).getElementsByTagName("tbody")[0]
    .childNodes.length;
  let table1Col = document
    .getElementById("table1Col")
    .getElementsByTagName("tbody")[0];

  table1Col.innerHTML = "";
  if (table1 < table2) {
    for (let x = 1; x <= table2; x++) {
      let rowUQ = table1Col.insertRow(x - 1);
      let cell1UQ = rowUQ.insertCell(0);
      cell1UQ.innerHTML = x;
      console.log(x);
    }

    let remainingRows = table2 - table1;
    for (let x = 0; x < remainingRows; x++) {
      let lastRow = table1;

      console.log(lastRow);
      let row = document
        .getElementById(t1Id)
        .getElementsByTagName("tbody")[0]
        .insertRow(lastRow);
      let cell1 = row.insertCell(0);
      cell1.classList.add("width60px");
      let cell2 = row.insertCell(1);
      let cell3 = row.insertCell(2);
      let cell4 = row.insertCell(3);
      let cell5 = row.insertCell(4);
      cell1.innerHTML = `N/A`;
      cell2.innerHTML = `N/A`;
      cell3.innerHTML = `N/A`;
      cell4.innerHTML = `N/A`;
      cell5.innerHTML = `N/A`;
    }
    document.getElementById(t1Id).style.width = "100%";
  } else if (table2 < table1) {
    for (let x = 1; x <= table1; x++) {
      let rowUQ = table1Col.insertRow(x - 1);
      let cell1UQ = rowUQ.insertCell(0);
      cell1UQ.innerHTML = x;
    }

    let remainingRows = table1 - table2;
    for (let x = 0; x < remainingRows; x++) {
      let lastRow = table2;

      console.log(remainingRows);
      console.log(lastRow);
      let row = document
        .getElementById(t2Id)
        .getElementsByTagName("tbody")[0]
        .insertRow(lastRow);
      let cell1 = row.insertCell(0);
      cell1.classList.add("width60px");
      let cell2 = row.insertCell(1);
      let cell3 = row.insertCell(2);
      let cell4 = row.insertCell(3);
      let cell5 = row.insertCell(4);
      cell1.innerHTML = `N/A`;
      cell2.innerHTML = `N/A`;
      cell3.innerHTML = `N/A`;
      cell4.innerHTML = `N/A`;
      cell5.innerHTML = `N/A`;
      lastRow++;
    }
  } else {
    for (let x = 1; x <= table2; x++) {
      let rowUQ = table1Col.insertRow(x - 1);
      let cell1UQ = rowUQ.insertCell(0);
      cell1UQ.innerHTML = x;
      console.log(x);
    }
  }
}
function updateLoanRes(overView, loanDetails, tableId, overViewTableClass) {
  let loan1Overview = document.querySelectorAll(overViewTableClass);
  console.log(overView[1]);
  document.getElementById("label__dynamic").innerHTML =
    overView[15] == "Yes" ? `Lån inkl. gebyrer` : `Lån`;
  loan1Overview.forEach((el, ind) => {
    if (ind == 1) {
      let year = overView[ind].toFixed(2).toString().split(".")[0] * 1;
      let mo = (overView[ind].toFixed(2).toString().split(".")[1] / 100) * 12;
      el.innerHTML =
        year + " år <br class='word-breaker--mnth'>" + Math.round(mo) + " md";
    } else if (ind == 2 || ind == 3 || ind == 7 || ind == 14) {
      el.innerHTML = ifError((overView[ind] * 100).toFixed(2) + "%");
    } else if (ind == 15) {
      el.innerHTML = overView[ind];
    } else {
      el.innerHTML = formatNumber(Math.round(overView[ind]));
    }
  });

  let table = document.getElementById(tableId).getElementsByTagName("tbody")[0];
  let table1Col = document
    .getElementById("table1Col")
    .getElementsByTagName("tbody")[0];

  table.innerHTML = "";
  table1Col.innerHTML = "";

  loanDetails.forEach((vals, ind) => {
    let rowUQ = table1Col.insertRow(ind);
    let cell1UQ = rowUQ.insertCell(0);
    cell1UQ.innerHTML = vals.terim;

    let row = table.insertRow(ind);
    let cell1 = row.insertCell(0);
    cell1.classList.add("width60px");
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    let cell5 = row.insertCell(4);
    cell1.innerHTML = ifError(`${formatNumber(Math.round(vals.terim))}`);
    cell2.innerHTML = ifError(`${formatNumber(Math.round(vals.installment))}`);
    cell3.innerHTML = ifError(
      `${formatNumber(Math.round(vals.interestAndInstallmentFee))}`
    );
    cell4.innerHTML = ifError(`${formatNumber(Math.round(vals.deduction))}`);
    cell5.innerHTML = ifError(
      `${formatNumber(Math.round(vals.remainingDebt))}`
    );
  });
  tableTerimManipulation();
}
function ifError(value) {
  let val = value.toString().replace("%", "").replace(/ /g, "") * 1;
  if (val == 0) return 0;
  if (val == null) return "N/A";
  if (val == "") return "N/A";
  if (!isFinite(val)) return "N/A";
  if (val < 0) return "N/A";

  return value;
}
function returnZeroIfNotNumber(input) {
  if (typeof input !== "number" || isNaN(input)) {
    return 0;
  }
  return input;
}
function PMT(ir, np, pv, fv, type) {
  var pmt, pvif;

  fv || (fv = 0);
  type || (type = 0);

  if (ir === 0) return -(pv + fv) / np;

  pvif = Math.pow(1 + ir, np);
  pmt = (-ir * (pv * pvif + fv)) / (pvif - 1);

  if (type === 1) pmt /= 1 + ir;

  return pmt;
}
function RATE(nper, pmt, pv, fv, type, guess) {
  fv = typeof fv !== "undefined" ? fv : 0;
  type = typeof type !== "undefined" ? type : 0;
  guess = typeof guess !== "undefined" ? guess : 0.1;

  var lowLimit = 0;
  var highLimit = 1;

  var tolerance = Math.abs(0.00000005 * pmt);

  for (var i = 0; i < 40; i++) {
    var balance = pv;

    for (var j = 0; j < nper; j++) {
      if (type == 0) {
        balance = balance * (1 + guess) + pmt;
      } else {
        balance = (balance + pmt) * (1 + guess);
      }
    }

    if (Math.abs(balance + fv) < tolerance) {
      return guess;
    } else if (balance + fv > 0) {
      highLimit = guess;
    } else {
      lowLimit = guess;
    }

    guess = (highLimit + lowLimit) / 2;
  }

  return null;
}

function compareLoanDOM(reDo) {
  setTheValuesForLoan2();
  let size = screen.width;

  let headingsEle = document.querySelectorAll("#loan__title");
  let colMarginEle = document.querySelectorAll("#marginjs");
  let loan2 = document.querySelectorAll(
    ".col__calc.width33.display__none.loan2js"
  );
  let rowMarginleft5pxEle = document.querySelectorAll(".marginleft5");
  let loan2dummy = document.querySelectorAll("#loan2dummy");
  let loan2__table = document.querySelectorAll("#loan2__table");
  let terminCol = document.querySelectorAll(".width60px");
  let loanTab = document.querySelector(".loantab__calc");
  let loantable__container2 = document.querySelector(".loantable__container2");
  if (!reDo) {
    IsLoan1 = false;
    headingsEle[0].innerHTML = " ";
    headingsEle.forEach((el, ind) => {
      el.style.visibility = "visible";
    });
    colMarginEle.forEach((el, ind) => {
      el.style.marginRight = "10px";
    });
    rowMarginleft5pxEle.forEach((el, ind) => {
      if (ind == 0 || ind == 2) el.style.marginLeft = "0px";
      else el.style.marginLeft = "5px";
    });
    loan2dummy.forEach((el) => {
      el.style.display = "table-cell";
    });
    loan2__table.forEach((el) => {
      el.style.display = "block";
    });

    loantable__container2.classList.remove("display__none");

    if (size <= 1170) {
      terminCol.forEach((el) => {
        el.style.display = "";
      });
      loantable__container2.classList.remove("display__none");
    } else {
      terminCol.forEach((el) => {
        el.style.display = "none";
      });
      loantable__container2.classList.remove("display__none");
    }
    loanTab.id = "loan__tabs";
    loan2[0].style.display = "block";
    compareLoanBtn.style.display = "none";
    document.getElementById("removeLoanJs").style.display = "";
  } else if (reDo) {
    console.log("Do Re-Do");
    IsLoan1 = true;
    headingsEle.forEach((el, ind) => {
      el.style.visibility = "hidden";
    });
    colMarginEle.forEach((el, ind) => {
      el.style.marginRight = "0px";
    });
    rowMarginleft5pxEle.forEach((el, ind) => {
      el.style.marginLeft = "5px";
    });
    loan2dummy.forEach((el) => {
      el.style.display = "none";
    });
    loan2__table.forEach((el) => {
      el.style.display = "none";
    });

    loantable__container2.classList.add("display__none");
    terminCol.forEach((el) => {
      el.style.display = "";
    });
    loanTab.id = "";
    compareLoanBtn.style.display = "";
    document.getElementById("removeLoanJs").style.display = "none";
  }
  removeTerimRowDynamicallyOnWindowSize();
  document.getElementById("amount-l2").focus();
}
function removeLoanDOM(eleId) {
  let loan = document.querySelectorAll(
    `.col__calc.width33.display__none.${eleId}`
  );
  loan[0].style.display = "none";

  compareLoanDOM(true);
}

let compareLoanBtn = document.getElementById("compareLoan");
let removeLoanJsBtn = document.getElementById("removeLoanJs");

compareLoanBtn.addEventListener("click", () => {
  compareLoanDOM(false);
});
removeLoanJs.addEventListener("click", (e) => {});
window.addEventListener("resize", () => {
  removeTerimRowDynamicallyOnWindowSize();
});
function getWidth() {
  return Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth
  );
}

function removeTerimRowDynamicallyOnWindowSize() {
  let terminCol = document.querySelectorAll(".width60px");
  let loantable__container2 = document.querySelector(".loantable__container2");
  let size = getWidth();
  console.log(screen.width);

  if (size <= 1170) {
    terminCol.forEach((el) => {
      el.style.display = "";
    });

    loantable__container2.classList.add("display__none");

    if (!IsLoan1) {
      document
        .querySelector(".loantable__container1")
        .classList.remove("display__none");
      document.getElementById("btn__tab1").classList.add("select__tab");
      console.log(loantable__container2);
      console.log("This code is executed!!!!");
    } else {
      document
        .querySelector(".loantable__container1")
        .classList.remove("display__none");
    }
  } else if (!IsLoan1) {
    terminCol.forEach((el) => {
      el.style.display = "none";
    });

    loantable__container2.classList.remove("display__none");
    document
      .querySelector(".loantable__container1")
      .classList.remove("display__none");
  }
}
function tableTerimManipulation() {
  let terminCol = document.querySelectorAll(".width60px");
  if (IsLoan1) {
    return;
  }
  let size = screen.width;

  if (size <= 1170) {
    terminCol.forEach((el) => {
      el.style.display = "";
    });
  } else {
    terminCol.forEach((el) => {
      el.style.display = "none";
    });
  }
}

function toggleLoan(loanNo, ele) {
  document.querySelectorAll(".tabs__calc").forEach((el) => {
    el.classList.remove("select__tab");
  });
  if (loanNo == 1) {
    document
      .querySelector(".loantable__container1")
      .classList.remove("display__none");
    document
      .querySelector(".loantable__container2")
      .classList.add("display__none");
    ele.classList.add("select__tab");
  } else {
    document
      .querySelector(".loantable__container1")
      .classList.add("display__none");
    document
      .querySelector(".loantable__container2")
      .classList.remove("display__none");
    ele.classList.add("select__tab");
  }
}
function showLoanDetails() {
  document.getElementById("tableOverview").classList.toggle("display__none");
  if (
    document
      .querySelectorAll("#tableOverview")[0]
      .classList.contains("display__none")
  ) {
    document.querySelector(".showmore").innerText = "Vis mer";
  } else {
    document.querySelector(".showmore").innerText = "Vis mindre";
  }
}

function fomatInputValueByPuttingSpace(ele) {
  let val = replaceNanWithZero(ele.value.replace(/ /g, "") * 1);
  ele.value = "";
  let formatValue = val.toLocaleString("en-US").replace(/,/g, " ");
  ele.value = formatValue;
  return;
}
function replaceNanWithZero(val) {
  if (isNaN(val)) return 0;
  if (!isFinite(val)) return 0;
  return val;
}
function convertStringIntoNumber(ele) {
  let val = ele.value.replace(/ /g, "") * 1;
  return val;
}
function formatNumber(num) {
  let val = num.toString().replace("%", "").replace(/ /g, "") * 1;
  let endNumber = 0;
  endNumber = val.toLocaleString("en-Us").replace(/,/g, " ");
  return endNumber;
}
function toggleEmailForm() {
  document.getElementById("email__form--box").classList.toggle("display__none");
}

function onPageLoad() {
  console.log("focus");
  document.getElementById("amount-l1").focus();
}

function onEnterCheckBox(id) {
  let filterId = id.toString().split("-")[1];
  let checkBox = document.getElementById(filterId);
  checkBox.checked ? (checkBox.checked = false) : (checkBox.checked = true);

  console.log("enter");
}

function scrollToResult() {
  window.scrollTo(0, 800);
}

function contentToShareAndDownload() {}

function downloadBriefDetails() {
  var doc = new jsPDF();
  doc.setFontSize(16);
  doc.text(80, 10, "LÅNEKALKULATOR");
  if (IsLoan1) {
    doc.setFillColor(231, 240, 239);
    doc.rect(10, 30, 190, 90, "F");

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(16);
    doc.text(10, 25, "");

    doc.setTextColor(70, 70, 70);
    doc.setFontSize(12);
    doc.text(12, 40, "Lån");
    doc.text(140, 40, `${document.getElementById("amount-l1").value} kr`);
    doc.text(12, 50, "Løpetid");
    doc.text(
      140,
      50,
      `${document.getElementById("repaymentPeriodYr-l1").value} år`
    );
    doc.text(12, 60, "Løpetid");
    doc.text(
      140,
      60,
      `${document.getElementById("repaymentPeriodMo-l1").value} md`
    );

    doc.text(12, 70, "Rente");
    doc.text(140, 70, `${document.getElementById("interestRate-l1").value} %`);

    doc.text(12, 80, "Etablering og tinglysning");
    doc.text(
      140,
      80,
      `${document.getElementById("establishmentFee-l1").value} kr`
    );

    doc.text(12, 90, "Termingebyr");
    doc.text(
      140,
      90,
      `${document.getElementById("installmentFeePerTerm-l1").value} kr`
    );

    doc.text(12, 100, "Terminer pr. år");
    doc.text(
      140,
      100,
      `${document.getElementById("installmentFeePerYr-l1").value}`
    );

    doc.text(12, 110, "Inkl. etablering i lånet");
    doc.text(
      140,
      110,
      `${document.getElementById("loan1").checked ? "Ja" : "Nei"}`
    );
    doc.setFontSize(16);
    doc.text(90, 130, "Oversikt");

    doc.autoTable({
      theme: "grid",
      styles: { fontSize: 12, cellWidth: "wrap" },
      startY: 140,
      html: "#tableOverview",
    });
  } else {
    doc.setFillColor(231, 240, 239);
    doc.rect(10, 30, 190, 90, "F");

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);
    doc.text(10, 25, "Innspillet ditt");
    doc.text(100, 25, "Lån 1");
    doc.text(160, 25, "Lån 2");

    doc.setTextColor(70, 70, 70);
    doc.setFontSize(12);
    doc.text(12, 40, "Lån");
    doc.text(100, 40, `${document.getElementById("amount-l1").value} kr`);
    doc.text(160, 40, `${document.getElementById("amount-l2").value} kr`);
    doc.text(12, 50, "Løpetid");
    doc.text(
      100,
      50,
      `${document.getElementById("repaymentPeriodYr-l1").value} år`
    );
    doc.text(
      160,
      50,
      `${document.getElementById("repaymentPeriodYr-l2").value} år`
    );
    doc.text(12, 60, "Løpetid");
    doc.text(
      100,
      60,
      `${document.getElementById("repaymentPeriodMo-l1").value} md`
    );
    doc.text(
      160,
      60,
      `${document.getElementById("repaymentPeriodMo-l2").value} md`
    );

    doc.text(12, 70, "Rente");
    doc.text(100, 70, `${document.getElementById("interestRate-l1").value} %`);
    doc.text(160, 70, `${document.getElementById("interestRate-l2").value} %`);

    doc.text(12, 80, "Etablering og tinglysning");
    doc.text(
      100,
      80,
      `${document.getElementById("establishmentFee-l1").value} kr`
    );
    doc.text(
      160,
      80,
      `${document.getElementById("establishmentFee-l2").value} kr`
    );

    doc.text(12, 90, "Termingebyr");
    doc.text(
      100,
      90,
      `${document.getElementById("installmentFeePerTerm-l1").value} kr`
    );
    doc.text(
      160,
      90,
      `${document.getElementById("installmentFeePerTerm-l2").value} kr`
    );

    doc.text(12, 100, "Terminer pr. år");
    doc.text(
      100,
      100,
      `${document.getElementById("installmentFeePerYr-l1").value}`
    );
    doc.text(
      160,
      100,
      `${document.getElementById("installmentFeePerYear-l2").value}`
    );

    doc.text(12, 110, "Inkl. etablering i lånet");
    doc.text(
      100,
      110,
      `${document.getElementById("loan1").checked ? "Ja" : "Nei"}`
    );
    doc.text(
      160,
      110,
      `${document.getElementById("loan2").checked ? "Ja" : "Nei"}`
    );
    doc.setFontSize(16);
    doc.text(90, 130, "Oversikt");

    doc.autoTable({
      theme: "grid",
      styles: { fontSize: 12, cellWidth: "wrap" },
      startY: 140,
      html: "#tableOverview",
    });
  }

  doc.save("Loan_comparison.pdf");
}

function downloadDetailed() {
  var doc = new jsPDF();
  doc.setFontSize(16);
  doc.text(80, 10, "LÅNEKALKULATOR");
  if (IsLoan1) {
    doc.setFillColor(231, 240, 239);
    doc.rect(10, 30, 190, 90, "F");

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(16);
    doc.text(10, 25, "");

    doc.setTextColor(70, 70, 70);
    doc.setFontSize(12);
    doc.text(12, 40, "Lån");
    doc.text(140, 40, `${document.getElementById("amount-l1").value} kr`);
    doc.text(12, 50, "Løpetid");
    doc.text(
      140,
      50,
      `${document.getElementById("repaymentPeriodYr-l1").value} år`
    );
    doc.text(12, 60, "Løpetid");
    doc.text(
      140,
      60,
      `${document.getElementById("repaymentPeriodMo-l1").value} md`
    );

    doc.text(12, 70, "Rente");
    doc.text(140, 70, `${document.getElementById("interestRate-l1").value} %`);

    doc.text(12, 80, "Etablering og tinglysning");
    doc.text(
      140,
      80,
      `${document.getElementById("establishmentFee-l1").value} kr`
    );

    doc.text(12, 90, "Termingebyr");
    doc.text(
      140,
      90,
      `${document.getElementById("installmentFeePerTerm-l1").value} kr`
    );

    doc.text(12, 100, "Terminer pr. år");
    doc.text(
      140,
      100,
      `${document.getElementById("installmentFeePerYr-l1").value}`
    );

    doc.text(12, 110, "Inkl. etablering i lånet");
    doc.text(
      140,
      110,
      `${document.getElementById("loan1").checked ? "Ja" : "Nei"}`
    );
    doc.setFontSize(16);
    doc.text(90, 130, "Oversikt");

    doc.autoTable({
      theme: "grid",
      styles: { fontSize: 12, cellWidth: "wrap" },
      startY: 140,
      html: "#tableOverview",
    });
    doc.addPage();
    doc.text(90, 10, "Lån 1 Detaljer");
    doc.autoTable({
      theme: "grid",
      styles: { fontSize: 12 },
      startY: 20,
      html: "#tableLoan1",
    });
  } else {
    document.querySelectorAll(".width60px").forEach((el) => {
      el.style.display = "";
    });

    doc.setFillColor(231, 240, 239);
    doc.rect(10, 30, 190, 90, "F");

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);
    doc.text(10, 25, "");
    doc.text(100, 25, "Lån 1");
    doc.text(160, 25, "Lån 2");

    doc.setTextColor(70, 70, 70);
    doc.setFontSize(12);
    doc.text(12, 40, "Lån");
    doc.text(100, 40, `${document.getElementById("amount-l1").value} kr`);
    doc.text(160, 40, `${document.getElementById("amount-l2").value} kr`);
    doc.text(12, 50, "Løpetid");
    doc.text(
      100,
      50,
      `${document.getElementById("repaymentPeriodYr-l1").value} år`
    );
    doc.text(
      160,
      50,
      `${document.getElementById("repaymentPeriodYr-l2").value} år`
    );
    doc.text(12, 60, "Løpetid");
    doc.text(
      100,
      60,
      `${document.getElementById("repaymentPeriodMo-l1").value} md`
    );
    doc.text(
      160,
      60,
      `${document.getElementById("repaymentPeriodMo-l2").value} md`
    );

    doc.text(12, 70, "Rente");
    doc.text(100, 70, `${document.getElementById("interestRate-l1").value} %`);
    doc.text(160, 70, `${document.getElementById("interestRate-l2").value} %`);

    doc.text(12, 80, "Etablering og tinglysning");
    doc.text(
      100,
      80,
      `${document.getElementById("establishmentFee-l1").value} kr`
    );
    doc.text(
      160,
      80,
      `${document.getElementById("establishmentFee-l2").value} kr`
    );

    doc.text(12, 90, "Termingebyr");
    doc.text(
      100,
      90,
      `${document.getElementById("installmentFeePerTerm-l1").value} kr`
    );
    doc.text(
      160,
      90,
      `${document.getElementById("installmentFeePerTerm-l2").value} kr`
    );

    doc.text(12, 100, "Terminer pr. år");
    doc.text(
      100,
      100,
      `${document.getElementById("installmentFeePerYr-l1").value}`
    );
    doc.text(
      160,
      100,
      `${document.getElementById("installmentFeePerYear-l2").value}`
    );

    doc.text(12, 110, "Inkl. etablering i lånet");
    doc.text(
      100,
      110,
      `${document.getElementById("loan1").checked ? "Ja" : "Nei"}`
    );
    doc.text(
      160,
      110,
      `${document.getElementById("loan2").checked ? "Ja" : "Nei"}`
    );
    doc.setFontSize(16);
    doc.text(90, 130, "Oversikt");

    doc.autoTable({
      theme: "grid",
      styles: { fontSize: 12, cellWidth: "wrap" },
      startY: 140,
      html: "#tableOverview",
    });
    doc.addPage();
    doc.text(90, 10, "Lån 1 Detaljer");
    doc.autoTable({
      theme: "grid",
      styles: { fontSize: 12 },
      startY: 20,
      html: "#tableLoan1",
    });
    doc.addPage();
    doc.text(90, 10, "Lån 2 Detaljer");
    doc.autoTable({
      theme: "grid",
      styles: { fontSize: 12 },
      startY: 20,
      html: "#tableLoan2",
    });

    document.querySelectorAll(".width60px").forEach((el) => {
      el.style.display = "none";
    });
  }

  doc.save("Loan_comparison.pdf");
}

function generateHTMLForEmail() {
  let html = 0;
  if (IsLoan1) {
    html = `
        <table border="1px">
          <thead>
            <tr>
              <th>Innspillet ditt
</th>
              <th> Lån 1</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Lån</td>
              <td>${document.getElementById("amount-l1").value} kr</td>
            </tr>
            <tr>
              <td>Løpetid</td>
              <td>${
                document.getElementById("repaymentPeriodYr-l1").value
              } yr</td>
            </tr>
            <tr>
              <td>Løpetid</td>
              <td>${
                document.getElementById("repaymentPeriodMo-l1").value
              } mo</td>
            </tr>
            <tr>
              <td>Rente</td>
              <td>${document.getElementById("interestRate-l1").value} %</td>
            </tr>
            <tr>
              <td>Etablering og tinglysning</td>
              <td>${
                document.getElementById("establishmentFee-l1").value
              } kr</td>
            </tr>
            <tr>
              <td>Termingebyr</td>
              <td>${
                document.getElementById("installmentFeePerTerm-l1").value
              } kr</td>
            </tr>

            <tr>
            <td>Terminer pr. år</td>
            <td>${document.getElementById("installmentFeePerYr-l1").value}</td>
          </tr>
          <tr>
          <td>Inkl. etablering i lånet</td>
          <td>${document.getElementById("loan1").checked ? "Ja" : "Nei"}</td>
        </tr>
          </tbody>
        </table>

        <h1 >Oversikt</h1>
        <table border="1px">
        `;

    html += document.getElementById("tableOverview").innerHTML;
    html += " </table>";
  } else {
    document.querySelectorAll(".width60px").forEach((el) => {
      el.style.display = "";
    });
    html = `
        <table border="1px">
          <thead>
            <tr>
              <th>Innspillet ditt
</th>
              <th> Lån 1</th>
              <th> Lån 2</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Lån</td>
              <td>${document.getElementById("amount-l1").value} kr</td>
              <td>${document.getElementById("amount-l2").value} kr</td>
            </tr>
            <tr>
              <td>Løpetid</td>
              <td>${
                document.getElementById("repaymentPeriodYr-l1").value
              } yr</td>
              <td>${
                document.getElementById("repaymentPeriodYr-l2").value
              } yr</td>
            </tr>
            <tr>
              <td>Løpetid</td>
              <td>${
                document.getElementById("repaymentPeriodMo-l1").value
              } mo</td>
              <td>${
                document.getElementById("repaymentPeriodMo-l2").value
              } mo</td>
            </tr>
            <tr>
              <td>Rente</td>
              <td>${document.getElementById("interestRate-l1").value} %</td>
              <td>${document.getElementById("interestRate-l2").value} %</td>
            </tr>
            <tr>
              <td>Etablering og tinglysning</td>
              <td>${
                document.getElementById("establishmentFee-l1").value
              } kr</td>
              <td>${
                document.getElementById("establishmentFee-l2").value
              } kr</td>
            </tr>
            <tr>
              <td>Termingebyr</td>
              <td>${
                document.getElementById("installmentFeePerTerm-l1").value
              } kr</td>
              <td>${
                document.getElementById("installmentFeePerTerm-l2").value
              } kr</td>
            </tr>

            <tr>
            <td>Terminer pr. år</td>
            <td>${document.getElementById("installmentFeePerYr-l1").value}</td>
            <td>${
              document.getElementById("installmentFeePerYear-l2").value
            }</td>
          </tr>
          <tr>
          <td>Inkl. etablering i lånet</td>
          <td>${document.getElementById("loan1").checked ? "Ja" : "Nei"}</td>
          <td>${document.getElementById("loan2").checked ? "Ja" : "Nei"}</td>
        </tr>
          </tbody>
        </table>

        <h1>Oversikt</h1>
        <table border="1px">
        `;

    html += document.getElementById("tableOverview").innerHTML;
    html += " </table>";

    document.querySelectorAll(".width60px").forEach((el) => {
      el.style.display = "none";
    });
  }
  return html;
}

window.onload = function () {
  document
    .getElementById("form__calc--sendEmail")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      console.log(event.target);
      document.getElementById("btn__email").value = "Please wait...";
      document.getElementById("btn__email").disabled = true;

      this.contact_number.value = (Math.random() * 100000) | 0;
      document.getElementById("message").value = generateHTMLForEmail();
      emailjs
        .sendForm("service_e8tqvbx", "template_3wmwy8g", this)
        .then((msg) => {
          document.getElementById("btn__email").value = "Email me the result";
          document.getElementById("btn__email").disabled = false;

          alert("Result has been sent to your email. Thanks");
        })
        .catch((err) => {
          alert(
            `${err} There was an error while sending an email. Please try again`
          );
          console.log(err);
        });
    });
};

let calculateBtn = document.getElementById("calculateBtn");

document.body.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    calculateBtn.click();
  }
});
(() => {
  let loantable__container2 = document.querySelector(".loantable__container2");
  loantable__container2.classList.add("display__none");
  document
    .querySelector(".showmore")
    .addEventListener("click", showLoanDetails);
  document
    .getElementById("downloadImportant")
    .addEventListener("click", downloadBriefDetails);
  document
    .getElementById("downloadAll")
    .addEventListener("click", downloadDetailed);
  document
    .getElementById("checkBoxTab-loan1")
    .addEventListener("keydown", (e) => {
      let key = e.keyCode;
      if (key == 13 || key == 32) onEnterCheckBox(e.target.id);
    });
  document
    .getElementById("checkBoxTab-loan2")
    .addEventListener("keydown", (e) => {
      let key = e.keyCode;

      if (key == 13 || key == 32) onEnterCheckBox(e.target.id);
    });
  onPageLoad();
})();
const tooltipTriggerList = [].slice.call(
  document.querySelectorAll('[data-te-toggle="tooltip"]')
);
tooltipTriggerList.map((tooltipTriggerEl) => new te.Tooltip(tooltipTriggerEl));
