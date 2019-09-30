import React, {Component} from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom';
import Home from './Home';
import Palette from './Palette';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      palettes: [{
        colors: ['red', '#e8d6e5', '#9C27B0', '#673AB7', '#FFC107', '#795548', '#8BC34A', '#3F51B5','#2548fe', '#e8d6e5', '#9C27B0', '#673AB7', '#FFC107', '#795548', '#8BC34A', '#3F51B5', '#2548fe', '#e8d6e5', '#9C27B0', '#673AB7'],
        name: 'crazy frog',
        icon: 'x',
        colorFormat: 'hex',
        id: 'asd'
      },
      {
        colors: ['#2548fe', '#e8d6e5', '#9C27B0', '#673AB7', '#FFC107', '#795548', '#8BC34A', '#3F51B5','#2548fe', '#e8d6e5', '#9C27B0', '#673AB7', '#FFC107', '#795548', '#8BC34A', '#3F51B5', '#2548fe', '#e8d6e5', '#9C27B0', '#673AB7'],
        name: 'crazy wolf',
        icon: 'x',
        colorFormat: 'hex',
        id: 'asdasd'
      },
      {
        colors: ['green', '#e8d6e5', '#9C27B0', '#673AB7', '#FFC107', '#795548', '#8BC34A', '#3F51B5','#2548fe', '#e8d6e5', '#9C27B0', '#673AB7', '#FFC107', '#795548', '#8BC34A', '#3F51B5', '#2548fe', '#e8d6e5', '#9C27B0', '#673AB7'],
        name: 'crazy dog',
        icon: 'x',
        colorFormat: 'hex',
        id: 'ccdsd'
      }]
    };
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
