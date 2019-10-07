import React, {Component} from 'react';
import MiniPalette from './MiniPalette';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import './App.css';
import {Link} from 'react-router-dom';

const StyledApp = styled.div`
  max-width: 1170px;
  padding: 0 50px;
  margin: 50px auto;
`;

class Home extends Component {

  render(){
    return (
      <StyledApp>
        <Grid container spacing={10}>
          {this.props.palettes.map((palette) => <Grid item sm={4} xs={12}><Link to ={`/palette/${palette.id}`}><MiniPalette colors={palette.colors} name={palette.name} icon={palette.icon}/></Link></Grid>)}
        </Grid>
      </StyledApp>
    );
  }
}

export default Home;