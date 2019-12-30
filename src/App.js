import React, {Component} from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom';
import Home from './Home';
import Palette from './Palette';
import ColorShades from './ColorShades';
import CreatePalette from './CreatePalette';
import axios from 'axios';
import {ColorFormatProvider} from './context/ColorFormatContext';

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
      isLoading: true
    }

    this.handleUpdate = this.handleUpdate.bind(this);
    this.deletePalette = this.deletePalette.bind(this);
  }

  async componentDidMount(){
    this.setState({ isLoading: true });

    const response = await axios.get(API + DEFAULT_QUERY);  

    this.setState({
      palettes: [...response.data],
      isLoading:false
    });
  }

  handleUpdate(response){

    const newPalettes = [...this.state.palettes, response.data];

    this.setState({
      palettes: newPalettes,
      isLoading:false
    });
  }

  deletePalette(id){
    axios.delete(`${API}palettes/${id}`)
      .then((response) => {            
       
        const newPalettes = this.state.palettes.filter(palette => palette.id !== id);
      
        this.setState({
          palettes: newPalettes,
          isLoading:false
        });
      })
      .catch(error =>{
        if (error.response) {
            /*
             * The request was made and the server responded with a
             * status code that falls out of the range of 2xx
             */

            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            alert(error.response.statusText);
        } else if (error.request) {
            /*
             * The request was made but no response was received, `error.request`
             * is an instance of XMLHttpRequest in the browser and an instance
             * of http.ClientRequest in Node.js
             */
            console.log(error.request);
        } else {
            // Something happened in setting up the request and triggered an Error
            console.log('Error', error.message);
        }
        console.log(error.config);
    });
  }

  render(){

    return (
      <ColorFormatProvider>
        <Switch>
          <Route exact path='/' render={() => <Home palettes={this.state.palettes} deletePalette={this.deletePalette}/>}/>
          <Route exact path='/palette/:id' render={(urlParams) => <Palette numberOfShades={this.props.numberOfShades} palettes={this.state.palettes} loading={this.state.isLoading} urlParams={urlParams}/>}/>
          <Route exact path='/shades/:color' render={(urlParams) => <ColorShades numberOfShades={this.props.numberOfShades} urlParams={urlParams}/>}/>
          <Route exact path='/create' render={(urlParams) => <CreatePalette urlParams={urlParams} palettesUpdate={this.handleUpdate}/>}/>
        </Switch>
      </ColorFormatProvider>
    );
  }
}

export default App;
