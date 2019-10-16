import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadUser } from '../../actions/authAction';

const Home = ({ auth, loadUser }) => {
  useEffect(() => {
    loadUser();
    // eslint-diable-next-line
  }, []);

  return (
    <Fragment>
      <h1>Welcome to CIP Study Abroad App</h1>
      <p>App to interact with past study abroad data</p>
    </Fragment>
  );
};

Home.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { loadUser }
)(Home);
