import { calculator } from "../index.js";

const options = {
  interestRate: 0.0484,
  propertyTaxPercentage: 0.01116213,
  totalIncome: 56000,
};

const propertyValue = calculator(options);

console.log(propertyValue);
