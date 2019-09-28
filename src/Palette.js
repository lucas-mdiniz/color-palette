import React, {Component} from 'react';
import ColorBox from './ColorBox';
import Grid from '@material-ui/core/Grid';

class Palette extends Component{
    render(){
        const paletteRender = this.props.palettes.filter(palette => palette.id === this.props.urlParams.match.params.id)[0]
            .colors.map(color => <Grid item xs={12} sm={4} md={3}><ColorBox color={color}/></Grid>);

        return(
            <Grid container>
                {paletteRender}
            </Grid>
        )
    }
}

export default Palette;