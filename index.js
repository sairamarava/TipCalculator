// Tip Calculator Script with Validation
document.addEventListener("DOMContentLoaded", () => {
  const billInput = document.getElementById("bill");
  const serviceSelect = document.getElementById("service");
  const peopleInput = document.getElementById("people");
  const calcBtn = document.getElementById("calcBtn");

  const billHelp = document.getElementById("billHelp");
  const peopleHelp = document.getElementById("peopleHelp");

  const tipPerPersonEl = document.getElementById("tipPerPerson");
  const tipAmountEl = document.getElementById("tipAmount");
  const totalPerPersonEl = document.getElementById("totalPerPerson");
  const shareAmountEl = document.getElementById("shareAmount");

  // Map service rating (1–10) to tip percentage
  const tipPercentages = {
    1: 0.05, 2: 0.07, 3: 0.09, 4: 0.10, 5: 0.12,
    6: 0.14, 7: 0.16, 8: 0.18, 9: 0.20, 10: 0.25
  };

  function formatCurrency(value) {
    return `₹${value.toFixed(2)}`;
  }

  function validateInputs() {
    let isValid = true;

    // Validate bill
    const bill = parseFloat(billInput.value);
    if (isNaN(bill) || bill <= 0) {
      billHelp.textContent = "Please enter a valid bill amount greater than 0.";
      isValid = false;
    } else {
      billHelp.textContent = "";
    }

    // Validate people
    const people = parseInt(peopleInput.value, 10);
    if (isNaN(people) || people <= 0) {
      peopleHelp.textContent = "Number of people must be a positive integer.";
      isValid = false;
    } else {
      peopleHelp.textContent = "";
    }

    return isValid;
  }

  function calculateTip() {
    if (!validateInputs()) return;

    const bill = parseFloat(billInput.value);
    const serviceRating = parseInt(serviceSelect.value, 10);
    const people = parseInt(peopleInput.value, 10);

    const tipRate = tipPercentages[serviceRating] || 0.15; // default 15%
    const totalTip = bill * tipRate;
    const tipPerPerson = totalTip / people;
    const totalPerPerson = (bill + totalTip) / people;

    // Update UI
    tipPerPersonEl.textContent = formatCurrency(tipPerPerson);
    tipAmountEl.value = Math.floor(totalTip);
    totalPerPersonEl.textContent = formatCurrency(totalPerPerson);
    shareAmountEl.value = Math.floor(totalPerPerson);
  }

  calcBtn.addEventListener("click", calculateTip);

  // Optional: live validation feedback
  billInput.addEventListener("input", validateInputs);
  peopleInput.addEventListener("input", validateInputs);
});
