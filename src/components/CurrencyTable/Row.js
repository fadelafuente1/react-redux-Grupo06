import React from 'react';
import PropTypes from 'prop-types';
import {} from 'react-bootstrap';
import Aux from '../../Aux';

const Row = (props) => {
  const { rowData } = props;
  return (
    <Aux>
      <td>
        {' '}
        { rowData.currency }
        {' '}
      </td>
      <td>
        {' '}
        { rowData.transformedCurrency }
        {' '}
      </td>
    </Aux>
  );
};


Row.propTypes = {
  rowData: PropTypes.object.isRequired,
};


export default Row;
