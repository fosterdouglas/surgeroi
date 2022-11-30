const annualRevenueEle = document.getElementById("annualRevenue");
let annualRevenue = 0;
annualRevenueEle.addEventListener("keyup", annualRevenueUpdate);

const activeUsersEle = document.getElementById("activeUsers");
let activeUsers = 0;
activeUsersEle.addEventListener("keyup", activeUsersUpdate);

const activeVipsEle = document.getElementById("activeVips");
let activeVips = 0;
activeVipsEle.addEventListener("keyup", activeVipsUpdate);

const attributableRevEle = document.getElementById("attributableRev");
let attributableRev = 0;
attributableRevEle.addEventListener("keyup", attributableRevUpdate);

const accountManagersEle = document.getElementById("accountManagers");
let accountManagers = 0;

let holdoutPercentage = 0.8;
let averageLift = 0.06;

const attributableRevRangeEle = document.getElementById("attributableRevRange");
let attributableRevRange = 0;
attributableRevRangeEle.addEventListener("onchange", attributableRevUpdate);

const resultValue = document.getElementById("resultValue");

const falseEles = document.getElementsByClassName("loyaltyFalse");
const trueEles = document.getElementsByClassName("loyaltyTrue");
let loyaltyProgram = null;

function annualRevenueUpdate(e) {
  annualRevenue = e.target.value;

  attributableRevUpdate(attributableRev);

  calculateRoi();
}

function activeUsersUpdate(e) {
  if (e.target) {
    activeUsers = e.target.value;
    activeUsersEle.value = e.target.value;
  } else {
    activeUsers = e;
    activeUsersEle.value = e;
  }

  activeVips = activeUsers * 0.05;
  activeVipsUpdate(Math.floor(activeVips));

  calculateRoi();
}

function activeVipsUpdate(e) {
  if (e.target) {
    activeVips = e.target.value;
    activeVipsEle.value = e.target.value;
  } else {
    activeVips = e;
    activeVipsEle.value = e;
  }

  accountManagers = activeVips / 25000;
  accountManagersUpdate(accountManagers);

  calculateRoi();
}

function attributableRevUpdate(e) {
  if (e.target) {
    const val = Math.ceil(e.target.value);
    attributableRev = val;
    attributableRevEle.value = val;
    attributableRevRange = val;
    attributableRevRangeEle.value = val;
  } else {
    const val = Math.ceil(e);
    attributableRev = val;
    attributableRevEle.value = val;
    attributableRevRange = val;
    attributableRevRangeEle.value = val;
  }

  calculateRoi();
}

function accountManagersUpdate(e) {
  if (e.target) {
    const val = Math.ceil(e.target.value);
    accountManagers = val;
    accountManagersEle.textContent = val;
  } else {
    const val = Math.ceil(e);
    accountManagers = val;
    accountManagersEle.textContent = val;
  }
}

function calculateRoi() {
  if (loyaltyProgram === true) {
    averageLift = 0.03;
  } else {
    averageLift = 0.06;
  }

  //console.log(annualRevenue, attributableRev, holdoutPercentage, averageLift);

  num =
    annualRevenue * (attributableRev / 100) * holdoutPercentage * averageLift;

  resultValue.textContent = Math.floor(num).toLocaleString();
}

// Show loyalty "yes" follow-up questions
function loyaltyTrueQuestions() {
  for (let i = 0; i < falseEles.length; i++) {
    falseEles[i].classList.remove("d-flex");
    falseEles[i].classList.add("d-none");
  }

  for (let i = 0; i < trueEles.length; i++) {
    trueEles[i].classList.remove("d-none");
    trueEles[i].classList.add("d-flex");
  }

  loyaltyProgram = true;
  calculateRoi();
}

// Show loyalty "no" follow-up questions
function loyaltyFalseQuestions() {
  for (let i = 0; i < trueEles.length; i++) {
    trueEles[i].classList.remove("d-flex");
    trueEles[i].classList.add("d-none");
  }

  for (let i = 0; i < falseEles.length; i++) {
    falseEles[i].classList.remove("d-none");
    falseEles[i].classList.add("d-flex");
  }

  loyaltyProgram = false;
  calculateRoi();
}

calculateRoi();
attributableRevUpdate(attributableRevRangeEle.value);
