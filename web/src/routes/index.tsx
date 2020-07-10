import React from 'react';
import { Switch } from 'react-router-dom';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import DashboardCreate from '../pages/Dashboard/Create';
import Dashboard from '../pages/Dashboard';
import Route from './Route';
import Establishment from '../pages/Establishment';
import EstablishmentCreate from '../pages/Establishment/Create';
import UpdateEstablishment from '../pages/Establishment/Update';
import Vehicle from '../pages/Vehicle';
import VehicleCreate from '../pages/Vehicle/Create';
import VehicleUpdate from '../pages/Vehicle/Update';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/signup" component={SignUp} />
    <Route path="/transactions/create" component={DashboardCreate} isPrivate />
    <Route path="/dashboard" component={Dashboard} isPrivate />
    <Route exact path="/establishments" component={Establishment} isPrivate />
    <Route
      exact
      path="/establishments/create"
      component={EstablishmentCreate}
      isPrivate
    />
    <Route
      exact
      path="/establishments/:id"
      component={UpdateEstablishment}
      isPrivate
    />
    <Route exact path="/vehicles" component={Vehicle} isPrivate />
    <Route exact path="/vehicles/create" component={VehicleCreate} isPrivate />
    <Route exact path="/vehicles/:id" component={VehicleUpdate} isPrivate />
  </Switch>
);

export default Routes;
