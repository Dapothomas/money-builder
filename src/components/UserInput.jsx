import React from 'react';

const UserInput = ({ userInput, onInputChange }) => {
  return (
    <div className="user-input">
      <p>
        <label htmlFor="initial-investment">Initial investment</label>
        <input
          id="initial-investment"
          type="number"
          value={userInput.initialInvestment}
          onChange={(e) => onInputChange('initialInvestment', e.target.value)}
        />
      </p>
      <p>
        <label htmlFor="annual-investment">Annual investment</label>
        <input
          id="annual-investment"
          type="number"
          value={userInput.annualInvestment}
          onChange={(e) => onInputChange('annualInvestment', e.target.value)}
        />
      </p>
      <p>
        <label htmlFor="expected-return">Expected return (%)</label>
        <input
          id="expected-return"
          type="number"
          value={userInput.expectedReturn}
          onChange={(e) => onInputChange('expectedReturn', e.target.value)}
        />
      </p>
      <p>
        <label htmlFor="duration">Duration (years)</label>
        <input
          id="duration"
          type="number"
          value={userInput.duration}
          onChange={(e) => onInputChange('duration', e.target.value)}
        />
      </p>
    </div>
  );
};

export default UserInput;
