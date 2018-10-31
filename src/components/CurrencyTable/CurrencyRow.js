import React, { Component } from 'react';
import {} from 'react-bootstrap';
import { connect } from 'react-redux';
import '../../css/currencyRow.css';

class CurrencyRow extends Component {
  constructor(props) {
    super(props);
    this.state = {}

  }
  handleOnClick(baseNumber, event){
    this.props.onClickBaseCurrency(baseNumber);
  } 
  render() {
    const { calculatedCurrency } = this.props;
    const style = {
      textAlign: 'center',
    }
    return(
      <tbody>
      {
        calculatedCurrency.map((row, index) => (
          <tr 
            key={index}
            onClick={this.handleOnClick.bind(this, row['baseNumber'])} 
            className='clickeable' 
          >
          
            <td style={style}> {row['baseNumber']} </td>
            <td></td>
            <td style={style}> { row['convertNumber'] } </td>
          </tr>
         ))
        }
        </tbody>
    );
  }
}

const mapStateToProps = state => ({
  calculatedCurrency: state.currency.calculatedCurrency,
});

const mapDispatchToProps = dispatch => ({
});
export default connect(mapStateToProps, mapDispatchToProps)(CurrencyRow);