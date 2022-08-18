import React from 'react';
import { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from '../pages/login';
import Login2 from '../pages/login2';
import NotFound from '../pages/notFound';
import Exercise from '../pages/exercise';
import Overview from '../pages/overview';
import HeartSummary from '../pages/heartSummary';
import Snapshot from '../pages/snapshot';
import AddProfile from '../pages/addProfile';
import ReactLoading from 'react-loading';

import PrivateNavigation from './privateNavigation';


function Navigation() {
  return (
    <main>
      <Suspense fallback={<ReactLoading type='cubes' color="blue" className='mLoading' />}>
      <Router>
        <Switch>
          
          <Route path="/login" name="login" component={Login} />
          <Route path="/login_2" name="login2" component={Login2} />
          <Route path="/exercise" name="exercise" component={Exercise} />
          {/* <PrivateNavigation path="/overview" name="overview" component={Overview} />
          <PrivateNavigation path="/heart_summary" name="heartSummary" component={HeartSummary} />
          <PrivateNavigation path="/snapshot" name="snapshot" component={Snapshot} />
          <PrivateNavigation path="/add_profile" name="addProfile" component={AddProfile} /> */}
          
           
          <Route path="/overview" name="overview" component={Overview} />
          <Route path="/heart_summary" name="heartSummary" component={HeartSummary} />
          <Route path="/snapshot" name="snapshot" component={Snapshot} />
          <Route path="/add_profile" name="add profile" component={AddProfile} />
          
         
        
          <Route path="*" name="notFound" component={NotFound} />
        </Switch>
      </Router>
      </Suspense>
    </main>
  );
}

export default Navigation;
