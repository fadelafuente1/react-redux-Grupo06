import * as actionTypes from './actionTypes';
import axios from 'axios';


export const updateCurrency = (convertedCurrency, allCurrencies) => ({
  type: actionTypes.UPDATE_CURRENCY_SUCCESS,
  convertedCurrency,
  allCurrencies,
});



export const exchangeCurrency = (currency1, currency2, powerOf10, powerOf10Unit, baseCurrencyAmountList) => (dispatch) => {
  axios.get(`https://api.exchangeratesapi.io/latest?base=${currency1}`)
  .then((response) => {
    console.log('success');
    const allCurrencies = Object.keys(response.data.rates);
    const baseExchangeCurrencyAmount = response.data.rates[currency2];
    let convertedCurrency = [];
    for (let value of baseCurrencyAmountList) {
      convertedCurrency.push(calculateCurrency(value, baseExchangeCurrencyAmount, powerOf10,powerOf10Unit));
    }
    dispatch(updateCurrency(convertedCurrency, allCurrencies));
    
  }).catch(() => {
    console.log('error');
  });

};

const calculateCurrency = (value, baseExchangeCurrencyAmount, powerOf10, powerOf10Unit) => {
  return((value * baseExchangeCurrencyAmount).toFixed(2))
}
