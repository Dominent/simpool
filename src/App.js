import './App.css';
import React, { useCallback, useEffect, useState } from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Dashboard from './modules/dashboard/Dashboard';
import Layout from './modules/layout/Layout';
import ApplicationContext from './ApplicationContext';

function App() {
  const [state, setState] = useState({
    filter: 0,
    reloading: {}
  });

  useEffect(() => {
    console.log(state)
  }, [state])

  return (
    <ApplicationContext.Provider value={[state, setState]}>
      <Router>
        <Layout>
          <Switch>
            <Route path="/">
              <Dashboard></Dashboard>
            </Route>
          </Switch>
        </Layout>
      </Router>
    </ApplicationContext.Provider>
  );
}

export default App;
