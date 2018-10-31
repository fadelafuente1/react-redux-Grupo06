import React, { Component } from 'react';
import { Table, Button, Grid, Row, Col, Glyphicon} from 'react-bootstrap';
import { connect } from 'react-redux';
import Swipeable from 'react-swipeable'
import { Responsive, Segment } from 'semantic-ui-react'
import * as actions from '../../actions/index';
import '../../css/table.css';
import Select from './Select';
import CurrencyRow from './CurrencyRow';
import Larrow from '../../imgs/larrow.png';
import Rarrow from '../../imgs/rarrow.png';

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
    this.onClickBaseCurrency = this.onClickBaseCurrency.bind(this);
    this.swipingLeft = this.swipingLeft.bind(this);
    this.swipingRight = this.swipingRight.bind(this);
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
  async onClickBaseCurrency(baseNumber) {
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

  swipingLeft(e, absX) {
    console.log("You're Swiping to the Left...", e, absX);
    this.onClickIncrease();
  }
  
  swipingRight(e, absY) {
    console.log("You're Swiping to the Left...", e, absY);
    this.onClickReduce();
  }


  render() {
    const { calculatedCurrency } = this.props;
    const thStyle = {
      width: '76px',
    }
    const colStyle = {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    }
    const flexBox = {
      display: 'flex',
      justifyContent: 'space-between',
    }
    const imgSize = { width: '15%', height: '15%' };
    const btnStyle = { marginTop: '-48px' };

    const _this = this;
    return (
      <div>
      <Table responsive>
        <thead>
          <tr>
            <th>
              <Select isCurrency1={true} 
                select={_this.firstSelect} 
                buttonVisibility='visible'
                onClickSwap={_this.onClickSwap}
                >
              </Select>
            </th>
            <th style={thStyle}>
              <Button style={btnStyle}>
                <Glyphicon glyph="resize-horizontal" onClick={_this.onClickSwap} />
              </Button>
            </th>
            <th>
            <Select isCurrency1={false} 
                select={_this.secondSelect} 
                buttonVisibility='hidden'
                onClickSwap={_this.onClickSwap}
            >
            </Select>
            </th>
          </tr>
        </thead>
        <CurrencyRow onClickBaseCurrency={_this.onClickBaseCurrency}></CurrencyRow>
      </Table>
      <Swipeable
        onSwipedLeft={this.swipingRight}
        onSwipedRight={this.swipingLeft}
      >
        <Segment.Group>
          <Responsive style={flexBox} as={Segment} {...Responsive.onlyMobile}>
            <img src={Larrow} style={imgSize} alt="" />
            <img src={Rarrow} style={imgSize} alt="" />
          </Responsive>
          <Responsive as={Segment} {...Responsive.onlyComputer}>
            <Grid>
              <Row className="show-grid">
                <Col xs={6} md={3} style={colStyle}>
                  <Button bsStyle="danger" onClick={this.onClickReduce}>Reducir</Button>
                </Col>
                <Col xs={6} md={3} style={colStyle}> 
                  <Button bsStyle="success" onClick={this.onClickIncrease}>Aumentar</Button>      
                </Col>
              </Row>
            </Grid>
          </Responsive>
        </Segment.Group>
      </Swipeable>

      </div>
      
    );
  }
}


const mapStateToProps = state => ({
  currency1: state.currency.currency1,
  currency2: state.currency.currency2,
});

const mapDispatchToProps = dispatch => ({
  updateCurrency: (baseCurrency, transCurrency, powerOf10thatMoves, InitialbaseNumber) => dispatch(actions.exchangeCurrency(baseCurrency, transCurrency, powerOf10thatMoves, InitialbaseNumber)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyTable);
