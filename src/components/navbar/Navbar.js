import React from 'react';
import styled from 'styled-components';
import imgLogo from '../../assets/nucbazappiintegral.png';
import CartIcon from '../cart/CartIcon';
import { fixed } from '../../styles/utils';
import { Link } from 'react-router-dom';
import userIcon from '../../assets/user-icon.svg'
import { useSelector, useDispatch } from 'react-redux';
import { UserMenu } from '../usermenu/UserMenu.js';
import * as userActions from '../../redux/user/user-actions';

const NavbarStyled = styled.div`
  padding: 10px;
  ${fixed()};
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  width: 100%;
  z-index: 999;
  border-bottom: 1px solid #e5edef;
`;

const Logo = styled.img`
  max-width: 200px;
  height: auto;
`;

const User = styled.img`
  width: 35px;
  height: 35px;
  cursor: pointer;
`;

const Divider = styled.div`
  display: inline-block;
  border-left: 1px solid #dfdddd;
  margin: 0 25px;
  height: 25px;
`;

const LoginButton = styled.button`
  color: #fff;
  border-radius: 8px;
  padding: 10px 15px;
  border: none;
  margin: 0 5px;
  font-size: 14px;
  font-weight: bolder;
  font-family: 'Poppins-Semibold', Helvetica, Arial, sans-serif;
  background-image: linear-gradient(130deg, #ff9259 0%, #ff2426 70%);
`

const NavigationMenu = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  align-self: flex-end;
  margin-right: 20px;
`;

export const Navbar = () => {

  const currentUser = useSelector(state => state.user.currentUser); // ACCEDER AL STATE
  const dispatch = useDispatch()

  const handlerToggle = () => {
    dispatch(userActions.toggleMenuHidden())
  }

  return (
    <NavbarStyled>
    <Link to={'./'}>
      <Logo Logo src={imgLogo} style={{textDecoration: 'none'}}/>
    </Link>
      <NavigationMenu>
        <CartIcon />
        <Divider />
        {
          currentUser 
          ? ( 
            <>
              <User src={userIcon} onClick={handlerToggle}/> 
              <UserMenu user={currentUser}></UserMenu>
            </>  
          ) 
          : (
            <Link to='/login' style={{textDecoration: 'none'}}>
              <LoginButton style={{cursor: 'pointer'}}>Ingresar</LoginButton>
            </Link>
          )
        }
        
      </NavigationMenu>
    </NavbarStyled>
  );
};


