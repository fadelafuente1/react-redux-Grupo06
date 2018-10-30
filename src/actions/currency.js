import * as actionTypes from './actionTypes';
import axios from 'axios';
import _ from 'lodash';


export const updateCurrency = (calculatedCurrency, allCurrencies) => ({
  type: actionTypes.UPDATE_CURRENCY_SUCCESS,
  calculatedCurrency,
  allCurrencies,
});



export const exchangeCurrency = (currency1, currency2, powerOf10thatMoves, InitialbaseNumber) => (dispatch) => {
  axios.get(`https://api.exchangeratesapi.io/latest?base=${currency1}`)
  .then((response) => {
    console.log('success');
    const allCurrencies = Object.keys(response.data.rates);
    const baseExchangeCurrencyAmount = response.data.rates[currency2];
    let calculatedCurrency = [];
    for (let value of _.range(10)) {
      calculatedCurrency.push(calculateCurrency(value, baseExchangeCurrencyAmount,powerOf10thatMoves, InitialbaseNumber));
    }
    calculatedCurrency.map((x,i)=> {
      console.log(x['baseNumber'],i);
      return(x,i);
    })


    dispatch(updateCurrency(calculatedCurrency, allCurrencies));
    
  }).catch(() => {
    console.log('error');
  });

};

const calculateCurrency = (value, baseExchangeCurrencyAmount, powerOf10thatMoves, InitialbaseNumber) => {
  const unit = value;
  const baseNumber = InitialbaseNumber + unit * Math.pow(10, powerOf10thatMoves)
  const convertNumber = (baseNumber*baseExchangeCurrencyAmount).toFixed(2)
  return {baseNumber: baseNumber, convertNumber: convertNumber}
}
