/**
 * Parameters for property value calculation.
 * @typedef {Object} CalculatorParameters
 * @property {number} [target=0.32] - Target Gross Debt Service (GDS) ratio. Default is 0.32.
 * @property {number} [downpaymentPercentage=0.2] - Downpayment percentage. Default is 0.2.
 * @property {number} [amortizationPeriod=25] - Amortization period in years. Default is 25.
 * @property {number} [paymentFrequency=12] - Payment frequency per year. Default is 12.
 * @property {boolean} [isStressTested=true] - Is the mortgage stress tested? Default is true.
 * @property {number} [precision=1000] - The precision of the final result. Default is 1000.
 * @property {number} interestRate - Annual interest rate as a decimal (e.g., 0.05 for 5%). Required.
 * @property {number} propertyTaxPercentage - Property tax percentage. Required.
 * @property {number} totalIncome - Total annual income. Required.
 */

/**
 * Calculates an affordable property value based on the Gross Debt Service (GDS) ratio target.
 * @param {CalculatorParameters} options - Parameters for property value calculation.
 * @returns {number | null} The calculated property value or null if required parameters are missing.
 */

export function calculator({
  target = 0.32,
  downpaymentPercentage = 0.2,
  amortizationPeriod = 25,
  paymentFrequency = 12,
  isStressTested = true,
  precision = 1000,
  interestRate,
  propertyTaxPercentage,
  totalIncome,
}) {
  if (
    target < 0 ||
    target > 1 ||
    downpaymentPercentage < 0 ||
    downpaymentPercentage > 1 ||
    amortizationPeriod < 0 ||
    amortizationPeriod >= 100 ||
    paymentFrequency < 0 ||
    paymentFrequency > 12 ||
    precision <= 0 ||
    interestRate == null ||
    interestRate < 0 ||
    interestRate >= Number.MAX_SAFE_INTEGER ||
    propertyTaxPercentage == null ||
    propertyTaxPercentage < 0 ||
    propertyTaxPercentage >= Number.MAX_SAFE_INTEGER ||
    totalIncome == null ||
    totalIncome >= Number.MAX_SAFE_INTEGER
  )
    return null;

  if (totalIncome == 0) return 0;

  if (isStressTested && interestRate < 0.0525) {
    interestRate += 0.02;
  } else if (isStressTested) {
    interestRate = 0.0525;
  }

  let monthlyIncome = totalIncome / 12;
  let propertyValue = 0;
  let gds = 0;

  while (gds < target) {
    propertyValue += precision;
    let downpayment = propertyValue * downpaymentPercentage;
    let requestAmount = propertyValue - downpayment;
    let mortgageInsurance = 0;

    if (downpaymentPercentage < 0.1) {
      mortgageInsurance = requestAmount * 0.04;
    } else if (downpaymentPercentage < 0.15) {
      mortgageInsurance = requestAmount * 0.031;
    } else if (downpaymentPercentage < 0.2) {
      mortgageInsurance = requestAmount * 0.028;
    }

    let mortgage = requestAmount + mortgageInsurance;

    let effectiveRate = Math.pow(1 + interestRate / 2, 2) - 1;
    let monthlyPeriodicRate = Math.pow(1 + effectiveRate, 1 / 12) - 1;
    let mortgagePayment =
      (monthlyPeriodicRate * mortgage) /
      (1 - Math.pow(1 + monthlyPeriodicRate, -amortizationPeriod * paymentFrequency));

    let propertyTax = (propertyValue * propertyTaxPercentage) / 12;
    gds = (mortgagePayment + propertyTax) / monthlyIncome;
  }

  return propertyValue;
}
