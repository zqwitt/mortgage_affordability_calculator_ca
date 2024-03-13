import { calculator } from "../calculator.js";

describe("affordableRealEstatePropertyValue", () => {
  it("should return null if any required parameter is missing", () => {
    expect(calculator({})).toBeNull();
    expect(calculator({ totalIncome: 60000 })).toBeNull();
    expect(calculator({ interestRate: 0.03 })).toBeNull();
    expect(calculator({ propertyTaxPercentage: 0.01 })).toBeNull();
  });

  it("should calculate affordable property value correctly", () => {
    const options = {
      interestRate: 0.03,
      propertyTaxPercentage: 0.01,
      totalIncome: 60000,
    };
    expect(calculator(options)).toBe(292000);
  });

  it("should handle minimum income", () => {
    const options = {
      interestRate: 0.03,
      propertyTaxPercentage: 0.01,
      totalIncome: 0, // Minimum income
    };
    expect(calculator(options)).toBe(0);
  });

  it("should handle maximum income", () => {
    const options = {
      interestRate: 0.03,
      propertyTaxPercentage: 0.01,
      totalIncome: Number.POSITIVE_INFINITY, // Maximum income
    };
    expect(calculator(options)).toBeNull();
  });

  it("should handle minimum interest rate", () => {
    const options = {
      interestRate: 0, // Minimum interest rate
      propertyTaxPercentage: 0.01,
      totalIncome: 60000,
    };

    expect(calculator(options)).toBe(380000);
  });

  it("should handle maximum interest rate", () => {
    const options = {
      interestRate: 1, // Maximum interest rate
      propertyTaxPercentage: 0.01,
      totalIncome: 60000,
    };
    expect(calculator(options)).toBe(286000);
  });

  it("should handle minimum property tax percentage", () => {
    const options = {
      interestRate: 0.03,
      propertyTaxPercentage: 0, // Minimum property tax percentage
      totalIncome: 60000,
    };
    expect(calculator(options)).toBe(344000);
  });

  it("should handle maximum property tax percentage", () => {
    const options = {
      interestRate: 0.03,
      propertyTaxPercentage: 1, // Maximum property tax percentage
      totalIncome: 60000,
    };
    expect(calculator(options)).toBe(19000);
  });

  it("should handle zero downpayment percentage", () => {
    const options = {
      interestRate: 0.03,
      propertyTaxPercentage: 0.01,
      totalIncome: 60000,
      downpaymentPercentage: 0,
    };
    expect(calculator(options)).toBe(233000);
  });

  it("should handle maximum downpayment percentage", () => {
    const options = {
      interestRate: 0.03,
      propertyTaxPercentage: 0.01,
      totalIncome: 60000,
      downpaymentPercentage: 1,
    };
    expect(calculator(options)).toBe(1920000);
  });

  it("should handle maximum amortization period", () => {
    const options = {
      interestRate: 0.03,
      propertyTaxPercentage: 0.01,
      totalIncome: 60000,
      amortizationPeriod: Number.MAX_SAFE_INTEGER,
    };
    expect(calculator(options)).toBeNull();
  });
});
