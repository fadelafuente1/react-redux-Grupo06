import React, { Component } from 'react';
import { Table, Button, Grid, Row, Col} from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';
import '../../css/table.css';
import Select from './Select';

class CurrencyTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialBaseNumber: 10,
      currency1: props.currency1,
      currency2: props.currency2,
      powerOf10thatMoves:1,
    };
    this.firstSelect = this.firstSelect.bind(this);
    this.secondSelect = this.secondSelect.bind(this);
    this.onClickReduce = this.onClickReduce.bind(this);
    this.onClickIncrease = this.onClickIncrease.bind(this);
    this.onClickSwap = this.onClickSwap.bind(this);
  }
  

  componentDidMount() {
    this.updateCurrency();
  }

  async firstSelect(newCurrency) {
    await this.setState({ currency1: newCurrency });
    this.updateCurrency();
  }

  async secondSelect(newCurrency) {
    await this.setState({ currency2: newCurrency });
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

  async onClickIncrease(event) {
    const newBaseNumber = this.state.initialBaseNumber*10;
    const newPowerOf10thatMoves = this.state.powerOf10thatMoves+1
    await this.changeBaseNumber(newBaseNumber, newPowerOf10thatMoves);
    this.updateCurrency();
  }
  async onClickReduce(event) {
    const newBaseNumber = this.state.initialBaseNumber/10;
    const newPowerOf10thatMoves = this.state.powerOf10thatMoves-1
    await this.changeBaseNumber(newBaseNumber, newPowerOf10thatMoves);
    this.updateCurrency();
  }
  async changeBaseNumber(newBaseNumber, newPowerOf10thatMoves) {
    return await this.setState({ 
      initialBaseNumber: newBaseNumber,
      powerOf10thatMoves: newPowerOf10thatMoves});
  }
  async onClickSwap(event) {
    await this.setState({ 
      currency1: this.state.currency2,
      currency2: this.state.currency1,
     });

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
    const { calculatedCurrency, currencies, currency1, currency2 } = this.props;
    const thStyle = {
      width: '50%',
    }
    const _this = this;
    return (
      <div>
        <Table responsive>
          <thead>
            <tr>
              <th style={thStyle}>
                <Select currencies={currencies} 
                  isCurrency1={true} 
                  select={_this.firstSelect} 
                  buttonVisibility='visible'
                  onClickSwap={_this.onClickSwap}
                  ></Select>
              </th>
              <th>
              <Select currencies={currencies} 
                  isCurrency1={false} 
                  select={_this.secondSelect} 
                  buttonVisibility='hidden'
                  onClickSwap={_this.onClickSwap}
                  ></Select>
              </th>
            </tr>
          </thead>
          <tbody>
            {
              calculatedCurrency.map((row, index) => (
                <tr 
                key={index}
                onClick={this.onClickBaseCurrency.bind(this, index, row['baseNumber'])} 
                className='clickeable' >
                
                  <td > {row['baseNumber']} </td>
                  <td> { row['convertNumber'] } </td>
                </tr>
              ))
            }

          </tbody>
        </Table>
        <Grid>
          <Row className="show-grid">
            <Col xs={6} md={4}>
              <Button bsStyle="danger" onClick={this.onClickReduce}>Reducir</Button>
            </Col>
            <Col xs={6} md={4}>
              <Button bsStyle="success" onClick={this.onClickIncrease}>Aumentar</Button>      
            </Col>
          </Row>
        </Grid>
      </div>
      
    );
  }
}


const mapStateToProps = state => ({
  calculatedCurrency: state.currency.calculatedCurrency,
  currencies: state.currency.currencyList,
  currency1: state.currency.currency1,
  currency2: state.currency.currency2,
});

const mapDispatchToProps = dispatch => ({
  updateCurrency: (baseCurrency, transCurrency, powerOf10thatMoves, InitialbaseNumber) => dispatch(actions.exchangeCurrency(baseCurrency, transCurrency, powerOf10thatMoves, InitialbaseNumber)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyTable);
