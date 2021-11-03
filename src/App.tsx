import React from 'react';
import './App.css';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Menu from './components/Menu';
import Discover from './pages/Discover';
import Detail from './pages/Detail';

function App() {
  return (
    <Container className="App">
      <Menu />
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <Discover/>
          </Route>
          <Route path="/:user/:name" component={Detail}/>
        </Switch>
      </BrowserRouter>
    </Container>
  );
}

export default App;
