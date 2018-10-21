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
          <Col xs={12} md={12}>
            <h1 style={styles.title}>Cuckoorrency</h1>
            <Table />
          </Col>
        </Row>
      </Grid>

    );
  }
}

export default App;
