import * as actionTypes from './actionTypes';
import axios from 'axios';


export const updateCurrency = (convertedCurrency, allCurrencies) => ({
  type: actionTypes.UPDATE_CURRENCY_SUCCESS,
  convertedCurrency,
  allCurrencies,
});



export const exchangeCurrency = (curren1, curren2, baseCurrencyAmountList) => (dispatch) => {
  axios.get(`https://api.exchangeratesapi.io/latest?base=${curren1}`)
  .then((response) => {
    console.log('success');
    console.log(baseCurrencyAmountList);
    const allCurrencies = Object.keys(response.data.rates);
    const baseExchangeCurrencyAmount = response.data.rates[curren2];
    let convertedCurrency = [];
    for (let value of baseCurrencyAmountList) {
      convertedCurrency.push((value * baseExchangeCurrencyAmount).toFixed(2));
    }
    console.log(convertedCurrency);
    dispatch(updateCurrency(convertedCurrency, allCurrencies));
    
  }).catch(() => {
    console.log('error');
  });

};

