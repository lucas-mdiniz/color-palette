import React, {useState} from 'react';
import styled from 'styled-components';
import ColorBox from './ColorBox';
import {GridContainer, GridItem} from './GridSystem';
import { Emoji } from 'emoji-mart';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import {Modal, Button} from '@material-ui/core';
import { StylesProvider } from '@material-ui/styles';

const DeleteButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 99;
  opacity: 0;
  transition: 300ms;
  background: #d42222;
  border: none;
  padding: 10px;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
`;

const StyledMiniPalette = styled.div`
    background: #cdcdcd;
    padding: 10px;
    position: relative;

    &:hover{
        ${DeleteButton}{
            opacity: 1;
            transition: 300ms;
        }
    }
`;

const PaletteName = styled.span`
    display: block;
    margin-top: 10px;
    color: #333;
`;

const PaletteDescription = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
`;

const StyledModal = styled(Modal)`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ModalWrapper = styled.div`
    background: #cdcdcd;
    padding: 20px 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column;
    border-radius: 5px;
    box-shadow: 0px 0px 7px 0px #ffffff6e;
`;

const ConfirmButton = styled(Button)`
    width: 100%;
    margin-bottom: 15px;
`;

const CancelButton = styled(Button)`
    width: 100%;
`;

function MiniPalette(props){

    const [modalOpen, setModalOpen] = useState(false);

    const confirmDelete = e => {
        e.preventDefault();
        props.deletePalette(props.id)
    }

    const cancelDelete = e => {
        e.preventDefault();
        setModalOpen(false);
    }

    const handleDelete = e => {
        e.preventDefault();
        setModalOpen(true);
    }



    return(
        <StylesProvider injectFirst>
            <StyledMiniPalette>
                <StyledModal
                    open={modalOpen}
                >
                    <ModalWrapper>
                        <p>Are you sure?</p>
                        <ConfirmButton
                            variant="contained" 
                            color="primary" 
                            onClick={confirmDelete}
                        >
                            Yes
                        </ConfirmButton>
                        <CancelButton
                            variant="contained" 
                            color="secondary"
                            onClick={cancelDelete}
                        >
                            No
                        </CancelButton>
                    </ModalWrapper>
                </StyledModal>
                <DeleteButton
                    onClick={handleDelete}
                >
                    <FontAwesomeIcon
                        icon={faTrash}
                    />
                </DeleteButton>
                <GridContainer height={200}>
                        {Object.values(props.colors).map(color =>  
                            <GridItem cols={5} rows={4} key={color.colorName}>
                                <ColorBox color={color.color}/>
                            </GridItem>)}
                </GridContainer> 
                <PaletteDescription>
                    <PaletteName>{props.name}</PaletteName>
                    <i>
                        <Emoji emoji={props.icon} size={32}/>
                    </i>   
                </PaletteDescription>
            </StyledMiniPalette>
        </StylesProvider>
    )
}


export default MiniPalette;