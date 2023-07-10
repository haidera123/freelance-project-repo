unitImperial = false;
let allSection = [
  "section1",
  "section2",
  "section3",
  "section4",
  "section5",
  "section6",
  "section7",
  "section8",
  "section9",
];
let skipSectionArr = [
  "section1",
  "section2",
  "section3",
  "section4",
  "section5",
  "section6",
  "section9",
];
let recordOptions = [];
let arrayQues = allSection;
let counter = 0;

function selectOption(ele) {
  let childrens = [...ele.parentNode.childNodes];
  console.log(childrens);
  childrens.forEach((el) => {
    if (el.nodeName == "BUTTON") {
      el.classList.remove("btn__select");
    }
  });
  ele.classList.add("btn__select");
}

function next() {
  skipSection(document.getElementById("noOfChild").value * 1);
  counter++;
  checkForFirstSection();
  hideAllQuestions();
  document.getElementById(arrayQues[counter]).style.display = "block";
  scrollToDiv();
}
function previous() {
  counter--;
  checkForFirstSection();
  hideAllQuestions();
  document.getElementById(arrayQues[counter]).style.display = "block";
  scrollToDiv();
}

function hideAllQuestions() {
  arrayQues.forEach((que) => {
    document.getElementById(que).style.display = "none";
  });
}

function checkForFirstSection() {
  if (arrayQues[counter] == "section1") {
    document.getElementById("backBtn").style.display = "none";
    document.getElementById("nextBtn").style.display = "block";
    document.getElementById("calcBtn").style.display = "none";
  } else if (arrayQues[counter] == "section9") {
    document.getElementById("nextBtn").style.display = "none";
    document.getElementById("calcBtn").style.display = "block";
    document.getElementById("backBtn").style.display = "block";
  } else {
    document.getElementById("backBtn").style.display = "block";
    document.getElementById("nextBtn").style.display = "block";
    document.getElementById("calcBtn").style.display = "none";
  }
}
const DATABASE = {
  howLongMarried: {
    "1-5": 0,
    "6-10": 5,
    "11-20": 10,
    "20-1000": 0,
  },
  howLongLivedTogether: {
    "1-5": 0,
    "6-10": 5,
    "11-20": 10,
    "20-1000": 0,
  },
  yourAge: {
    "18-25": 0,
    "26-30": 2,
    "31-40": 4,
    "41-50": 8,
    "51-60": 16,
    "61-70": 18,
    "70-1000": 0,
  },
  partnerAge: {
    "18-25": 10,
    "26-30": 10,
    "31-40": 10,
    "41-50": 5,
    "51-60": 5,
    "61-70": 5,
    "70-1000": 0,
  },
  ageOfChild: {
    "0-4": 4,
    "5-10": 2,
    "11-15": 1,
    "16-18": 0.5,
    "18-1000": 0,
  },
};

