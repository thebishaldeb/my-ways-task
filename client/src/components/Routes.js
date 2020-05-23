import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Home, Internship, Message, GenericNotFound } from './';

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/page-not-found" component={GenericNotFound} />
      <Route path="/:id" exact component={Internship} />
      <Route path="/:id/:userId" exact component={Message} />
      <Redirect to="/page-not-found" />
    </Switch>
  );
};

export default Routes;
