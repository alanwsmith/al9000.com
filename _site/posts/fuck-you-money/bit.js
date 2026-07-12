export const b = {
  init: "initAge",
};

class CompoundInterestCalculator {
  constructor(annualSalary, contributionPercentage, annualReturn) {
    this.annualSalary = annualSalary;
    this.contributionPercentage = contributionPercentage;
    this.annualReturn = annualReturn;
  }

  initialValueForYear(year) {
    if (year <= 1) return 0;
    let total = 0;
    for (let y = 1; y < year; y++) {
      total = (total + this.contributionForYear()) * (1 + this.annualReturn);
    }
    return total;
  }

  contributionForYear() {
    return this.annualSalary * this.contributionPercentage;
  }

  returnForYear(year) {
    return this.initialValueForYear(year) * this.annualReturn;
  }

  cumulativeReturnsForYear(year) {
    return this.cumulativeTotalForYear(year) -
      this.cumulativeContributionsForYear(year);
  }

  cumulativeContributionsForYear(year) {
    return this.contributionForYear() * year;
  }

  cumulativeTotalForYear(year) {
    let total = 0;
    for (let y = 1; y <= year; y++) {
      total = (total + this.contributionForYear()) * (1 + this.annualReturn);
    }
    return total;
  }
}

const values = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  12,
  14,
  16,
  18,
  20,
  25,
  30,
  35,
  40,
  45,
  50,
  60,
  70,
  80,
  90,
  100,
];

export function age(_, sender, el) {
  el.innerHTML = sender.value;
  b.trigger("update");
}

export function contribution(_, sender, el) {
  el.innerHTML = `${sender.value}%`;
  b.trigger("update");
}

export function initAge(_, __, el) {
  el.value = 1;
  b.forwardSender(el, "age");
  b.trigger("initIncome");
}

export function initContribution(_, __, el) {
  el.value = 3;
  b.forwardSender(el, "contribution");
  b.trigger("initYearlyReturn");
}

export function initOutput(_, __, el) {
  el.replaceChildren(b.render(initRows()));
}

export function initIncome(_, __, el) {
  el.value = 0;
  b.forwardSender(el, "income");
  b.trigger("initContribution");
}

function initRows() {
  const years = [];
  for (let year = 1; year <= 50; year++) {
    years.push(`<div data-key="${year}" data-r="year">x</div>`);
  }
  return years;
}

export function initYearlyReturn(_, __, el) {
  el.value = 9;
  b.forwardSender({ value: 9 }, "yearlyReturn");
}

export function income(_, sender, el) {
  const value = values[sender.valueAsInt()] * 10000;
  el.innerHTML = `$${formatNumber(value)}`;
  b.trigger("update");
}

export function totalContribution(year) {
  const income = values[parseInt(b.qs("[data-s~=income]").value)];
  const contribution = parseInt(b.qs("[data-s~=contribution]").value);
  return (income * 10000) * (contribution / 100) * year;
}

export function update(_, __, el) {
  const startAge = parseInt(b.qs("[data-s~=age]").value);
  const annualIncome = values[parseInt(b.qs("[data-s~=income]").value)];
  const contributionPct = parseInt(b.qs("[data-s~=contribution]").value);
  const annualContribution = annualIncome * contributionPct * 100;
  const annualReturn = parseInt(b.qs("[data-s~=yearlyReturn]").value);

  const cic = new CompoundInterestCalculator(
    10000,
    .03,
    .09,
  );

  //constructor(annualSalary, contributionPercentage, annualReturn) {

  const rows = [];
  for (let year = 0; year <= 100 - startAge; year++) {
    rows.push(b.render("row", {
      __AGE__: year + startAge,
      // __INITIAL__: "x",
      __INITIAL__: cic.initialValueForYear(year + 1),
      __CONTRIBUTED__: formatNumber(totalContribution(year + 1)),
      //   __CONTRIBUTED__: formatNumber(totalContribution(year + 1)),
      __RETURN__: formatNumber(
        returnForYear(0, annualReturn, year + 1, annualContribution),
      ),
      __TOTAL__: formatNumber(
        totalForYear(0, annualContribution, annualReturn, year + 1),
      ),
    }));
  }
  el.replaceChildren(b.render(rows));
}

export function yearlyReturn(_, sender, el) {
  el.innerHTML = `${sender.value}%`;
  b.trigger("update");
}

function returnForYear(
  initialAmount,
  annualReturn,
  yearNumber,
  annualContribution,
) {
  const rate = annualReturn / 100;
  const valueAtEnd = (year) => {
    let total = initialAmount;
    for (let i = 1; i <= year; i++) {
      total = (total + annualContribution) * (1 + rate);
    }
    return total;
  };
  return valueAtEnd(yearNumber) - valueAtEnd(yearNumber - 1) -
    annualContribution;
}

function totalForYear(
  initialAmount,
  yearlyContribution,
  interestRate,
  yearNumber,
) {
  const rate = interestRate / 100;
  let total = initialAmount;
  for (let i = 1; i <= yearNumber; i++) {
    total = (total + yearlyContribution) * (1 + rate);
  }
  return total;
}

// function returnForYear(initialAmount, annualReturn, yearNumber) {
//   const valueAtYear = initialAmount *
//     Math.pow(1 + annualReturn / 100, yearNumber);
//   const valueAtPreviousYear = initialAmount *
//     Math.pow(1 + annualReturn / 100, yearNumber - 1);
//   return valueAtYear - valueAtPreviousYear;
// }

// function yearlyReturns(salaryPercent, yearlyReturnPercent, years) {
//   const contribution = salaryPercent / 100;
//   const rate = yearlyReturnPercent / 100;
//   const results = [];
//   let total = 0;
//   for (let year = 1; year <= years; year++) {
//     total += contribution;
//     const yearReturn = total * rate;
//     results.push(parseFloat((yearReturn * 100).toFixed(4)));
//     total += yearReturn;
//   }
//   return results;
// }

function formatNumber(amount) {
  return new Intl.NumberFormat("en-US")
    .format(amount);
}

// function toLogValue(position) {
//   const minVal = Math.log(1);
//   const maxVal = Math.log(1000);
//   const scale = (maxVal - minVal) / 50;
//   return doRounding(Math.round(Math.exp(minVal + scale * position)));
// }

// function doRounding(value) {
//   const round = 10;
//   return Math.round(value / round) * round;
// }