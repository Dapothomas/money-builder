// util/investment.js

/**
 * Calculates year-by-year investment growth.
 * Each entry represents the state at the END of that year.
 */
export function calculateInvestmentResults({
  initialInvestment,
  annualInvestment,
  expectedReturn,
  duration,
}) {
  const annualData = [];
  let investmentValue = initialInvestment;

  for (let i = 0; i < duration; i++) {
    const interestEarnedInYear = investmentValue * (expectedReturn / 100);
    investmentValue += interestEarnedInYear + annualInvestment;

    annualData.push({
      year: i + 1,
      interest: interestEarnedInYear,
      valueEndOfYear: investmentValue,
      annualInvestment,
    });
  }

  return annualData;
}

/**
 * Calculates month-by-month investment growth (for the yearly/monthly toggle).
 * The annual contribution is spread evenly across the 12 months,
 * and the annual return is applied as a monthly rate.
 */
export function calculateMonthlyInvestmentResults({
  initialInvestment,
  annualInvestment,
  expectedReturn,
  duration,
}) {
  const monthlyData = [];
  let investmentValue = initialInvestment;
  const monthlyContribution = annualInvestment / 12;
  const monthlyRate = expectedReturn / 100 / 12;

  const totalMonths = duration * 12;

  for (let i = 0; i < totalMonths; i++) {
    const interestEarnedInMonth = investmentValue * monthlyRate;
    investmentValue += interestEarnedInMonth + monthlyContribution;

    monthlyData.push({
      month: i + 1,
      year: Math.floor(i / 12) + 1,
      interest: interestEarnedInMonth,
      valueEndOfMonth: investmentValue,
      monthlyInvestment: monthlyContribution,
    });
  }

  return monthlyData;
}

export const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});
