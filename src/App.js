import {Switch, Route} from 'react-router-dom'
import Home from './components/Home'
import StateRoute from './components/StateRoute'
import About from './components/About'
import NotFound from './components/NotFound'

import './App.css'
import Vaccination from './components/Vaccination'

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/about" component={About} />
    <Route exact path="/state/:stateCode" component={StateRoute} />
    <Route exact path="/vaccination" component={Vaccination} />
    <Route path="/bad-path" component={NotFound} />
  </Switch>
)

export default App
