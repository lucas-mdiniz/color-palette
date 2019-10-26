import React, {Component} from 'react';
import styled from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowLeft, faArrowRight} from '@fortawesome/free-solid-svg-icons'

const StyledSidebar = styled.div`
    padding: 60px;
    background: #fff;
    height: 100vh;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    max-width: 450px;
    box-sizing: border-box;
    position: relative;
    transform: translateX(${props => (props.open ? '0' : 'calc(-100% + 44px)')});
    transition: 500ms;
`;

const CloseArrow = styled(FontAwesomeIcon)`
    color: #979797;
    position: absolute;
    top: 0;
    right: 0;
    padding: 10px 15px;
    cursor: pointer;
    display: block !important;
`;

class SideBar extends Component{
    constructor(){
        super();

        this.state = {
            sideBarOpen: true
        }

        this.handleClose = this.handleClose.bind(this);
    }

    handleClose(e){
        e.preventDefault();

        this.setState(previousState => ({sideBarOpen: !previousState.sideBarOpen}));
    }

    render(){
        return(
            <StyledSidebar open={this.state.sideBarOpen}>
                {this.props.children}
                <CloseArrow 
                    icon={this.state.sideBarOpen ? faArrowLeft : faArrowRight} 
                    open={this.state.sideBarOpen} 
                    onClick={this.handleClose}
                />
            </StyledSidebar>
        )
    }
}

export default SideBar;