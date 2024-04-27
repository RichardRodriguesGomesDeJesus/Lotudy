import styled from "styled-components"
import { Button, IconPremium, colorSegundary } from "./sharedstyles"
import { useEffect, useState } from "react"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/router"

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
  span{
    align-items: center;
    display: flex;
    justify-content: space-around;
  }

  @media screen and (min-width: 0 ){
    min-height: 500px;
  @media screen and (min-width: 768px ){
    min-height: 600px;
  }
  @media screen and (min-width: 1024px ){
    min-height: 600px;
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

const CheckPlan = styled.button`
  background: ${colorSegundary.white};
  border: none;
  border-radius: .5rem;
  box-shadow: 0 4px 4px ${colorSegundary.textColor};
  color: ${colorSegundary.sideColor};
  margin: 1rem auto;
  padding: calc(.5rem - 1px);
  height: 34px;
  @media screen and (min-width: 0 ){
      width: 150px;
  }
  @media screen and (min-width: 768px ){
      width: 175px;
  }
  @media screen and (min-width: 1024px){
      width: 200px;
  }
`
export default function PlanCards({token, listPrices, access}) {

  const router = useRouter()

  function formatNumber(number, locale = 'pt-BR', minimumFractionDigits = 2, maximumFractionDigits = 2){
    return number.toLocaleString(locale, { style: 'decimal', minimumFractionDigits, maximumFractionDigits })
  }

   const createExpression = async (priceId) => {
    if (access === 'Gratuito') {
      const {data: response} = await axios.post('/api/session',{
        priceId,
        token
      })
      window.location.href = response.url
    }
   }
  return(
    <PlansContainer>
      {listPrices.length !== 0&&(
        <>
          <Plan>
            <h3>Plano Gratuito</h3>
            <p>O plano basico para quem quer começar a avançar nos estudos sem custos.</p>
            <h2>R$0,00 por mês</h2>
            <p><CheckIcon/>Cards de revisão.</p>
            <p><CheckIcon/>Simulados.</p>
            <p><CheckIcon/>Ciclo de estudos.</p>
            <p><CloseIcon/>Gráficos de desempenho.</p>
            <p><CloseIcon/>Dividir simulados por materias.</p>
          </Plan>
          <Plan>
            <span><h3>Plano   <strong>{listPrices[1].nickname}</strong></h3><IconPremium/></span>
            <p>Dá acesso a todos os recursos.</p>
            <h2>R${formatNumber(listPrices[1].unit_amount / 100)} por mês</h2>
            <p><CheckIcon/>Cards de revisão.</p>
            <p><CheckIcon/>Simulados.</p>
            <p><CheckIcon/>Ciclo de estudos.</p>
            <p><CheckIcon/>Gráficos de desempenho.</p>
            <p><CheckIcon/>Dividir simulados por materias.</p>
            <p><CloseIcon/>Desconto de 45%.</p>
            {access !== 'Premium' && access === 'Gratuito' &&(
              <Button onClick={()=>{createExpression(listPrices[1].id)}}>Assinar Plano</Button>
            )}
            {access === 'Premium' && (
              <CheckPlan> Já assinou esse plano</CheckPlan>
            )}
          </Plan>
          <Plan>
            <span><h3>Plano   <strong>{listPrices[0].nickname}</strong></h3><IconPremium/></span>
            <p>Dá acesso a todos os recursos com um desconto pela assinatura anual.</p>
            <h2>R${formatNumber(listPrices[0].unit_amount / 100)} por ano</h2>
            <Strikethrough>R${formatNumber((listPrices[1].unit_amount * 12)/ 100)} por ano</Strikethrough>
            <p><CheckIcon/>Cards de revisão.</p>
            <p><CheckIcon/>Simulados.</p>
            <p><CheckIcon/>Ciclo de estudos.</p>
            <p><CheckIcon/>Gráficos de desempenho.</p>
            <p><CheckIcon/>Dividir simulados por materias.</p>
            <p><CheckIcon/>Desconto de 45%.</p>
            {access !== 'Anual'&& access === 'Gratuito'&& (
              <Button onClick={()=>{createExpression(listPrices[0].id)}}>Assinar Plano</Button>
            )}
            {access === 'Anual' && (
              <CheckPlan>Já assinou esse plano</CheckPlan>
            )}
            {access !== 'Anual'&& access !== 'Gratuito'&& (
              <>
                <p>É preciso cancelar o seu plano atual primeiro.</p>
                <Button type="button" onClick={()=>router.push("/plans/cancel")} >Cancelar plano atual</Button>
              </>
            )}
          </Plan>
        </>
      )}
    </PlansContainer>
  )
}