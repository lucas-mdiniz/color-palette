import React, {Component} from 'react';
import styled from 'styled-components';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const StyledPaletteHeader = styled.div`
    background: #fff;
    padding: 10px;
    width: 100%;
`;

const StyledSelect = styled(Select)`
    min-width: 200px;
`;
class PaletteHeader extends Component{
    constructor(){
        super();

        this.state = {
            colorFormat: ''
        }

        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        }, () => this.props.colorFormat(this.state.colorFormat));
    }
    
    render(){

        return(
            <StyledPaletteHeader>
                <FormControl>
                    <InputLabel htmlFor="color-format">Copy Format: Hex</InputLabel>
                    <StyledSelect
                    value={this.state.colorFormat}
                    onChange={this.handleChange}
                    inputProps={{
                        name: 'colorFormat',
                        id: 'color-format',
                    }}
                    >
                        <MenuItem value={'hex'}>Copy Format: HEX</MenuItem>
                        <MenuItem value={'rgb'}>Copy Format: RGB</MenuItem>
                        <MenuItem value={'rgba'}>Copy Format: RGBA</MenuItem>
                    </StyledSelect>
                </FormControl>
            </StyledPaletteHeader>
        );
    }
}

export default PaletteHeader;