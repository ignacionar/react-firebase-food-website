import React from 'react';
import styled from 'styled-components';
import { FoodLabel } from '../menu/FoodGrid';
import { Title } from './../../styles/Title';
import { nucbazappiRed } from '../../styles/utils';
import { formatPrice } from '../../utils';
import { useDispatch } from 'react-redux';
import * as cartActions from '../../redux/cart/cart-actions';
import { below } from './../../styles/utils/Breakpoints';

export const Dialog = styled.div`
  width: 500px;
  background-color: white;
  position: fixed;
  top: 150px;
  z-index: 5;
  max-height: calc(100% - 100px);
  left: calc(50% - 250px);
  display: flex;
  flex-direction: column;
  border-radius: 8px;
`;

const DialogBanner = styled.div`
  min-height: 150px;
  margin-bottom: 20px;
  ${({ img }) => `background-image: url(${img})`};
  background-position: center;
  background-size: cover;
  border-radius: 8px 8px 0px 0px;
`;

const DialogBannerName = styled(FoodLabel)`
  top: 75px;
  padding: 5px 10px;
`;

export const DialogContent = styled.div`
  overflow: auto;
  min-height: 100px;
  max-height: 500px;
  text-align: center;
  padding: 20px;
`;

export const DialogFooter = styled.div`
  box-shadow: 0px -2px 10px 0px gray;
  display: flex;
  justify-content: center;
`;

export const DialogShadow = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: black;
  opacity: 0.7;
  z-index: 4;
`;

export const ConfirmButton = styled(Title)`
  margin: 10px;
  color: white;
  height: 20px;
  border-radius: 8px;
  padding: 10px;
  width: 200px;
  cursor: pointer;
  background-color: ${nucbazappiRed};
  text-align: center;
  justify-content: center;  
  &:hover {
    opacity: 0.7;
  }
  &:active {
    opacity: 1;
  }
  ${below.med`
  padding: 8px;
  `}
`;

const FoodDialogContainer = ({openFood, setOpenFood}) => {
  
  const dispatch = useDispatch()

  const handlerClose = () => {
    setOpenFood();
  }

  const addToOrder = () => {
    dispatch(cartActions.addItem(openFood));
    setOpenFood();
  };

  return (
  <>
    <DialogShadow onClick={handlerClose}/>
    <Dialog>
      <DialogBanner img={openFood.img}>
        <DialogBannerName>{openFood.name}</DialogBannerName>
      </DialogBanner>
      <DialogContent>
        {openFood.description}
      </DialogContent>
      <DialogFooter>
        <ConfirmButton onClick={addToOrder}>
          Agregar: {formatPrice(openFood.price)}
        </ConfirmButton>
      </DialogFooter>
    </Dialog>
  </>
  )
}

const FoodDialog = (props) => {
  if (!props.openFood) return null

  return (
    <FoodDialogContainer {...props}/>
  )
}

export default FoodDialog
