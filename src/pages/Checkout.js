import React from 'react';
import { ShippingForm } from '../components/shippingform/ShippingForm';
import { Wrapper, LayoutPage } from '../components/UI';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const Checkout = () => {
  
  const currentUser = useSelector(state => state.user.currentUser);
  const history = useHistory()

  if (!currentUser) {
    history.push('/login')
  }

  return (
    <LayoutPage>
      <Wrapper>
        <ShippingForm />
      </Wrapper>
    </LayoutPage>
  )
}

export default Checkout;
