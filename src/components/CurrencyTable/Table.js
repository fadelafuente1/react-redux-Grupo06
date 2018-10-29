import React, { Component } from 'react';
import { Table, FormGroup, FormControl, ControlLabel, option } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';

class CurrencyTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currency1: 'USD',
      currency2: 'EUR',
      currentPage: 0,
      powerOf10: 1, 
      powerOf10Unit:1,
    };
    this.firstSelect = this.firstSelect.bind(this);
    this.secondSelect = this.secondSelect.bind(this);
  }
  

  componentDidMount() {
    const { currency1, currency2, currentPage, powerOf10, powerOf10Unit } = this.state;
    const { baseCurrency } = this.props;
    this.props.updateCurrency(currency1, currency2, powerOf10, powerOf10Unit, baseCurrency[currentPage]);
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
  async onClickBaseCurrency(index, event) {
    const nextUnit = index +1;
    await this.setState({
      powerOf10: this.state.powerOf10+1,
      powerOf10Unit: nextUnit
    })
    this.updateCurrency();
  }

  updateCurrency = () => {
    const { baseCurrency } = this.props;
    this.props.updateCurrency(
      this.state.currency1,
      this.state.currency2,
      this.state.powerOf10,
      this.state.powerOf10Unit,
      baseCurrency[this.state.currentPage]
    );

  }


  render() {
    const { currency1, currency2, currentPage } = this.state;
    const { baseCurrency, transCurrency, currencies } = this.props;
    
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
             baseCurrency[currentPage].map((x, index) => (
              <tr 
              key={index}
              onClick={this.onClickBaseCurrency.bind(this, index)} >
                <td > {x} </td>
                <td> { transCurrency[currentPage][index] } </td>
              </tr>
            ))
          }

        </tbody>
      </Table>
    );
  }
}


const mapStateToProps = state => ({
  baseCurrency: state.currency.baseCurrency,
  transCurrency: state.currency.transformedCurrency,
  currencies: state.currency.currencyList,
});

const mapDispatchToProps = dispatch => ({
  updateCurrency: (baseCurrency, transCurrency, powerOf10, powerOf10Unit, currenList) => dispatch(actions.exchangeCurrency(baseCurrency, transCurrency,powerOf10, powerOf10Unit, currenList)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyTable);
