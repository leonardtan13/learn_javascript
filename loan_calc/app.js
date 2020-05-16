// listen for submit

document.querySelector("#loan-form").addEventListener("submit", function (e) {
  // hide results

  document.getElementById("results").style.display = "none";
  // show loader
  document.getElementById("loading").style.display = "block";

  setTimeout(calculate, 2000);

  e.preventDefault();
});

function calculate() {
  // UI vars
  const amount = document.querySelector("#amount");
  const interest = document.querySelector("#interest");
  const years = document.querySelector("#years");

  const monthlyPayment = document.querySelector("#monthly-payment");
  const total = document.querySelector("#total-payment");
  const totalInterest = document.querySelector("#total-interest");

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // compute monthly payments
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    total.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);
    document.getElementById("results").style.display = "block";
    document.getElementById("loading").style.display = "none";
  } else {
    // got error
    showError("Please check your numbers");
  }
}

function showError(error) {
  // hide loader and results
  document.getElementById("results").style.display = "none";
  document.getElementById("loading").style.display = "none";
  // create div
  const errorDiv = document.createElement("div");

  // get elements
  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");

  // add class
  errorDiv.className = "alert alert-danger";
  // create textnode and append to div
  errorDiv.appendChild(document.createTextNode(error));
  // insert error above heading

  card.insertBefore(errorDiv, heading);

  // clear error after 3s
  setTimeout(clearError, 3000);
}

// clear error function

function clearError() {
  document.querySelector(".alert").remove();
}
