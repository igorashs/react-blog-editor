import React from 'react';
import PropTypes from 'prop-types';

export default function Status(props) {
  return (
    <p className={props.status ? 'Online' : 'Offline'}>
      {props.status ? 'Online' : 'Offline'}
    </p>
  );
}

Status.propTypes = {
  status: PropTypes.bool
};
