// GLOBAL VARIABLES

let counter = 0;
let counter_2 = 0;
let counter_3 = 0;
let isNULLDBVal = false;
let UNIT = [];

function addOptionToSelect(id, text, value) {
  // Find the select element by its ID
  const selectElement = document.getElementById(id);

  // Check if the select element exists
  if (selectElement) {
    // Create a new option element
    const option = document.createElement("option");
    option.text = text; // Set the display text
    option.value = value; // Set the option value

    // Append the option to the select element
    selectElement.appendChild(option);
  } else {
    console.error(`Select element with ID '${id}' not found.`);
  }
}
function getLiquidConcentratedNutrients() {
  let nutrients = {
    "Density (g/ml)": [],
    "mL per can/carton (for LC)": [],
  };
  document
    .querySelectorAll('[name="liquid__concentrate__formula__select"]')
    .forEach((prd) => {
      for (let x = 0; x < 130; x++) {
        if (
          database[x]["Product Name"] == prd.value &&
          database[x]["Type"] == "Liquid Concentrate"
        ) {
          nutrients["Density (g/ml)"].push(database[x]["Density (g/ml)"]);
          nutrients["mL per can/carton (for LC)"].push(
            database[x]["mL per can/carton (for LC)"]
          );
        }
      }
    });

  return nutrients;
}
function getPowerFormulaNutrients() {
  let nutrients = {
    "displ ml": [],
    "g per scoop": [],
    "g per tsp": [],
    "g per Tbsp": [],
    "g per cup": [],
  };
  document
    .querySelectorAll('[name="powder__formula__select"]')
    .forEach((prd) => {
      for (let x = 0; x < 130; x++) {
        if (
          database[x]["Product Name"] == prd.value &&
          database[x]["Type"] == "Powder"
        ) {
          nutrients["displ ml"].push(database[x]["displ ml"]);
          nutrients["g per scoop"].push(database[x]["g per scoop"]);
          nutrients["g per tsp"].push(database[x]["g per tsp"]);
          nutrients["g per Tbsp"].push(database[x]["g per Tbsp"]);
          nutrients["g per cup"].push(database[x]["g per cup"]);
        }
      }
    });

  return nutrients;
}
function getModularNutrients() {
  let nutrients = {
    "displ ml": [],
    "g per scoop": [],
    "g per tsp": [],
    "g per Tbsp": [],
  };
  console.log(document.querySelectorAll('[name="modular__select"]'));
  document.querySelectorAll('[name="modular__select"]').forEach((prd) => {
    console.log(prd.value);
    for (let x = 0; x < 130; x++) {
      if (
        database[x]["Product Name"] == prd.value &&
        database[x]["Type"] == "Modular"
      ) {
        nutrients["displ ml"].push(database[x]["displ ml"]);
        nutrients["g per scoop"].push(database[x]["g per scoop"]);
        nutrients["g per tsp"].push(database[x]["g per tsp"]);
        nutrients["g per Tbsp"].push(database[x]["g per Tbsp"]);
      }
    }
  });

  return nutrients;
}
function getAllNutrients() {
  let nutrients = {
    kcal: [],
    "protein (g)": [],
    "fat (g)": [],
    "carb (g)": [],
    "vitamin A (IU)": [],
    "vitamin D (IU)": [],
    "calcium (mg)": [],
    "phosphorus (mg)": [],
    "iron (mg)": [],
    "zinc (mg)": [],
    "sodium (mg)": [],
    "sodium (mEq)": [],
    "potassium (mg)": [],
    "potassium (mEq)": [],
  };
  document.querySelectorAll("#select__prdct").forEach((prd) => {
    for (let ind = 0; ind < 130; ind++) {
      if (database[ind]["Product Name"] == prd.value) {
        nutrients["kcal"].push(database[ind]["kcal"]);
        nutrients["protein (g)"].push(database[ind]["protein (g)"]);
        nutrients["fat (g)"].push(database[ind]["fat (g)"]);
        nutrients["carb (g)"].push(database[ind]["carb (g)"]);
        nutrients["vitamin A (IU)"].push(database[ind]["vitamin A (IU)"]);
        nutrients["vitamin D (IU)"].push(database[ind]["vitamin D (IU)"]);
        nutrients["calcium (mg)"].push(database[ind]["calcium (mg)"]);
        nutrients["phosphorus (mg)"].push(database[ind]["phosphorus (mg)"]);
        nutrients["iron (mg)"].push(database[ind]["iron (mg)"]);
        nutrients["zinc (mg)"].push(database[ind]["zinc (mg)"]);
        nutrients["sodium (mg)"].push(database[ind]["sodium (mg)"]);
        nutrients["sodium (mEq)"].push(database[ind]["sodium (mEq)"]);
        nutrients["potassium (mg)"].push(database[ind]["potassium (mg)"]);
        nutrients["potassium (mEq)"].push(database[ind]["potassium (mEq)"]);
      }
    }
  });
  return nutrients;
}
function switchUnit(index, el_dyn) {
  const unit = document.querySelector(
    `input[name="volume_${index}_${el_dyn}"]:checked`
  ).value;
  document.getElementById(`unit_ml_${index}_${el_dyn}`).style.display = "block";
  document.getElementById(`unit_floz_${index}_${el_dyn}`).style.display =
    "block";
  document.getElementById(unit).style.display = "none";
  console.log(unit);
}
function addHtmlToContainer(
  containerId,
  index,
  type,
  id_unit = NaN,
  name_select_inp,
  id_select_inp = "select__prdct"
) {
  // CHANGES MADE: display none property and checked has been swaped for default unit
  UNIT = [
    `<div class="unit__calc--box">
      <div
        class="check__box--calc"
        id="unit_ml_1_${counter}"  
        style="display: none"
        onchange="switchUnit(1,${counter})"
      >
        <input type="radio" checked id="mL_1_${counter}" name="volume_1_${counter}" value="unit_ml_1_${counter}" />
        <label for="mL_1_${counter}" class="unit__calc"
          >fl oz
          <svg
            fill="#fff"
            style="
              width: 13px;
              vertical-align: middle;
              margin-left: 5px;
              cursor: pointer;
            "
            viewBox="0 0 13 13"
            data-reactid="366"
          >
            <path
              d="M12,6H1C0.6,6,0.3,5.8,0.1,5.5s-0.2-0.7,0-1l2.3-4c0.3-0.5,1-0.6,1.4-0.4C4.3,0.4,4.5,1,4.2,1.5L2.7,4H12c0.6,0,1,0.4,1,1 S12.6,6,12,6z"
              data-reactid="367"
            ></path>
            <path
              d="M1,7h11c0.4,0,0.7,0.2,0.9,0.5s0.2,0.7,0,1l-2.3,4c-0.3,0.5-0.9,0.6-1.4,0.4c-0.5-0.3-0.6-0.9-0.4-1.4L10.3,9H1   C0.4,9,0,8.6,0,8S0.4,7,1,7z"
              data-reactid="368"
            ></path>
          </svg>
        </label>
      </div>
      <div
        class="check__box--calc"
        id="unit_floz_1_${counter}"
        onchange="switchUnit(1,${counter})"
      >
        <input
          type="radio"
          id="floz_1_${counter}"
          name="volume_1_${counter}"
          value="unit_floz_1_${counter}"
        />
        <label for="floz_1_${counter}" class="unit__calc"
          >mL
          <svg
            fill="#fff"
            style="
              width: 13px;
              vertical-align: middle;
              margin-left: 5px;
              cursor: pointer;
            "
            viewBox="0 0 13 13"
            data-reactid="366"
          >
            <path
              d="M12,6H1C0.6,6,0.3,5.8,0.1,5.5s-0.2-0.7,0-1l2.3-4c0.3-0.5,1-0.6,1.4-0.4C4.3,0.4,4.5,1,4.2,1.5L2.7,4H12c0.6,0,1,0.4,1,1 S12.6,6,12,6z"
              data-reactid="367"
            ></path>
            <path
              d="M1,7h11c0.4,0,0.7,0.2,0.9,0.5s0.2,0.7,0,1l-2.3,4c-0.3,0.5-0.9,0.6-1.4,0.4c-0.5-0.3-0.6-0.9-0.4-1.4L10.3,9H1   C0.4,9,0,8.6,0,8S0.4,7,1,7z"
              data-reactid="368"
            ></path>
          </svg>
        </label>
      </div>
    </div>`,
    `<div class="unit__calc--box">
      <div
        class="check__box--calc"
        id="unit_ml_2_${counter_2}"
        style="display: none"
        onchange="switchUnit(2,${counter_2})"
      >
        <input type="radio" checked id="mL_2_${counter_2}" name="volume_2_${counter_2}" value="unit_ml_2_${counter_2}" />
        <label for="mL_2_${counter_2}" class="unit__calc"
          >fl oz
          <svg
            fill="#fff"
            style="
              width: 13px;
              vertical-align: middle;
              margin-left: 5px;
              cursor: pointer;
            "
            viewBox="0 0 13 13"
            data-reactid="366"
          >
            <path
              d="M12,6H1C0.6,6,0.3,5.8,0.1,5.5s-0.2-0.7,0-1l2.3-4c0.3-0.5,1-0.6,1.4-0.4C4.3,0.4,4.5,1,4.2,1.5L2.7,4H12c0.6,0,1,0.4,1,1 S12.6,6,12,6z"
              data-reactid="367"
            ></path>
            <path
              d="M1,7h11c0.4,0,0.7,0.2,0.9,0.5s0.2,0.7,0,1l-2.3,4c-0.3,0.5-0.9,0.6-1.4,0.4c-0.5-0.3-0.6-0.9-0.4-1.4L10.3,9H1   C0.4,9,0,8.6,0,8S0.4,7,1,7z"
              data-reactid="368"
            ></path>
          </svg>
        </label>
      </div>
      <div
        class="check__box--calc"
        id="unit_floz_2_${counter_2}"
        onchange="switchUnit(2,${counter_2})"
      >
        <input
          type="radio"
          id="floz_2_${counter_2}"
          name="volume_2_${counter_2}"
          value="unit_floz_2_${counter_2}"
        />
        <label for="floz_2_${counter_2}" class="unit__calc"
          >mL
          <svg
            fill="#fff"
            style="
              width: 13px;
              vertical-align: middle;
              margin-left: 5px;
              cursor: pointer;
            "
            viewBox="0 0 13 13"
            data-reactid="366"
          >
            <path
              d="M12,6H1C0.6,6,0.3,5.8,0.1,5.5s-0.2-0.7,0-1l2.3-4c0.3-0.5,1-0.6,1.4-0.4C4.3,0.4,4.5,1,4.2,1.5L2.7,4H12c0.6,0,1,0.4,1,1 S12.6,6,12,6z"
              data-reactid="367"
            ></path>
            <path
              d="M1,7h11c0.4,0,0.7,0.2,0.9,0.5s0.2,0.7,0,1l-2.3,4c-0.3,0.5-0.9,0.6-1.4,0.4c-0.5-0.3-0.6-0.9-0.4-1.4L10.3,9H1   C0.4,9,0,8.6,0,8S0.4,7,1,7z"
              data-reactid="368"
            ></path>
          </svg>
        </label>
      </div>
    </div>`,
    `<div class="unit__calc--box">
      <div
        class="check__box--calc"
        id="unit_ml_3_${counter_3}"
        style="display: none"
        onchange="switchUnit(3,${counter_3})"
      >
        <input type="radio" checked id="mL_3_${counter_3}" name="volume_3_${counter_3}" value="unit_ml_3_${counter_3}" />
        <label for="mL_3_${counter_3}" class="unit__calc"
          >fl oz
          <svg
            fill="#fff"
            style="
              width: 13px;
              vertical-align: middle;
              margin-left: 5px;
              cursor: pointer;
            "
            viewBox="0 0 13 13"
            data-reactid="366"
          >
            <path
              d="M12,6H1C0.6,6,0.3,5.8,0.1,5.5s-0.2-0.7,0-1l2.3-4c0.3-0.5,1-0.6,1.4-0.4C4.3,0.4,4.5,1,4.2,1.5L2.7,4H12c0.6,0,1,0.4,1,1 S12.6,6,12,6z"
              data-reactid="367"
            ></path>
            <path
              d="M1,7h11c0.4,0,0.7,0.2,0.9,0.5s0.2,0.7,0,1l-2.3,4c-0.3,0.5-0.9,0.6-1.4,0.4c-0.5-0.3-0.6-0.9-0.4-1.4L10.3,9H1   C0.4,9,0,8.6,0,8S0.4,7,1,7z"
              data-reactid="368"
            ></path>
          </svg>
        </label>
      </div>
      <div
        class="check__box--calc"
        id="unit_floz_3_${counter_3}"
        onchange="switchUnit(3,${counter_3})"
      >
        <input
          type="radio"
          id="floz_3_${counter_3}"
          name="volume_3_${counter_3}"
          value="unit_floz_3_${counter_3}"
        />
        <label for="floz_3_${counter_3}" class="unit__calc"
          >mL
          <svg
            fill="#fff"
            style="
              width: 13px;
              vertical-align: middle;
              margin-left: 5px;
              cursor: pointer;
            "
            viewBox="0 0 13 13"
            data-reactid="366"
          >
            <path
              d="M12,6H1C0.6,6,0.3,5.8,0.1,5.5s-0.2-0.7,0-1l2.3-4c0.3-0.5,1-0.6,1.4-0.4C4.3,0.4,4.5,1,4.2,1.5L2.7,4H12c0.6,0,1,0.4,1,1 S12.6,6,12,6z"
              data-reactid="367"
            ></path>
            <path
              d="M1,7h11c0.4,0,0.7,0.2,0.9,0.5s0.2,0.7,0,1l-2.3,4c-0.3,0.5-0.9,0.6-1.4,0.4c-0.5-0.3-0.6-0.9-0.4-1.4L10.3,9H1   C0.4,9,0,8.6,0,8S0.4,7,1,7z"
              data-reactid="368"
            ></path>
          </svg>
        </label>
      </div>
    </div>`,
    `<div class="unit__list">
    <div class="unit__box">
      <select name="" id="liquid_concentrate_formula_unit" class="unit__box--ele">
        <option value="mL" selected>mL</option>
        <option value="fl oz">fl oz</option>
        <option value="gram">g</option>
        <option value="Tablespoon(s)">Tbsp</option>
        <option value="can/carton(s)">can/carton(s)</option>
      </select>
    </div>
  </div>`,
    `<div class="unit__list">
    <div class="unit__box">
      <select name="" id="powder_formula_unit" class="unit__box--ele">
        <option value="scoop(s)">scoop(s)</option>
        <option value="tsp">tsp</option>
        <option value="gram" selected>g</option>
        <option value="Tablespoon(s)">Tbsp</option>
        <option value="cup(s)">cup</option>
      </select>
    </div>
  </div>`,
    `<div class="unit__list">
    <div class="unit__box">
      <select name="" id="human_milk_fortifier_unit" class="unit__box--ele">
        <option value="" disabled selected>---select unit---</option>
        <option value="mL">mL</option>
        <option value="gram" selected>g</option>
        <option value="packet/vial(s)">packet/vial(s)</option>
      </select>
    </div>
  </div>`,
    `<div class="unit__list">
    <div class="unit__box">
      <select name="" id="modular_unit" class="unit__box--ele">
        <option value="" disabled selected>---select unit---</option>
        <option value="mL">mL</option>
        <option value="gram" selected>g</option>
        <option value="tsp">tsp</option>
        <option value="Tbsp">Tbsp</option>
        <option value="scoop(s)">scoop(s)</option>
      </select>
    </div>
  </div>`,
  ];
  // Get the container element by its ID
  const container = document.getElementById(containerId);
  // Get the name of all products
  let product = listOfProducts(type);

  // Check if the container element exists
  if (container) {
    // Create a new div element with the specified HTML content
    const divElement = document.createElement("div");
    let html = `
        <div class="row__toggle--calc">
          <select name="${name_select_inp}" id="${id_select_inp}" class="input__calc--toggle margin__right">`;
    // If no of products is one then we don't need to add select option as default
    if (product.length > 1) {
      html += `<option disabled value="" selected>
          --select--
        </option>`;
    }
    product.forEach((prd) => {
      html += `<option value="${prd}">${prd}</option>`;
    });
    html += `</select>
            <div class="combined__calc--toggle">
              <input type="text" class="input__calc--toggle" id="${name_select_inp}" />
              ${UNIT[index]}
            </div>
            <span class="remove__prdct" onclick="removeProduct(this,${id_unit})"> <i class="fa-regular fa-trash-can"></i> </span>
          </div>
          <span class="error__msg" id=err-${name_select_inp}> ERROR </span>
      `;
    divElement.innerHTML = html;

    // Append the new div element with the HTML content to the container
    container.appendChild(divElement);
  } else {
    console.error(`Container with ID '${containerId}' not found.`);
  }
  if (id_unit == 0) {
    counter++;
  } else if (id_unit == 1) {
    counter_2++;
  } else if (id_unit == 2) {
    counter_3++;
  }
  console.log(counter, counter_2, counter_3);
}
function removeProduct(prdct, id_unit) {
  let ele = prdct.parentElement.parentElement;
  console.log(ele);
  ele.innerHTML = "";
  if (id_unit == 0) {
    counter--;
  } else if (id_unit == 1) {
    counter_2--;
  } else if (id_unit == 2) {
    counter_3--;
  }
}
function getHumanMilkFortifier() {
  let nutrients = {
    "g or mL per packet/vial (for HMF)": [],
    "displ ml": [],
  };
  document
    .querySelectorAll('[name="human__milk__fortifier__select"]')
    .forEach((prd) => {
      for (let ind = 0; ind < 130; ind++) {
        if (database[ind]["Product Name"] == prd.value) {
          nutrients["g or mL per packet/vial (for HMF)"].push(
            database[ind]["g or mL per packet/vial (for HMF)"]
          );
          nutrients["displ ml"].push(database[ind]["displ ml"]);
        }
      }
    });
  return nutrients;
}
function getVolumeProductsGrams() {
  let volumn_amount_g = {
    water: [0],
    human_milk: [0],
    "ready-to-feed": [0],
    liquid_concentrate: [0],
    powder: [],
    human_milk_fortifier: [],
    modular: [],
  };

  let powerFormulaNutrients = getPowerFormulaNutrients();

  document.querySelectorAll("#powder_formula_unit").forEach((el, ind) => {
    let unit = el.value;
    let val = document.querySelectorAll("#powder__formula__select")[ind].value;

    if (unit === "scoop(s)") {
      checkNULLDBValue(
        "Unable to calculate as there is no data available for chosen unit",
        document.querySelectorAll("#err-powder__formula__select")[ind],
        powerFormulaNutrients["g per scoop"][ind]
      );
      volumn_amount_g["powder"].push(
        val * powerFormulaNutrients["g per scoop"][ind]
      );
    } else if (unit === "Tablespoon(s)") {
      checkNULLDBValue(
        "Unable to calculate as there is no data available for chosen unit",
        document.querySelectorAll("#err-powder__formula__select")[ind],
        powerFormulaNutrients["g per Tbsp"][ind]
      );
      volumn_amount_g["powder"].push(
        val * powerFormulaNutrients["g per Tbsp"][ind]
      );
    } else if (unit === "tsp") {
      checkNULLDBValue(
        "Unable to calculate as there is no data available for chosen unit",
        document.querySelectorAll("#err-powder__formula__select")[ind],
        powerFormulaNutrients["g per tsp"][ind]
      );
      volumn_amount_g["powder"].push(
        val * powerFormulaNutrients["g per tsp"][ind]
      );
    } else if (unit === "cup(s)") {
      checkNULLDBValue(
        "Unable to calculate as there is no data available for chosen unit",
        document.querySelectorAll("#err-powder__formula__select")[ind],
        powerFormulaNutrients["g per cup"][ind]
      );
      volumn_amount_g["powder"].push(
        val * powerFormulaNutrients["g per cup"][ind]
      );
    } else if (unit === "gram") {
      volumn_amount_g["powder"].push(val);
    }
  });
  // human__milk__fortifier__select
  let humanMilkFortifier = getHumanMilkFortifier();
  console.log("Human Milk Fortifier Units");
  console.log(humanMilkFortifier);
  console.log("//////////////////");
  document.querySelectorAll("#human_milk_fortifier_unit").forEach((el, ind) => {
    let unit = el.value;
    let val = document.querySelectorAll("#human__milk__fortifier__select")[ind]
      .value;

    if (unit === "gram") {
      checkNULLDBValue(
        "Unable to calculate as there is no data available for chosen unit",
        document.querySelectorAll("#err-human__milk__fortifier__select")[ind],
        humanMilkFortifier["displ ml"][ind]
      );
      volumn_amount_g["human_milk_fortifier"].push(
        val * humanMilkFortifier["displ ml"][ind]
      );
    } else if (unit === "packet/vial(s)") {
      checkNULLDBValue(
        "Unable to calculate as there is no data available for chosen unit",
        document.querySelectorAll("#err-human__milk__fortifier__select")[ind],
        humanMilkFortifier["g or mL per packet/vial (for HMF)"][ind]
      );
      volumn_amount_g["human_milk_fortifier"].push(
        val * humanMilkFortifier["g or mL per packet/vial (for HMF)"][ind]
      );
    } else {
      volumn_amount_g["human_milk_fortifier"].push(0);
    }
  });
  let modularNutrients = getModularNutrients();
  console.log("MODULE NUTRIENTS");
  console.log(modularNutrients);
  console.log("/////////////////////");
  document.querySelectorAll("#modular_unit").forEach((el, ind) => {
    let unit = el.value;
    let val = document.querySelectorAll("#modular__select")[ind].value;

    if (unit === "scoop(s)") {
      checkNULLDBValue(
        "Unable to calculate as there is no data available for chosen unit",
        document.querySelectorAll("#err-modular__select")[ind],
        modularNutrients["g per scoop"][ind]
      );
      volumn_amount_g["modular"].push(
        val * modularNutrients["g per scoop"][ind]
      );
    } else if (unit === "Tbsp") {
      checkNULLDBValue(
        "Unable to calculate as there is no data available for chosen unit",
        document.querySelectorAll("#err-modular__select")[ind],
        modularNutrients["g per Tbsp"][ind]
      );
      volumn_amount_g["modular"].push(
        val * modularNutrients["g per Tbsp"][ind]
      );
    } else if (unit === "tsp") {
      checkNULLDBValue(
        "Unable to calculate as there is no data available for chosen unit",
        document.querySelectorAll("#err-modular__select")[ind],
        modularNutrients["g per tsp"][ind]
      );
      volumn_amount_g["modular"].push(val * modularNutrients["g per tsp"][ind]);
    } else if (unit === "gram") {
      volumn_amount_g["modular"].push(val);
    } else {
      volumn_amount_g["modular"].push(0);
      checkNULLDBValue(
        "Unable to calculate as there is no data available for chosen unit",
        document.querySelectorAll("#err-modular__select")[ind],
        0
      );
    }
  });
  return volumn_amount_g;
}
function flattenObjectToArray(obj) {
  const result = [];

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      result.push(...obj[key]);
    }
  }

  return result;
}
function getVolumeProductsMl() {
  let volumn_amount_ml = {
    water: [],
    human_milk: [],
    "ready-to-feed": [],
    liquid_concentrate: [],
    powder: [],
    human_milk_fortifier: [],
    modular: [],
  };
  let volumePrdctGram = getVolumeProductsGrams();

  // Water calculations
  for (let x = 0; x < counter; x++) {
    let unit = document.querySelector(`input[name="volume_1_${x}"]:checked`);
    if (!unit) {
      console.log("Does not exist");
    } else {
      unit = unit.value;
      let val = document.querySelectorAll("#water__select")[x].value * 1;
      if (unit === `unit_floz_1_${x}`) {
        volumn_amount_ml["water"].push(val * 29.57);
      } else if (unit === 0) {
        volumn_amount_ml["water"].push(0);
      } else {
        volumn_amount_ml["water"].push(val);
      }
    }
  }
  // Human Milk Calculations
  for (let x = 0; x < counter_2; x++) {
    let unit = document.querySelector(`input[name="volume_2_${x}"]:checked`);
    if (!unit) {
      console.log("Does not exist");
    } else {
      unit = unit.value;
      let val = document.querySelectorAll("#human__milk__select")[x].value * 1;
      if (unit === `unit_floz_2_${x}`) {
        volumn_amount_ml["human_milk"].push(val * 29.57);
      } else if (unit === 0) {
        volumn_amount_ml["human_milk"].push(0);
      } else {
        volumn_amount_ml["human_milk"].push(val);
      }
    }
  }
  // Ready to Feed formula
  for (let x = 0; x < counter_3; x++) {
    let unit = document.querySelector(`input[name="volume_3_${x}"]:checked`);
    if (!unit) {
      console.log("Does not exist");
    } else {
      unit = unit.value;
      let val =
        document.querySelectorAll("#ready__to__feed__select")[x].value * 1;
      if (unit === `unit_floz_3_${x}`) {
        volumn_amount_ml["ready-to-feed"].push(val * 29.57);
      } else if (unit === 0) {
        volumn_amount_ml["ready-to-feed"].push(0);
      } else {
        volumn_amount_ml["ready-to-feed"].push(val);
      }
    }
  }
  // Liquid Concentrate Formula Calculations
  let liquid_concentrate = getLiquidConcentratedNutrients();

  document
    .querySelectorAll("#liquid_concentrate_formula_unit")
    .forEach((el, ind) => {
      let unit = el.value;
      let val = document.querySelectorAll(
        "#liquid__concentrate__formula__select"
      )[ind].value;

      if (unit === "fl oz") {
        volumn_amount_ml["liquid_concentrate"].push(val * 29.57);
      } else if (unit === "Tablespoon(s)") {
        volumn_amount_ml["liquid_concentrate"].push(val * 14.79);
      } else if (unit === "gram") {
        checkNULLDBValue(
          "Unable to calculate as there is no data available for chosen unit",
          document.querySelectorAll(
            "#err-liquid__concentrate__formula__select"
          )[ind],
          liquid_concentrate["Density (g/ml)"][ind]
        );
        volumn_amount_ml["liquid_concentrate"].push(
          val / liquid_concentrate["Density (g/ml)"][ind]
        );
      } else if (unit === "can/carton(s)") {
        checkNULLDBValue(
          "Unable to calculate as there is no data available for chosen unit",
          document.querySelectorAll(
            "#err-liquid__concentrate__formula__select"
          )[ind],
          liquid_concentrate["mL per can/carton (for LC)"][ind]
        );
        volumn_amount_ml["liquid_concentrate"].push(
          val * liquid_concentrate["mL per can/carton (for LC)"][ind]
        );
      } else if (unit === "mL") {
        volumn_amount_ml["liquid_concentrate"].push(val);
      } else {
        volumn_amount_ml["liquid_concentrate"].push(0);
      }
    });

  // Powder Formula calculations
  let powerFormulaNutrients = getPowerFormulaNutrients();

  document.querySelectorAll("#powder__formula__select").forEach((el, ind) => {
    volumn_amount_ml["powder"].push(
      volumePrdctGram["powder"][ind] * powerFormulaNutrients["displ ml"][ind]
    );
  });

  // Human Milk Fortifier
  let human_milk_fortifier = getHumanMilkFortifier();

  document
    .querySelectorAll("#human__milk__fortifier__select")
    .forEach((el, ind) => {
      if (volumePrdctGram["human_milk_fortifier"][ind] === 0) {
        volumn_amount_ml["human_milk_fortifier"].push(el.value * 1);
      } else {
        volumn_amount_ml["human_milk_fortifier"].push(
          human_milk_fortifier["displ ml"] *
            volumePrdctGram["human_milk_fortifier"][ind]
        );
      }
    });
  // Modular
  let modular = getModularNutrients();

  document.querySelectorAll("#modular__select").forEach((el, ind) => {
    if (volumePrdctGram["modular"][ind] === 0) {
      volumn_amount_ml["modular"].push(el.value * 1);
    } else {
      result = volumn_amount_ml["modular"].push(
        modular["displ ml"] * volumePrdctGram["modular"][ind]
      );
    }
  });

  return volumn_amount_ml;
}
// Check for NULL DATABASE Value
function checkNULLDBValue(error_msg, error_el, val) {
  if (isNaN(val * 1)) {
    error_el.innerHTML = error_msg;
    error_el.style.display = "block";
    isNULLDBVal = true;
  } else {
    error_el.innerHTML = "";
    error_el.style.display = "none";
    isNULLDBVal = false;
  }
}

