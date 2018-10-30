import * as actionTypes from '../actions/actionTypes';
import updateObject from './utility';
import { updateCurrency } from '../actions/currency';

const initialState = {
  calculatedCurrency: [],
  currencyList: [],
};


const updateCurrencySuccess = (state, action) => updateObject(state, {
  calculatedCurrency: action.calculatedCurrency,
  currencyList: action.allCurrencies,
});



const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_CURRENCY_SUCCESS: 
      return updateCurrencySuccess(state, action);

    default:
      return state;
  }
};

export default reducer;
