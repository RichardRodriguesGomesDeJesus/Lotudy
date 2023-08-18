import styled from "styled-components";
import { colorSegundary } from "./sharedstyles";

const PlansContainer = styled.section`
  display:grid;
  width:90vw;
  @media screen and (min-width: 0 ){
    grid-template-columns: 100% ;
    padding: 1rem;
    row-gap:1rem;
    div{
      min-height: 500px;
    }
  }
  @media screen and (min-width: 768px ){
    grid-template-columns: 50% 50% ;
    padding: 1rem;
    column-gap:1rem;
    row-gap:1rem;
    div{
      min-height: 600px;
    }
  }
  @media screen and (min-width: 1024px ){
    grid-template-columns: 33.33% 33.33% 33.33% ;
    padding: 1rem;
    column-gap:1rem;
    div{
      min-height: 600px;
    }
  }
  `
const Plan = styled.div`
  display: flex;
  border-radius: 16px;
  border: 1px solid ${colorSegundary.textColor} ;
  background: ${colorSegundary.white};
  cursor: pointer;
  padding: 1rem;
  text-align: justify;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-evenly;
  h2{
    text-align: center;
    color: #020202;
  }
  h3{
    text-align: center;
    strong{
      font-weight: bold;
      background: -webkit-linear-gradient(#D4AF37, #FFD700, #D4AF37);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
  p{
    display: flex;
    margin: 0.2rem 0;
  }

  @media screen and (min-width: 0 ){
    min-height: 500px;
  @media screen and (min-width: 768px ){
    min-height: 600px;
  }
  @media screen and (min-width: 1024px ){
    min-height: 600px;
  }
  &:active{
    border: 2px solid ${colorSegundary.titleColor} ;
  }
`

const Strikethrough = styled.h2`
  text-decoration: line-through;
  text-align: center;
`
const CheckIcon = styled.span`
  display: flex;
  background: url('icons/check.png') center / cover;
  height: 30px;
  margin: 0 1rem 0 0;
  width: 30px;
`

const CloseIcon = styled.span`
  display: flex;
  background: url('icons/close.png') center / cover;
  height: 30px;
  margin: 0 1rem 0 0;
  width: 30px;
`
export default function PlanCards() {
  return(
    <PlansContainer>
      <Plan>
        <h3>Plano Gratuito</h3>
        <p>O plano basico para quem quer começar a avançar nos estudos sem custos.</p>
        <h2>R$00.00 por mês</h2>
        <p><CheckIcon/>Cards de revisão.</p>
        <p><CheckIcon/>Simulados.</p>
        <p><CheckIcon/>Ciclo de estudos.</p>
        <p><CloseIcon/>Gráficos de desempenho.</p>
        <p><CloseIcon/>Dividir simulados por materias.</p>
      </Plan>
      <Plan>
        <h3>Plano <strong>Premium</strong></h3>
        <p>Dá acesso a todos os recursos.</p>
        <h2>R$15.00 por mês</h2>
        <p><CheckIcon/>Cards de revisão.</p>
        <p><CheckIcon/>Simulados.</p>
        <p><CheckIcon/>Ciclo de estudos.</p>
        <p><CheckIcon/>Gráficos de desempenho.</p>
        <p><CheckIcon/>Dividir simulados por materias.</p>
        <p><CloseIcon/>Desconto.</p>
      </Plan>
      <Plan>
        <h3>Plano <strong>Anual</strong></h3>
        <p>Dá acesso a todos os recursos com um desconto pela assinatura anual.</p>
        <h2>R$99.00 por ano</h2>
        <Strikethrough>R$180.00 por ano</Strikethrough>
        <p><CheckIcon/>Cards de revisão.</p>
        <p><CheckIcon/>Simulados.</p>
        <p><CheckIcon/>Ciclo de estudos.</p>
        <p><CheckIcon/>Gráficos de desempenho.</p>
        <p><CheckIcon/>Dividir simulados por materias.</p>
        <p><CheckIcon/>Desconto.</p>
      </Plan>
    </PlansContainer>
  )
}