import React, { Component } from 'react';
import { Table, FormGroup, FormControl, ControlLabel, option } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';

class CurrencyTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialBaseNumber: 30000,
      currency1: 'USD',
      currency2: 'EUR',
      powerOf10thatMoves:3,
    };
    this.firstSelect = this.firstSelect.bind(this);
    this.secondSelect = this.secondSelect.bind(this);
  }
  

  componentDidMount() {
    this.updateCurrency();
  }

  async firstSelect(e) {
    const newCurrency = e.target.value;
    await this.setState({ currency1: newCurrency });
    console.log(this.state.currency2);
    this.updateCurrency();
  }

  async secondSelect(e) {
    const newCurrency = e.target.value;
    await this.setState({ currency2: newCurrency });
    console.log(this.state.currency2);
    this.updateCurrency();
    
  }
  async onClickBaseCurrency(index, baseNumber, event) {
    const nextUnit = this.state.powerOf10thatMoves-1
    await this.setState({
      powerOf10thatMoves: nextUnit,
      initialBaseNumber: baseNumber
    })
    this.updateCurrency();
  }

  updateCurrency = () => {
    this.props.updateCurrency(
      this.state.currency1,
      this.state.currency2,
      this.state.powerOf10thatMoves,
      this.state.initialBaseNumber
    );  
  }


  render() {
    const { currency1, currency2, currentPage } = this.state;
    const { calculatedCurrency, currencies } = this.props;
    
    return (
      <Table responsive>
        <thead>
          <tr>
            <th>
              <FormGroup controlId="formControlsSelect">
                <FormControl
                  componentClass="select"
                  placeholder="select"
                  onChange={this.firstSelect}
                  value={currency1}
                >
                 {
                   currencies.map((x,i) => (
                     <option key={i} value={x}> {x} </option>
                   ))
                 } 
                </FormControl>
              </FormGroup>
            </th>
            <th>
              <FormGroup controlId="formControlsSelect">
                <FormControl 
                  componentClass="select"
                  placeholder="select"
                  onChange={this.secondSelect}
                  value={currency2}
                >
                  {
                    currencies.map((x,i) => (
                      <option key={i} value={x}> {x} </option>
                    ))
                  }
                </FormControl>
              </FormGroup>
            </th>
          </tr>
        </thead>
        <tbody>
          {
             calculatedCurrency.map((row, index) => (
              <tr 
              key={index}
              onClick={this.onClickBaseCurrency.bind(this, index, row['baseNumber'])} >
                <td > {row['baseNumber']} </td>
                <td> { row['convertNumber'] } </td>
              </tr>
            ))
          }

        </tbody>
      </Table>
    );
  }
}


const mapStateToProps = state => ({
  calculatedCurrency: state.currency.calculatedCurrency,
  currencies: state.currency.currencyList,
});

const mapDispatchToProps = dispatch => ({
  updateCurrency: (baseCurrency, transCurrency, powerOf10thatMoves, InitialbaseNumber) => dispatch(actions.exchangeCurrency(baseCurrency, transCurrency, powerOf10thatMoves, InitialbaseNumber)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyTable);
