import styled from "styled-components";
import { CustomButton } from "../UI/CustomButton";
import { formatPrice } from './../../utils/formatPrice';

export const CardContainer = styled.div`
  max-width: 660px;
  width: 100%;
`;

export const CardSummaryStyled = styled.div`
  margin-top: 62px;
  background-color: #fff;
  border-radius: 15px;
  width: 100%;
  box-shadow: 0 6px 10px 0 rgba(128, 98, 96, 0.16);
`;

const CardSummaryContent = styled.div`
  padding: 24px 32px 15px;
  border-radius: 15px 15px;
  background-color: white;
`;

export const UlCard = styled.ul`
  list-style: none;
  padding: 0;
`;

export const LiCard = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  color: #9faab7;
  margin-bottom: 15px;
`;

export const RowCard = styled.hr`
  height: 1px;
  width: 100%;
  background-color: #e5edef;
`;

export const TotalCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;

export const CardSummary = ({isValid, envio, subTotal}) => {

  return (
  <CardContainer>
    <CardSummaryStyled>
      <CardSummaryContent>
        <UlCard>
          <LiCard>
            <p>Costo de productos</p>
            <span>{formatPrice(subTotal)}</span>
          </LiCard>
          <LiCard>
            <p>Costo de envío</p>
            <span>{formatPrice(envio)}</span>
          </LiCard>
        </UlCard>
        <RowCard />
        <TotalCard>
          <h4>Total</h4>
          <h4>{formatPrice(envio + subTotal)}</h4>
        </TotalCard>
        <CustomButton w={'100%'} m={'0px'} disabled={isValid}> 
          Pagar
        </CustomButton>
      </CardSummaryContent>
    </CardSummaryStyled>
  </CardContainer>
  )
}