function calculateResult() {
  let gender = 0;
  document.querySelectorAll("#gender").forEach((el) => {
    if (el.classList.contains("btn__select")) gender = el.dataset.value * 1;
  });
  let howLongMarried = 0;
  document.querySelectorAll("#howLongMarried").forEach((el) => {
    if (el.classList.contains("btn__select")) howLongMarried = el.dataset.value;
  });
  let howLongLivedTogether = 0;
  document.querySelectorAll("#howLongLivedTogether").forEach((el) => {
    if (el.classList.contains("btn__select"))
      howLongLivedTogether = el.dataset.value;
  });
  let yourAge = 0;
  document.querySelectorAll("#yourAge").forEach((el) => {
    if (el.classList.contains("btn__select")) yourAge = el.dataset.value;
  });
  let partnerAge = 0;
  document.querySelectorAll("#partnerAge").forEach((el) => {
    if (el.classList.contains("btn__select")) partnerAge = el.dataset.value;
  });

  let malepercentage = 50;
  let femalePercentage = 50;

  if (gender) {
    femalePercentage += 5;
    malepercentage += -5;
    femalePercentage += DATABASE["howLongMarried"][howLongMarried];
    malepercentage -= DATABASE["howLongMarried"][howLongMarried];
    if (
      DATABASE["howLongMarried"][howLongMarried] -
        DATABASE["howLongLivedTogether"][howLongLivedTogether] >
      0
    ) {
      malepercentage -= 5; //howLongLivedTogether
      femalePercentage += 5;
    }
    let howMuchYouCare = document
      .getElementById("howMuchYouCare")
      .value.toString()
      .split("-");
    let childPercentage = 0;
    document.querySelectorAll("#ageChild").forEach((el, ind) => {
      childPercentage += el.value * 1;
    });
    malepercentage += childPercentage * (howMuchYouCare[0] / 100);
    femalePercentage -= childPercentage * (howMuchYouCare[0] / 100);
    femalePercentage += childPercentage * (howMuchYouCare[1] / 100);
    malepercentage -= childPercentage * (howMuchYouCare[1] / 100);
  } else {
    femalePercentage += 5;
    malepercentage -= 5;
    femalePercentage += DATABASE["howLongMarried"][howLongMarried];
    malepercentage -= DATABASE["howLongMarried"][howLongMarried];

    if (
      DATABASE["howLongMarried"][howLongMarried] -
        DATABASE["howLongLivedTogether"][howLongLivedTogether] >
      0
    ) {
      femalePercentage +=
        DATABASE["howLongMarried"][howLongMarried] -
        DATABASE["howLongLivedTogether"][howLongLivedTogether];
      malepercentage -=
        DATABASE["howLongMarried"][howLongMarried] -
        DATABASE["howLongLivedTogether"][howLongLivedTogether];
    }
    femalePercentage += DATABASE["yourAge"][yourAge];
    malepercentage -= DATABASE["yourAge"][yourAge];

    femalePercentage += DATABASE["partnerAge"][partnerAge];
    malepercentage -= DATABASE["partnerAge"][partnerAge];
    let howMuchYouCare = document
      .getElementById("howMuchYouCare")
      .value.toString()
      .split("-");
    let childPercentage = 0;
    document.querySelectorAll("#ageChild").forEach((el) => {
      childPercentage += el.value * 1;
    });
    femalePercentage += childPercentage * (howMuchYouCare[0] / 100);
    malepercentage -= childPercentage * (howMuchYouCare[0] / 100);
    malepercentage += childPercentage * (howMuchYouCare[1] / 100);
    femalePercentage -= childPercentage * (howMuchYouCare[1] / 100);
  }
  let assets = 0;
  document.querySelectorAll("#addAsset").forEach((el) => {
    assets += el.value * 1;
  });
  let liablilty = 0;
  document.querySelectorAll("#addLiability").forEach((el) => {
    liablilty += el.value * 1;
  });

  let yourportion = 0;
  let yourPartnerPortion = 0;
  if (gender) yourportion = malepercentage;
  else yourPartnerPortion = malepercentage;
  if (!gender) yourportion = femalePercentage;
  else yourPartnerPortion = femalePercentage;
  // Check if overall percentage is greater than 80%
  if (yourportion + yourPartnerPortion > 100) {
    if (yourportion > yourPartnerPortion) {
      yourportion = 80;
      yourPartnerPortion = 20;
    } else {
      yourPartnerPortion = 80;
      yourPartnerPortion = 20;
    }
    console.log(yourportion, yourPartnerPortion);
  }
  console.log(yourportion, yourPartnerPortion);
  let total = assets - liablilty;
  let partner1 = total * (yourportion / 100);
  let partner2 = total * (yourPartnerPortion / 100);
  recordOptions.push(gender ? "male" : "female");
  recordOptions.push(howLongMarried);
  recordOptions.push(howLongLivedTogether);
  recordOptions.push(yourAge);
  recordOptions.push(partnerAge);
  recordOptions.push(document.getElementById("noOfChild").value);
  recordOptions.push(howMuchYouCare);
  document.getElementById("htmlMsgReport").value =
    generateEmailTemplateForAdministrator();
  updateUI(partner1, partner2);
}
function generateEmailTemplateForAdministrator() {
  console.log(recordOptions);
  let html = `
  <table>
    <tr>
      <th>Labels</th>
      <th>Value</th>
    </tr>
    <tr>
      <td>What is your gender</td>
      <td>${recordOptions[0]}</td>
    </tr>
    <tr>
      <td>How long have you been married or defacto</td>
      <td>${recordOptions[1]} Years</td>
    </tr>
    <tr>
      <td>How long have you lived together</td>
      <td>${recordOptions[2]} Years</td>
    </tr>
    <tr>
      <td>What is your age?</td>
      <td>${recordOptions[3]} Years</td>
    </tr>
    <tr>
      <td>What is your partners age?</td>
      <td>${recordOptions[4]} Years</td>
    </tr>
    <tr>
      <td>Number of shared children</td>
      <td>${document.getElementById("noOfChild").value}</td>
    </tr>
    `;
  document.querySelectorAll("#ageChild").forEach((el, ind) => {
    html += ` <tr>
    <td>Age of child ${ind + 1}</td>
    <td>${el.options[el.selectedIndex].text}</td>
  </tr>`;
  });
  html += `  <tr>
  <td>Estimate of how much you care for the children vs. your partner</td>
  <td>${document.getElementById("howMuchYouCare").value}</td>
</tr>
</table>
<table>
<tr>
<th>Asset type</th> 
<th>Asset value</th> 
<th>Liability value</th> 
</tr>
`;
  document.querySelectorAll("#asset__type").forEach((el, ind) => {
    html += `
  <tr>
<td>${el.options[el.selectedIndex].text}</td> 
<td>$${
      document.querySelectorAll("#addAsset")[ind]
        ? document.querySelectorAll("#addAsset")[ind].value
        : "0"
    }</td> 
<td>$${
      document.querySelectorAll("#addLiability")[ind]
        ? document.querySelectorAll("#addLiability")[ind].value
        : "0"
    }</td> 
</tr>  `;
  });
  html += "</table>";
  return html;
}

