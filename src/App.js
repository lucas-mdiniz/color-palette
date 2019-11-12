import React, {Component} from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom';
import Home from './Home';
import Palette from './Palette';
import ColorShades from './ColorShades';
import CreatePalette from './CreatePalette';
import axios from 'axios';

const API = 'http://localhost:3000/'
const DEFAULT_QUERY = 'palettes'

class App extends Component {
  static defaultProps = {
    numberOfShades: 9 
  }

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
        <Route exact path='/palette/:id' render={(urlParams) => <Palette numberOfShades={this.props.numberOfShades} palettes={this.state.palettes} loading={this.state.isLoading} urlParams={urlParams}/>}/>
        <Route exact path='/shades/:color' render={(urlParams) => <ColorShades numberOfShades={this.props.numberOfShades} urlParams={urlParams}/>}/>
        <Route exact path='/create' render={() => <CreatePalette/>}/>
      </Switch>
    );
  }
}

export default App;