function sumAllValues(volumn_amount_ml) {
  let totalSum = 0;

  for (const key in volumn_amount_ml) {
    if (volumn_amount_ml.hasOwnProperty(key)) {
      const array = volumn_amount_ml[key];

      for (const value of array) {
        if (!isNaN(value * 1)) {
          totalSum += value * 1;
        }
      }
    }
  }

  return totalSum;
}
function sumArraysWithNaNAsZero(volumn_amount_ml) {
  const result = {};

  for (const key in volumn_amount_ml) {
    if (volumn_amount_ml.hasOwnProperty(key)) {
      const array = volumn_amount_ml[key];
      const sum = array.reduce((accumulator, currentValue) => {
        if (!isNaN(currentValue * 1)) {
          return accumulator * 1 + currentValue * 1;
        } else {
          return accumulator * 1;
        }
      }, 0);

      result[key] = sum;
    }
  }

  return result;
}
function getProductKcal() {
  let energy_col_kcal = {
    water: [],
    human_milk: [],
    "ready-to-feed": [],
    liquid_concentrate: [],
    powder: [],
    human_milk_fortifier: [],
    modular: [],
  };
  let product_nutrients = getAllNutrients();
  let volume = getVolumeProductsMl();
  let volume_g = getVolumeProductsGrams();
  let counter = 0;
  for (let x = 0; x < volume["water"].length; x++) {
    energy_col_kcal["water"].push(
      volume["water"][x] * product_nutrients["kcal"][counter++]
    );
  }
  for (let x = 0; x < volume["human_milk"].length; x++) {
    energy_col_kcal["human_milk"].push(
      volume["human_milk"][x] * product_nutrients["kcal"][counter++]
    );
  }
  for (let x = 0; x < volume["ready-to-feed"].length; x++) {
    energy_col_kcal["ready-to-feed"].push(
      volume["ready-to-feed"][x] * product_nutrients["kcal"][counter++]
    );
  }
  for (let x = 0; x < volume["liquid_concentrate"].length; x++) {
    energy_col_kcal["liquid_concentrate"].push(
      volume["liquid_concentrate"][x] * product_nutrients["kcal"][counter++]
    );
  }
  for (let x = 0; x < volume["powder"].length; x++) {
    energy_col_kcal["powder"].push(
      volume_g["powder"][x] * product_nutrients["kcal"][counter++]
    );
  }
  for (let x = 0; x < volume["human_milk_fortifier"].length; x++) {
    let val =
      document.querySelectorAll("#human__milk__fortifier__select")[x].value * 1;
    if (volume_g["human_milk_fortifier"][x] == 0) {
      energy_col_kcal["human_milk_fortifier"].push(
        val * product_nutrients["kcal"][counter++]
      );
    } else {
      energy_col_kcal["human_milk_fortifier"].push(
        volume_g["human_milk_fortifier"][x] *
          product_nutrients["kcal"][counter++]
      );
    }
  }
  for (let x = 0; x < volume["modular"].length; x++) {
    let val = document.querySelectorAll("#modular__select")[x].value * 1;
    if (volume_g["modular"][x] == 0) {
      energy_col_kcal["modular"].push(
        val * product_nutrients["kcal"][counter++]
      );
    } else {
      energy_col_kcal["modular"].push(
        volume_g["modular"][x] * product_nutrients["kcal"][counter++]
      );
    }
  }

  return energy_col_kcal;
}
function getTheRecipe() {
  let recipe = [];

  document.querySelectorAll("#select__prdct").forEach((prdc) => {
    let product = prdc.value;
    let value = prdc.parentElement.childNodes[3].childNodes[1].value;
    // If the product is not Human milk fortifier
    let unit =
      prdc.parentElement.childNodes[3].childNodes[3].childNodes[1].childNodes[1]
        .value;
    // If the product is human milk fortifier then go one level back because of the options
    if (prdc.name == "human__milk__fortifier__select")
      unit = prdc.parentElement.childNodes[3].childNodes[3].childNodes[1].value;
    // Change unit from gram to g
    if (unit == "gram") unit = "g";
    // Find the id for switch type inputs
    let id = prdc.parentElement.childNodes[3].childNodes[3].childNodes[1].id
      .toString()
      .split("_");

    if (id && id.length == 4) {
      try {
        unit = document
          .querySelector(`input[name="volume_${id[2]}_${id[3]}"]:checked`)
          .value.toString()
          .split("_")[1];
        // Add space to floz unit
        if (unit == "floz") unit = "fl oz";
      } catch (error) {
        // Handle the error here, you can log it or perform any necessary actions.
        // unit =
        //   prdc.parentElement.childNodes[3].childNodes[3].childNodes[1]
        //     .childNodes[1].value;
      }
    }
    if (value) recipe.push(`${value} ${unit} ${product}`);
  });
  return recipe;
}
function updateAllNutrients() {
  let volume_ml = getVolumeProductsMl();
  let volume_g = getVolumeProductsGrams();
  let nutrients = getAllNutrients();
  let counter = 0;
  // Water
  for (let x = 0; x < volume_ml["water"].length; x++) {
    console.log("Water " + counter);
    nutrients["protein (g)"][counter] *= volume_ml["water"][x];
    nutrients["fat (g)"][counter] *= volume_ml["water"][x];
    nutrients["carb (g)"][counter] *= volume_ml["water"][x];
    nutrients["vitamin A (IU)"][counter] *= volume_ml["water"][x];
    nutrients["vitamin D (IU)"][counter] *= volume_ml["water"][x];
    nutrients["calcium (mg)"][counter] *= volume_ml["water"][x];
    nutrients["phosphorus (mg)"][counter] *= volume_ml["water"][x];
    nutrients["iron (mg)"][counter] *= volume_ml["water"][x];
    nutrients["zinc (mg)"][counter] *= volume_ml["water"][x];
    nutrients["sodium (mg)"][counter] *= volume_ml["water"][x];
    nutrients["sodium (mEq)"][counter] *= volume_ml["water"][x];
    nutrients["potassium (mg)"][counter] *= volume_ml["water"][x];
    nutrients["potassium (mEq)"][counter] *= volume_ml["water"][x];
    ++counter;
  }
  // Human Milk
  for (let x = 0; x < volume_ml["human_milk"].length; x++) {
    console.log("Human Milk  " + counter);

    nutrients["protein (g)"][counter] *= volume_ml["human_milk"][x];
    nutrients["fat (g)"][counter] *= volume_ml["human_milk"][x];
    nutrients["carb (g)"][counter] *= volume_ml["human_milk"][x];
    nutrients["vitamin A (IU)"][counter] *= volume_ml["human_milk"][x];
    nutrients["vitamin D (IU)"][counter] *= volume_ml["human_milk"][x];
    nutrients["calcium (mg)"][counter] *= volume_ml["human_milk"][x];
    nutrients["phosphorus (mg)"][counter] *= volume_ml["human_milk"][x];
    nutrients["iron (mg)"][counter] *= volume_ml["human_milk"][x];
    nutrients["zinc (mg)"][counter] *= volume_ml["human_milk"][x];
    nutrients["sodium (mg)"][counter] *= volume_ml["human_milk"][x];
    nutrients["sodium (mEq)"][counter] *= volume_ml["human_milk"][x];
    nutrients["potassium (mg)"][counter] *= volume_ml["human_milk"][x];
    nutrients["potassium (mEq)"][counter] *= volume_ml["human_milk"][x];
    ++counter;
  }
  // Ready To Feed Formula
  for (let x = 0; x < volume_ml["ready-to-feed"].length; x++) {
    console.log(
      "Ready To Feed " +
        counter +
        " value " +
        volume_ml["ready-to-feed"][x] * nutrients["phosphorus (mg)"][counter]
    );

    nutrients["protein (g)"][counter] *= volume_ml["ready-to-feed"][x];
    nutrients["fat (g)"][counter] *= volume_ml["ready-to-feed"][x];
    nutrients["carb (g)"][counter] *= volume_ml["ready-to-feed"][x];
    nutrients["vitamin A (IU)"][counter] *= volume_ml["ready-to-feed"][x];
    nutrients["vitamin D (IU)"][counter] *= volume_ml["ready-to-feed"][x];
    nutrients["calcium (mg)"][counter] *= volume_ml["ready-to-feed"][x];
    nutrients["phosphorus (mg)"][counter] *= volume_ml["ready-to-feed"][x];
    nutrients["iron (mg)"][counter] *= volume_ml["ready-to-feed"][x];
    nutrients["zinc (mg)"][counter] *= volume_ml["ready-to-feed"][x];
    nutrients["sodium (mg)"][counter] *= volume_ml["ready-to-feed"][x];
    nutrients["sodium (mEq)"][counter] *= volume_ml["ready-to-feed"][x];
    nutrients["potassium (mg)"][counter] *= volume_ml["ready-to-feed"][x];
    nutrients["potassium (mEq)"][counter] *= volume_ml["ready-to-feed"][x];
    console.log("Just updated");
    console.log(nutrients);
    ++counter;
  }
  // Liquid Concentrated Formula
  for (let x = 0; x < volume_ml["liquid_concentrate"].length; x++) {
    console.log("Liquid Concentrated " + counter);

    nutrients["protein (g)"][counter] *= volume_ml["liquid_concentrate"][x];
    nutrients["fat (g)"][counter] *= volume_ml["liquid_concentrate"][x];
    nutrients["carb (g)"][counter] *= volume_ml["liquid_concentrate"][x];
    nutrients["vitamin A (IU)"][counter] *= volume_ml["liquid_concentrate"][x];
    nutrients["vitamin D (IU)"][counter] *= volume_ml["liquid_concentrate"][x];
    nutrients["calcium (mg)"][counter] *= volume_ml["liquid_concentrate"][x];
    nutrients["phosphorus (mg)"][counter] *= volume_ml["liquid_concentrate"][x];
    nutrients["iron (mg)"][counter] *= volume_ml["liquid_concentrate"][x];
    nutrients["zinc (mg)"][counter] *= volume_ml["liquid_concentrate"][x];
    nutrients["sodium (mg)"][counter] *= volume_ml["liquid_concentrate"][x];
    nutrients["sodium (mEq)"][counter] *= volume_ml["liquid_concentrate"][x];
    nutrients["potassium (mg)"][counter] *= volume_ml["liquid_concentrate"][x];
    nutrients["potassium (mEq)"][counter] *= volume_ml["liquid_concentrate"][x];
    ++counter;
  }
  // Powder Formula
  for (let x = 0; x < volume_g["powder"].length; x++) {
    console.log("Powder Formula " + counter);

    nutrients["protein (g)"][counter] *= volume_g["powder"][x];
    nutrients["fat (g)"][counter] *= volume_g["powder"][x];
    nutrients["carb (g)"][counter] *= volume_g["powder"][x];
    nutrients["vitamin A (IU)"][counter] *= volume_g["powder"][x];
    nutrients["vitamin D (IU)"][counter] *= volume_g["powder"][x];
    nutrients["calcium (mg)"][counter] *= volume_g["powder"][x];
    nutrients["phosphorus (mg)"][counter] *= volume_g["powder"][x];
    nutrients["iron (mg)"][counter] *= volume_g["powder"][x];
    nutrients["zinc (mg)"][counter] *= volume_g["powder"][x];
    nutrients["sodium (mg)"][counter] *= volume_g["powder"][x];
    nutrients["sodium (mEq)"][counter] *= volume_g["powder"][x];
    nutrients["potassium (mg)"][counter] *= volume_g["powder"][x];
    nutrients["potassium (mEq)"][counter] *= volume_g["powder"][x];
    ++counter;
  }
  // Human Milk Fortifier
  for (let x = 0; x < volume_g["human_milk_fortifier"].length; x++) {
    console.log("Human Milk Fortifier " + counter);

    if (volume_g["human_milk_fortifier"][x] == 0) {
      let val =
        document.querySelectorAll("#human__milk__fortifier__select")[x].value *
        1;
      nutrients["protein (g)"][counter] *= val;
      nutrients["fat (g)"][counter] *= val;
      nutrients["carb (g)"][counter] *= val;
      nutrients["vitamin A (IU)"][counter] *= val;
      nutrients["vitamin D (IU)"][counter] *= val;
      nutrients["calcium (mg)"][counter] *= val;
      nutrients["phosphorus (mg)"][counter] *= val;
      nutrients["iron (mg)"][counter] *= val;
      nutrients["zinc (mg)"][counter] *= val;
      nutrients["sodium (mg)"][counter] *= val;
      nutrients["sodium (mEq)"][counter] *= val;
      nutrients["potassium (mg)"][counter] *= val;
      nutrients["potassium (mEq)"][counter] *= val;
    } else {
      nutrients["protein (g)"][counter] *= volume_g["human_milk_fortifier"][x];
      nutrients["fat (g)"][counter] *= volume_g["human_milk_fortifier"][x];
      nutrients["carb (g)"][counter] *= volume_g["human_milk_fortifier"][x];
      nutrients["vitamin A (IU)"][counter] *=
        volume_g["human_milk_fortifier"][x];
      nutrients["vitamin D (IU)"][counter] *=
        volume_g["human_milk_fortifier"][x];
      nutrients["calcium (mg)"][counter] *= volume_g["human_milk_fortifier"][x];
      nutrients["phosphorus (mg)"][counter] *=
        volume_g["human_milk_fortifier"][x];
      nutrients["iron (mg)"][counter] *= volume_g["human_milk_fortifier"][x];
      nutrients["zinc (mg)"][counter] *= volume_g["human_milk_fortifier"][x];
      nutrients["sodium (mg)"][counter] *= volume_g["human_milk_fortifier"][x];
      nutrients["sodium (mEq)"][counter] *= volume_g["human_milk_fortifier"][x];
      nutrients["potassium (mg)"][counter] *=
        volume_g["human_milk_fortifier"][x];
      nutrients["potassium (mEq)"][counter] *=
        volume_g["human_milk_fortifier"][x];
    }
    ++counter;
  }
  // Modular
  for (let x = 0; x < volume_g["modular"].length; x++) {
    console.log("Modular " + counter);

    if (volume_g["modular"][x] == 0) {
      let val = document.querySelectorAll("#modular__select")[x].value * 1;
      nutrients["protein (g)"][counter] *= val;
      nutrients["fat (g)"][counter] *= val;
      nutrients["carb (g)"][counter] *= val;
      nutrients["vitamin A (IU)"][counter] *= val;
      nutrients["vitamin D (IU)"][counter] *= val;
      nutrients["calcium (mg)"][counter] *= val;
      nutrients["phosphorus (mg)"][counter] *= val;
      nutrients["iron (mg)"][counter] *= val;
      nutrients["zinc (mg)"][counter] *= val;
      nutrients["sodium (mg)"][counter] *= val;
      nutrients["sodium (mEq)"][counter] *= val;
      nutrients["potassium (mg)"][counter] *= val;
      nutrients["potassium (mEq)"][counter] *= val;
    } else {
      nutrients["protein (g)"][counter] *= volume_g["modular"][x];
      nutrients["fat (g)"][counter] *= volume_g["modular"][x];
      nutrients["carb (g)"][counter] *= volume_g["modular"][x];
      nutrients["vitamin A (IU)"][counter] *= volume_g["modular"][x];
      nutrients["vitamin D (IU)"][counter] *= volume_g["modular"][x];
      nutrients["calcium (mg)"][counter] *= volume_g["modular"][x];
      nutrients["phosphorus (mg)"][counter] *= volume_g["modular"][x];
      nutrients["iron (mg)"][counter] *= volume_g["modular"][x];
      nutrients["zinc (mg)"][counter] *= volume_g["modular"][x];
      nutrients["sodium (mg)"][counter] *= volume_g["modular"][x];
      nutrients["sodium (mEq)"][counter] *= volume_g["modular"][x];
      nutrients["potassium (mg)"][counter] *= volume_g["modular"][x];
      nutrients["potassium (mEq)"][counter] *= volume_g["modular"][x];
    }
    ++counter;
  }

  return nutrients;
}
function calculate() {
  // Check for errors before calculations
  // Check if one product is added we need to ensure we have complete information
  if (checkIfOneProduct()[0]) {
    document.querySelector(".error__msg--footer").innerHTML =
      checkIfOneProduct()[1];
    document.querySelector(".error__container").style.display = "block";
    return;
  }
  // Check if at least one product is added
  if (checkForAddedProduct()[0]) {
    document.querySelector(".error__msg--footer").innerHTML =
      checkForAddedProduct()[1];
    document.querySelector(".error__container").style.display = "block";
    return;
  } else {
    document.querySelector(".error__container").style.display = "none";
  }
  // Perform Calculations
  let weight = document.getElementById("weight").value * 1;
  let intake = document.getElementById("intake").value * 1;
  let volume = getVolumeProductsMl();
  let kcal = getProductKcal();
  let product_nutrients = sumArraysWithNaNAsZero(updateAllNutrients());

  let sumVolume = sumAllValues(volume);
  let sumKcal = sumAllValues(kcal);
  let allRecipie = getTheRecipe();
  let amountPer100Ml = [
    100,
    (100 * sumKcal) / sumVolume,
    (100 * product_nutrients["protein (g)"]) / sumVolume,
    (100 * product_nutrients["fat (g)"]) / sumVolume,
    (100 * product_nutrients["carb (g)"]) / sumVolume,
    (100 * product_nutrients["vitamin A (IU)"]) / sumVolume,
    (100 * product_nutrients["vitamin D (IU)"]) / sumVolume,
    (100 * product_nutrients["calcium (mg)"]) / sumVolume,
    (100 * product_nutrients["phosphorus (mg)"]) / sumVolume,
    (100 * product_nutrients["iron (mg)"]) / sumVolume,
    (100 * product_nutrients["zinc (mg)"]) / sumVolume,
    (100 * product_nutrients["sodium (mg)"]) / sumVolume,
    (100 * product_nutrients["sodium (mEq)"]) / sumVolume,
    (100 * product_nutrients["potassium (mg)"]) / sumVolume,
    (100 * product_nutrients["potassium (mEq)"]) / sumVolume,
  ];

  let amountPerKg = [
    intake,
    (amountPer100Ml[1] / 100) * intake,
    (amountPer100Ml[2] / 100) * intake,
    (amountPer100Ml[3] / 100) * intake,
    (amountPer100Ml[4] / 100) * intake,
    (amountPer100Ml[5] / 100) * intake,
    (amountPer100Ml[6] / 100) * intake,
    (amountPer100Ml[7] / 100) * intake,
    (amountPer100Ml[8] / 100) * intake,
    (amountPer100Ml[9] / 100) * intake,
    (amountPer100Ml[10] / 100) * intake,
    (amountPer100Ml[11] / 100) * intake,
    (amountPer100Ml[12] / 100) * intake,
    (amountPer100Ml[13] / 100) * intake,
    (amountPer100Ml[14] / 100) * intake,
  ];

  let amountPerDay = [
    intake * weight,
    amountPerKg[1] * weight,
    amountPerKg[2] * weight,
    amountPerKg[3] * weight,
    amountPerKg[4] * weight,
    amountPerKg[5] * weight,
    amountPerKg[6] * weight,
    amountPerKg[7] * weight,
    amountPerKg[8] * weight,
    amountPerKg[9] * weight,
    amountPerKg[10] * weight,
    amountPerKg[11] * weight,
    amountPerKg[12] * weight,
    amountPerKg[13] * weight,
    amountPerKg[14] * weight,
  ];
  const labels = [
    "Volume",
    "Energy (kcal)",
    "Protein (g)",
    "Fat (g)",
    "Carbohyrdate (g)",
    "Vitamin A (IU)",
    "Vitamin D (IU)",
    "Calcium (mg)",
    "Phosphorus (mg)",
    "Iron (mg)",
    "Zinc (mg)",
    "Sodium (mg)",
    "Sodium (mEq)",
    "Potassium (mg)",
    "Potassium (mEq)",
  ];

  let approximateYieldMl = Math.round(sumVolume);
  let approximate_Yield_fl_oz = (approximateYieldMl / 29.57).toFixed(1);
  let concentration_kcal_mL = (sumKcal / sumVolume).toFixed(2);
  let concentration_kcal_oz = ((29.6 * sumKcal) / sumVolume).toFixed(1);

  let recipeString = "";
  allRecipie.forEach((recp, ind) => {
    if (allRecipie[ind + 1]) {
      recipeString += `${recp}  + `;
    } else {
      recipeString += `${recp}`;
    }
  });
  document.getElementById("recipie__container").innerHTML = recipeString;
  document.getElementById("mlRes").innerHTML = filterVal(approximateYieldMl);
  document.getElementById("flozRes").innerHTML = filterVal(
    approximate_Yield_fl_oz
  );
  document.getElementById("kcalOz").innerHTML = filterVal(
    concentration_kcal_oz
  );
  document.getElementById("kcalmL").innerHTML = filterVal(
    concentration_kcal_mL
  );
  let table = 0;
  let nutrients = updateAllNutrients();
  if (weight && intake) {
    table = `<table>
    <thead>
      <tr>
        <th scope="col">Nutrient</th>
        <th scope="col">Per 100 ml</th>
        <th scope="col">Per kg</th>
        <th scope="col">Per day</th>
      </tr>
    </thead>
    <tbody>`;
    for (let ind = 0; ind < labels.length; ind++) {
      let name = labels[ind]; // Get the name
      table += `  <tr>
      <td data-label="Nutrient">${name}</td>
      <td data-label="Per 100 ml">${filterVal(
        amountPer100Ml[ind].toFixed(2)
      )}</td>
      <td data-label="Per kg">${filterVal(amountPerKg[ind].toFixed(2))}</td>
      <td data-label="Per day">${filterVal(amountPerDay[ind].toFixed(2))}</td>
    </tr>`;
    }
    table += ` </tbody>
    </table>`;
  } else if (!weight && intake) {
    table = `<table>
    <thead>
      <tr>
        <th scope="col">Nutrient</th>
        <th scope="col">Per 100 ml</th>
        <th scope="col">Per kg</th>
      </tr>
    </thead>
    <tbody>`;
    for (let ind = 0; ind < labels.length; ind++) {
      let name = labels[ind]; // Get the name
      table += `  <tr>
      <td data-label="Nutrient">${name}</td>
      <td data-label="Per 100 ml">${filterVal(
        amountPer100Ml[ind].toFixed(2)
      )}</td>
      <td data-label="Per kg">${filterVal(amountPerKg[ind].toFixed(2))}</td>
    </tr>`;
    }
    table += ` </tbody>
    </table>`;
  } else if (!intake) {
    table = `<table>
    <thead>
      <tr>
        <th scope="col">Nutrient</th>
        <th scope="col">Per 100 ml</th>
      </tr>
    </thead>
    <tbody>`;
    for (let ind = 0; ind < labels.length; ind++) {
      let name = labels[ind]; // Get the name
      table += `  <tr>
      <td data-label="Nutrient">${name}</td>
      <td data-label="Per 100 ml">${filterVal(
        amountPer100Ml[ind].toFixed(2)
      )}</td>
    </tr>`;
    }
    table += ` </tbody>
    </table>`;
  }
  console.log(
    amountPer100Ml,
    amountPerKg,
    amountPerDay,
    product_nutrients,
    updateAllNutrients(),
    getAllNutrients(),
    getVolumeProductsMl(),
    getVolumeProductsGrams()
  );
  // Check for NULL Values special case of error
  if (checkForNULLValues()[0]) {
    document.querySelector(".error__msg--footer").innerHTML =
      checkForAddedProduct()[1];
    document.querySelector(".error__container").style.display = "block";
    document.getElementById("output__container--calc").style.display = "none";
    document.getElementById("table__container").style.display = "none";
  } else {
    document.getElementById("table__container").innerHTML = table;
    document.getElementById("output__container--calc").style.display = "block";
    document.getElementById("table__container").style.display = "block";
  }
}
function filterVal(num) {
  if (isNaN(num)) return 0;
  if (!isFinite(num)) return 0;
  else return num;
}
let database = 0;

