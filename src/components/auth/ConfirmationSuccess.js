import React, { useEffect, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Requestor from '../Requestor';

const config = {
  'Content-Type': 'application/json'
};

const ConfirmationSuccess = token => {
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    confirmEmail();
  }, [confirmed]);

  const confirmEmail = async () => {
    await Requestor.put('/users/confirmation', config, token)
    .then(setConfirmed(true))
    .catch(() => setConfirmed(false));
  };

  const success = (
    <Fragment>
      <h1>Successfully confirmed your email! Please login.</h1>
      <Button color='inherit' component={Link} to='/'>
        Go to Login page
      </Button>
    </Fragment>
  );

  const fail = <h1>Failed to confirme your email.</h1>;

  return <div>{confirmed ? success : fail}</div>;
};

export default ConfirmationSuccess;
