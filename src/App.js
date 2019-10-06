import React, {Component} from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom';
import Home from './Home';
import Palette from './Palette';
import axios from 'axios'

const API = 'http://localhost:3000/'
const DEFAULT_QUERY = 'palettes'

class App extends Component {
  constructor(){
    super();

    this.state = {
      palettes: [],
      isLoading: false
    }
  }

  async componentDidMount(){
    this.setState({ isLoading: true });

    const response = await axios.get(API + DEFAULT_QUERY);  

    this.setState({
      palettes: [...response.data],
      isLoading:false
    });
  }

  render(){
    return (
      <Switch>
        <Route exact path='/' render={() => <Home palettes={this.state.palettes}/>}/>
        <Route exact path='/palette/:id' render={(urlParams) => <Palette palettes={this.state.palettes} urlParams={urlParams}/>}/> 
      </Switch>
    );
  }
}

export default App;
