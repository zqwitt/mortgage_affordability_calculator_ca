# Property Value Calculator

This JavaScript function calculates an affordable property value based on the Gross Debt Service (GDS) ratio target. It helps determine how much property one can afford based on various financial parameters.

## Installation

```bash
npm install mortgage_affordability_calculator_ca
```

## Usage

```javascript
import { calculator } from "mortgage_affordability_calculator_ca";

const options = {
  interestRate: 0.05, // Annual interest rate as a decimal (required)
  propertyTaxPercentage: 0.01, // Property tax percentage (required)
  totalIncome: 60000, // Total annual income (required)
};

const propertyValue = calculator(options);
console.log(propertyValue); // Output: Calculated property value
```

## Parameters

| Name                  | Description                                                           | Default Value |
| --------------------- | --------------------------------------------------------------------- | ------------- |
| target                | Target Gross Debt Service (GDS) ratio.                                | 0.32          |
| downpaymentPercentage | Downpayment percentage.                                               | 0.2           |
| amortizationPeriod    | Amortization period in years.                                         | 25            |
| paymentFrequency      | Payment frequency per year.                                           | 12            |
| isStressTested        | Whether the mortgage is stress tested.                                | true          |
| precision             | Precision of the final result.                                        | 1000          |
| interestRate          | Annual interest rate as a decimal (e.g., 0.05 for 5%). **(Required)** |               |
| propertyTaxPercentage | Property tax percentage. **(Required)**                               |               |
| totalIncome           | Total annual income. **(Required)**                                   |               |
