import React, {Component} from 'react';
import MiniPalette from './MiniPalette';
import styled from 'styled-components';
import './App.css';
import {Link} from 'react-router-dom';
import { GridContainer, GridItem } from './GridSystem';

const StyledApp = styled.div`
  max-width: 1170px;
  padding: 0 50px;
  margin: 50px auto;
`;

class Home extends Component {

  render(){
    return (
      <StyledApp> 
        <GridContainer>
          {this.props.palettes.map((palette) => 
            <GridItem cols={3} key={palette.id}>
                <Link to ={`/palette/${palette.id}`}>
                  <MiniPalette colors={palette.colors} name={palette.name} icon={palette.icon}/>
                </Link>
            </GridItem>)}
        </GridContainer>

        <Link to='/create'> Create new palette </Link>
      </StyledApp>
    );
  }
}

export default Home;