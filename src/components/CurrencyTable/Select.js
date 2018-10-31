import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {FormGroup, Button, FormControl, Glyphicon} from 'react-bootstrap';
import Aux from '../../Aux';
import { connect } from 'react-redux';
import '../../css/select.css';

class Select extends Component {
  constructor(props) {
    super(props);

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);

  }
  async handleOnChange(event) {
    const newCurrency = event.target.value;
    this.props.select(newCurrency);
  }
  async handleOnClick(event) {
    this.props.onClickSwap()
  }
  render() {
    const {currencies, buttonVisibility} = this.props
    const currency = this.props.isCurrency1 ? this.props.currency1:this.props.currency2
    const style = {
      visibility: buttonVisibility
    }
    return (
      <FormGroup controlId="formControlsSelect">
        <FormControl
          componentClass="select"
          placeholder="select"
          onChange={this.handleOnChange}
          value={currency}
          className='currency1-form'
        >
        {
          currencies.map((x,i) => (
            <option key={i} value={x}> {x} </option>
          ))
        }
        </FormControl>
        <Button style={style}>
          <Glyphicon glyph="resize-horizontal" onClick={this.handleOnClick} />
      </Button>
    </FormGroup>
    );
  }
}


const mapStateToProps = state => ({
  currencies: state.currency.currencyList,
  currency1: state.currency.currency1,
  currency2: state.currency.currency2,
});

const mapDispatchToProps = dispatch => ({
});
export default connect(mapStateToProps, mapDispatchToProps)(Select);

