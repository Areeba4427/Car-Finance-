var flag = 0;
function n(evt) {
  evt = evt ? evt : window.event;
  var charCode = evt.which ? evt.which : evt.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false;
  }

  return true;
}

function addCommasToValue(inputField) {
  let value = inputField.value.replace(/,/g, "");
  value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ","); // add commas to the value
  inputField.value = value;
}

function addCommasToValuetwo(inputField) {
  let value = inputField.replace(/,/g, "");
  value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ","); // add commas to the value
  return value;
}

// document.getElementById('borrowed_amount').addEventListener("input", function() {
//   addCommasToValue(this);
// });

function removecomma(value) {
  value = value.replace(/,/g, ""); //to remove .
  return parseInt(value);
}

function setValue(elementId, value) {
  var element = document.getElementById(elementId);
  if (element) element.value = addCommasToValuetwo(value);
}

function settext(elementId, value) {
  var element = document.getElementById(elementId);
  if (element) element.textContent = addCommasToValuetwo(value);
}

slider1 = document.getElementById("range1");
slider2 = document.getElementById("range2");
slider3 = document.getElementById("range3");
slider4 = document.getElementById("range4");
slider5 = document.getElementById("range5");


function setSliderBackground(slider) {
  var value = ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
  slider.style.background =
    "linear-gradient(to right, #0CBDDC 0%, #0CBDDC " +
    value +
    "%, #ccc " +
    value +
    "%, #ccc 100%)";
}

function setupSlider(slider, targetId, prefix = "", suffix = "") {
  slider.addEventListener("input", function () {
    var value = ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
    slider.style.background =
      "linear-gradient(to right, #0CBDDC 0%, #0CBDDC " +
      value +
      "%, #ccc " +
      value +
      "%, #ccc 100%)";
    setValue(targetId, prefix + slider.value + suffix);

    if (slider == slider1) {
        document.getElementById("borrow").textContent =
          "£" + addCommasToValuetwo(slider.value);
      
    } else if (slider == slider2) {
      document.getElementById("span").textContent = slider.value * 12;
    } else if (slider == slider3){
      document.getElementById("apr").textContent = slider.value + "%";
    }

    calculate();
  });
}

window.onload = function () {
  setSliderBackground(slider1);
  setSliderBackground(slider2);
  setSliderBackground(slider3);
  setSliderBackground(slider4);
  setSliderBackground(slider5);
};

// Usage
setupSlider(slider1, "borrowed_amount", "£");
setupSlider(slider2, "loan_term");
setupSlider(slider3, "Percentage", "", "%");
setupSlider(slider4  , "car_price" , "£");
setupSlider(slider5  , "deposit_price" , "£");


function toggleTab(tabIndex) {
  const tabs = document.getElementsByClassName("tab");

  // Remove active class from all tabs
  for (let i = 0; i < tabs.length; i++) {
    tabs[i].classList.remove("active");
  }

  // Add active class to the clicked tab
  tabs[tabIndex].classList.add("active");

  if (tabIndex == 1) {
    flag = 1;
    // Update the label text and slider properties
    settext("a_b", "Monthly Payment");

    document.getElementById("borrowed_amount").value = "£" + 200;
    var slider = document.querySelector("#range1");
    slider.min = "50";
    slider.max = "1000";
    slider.value = "200";

    var value = ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
    slider.style.background =
      "linear-gradient(to right, #0CBDDC 0%, #0CBDDC " +
      value +
      "%, #ccc " +
      value +
      "%, #ccc 100%)";

    settext("m_r", "Amount you could borrow");
    settext("repayment", "£9,413.07");
    settext("total", "£12,000.00");
    settext("interest", "£2,586.93");
    settext("step", "£10");
    settext("borrow", "£9,413.07");
    settext("month", "£200");
    settext("total_two", "£12,000");
  } 
  
  else {
    flag = 0;
    // Update the label text and slider properties
    settext("a_b", "Amount Borrowed");

    document.getElementById("borrowed_amount").value = "£" + 10000;
    var slider = document.querySelector("#range1");
    slider.min = "1000";
    slider.max = "100000";
    slider.step = "1000";
    slider.value = "10000";

    var value = ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
    slider.style.background =
      "linear-gradient(to right, #0CBDDC 0%, #0CBDDC " +
      value +
      "%, #ccc " +
      value +
      "%, #ccc 100%)";

    settext("m_r", "Monthly repayments");
    settext("repayment", "£212.47");
    settext("total", "£12,748.20");
    settext("interest", "£2,748.20");
    settext("step", "£1000");
    settext("borrow", "£10,000");
    settext("month", "£212.47");
    settext("total_two", "£12,748.20");
  }
}

