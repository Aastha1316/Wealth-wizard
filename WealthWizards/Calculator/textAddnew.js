const inputsContainer = document.getElementById("inputs-container");
const addInputButton = document.getElementById("add-input");
const totalPrice = document.getElementById("total-price");
const totalProfit = document.getElementById("profit");
let productCount = 1;
let total = 0;
const products = {};

function addInputRow() {
  const existingRow = document.querySelector(".input-row");
  const newRow = document.createElement("div");
  newRow.className = "input-row";

  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.className = "name-input";
  nameInput.placeholder = "Items";
  nameInput.required = true;

  const priceInput = document.createElement("input");
  priceInput.type = "number";
  priceInput.className = "price-input";
  priceInput.placeholder = "Spending";
  priceInput.required = true;
  priceInput.step=0.01

  const growthRateInput = document.createElement("input");
  growthRateInput.type = "number";
  growthRateInput.className = "growth-rate";
  growthRateInput.placeholder = "Growth Rate";
  growthRateInput.required = true;
  growthRateInput.step=0.01



  const timeInvestedInput = document.createElement("input");
  timeInvestedInput.type = "number";
  timeInvestedInput.className = "invest-time";
  timeInvestedInput.placeholder = "Invest for time";
  timeInvestedInput.required = true;
  timeInvestedInput.step=0.01


  newRow.appendChild(document.createElement("br"));
  newRow.appendChild(nameInput);
  newRow.appendChild(priceInput);
  newRow.appendChild(growthRateInput);
  newRow.appendChild(timeInvestedInput);

  existingRow.parentNode.insertBefore(newRow, existingRow.nextSibling);

  nameInput.focus();

  productCount++;
}

function storeProductData() {
  const nameInputs = document.querySelectorAll(".name-input");
  const priceInputs = document.querySelectorAll(".price-input");
  const growthRateInputs = document.querySelectorAll(".growth-rate");
  const investTimeInputs = document.querySelectorAll(".invest-time");

  nameInputs.forEach((input, index) => {
    if (
      input.value &&
      priceInputs[index].value &&
      growthRateInputs[index].value &&
      investTimeInputs[index].value
    ) {
      const productName = input.value;
      const productPrice = parseFloat(priceInputs[index].value);
      const growthRate = parseFloat(growthRateInputs[index].value);
      const investTime = parseInt(investTimeInputs[index].value);

      products[productName] = {
        productPrice,
        growthRate,
        investTime,
      };
    }
  });

  console.log(products);
}



function compound_interest(exp, growth, time, index) {
  if (time === 0) {
    console.log(exp, growth, time, index);

    return exp[time][index];
  } else {
    console.log(exp, growth, time, index);
    exp[time][index] = Math.round(
      compound_interest(exp, growth, time - 1, index) * (1 + growth[index])
    );

    console.log(exp[time][index] + " time: " + time);
    return exp[time][index];
  }
}

//Compounding for desirable items
function compound_interest_Des(exp, growth, time) {

  
  if (time === 0) {

    //console.log(exp, growth, time, index);

    return exp[time];
  } else {
    //console.log(exp, growth, time, index);
    exp[time] = Math.round(
      compound_interest_Des(exp, growth, time - 1) * (1 + growth[time])
    );

    //console.log(exp[time][index] + " time: " + time);
    return exp[time];
  }
}

function forecast(exp, growth, time, index, deadline) {
  compound_interest(exp, growth, deadline[index], index);
  for (let i = deadline[index] + 1; i <= time; i++) {
    exp[i][index] = exp[deadline[index]][index];
  }
  return exp[time][index];
}

function addExpenses(exp, sum, time, n) {
  for (let i = 0; i < n; i++) {
    let total = 0;
    for (let j = 0; j < time; j++) {
      total += exp[j][i];
    }
    sum[i] = total;
  }
}

function findQuarterValues(sum, totalNeeded, n) {
  for (let i = 0; i < n; i++) {
    totalNeeded[i] = sum[i] - sum[i] * 0.25;
  }
}

function presentValue(totalNeeded, n, pv, inflation) {
  pv[0] = totalNeeded[0];
  for (let i = 1; i < n; i++) {
    pv[i] = totalNeeded[i] / (1 + inflation) ** i;
  }
}

function calculateTotalProfit() {
  let totalProfit = 0;
  const productNames = Object.keys(products);
  const productPrices = productNames.map((name) => products[name].productPrice);
  const time = parseFloat(document.getElementsByClassName("time")[0].value) || 10; //hardcode

  const n = productPrices.length;

  // Create the 2D matrix with all elements initialized to 0
  const item_exp = Array(time * 1.5)
    .fill()
    .map(() => Array(n).fill(0));

  // Populate the first row of the matrix with the product prices
  for (let i = 0; i < n; i++) {
    item_exp[0][i] = productPrices[i];
  }

  // Inflation rate
  const inflation =
  parseFloat( document.getElementsByClassName("inflation")[0].value )|| 0.06;
  console.log(time, inflation);

  // Expenses data
  const growth = productNames.map((name) => products[name].growthRate);
  const deadline = productNames.map((name) => products[name].investTime);

  // Results
  const sum = new Array(50).fill(0);
  const totalNeeded = new Array(50).fill(0);
  const pv = new Array(50).fill(0);

  let totalPV = 0;

  //Desire variables declaration starts
  const desire = new Array(50).fill(0);     //2d array
  const growthR = new Array(50).fill(0);
  const targetAge = new Array(50).fill(0);

  const projAmm = new Array(50).fill(0);

  //let isDesire = 0;
  let presentAge = 20;  //Assuming my age is 20
  let timeDesires = 0;

  //end of desire variable declaration

  for (let i = 0; i < n; i++) {
    forecast(item_exp, growth, time, i, deadline); // Forecasting growth for years mentioned
  }

 

  addExpenses(item_exp, sum, time, n);

  //New section starts

  //Filling projected ammount array with compounded values 
  for(let i = 0;i<n;i++)
  {
    timeDesires = targetAge[i]-presentAge;
    projAmm[i] = compound_interest_Des(desire, growthR, timeDesires);
  }

  for(let i =0;i<n;i++)
  {
    sum[i]+=projAmm[i];   //Adding projected values to the sum array.
  }

  //New section ends

  findQuarterValues(sum, totalNeeded, n);
 
  presentValue(totalNeeded, n, pv, inflation);
  for (let i = 0; i < n; i++) {
    totalPV += pv[i];
  }
  console.log("Total Present Value: " + totalPV.toFixed(2));
  profit.textContent = totalPV.toFixed(2);

 
}

addInputButton.addEventListener("click", addInputRow);
inputsContainer.addEventListener("input", storeProductData);