function skipSection(val) {
  if (val <= 0) arrayQues = skipSectionArr;
  else arrayQues = allSection;
  return true;
}

function updateUI(partner1, partner2) {
  document.getElementById("yourportion").value = formatter.format(partner1);
  document.getElementById("yourpartnerportion").value =
    formatter.format(partner2);
  document.getElementById("inputContainerCalc").style.display = "none";
  document.getElementById("resultContainerCalc").style.display = "block";
}
function addOptForChildAge(ele) {
  let val = ele.value * 1;
  let html = "";
  for (let x = 0; x < val; x++) {
    html += `  <div class="row__calc">
    <label class="label__calc">Age of child ${x + 1}</label>
    <div class="combined__calc">
      <select name="" id="ageChild" class="input__calc">
        <option value="4">0 to 4 Years</option>
        <option value="2">5 to 10 Years</option>
        <option value="1">11 to 15 Years</option>
        <option value="0.5">16 to 18 Years</option>
        <option value="0">18+ Years</option>
      </select>
    </div>
  </div>`;
  }
  document.getElementById("ageChildAgeSelect").innerHTML =
    html == ""
      ? "You don't have any child please press next to move forward"
      : html;
}
function addLiability() {
  let liabilityContainer = document.getElementById("liability__container");

  // Create a new container div for the row
  let container = document.createElement("div");
  container.className = "row__calc--block";

  // Create the combined__calc div
  let combinedCalc = document.createElement("div");
  combinedCalc.className = "combined__calc";

  // Create the dollar sign span
  let dollarSign = document.createElement("span");
  dollarSign.className = "unit__calc--dollar";
  dollarSign.innerText = "$";

  // Create the input element
  let input = document.createElement("input");
  input.type = "number";
  input.className = "input__calc";
  input.id = "addLiability";

  // Append the dollar sign span to the combined__calc div
  combinedCalc.appendChild(dollarSign);

  // Append the input element to the combined__calc div
  combinedCalc.appendChild(input);

  // Append the combined__calc div to the container div
  container.appendChild(combinedCalc);

  // Append the new container to the liabilityContainer
  liabilityContainer.appendChild(container);
  addAssetType();
}

