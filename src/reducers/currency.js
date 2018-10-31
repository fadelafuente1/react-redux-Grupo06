import * as actionTypes from '../actions/actionTypes';
import updateObject from './utility';
import { updateCurrency } from '../actions/currency';

const initialState = {
  calculatedCurrency: [],
  currencyList: [],
  currency1: 'USD',
  currency2: 'EUR',
};


const updateCurrencySuccess = (state, action) => updateObject(state, {
  calculatedCurrency: action.calculatedCurrency,
  currencyList: action.allCurrencies,
});

const updateCurrencySelects = (state, action) => updateObject(state, {
  currency1: action.currency1,
  currency2: action.currency2,
})



const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_CURRENCY_SUCCESS: 
      return updateCurrencySuccess(state, action);
    case actionTypes.UPDATE_CURRENCY_SELECTS:
      return updateCurrencySelects(state, action);
    default:
      return state;
  }
};

export default reducer;
