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

const CreatePaletteBtn = styled.div`
  text-align: right;
  margin: 20px 0;

  & > a{
    color: #fff;
    text-decoration: none;
    border: 1px solid;
    padding: 10px;
    display: inline-block;

    &:hover{
      background: #fff;
      color: #333;
    }
  }
`

const MiniPaletteWrapper = styled(Link)`
  text-decoration: none;
`;

class Home extends Component {

  render(){
    return (
      <StyledApp> 
        <CreatePaletteBtn>
          <Link to='/create'> Create new palette </Link>
        </CreatePaletteBtn>
        <GridContainer gap={10}>
          {this.props.palettes.map((palette) => 
            <GridItem cols={3} key={palette.id}>
                <MiniPaletteWrapper to ={`/palette/${palette.id}`}>
                  <MiniPalette colors={palette.colors} name={palette.name} icon={palette.icon}/>
                </MiniPaletteWrapper>
            </GridItem>)}
        </GridContainer>
      </StyledApp>
    );
  }
}

export default Home;