import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Table from './components/CurrencyTable/Table';

const styles = {
  title: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
};

class App extends Component {
  render() {
    return (
      <Grid>
        <Row className="show-grid">
          <Col mdOffset={3} xs={12} md={6}>
            <h1 style={styles.title}>Cuckoorrency</h1>
            <Table />
          </Col>
        </Row>
      </Grid>

    );
  }
}

export default App;
