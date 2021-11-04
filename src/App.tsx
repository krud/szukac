import React, {useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Menu from './components/Menu';
import Discover from './pages/Discover';
import Detail from './pages/Detail';

function App() {
  const [q, setQ] = useState('');

  return (
    <div className="App">
      <Menu title={'SEARCH'} query={(_:string)=>setQ(_)}/>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <Discover query={q}/>
          </Route>
          <Route path="/:user/:name" component={Detail}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
