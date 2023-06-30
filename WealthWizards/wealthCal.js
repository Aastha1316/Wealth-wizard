const readlineSync = require("readline-sync");

function compound_interest(exp, growth, time, index) {
  if (time === 0) {
    return exp[time][index];
  } else {
    exp[time][index] = Math.round(compound_interest(exp, growth, time - 1, index) * (1 + growth[index]));
    return exp[time][index];
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

function main() {
  const n = Number(readlineSync.question("Enter number of items: "));
  const time = Number(readlineSync.question("Enter time for which you wanna predict: "));

  // Inflation rate
  const inflation = 0.06;

  // Expenses data
  const item_exp = Array.from(Array(100), () => new Array(50).fill(0));
  const growth = new Array(50).fill(0);
  const deadline = new Array(50).fill(0);

  // Results
  const sum = new Array(50).fill(0);
  const totalNeeded = new Array(50).fill(0);
  const pv = new Array(50).fill(0);

  let totalPV = 0;

  // Add item expenses growth and deadline
  for (let i = 0; i < n; i++) {
    item_exp[0][i] = Number(readlineSync.question(`Yearly expense on item ${i + 1}: `));
    growth[i] = Number(readlineSync.question(`Growth rate of item ${i + 1}: `));
    deadline[i] = Number(readlineSync.question("Deadline: "));
  }

  for (let i = 0; i < n; i++) {
    forecast(item_exp, growth, time, i, deadline); // Forecasting growth for years mentioned
  }

  addExpenses(item_exp, sum, time, n);

 
}

main();

  
   
