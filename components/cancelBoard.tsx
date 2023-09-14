import styled from "styled-components";
import { Button, Container, colorSegundary } from "./sharedstyles";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const CancelContainer = styled.section`
  background: ${colorSegundary.white};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding:1rem;
  flex-grow: 1;
  width: 100vw ;
  h2{
    color: ${colorSegundary.principalColor};
    text-align: center;
  }
  form{
    display: flex;
    flex-direction: column;
    text-align: justify;
    label{
      strong{
        color: ${colorSegundary.titleColor};
      }
    }
  }
  @media screen and (min-width: 0 ){
      gap: .5rem;
      h2{
        font-size:1.5rem;
        font-weight: 400;
      }
      form{
        label{
          color: ${colorSegundary.sideColor};
          font-size:1rem;
          font-weight: 400;
        }
        width: 100% ;
      }
  }
  @media screen and (min-width: 768px ){
    h2{
      font-size:2rem;
      font-weight: 600;
    }

    form{
      label{
        color: ${colorSegundary.sideColor};
        font-size:1rem;
        font-weight: 600;
      }
      width: 600px ;
    }
  }
  @media screen and (min-width: 1024px) {
    h2{
      font-size:2rem;
      font-weight: 600;
    }
    form{
      label{
        color: ${colorSegundary.sideColor};
        font-size:1.2rem;
        font-weight: 600;
      }
    width:800px;
    } 
  }
`

export default function CancelBoard({access,token, setAccess}) {
  const [subscriptionld, setSubscriptionld] = useState('')
  const router = useRouter()
  useEffect(()=>{
    axios.post('/api/subscriptionld',{
      token,
    })
    .then((res)=>setSubscriptionld(res.data))
    .catch((err)=>console.log(err))
  },[subscriptionld === ''])
  return(
    <CancelContainer>
      {access === 'Gratuito'&&
        <>
          <h2>Você está no plano gratuito.</h2>
          <Button onClick={()=>router.push('/plans')} >Ver Planos</Button>
        </>
      }
      {access !== 'Gratuito'&& subscriptionld !== undefined &&
        <>
          <h2>Confirmação Necessária</h2>
          <p>Ao prosseguir, você deixará de ter acesso aos benefícios do seu plano atual.</p>
          <form onSubmit={(e)=>{
            e.preventDefault()
            axios.post('/api/cancelSubscription',{
              token,
              subscriptionId: subscriptionld
            })
            .then(()=>setAccess('Gratuito'))
            .catch((err)=>console.log(err))
          }} >
            <div>
              <label htmlFor="confirm">Você tem certeza disso? Lembre-se, se desejar retomar os benefícios, você poderá assinar o plano novamente.</label>
              <input type="checkbox" name="confirm" id="confirm" required />
            </div>
            <Button type="submit">Cancelar Plano</Button>
          </form>
        </>
      }
    </CancelContainer>
  )
}