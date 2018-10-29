import * as actionTypes from '../actions/actionTypes';
import updateObject from './utility';
import { updateCurrency } from '../actions/currency';

const initialState = {
  baseCurrency: [ [10, 20, 30, 40, 50, 60, 70, 80, 90, 100] ],
  transformedCurrency: [[]],
  currencyList: [],
};


const updateCurrencySuccess = (state, action) => updateObject(state, {
  transformedCurrency: [ action.convertedCurrency ],
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
