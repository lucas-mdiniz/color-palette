import React from 'react';
import styled from 'styled-components';

const StyledSidebar = styled.div`
    padding: 20px;
    background: #fff;
    height: 100vh;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    max-width: 450px;
    box-sizing: border-box;
`;
function SideBar(props){
    return(
        <StyledSidebar>
            {props.children}
        </StyledSidebar>
    )
}

export default SideBar;