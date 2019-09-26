import React, {Component} from 'react';
import ColorBox from './ColorBox';
import Grid from '@material-ui/core/Grid';

class Palette extends Component{
    render(){
        return(
            
            <Grid container>
                <Grid item xs={12} sm={4} md={3}>
                    <ColorBox color={'red'}/>
                </Grid>
                <Grid item xs={12} sm={4} md={3}>
                    <ColorBox color={'blue'}/>
                </Grid>
                <Grid item xs={12} sm={4} md={3}>
                    <ColorBox color={'red'}/>
                </Grid>
                <Grid item xs={12} sm={4} md={3}>
                    <ColorBox color={'blue'}/>
                </Grid>
            </Grid>

        )
    }
}

export default Palette;