function calculateMonthlyRepayments(P, r, n) {
  var monthlyInterestRate = r / 100 / 12; // Assuming the interest rate is an annual rate, and we calculate monthly repayments
  var numerator =
    P * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, n);
  var denominator = Math.pow(1 + monthlyInterestRate, n) - 1;
  var monthlyRepayments = numerator / denominator;
  return monthlyRepayments;
}

function calculateLoanDetails(loanTermMonths, apr, monthlyRepayment) {
  // Convert loan term from years to months
  // Convert APR from percentage to decimal
  var monthlyInterestRate = apr / 100 / 12;

  // Calculate loan amount
  var loanAmount =
    (monthlyRepayment / monthlyInterestRate) *
    (1 - 1 / Math.pow(1 + monthlyInterestRate, loanTermMonths));

  // Calculate interest
  var interest = monthlyRepayment * loanTermMonths - loanAmount;

  // Calculate total payment
  var totalPayment = monthlyRepayment * loanTermMonths;
  console.log(
    monthlyInterestRate,
    loanAmount,
    interest,
    totalPayment,
    loanTermMonths
  );
  return {
    loanAmount: loanAmount,
    interest: interest,
    totalPayment: totalPayment,
  };
}

function calculate() {
  // Example usage
  var principal = slider1.value; // Principal amount
  var interestRate = slider3.value; // Interest rate (5%)
  var periods = slider2.value * 12; // Number of periods (months)

  if (flag == 0) {
    var result = calculateMonthlyRepayments(
      principal,
      interestRate,
      periods
    ).toFixed(2);
    var total_repayment = (result * periods).toFixed(2);
    var interest = (total_repayment - principal).toFixed(2);
  } else {
    console.log(principal, interestRate, periods);
    var loanDetails = calculateLoanDetails(periods, interestRate, principal);

    var result = loanDetails.loanAmount.toFixed(2);
    var interest = loanDetails.interest.toFixed(2);
    var total_repayment = loanDetails.totalPayment.toFixed(2);
  }

  settext("repayment", "£" + result);
  if(flag == 1){
    settext("borrow" , "£" + result);
  
  }
  if (flag == 0) {
    settext("month", "£" + result);
  } else {
    settext("month", document.getElementById("borrowed_amount").value);
  }
  settext("total", "£" + total_repayment);
  settext("total_two", "£" + total_repayment);
  settext("interest", "£" + interest);
}



function updateValue(limit, target, slider) {
  // Get the input element and value
  var input = document.getElementById(target);
  var value = input.value.replace(/,/g, '');
  // Check if the first character is "£" and remove it if present
  if (value.charAt(0) === "£") {
    input.value = value.slice(1);
    value = parseFloat(input.value);
  }
  console.log(input.value  , value);

  // Limit the value to a maximum of 70000
  if (value > limit) {
    value = limit;
    input.value = value;
  }

  // Add the "£" symbol to the left of the value
  if (slider == "range1" || slider == 'range4') {
    input.value = "£" + value;
    addCommasToValue(input);
  } 
  else if (slider == "range3") {
    input.value = value + "%";
  }
  // Update the slider position
  var slider = document.getElementById(slider);
  slider.value = value;
  var value = ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
  slider.style.background =
    "linear-gradient(to right, #0CBDDC 0%, #0CBDDC " +
    value +
    "%, #ccc " +
    value +
    "%, #ccc 100%)";

  calculate();
}