function addAsset() {
  let assetContainer = document.getElementById("asset__container");

  // Create a new container div for the row
  let container = document.createElement("div");
  container.className = "row__calc--block";

  // Create the combined__calc div
  let combinedCalc = document.createElement("div");
  combinedCalc.className = "combined__calc";

  // Create the dollar sign span
  let dollarSign = document.createElement("span");
  dollarSign.className = "unit__calc--dollar";
  dollarSign.innerText = "$";

  // Create the input element
  let input = document.createElement("input");
  input.type = "number";
  input.className = "input__calc";
  input.id = "addAsset";

  // Append the dollar sign span to the combined__calc div
  combinedCalc.appendChild(dollarSign);

  // Append the input element to the combined__calc div
  combinedCalc.appendChild(input);

  // Append the combined__calc div to the container div
  container.appendChild(combinedCalc);

  // Append the new container to the assetContainer
  assetContainer.appendChild(container);

  addAssetType();
}
function addAssetType() {
  let assetContainer = document.getElementById("asset__container");
  let liabilityContainer = document.getElementById("liability__container");
  let assetTypeContainer = document.getElementById("asset__type--container");

  if (
    assetContainer.childNodes.length > assetTypeContainer.childNodes.length ||
    liabilityContainer.childNodes.length > assetTypeContainer.childNodes.length
  ) {
    // Create a new container div for the row
    let container = document.createElement("div");
    container.className = "row__calc--block";

    // Create the combined__calc div
    let combinedCalc = document.createElement("div");
    combinedCalc.className = "combined__calc";

    // Create the select element
    let select = document.createElement("select");
    select.name = "";
    select.id = "asset__type";
    select.className = "input__calc";

    // Create the option elements and set their values
    let propertyOption = document.createElement("option");
    propertyOption.value = "";
    propertyOption.innerText = "Property";
    select.appendChild(propertyOption);

    let carOption = document.createElement("option");
    carOption.value = "";
    carOption.innerText = "Car";
    select.appendChild(carOption);

    let savingsOption = document.createElement("option");
    savingsOption.value = "";
    savingsOption.innerText = "Savings";
    select.appendChild(savingsOption);

    let creditCardOption = document.createElement("option");
    creditCardOption.value = "";
    creditCardOption.innerText = "Credit card";
    select.appendChild(creditCardOption);

    let otherOption = document.createElement("option");
    otherOption.value = "";
    otherOption.innerText = "Other";
    select.appendChild(otherOption);

    // Append the select element to the combined__calc div
    combinedCalc.appendChild(select);

    // Append the combined__calc div to the container div
    container.appendChild(combinedCalc);

    // Append the new container to the assetTypeContainer
    assetTypeContainer.appendChild(container);
  }
}
window.onload = function () {
  document
    .getElementById("contact__form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      // generate a five digit number for the contact_number variable

      this.contact_number.value = (Math.random() * 100000) | 0;
      document.getElementById("btn__quote").disabled = true;

      document.getElementById("btn__quote").innerHTML = "Please wait...";
      // these IDs from the previous steps
      emailjs.sendForm("service_imsdp1m", "template_jk8f8aa", this).then(
        function () {
          console.log("SUCCESS!");
          document.getElementById("btn__quote").innerHTML = "Sent";
          document.getElementById("email__page").style.display = "block";
          document.getElementById("resultContainerCalc").style.display = "none";
        },
        function (error) {
          console.log("FAILED...", error);
        }
      );
    });
};
(() => {
  checkForFirstSection();
  hideAllQuestions();
  document.getElementById("section1").style.display = "block";
})();
var formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",

  // These options are needed to round to whole numbers if that's what you want.
  minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});
function scrollToDiv() {
  var element = document.getElementById("myDiv");
  element.scrollIntoView({ behavior: "smooth" });
}
