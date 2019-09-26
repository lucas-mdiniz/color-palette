import React, {Component} from 'react';
import MiniPalette from './MiniPalette';
import Grid from '@material-ui/core/Grid';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      palettes: [{
        colors: ['#2548fe', '#e8d6e5', '#9C27B0', '#673AB7', '#FFC107', '#795548', '#8BC34A', '#3F51B5','#2548fe', '#e8d6e5', '#9C27B0', '#673AB7', '#FFC107', '#795548', '#8BC34A', '#3F51B5'],
        name: 'crazy frog',
        icon: ''
      },
      {
        colors: ['#2548fe', '#e8d6e5', '#9C27B0', '#673AB7', '#FFC107', '#795548', '#8BC34A', '#3F51B5','#2548fe', '#e8d6e5', '#9C27B0', '#673AB7', '#FFC107', '#795548', '#8BC34A', '#3F51B5'],
        name: 'crazy wolf',
        icon: ''
      },
      {
        colors: ['#2548fe', '#e8d6e5', '#9C27B0', '#673AB7', '#FFC107', '#795548', '#8BC34A', '#3F51B5','#2548fe', '#e8d6e5', '#9C27B0', '#673AB7', '#FFC107', '#795548', '#8BC34A', '#3F51B5'],
        name: 'crazy dog',
        icon: ''
      }]
    };
  }
  render(){
    return (
      <div>
        <Grid container spacing={7}>
          {this.state.palettes.map((palette) => <Grid item sm={4} xs={12}><MiniPalette colors={palette.colors} name={palette.name} icon={palette.icon}/></Grid>)}
        </Grid>
      </div>
    );
  }
}

export default App;
