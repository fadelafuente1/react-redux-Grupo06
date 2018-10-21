import * as actionTypes from './actionTypes';
import axios from 'axios';


export const updateCurrency = (convertedCurrency, allCurrencies) => ({
  type: actionTypes.UPDATE_CURRENCY_SUCCESS,
  convertedCurrency,
  allCurrencies,
});



export const exchangeCurrency = (curren1, curren2, currenList) => (dispatch) => {
  axios.get(`https://api.exchangeratesapi.io/latest?base=${curren1}`)
  .then((response) => {
    console.log('success');
    
    const allCurrencies = Object.keys(response.data.rates);
    const baseCurrency = response.data.rates[curren2];
    if (!allCurrencies.includes("USD")){
      allCurrencies.push("USD");
    }
    let convertedCurrency = [];
    for (let value of currenList) {
      convertedCurrency.push((value * baseCurrency).toFixed(2));
    }
    console.log(convertedCurrency);
    dispatch(updateCurrency(convertedCurrency, allCurrencies));
    
  }).catch(() => {
    console.log('error');
  });

};

