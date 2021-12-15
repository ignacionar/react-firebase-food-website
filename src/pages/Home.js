import React from 'react';
import { Banner } from '../components/banner/Banner';
import Menu from '../components/menu/Menu';
import FoodDialog from '../components/foodDialog/FoodDialog';

const Home = ({openedFood}) => {
  return (
      <>
        <FoodDialog {...openedFood} />
        <Banner>
          <h2>Las comidas más piolas de la Provincia</h2>
          <p>Pedí online rápido y fácil</p>
        </Banner>
        <Menu {...openedFood} />
      </>
  )
}

export default Home
