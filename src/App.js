import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import CharactersList from './components/charactersList';
import CharacterCard from './components/characterCard';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <CharactersList/>
          </Route>
          <Route path="/characters/:id" children={<CharacterCard />} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
