import React, { useState } from 'react';
import {
  calculateInvestmentResults,
  calculateMonthlyInvestmentResults,
  formatter,
} from '../util/investment';
import GrowthChart from './GrowthChart';

const OutputData = ({ inputValue }) => {
  const [view, setView] = useState('yearly'); // 'yearly' | 'monthly'

  // Task 5: error handling for invalid input
  if (!inputValue.duration || inputValue.duration <= 0) {
    return <p className="center">Please enter a duration greater than zero.</p>;
  }

  const resultData = calculateInvestmentResults(inputValue);
  const monthlyResultData = calculateMonthlyInvestmentResults(inputValue);

  // Bonus 1: summary totals, taken from the final row of the yearly data
  const lastYear = resultData[resultData.length - 1];
  const totalInterest =
    lastYear.valueEndOfYear -
    inputValue.annualInvestment * lastYear.year -
    inputValue.initialInvestment;
  const totalInvested = lastYear.valueEndOfYear - totalInterest;

  return (
    <section id="output">
      <div className="output-header">
        <div>
          <p className="eyebrow">Projection</p>
          <h2>How your money grows</h2>
        </div>

        {/* Bonus 2: yearly / monthly toggle */}
        <div className="view-toggle" role="tablist" aria-label="Result granularity">
          <button
            role="tab"
            aria-selected={view === 'yearly'}
            className={view === 'yearly' ? 'active' : ''}
            onClick={() => setView('yearly')}
          >
            Yearly
          </button>
          <button
            role="tab"
            aria-selected={view === 'monthly'}
            className={view === 'monthly' ? 'active' : ''}
            onClick={() => setView('monthly')}
          >
            Monthly
          </button>
        </div>
      </div>

      {/* Bonus 3: growth chart */}
      <GrowthChart data={resultData} />

      {view === 'yearly' ? (
        <table id="result">
          <thead>
            <tr>
              <th>Year</th>
              <th>Investment Value</th>
              <th>Interest (Year)</th>
              <th>Total Interest</th>
              <th>Invested Capital</th>
            </tr>
          </thead>
          <tbody>
            {resultData.map((yearData, index) => {
              const yearTotalInterest =
                yearData.valueEndOfYear -
                yearData.annualInvestment * yearData.year -
                inputValue.initialInvestment;
              const yearTotalInvested = yearData.valueEndOfYear - yearTotalInterest;

              // year-over-year growth, shown as a small indicator next to the value
              const previousValue =
                index === 0 ? inputValue.initialInvestment : resultData[index - 1].valueEndOfYear;
              const growthPct =
                ((yearData.valueEndOfYear - previousValue) / previousValue) * 100;

              return (
                <tr key={yearData.year}>
                  <td>{yearData.year}</td>
                  <td>
                    <span className="value-cell">
                      {formatter.format(yearData.valueEndOfYear)}
                      <span className="delta">▲ {growthPct.toFixed(1)}%</span>
                    </span>
                  </td>
                  <td>{formatter.format(yearData.interest)}</td>
                  <td>{formatter.format(yearTotalInterest)}</td>
                  <td>{formatter.format(yearTotalInvested)}</td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3}>Totals</td>
              <td>{formatter.format(totalInterest)}</td>
              <td>{formatter.format(totalInvested)}</td>
            </tr>
          </tfoot>
        </table>
      ) : (
        <table id="result">
          <thead>
            <tr>
              <th>Month</th>
              <th>Year</th>
              <th>Investment Value</th>
              <th>Interest (Month)</th>
            </tr>
          </thead>
          <tbody>
            {monthlyResultData.map((monthData) => (
              <tr key={monthData.month}>
                <td>{monthData.month}</td>
                <td>{monthData.year}</td>
                <td>{formatter.format(monthData.valueEndOfMonth)}</td>
                <td>{formatter.format(monthData.interest)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Bonus 1: summary section */}
      <div className="summary">
        <div className="summary-item">
          <span className="summary-label">Total invested</span>
          <span className="summary-value">{formatter.format(totalInvested)}</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Interest earned</span>
          <span className="summary-value">{formatter.format(totalInterest)}</span>
          <span className="summary-sub">
            {((totalInterest / totalInvested) * 100).toFixed(0)}% on top of what you put in
          </span>
        </div>
        <div className="summary-item highlight">
          <span className="summary-label">Final value</span>
          <span className="summary-value">
            {formatter.format(lastYear.valueEndOfYear)}
          </span>
        </div>
      </div>
    </section>
  );
};

export default OutputData;