fetch("https://api.npoint.io/aeec55e102ef2131c034", {
  method: "GET",
  headers: {
    Accept: "application/json",
  },
})
  .then((response) => response.json())
  .then((response) => {
    database = response["DATABASE"];
    console.log(database);
  });
function listOfProducts(type) {
  let array = [];
  database.forEach((row) => {
    if (row["Type"] == type) {
      array.push(row["Product Name"]);
    }
  });
  return array;
}
function resetForm() {
  window.location.reload();
}
// ERROR HANDLERS
function checkIfOneProduct() {
  let isErr = false;
  let error__msg = "";
  let prodctAdded = document.querySelectorAll("#select__prdct").length;

  if (prodctAdded === 1) {
    document.querySelectorAll("#select__prdct").forEach((prdc) => {
      let prdcVal = prdc.value;
      let value = prdc.parentElement.childNodes[3].childNodes[1].value;
      if (!(prdcVal && value)) {
        isErr = true;
        error__msg = "Please provide complete information of product.";
      }
    });
  }
  return [isErr, error__msg];
}
function checkForNULLValues() {
  let isErr = false;
  let error__msg = "";
  if (isNULLDBVal) {
    isErr = true;
    error__msg =
      "Please select product and/or unit that has the available data";
  }

  return [isErr, error__msg];
}
function checkForAddedProduct() {
  let isErr = false;
  let error__msg = "";
  let cntr = 0;
  // Check if product is added
  let prodctAdded = document.querySelectorAll("#select__prdct").length;
  if (prodctAdded < 1) {
    isErr = true;
    error__msg =
      "Please add at least one product for for nutrition info (HINT: +)";
  }
  // Check if at least one added product has no empty input
  if (prodctAdded >= 1) {
    document.querySelectorAll("#select__prdct").forEach((prdc) => {
      let prdcVal = prdc.value;
      let value = prdc.parentElement.childNodes[3].childNodes[1].value;
      if (!((prdcVal && value) || (!prdcVal && !value))) {
        isErr = true;
        error__msg = "Please provide complete information of product.";
      }
    });
  }
  return [isErr, error__msg];
}
// SOURCE OF A DATABASE
// https://www.npoint.io/docs/d6416f540f4a791f8134

// Example usage:
// Assuming you have an HTML container with ID "myContainer"
