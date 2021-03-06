import { Input } from '../UI';
import useForm from '../../hooks/useForm';
import { VALIDATOR_REQUIRE } from '../../utils';
import { CardSummary } from '../cardsummary/CardSummary';
import { useSelector, useDispatch } from 'react-redux';
import { COSTO_ENVIO } from '../../utils';
import { Spinner } from '../UI/Spinner';
import * as orderActions from '../../redux/orders/order-actions';
import * as cartActions from '../../redux/cart/cart-actions';
import { useHistory } from 'react-router-dom';

import {
  FormStyled,
  FormSectionStyled,
  FormTitle,
} from './CheckoutFormElements';

export const ShippingForm = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const { cartItems } = useSelector((state) => state.cart);
  const { purchased, loading } = useSelector((state) => state.orders);
  const subTotal = cartItems.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);
  const dispatch = useDispatch();
  const history = useHistory();

  const [formState, inputHandler] = useForm(
    {
      domicilio: {
        value: '',
        isValid: false,
      },
      localidad: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const handlerSubmit = (e) => {
    e.preventDefault();
    if (!formState.isValid) {
      console.log('Completar todo los dato PANCHOOOOO!!');
      return;
    }
    const orderData = {
      userId: currentUser.id,
      shippingDetails: {
        domicilio: formState.inputs.domicilio.value,
        localidad: formState.inputs.localidad.value,
      },
      items: [...cartItems],
      shippingPrice: COSTO_ENVIO,
      subtotal: subTotal,
      total: COSTO_ENVIO + subTotal,
    };
    dispatch(orderActions.createOrder(orderData));
    dispatch(cartActions.clearCart());

    console.log('YEAAAA mandale no ma!');
  };

  if (purchased) {
    dispatch(orderActions.purchaseInit());
    history.push('/mis-ordenes');
  }

  return (
    <FormStyled onSubmit={handlerSubmit}>
      <FormSectionStyled>
        {!formState.isValid && (
          <FormTitle>
            Por favor, complet?? los datos para poder continuar
          </FormTitle>
        )}
        <Input
          id="domicilio"
          label="Domicilio"
          type="text"
          onInput={inputHandler}
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Campo Obligatorio"
        />

        <Input
          id="localidad"
          label="Localidad"
          type="text"
          onInput={inputHandler}
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Campo Obligatorio"
        />
      </FormSectionStyled>

      {formState.isValid && (
        <CardSummary
          isValid={!formState.isValid}
          subTotal={subTotal}
          envio={COSTO_ENVIO}
        />
      )}
    </FormStyled>
  );
};