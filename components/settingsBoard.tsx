import styled from "styled-components"
import { Button, ButtonClose, ButtonInvalid, colorSegundary } from "./sharedstyles"
import { useEffect, useState } from "react"
import axios from "axios"
import { setCookie } from "nookies"
import { useRouter } from "next/router"
import Link from "next/link"

const ContainerPlan = styled.div`
  background: ${colorSegundary.white};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding:1rem;
  flex-grow: 1;
  width: 100vw ;
  form{
    align-items: center;
    border: 1px solid ${colorSegundary.textColor};
    border-radius: .5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 150px;
    padding: 1rem;
    min-width: 300px;
    label{
        strong{
          color: ${colorSegundary.titleColor};
        }
    }
    h2{
      strong{
        color: ${colorSegundary.titleColor};
      }
    }
    input{
        border: 1px solid ${colorSegundary.textColor};
        border-radius: .5rem;
        box-shadow: 0 4px 4px ${colorSegundary.textColor};
        padding: .5rem;
    }
    fieldset{
      legend{
        strong{
          color: ${colorSegundary.titleColor};
        }
      }
      display:flex;
      width: auto;
      input{
        border: none;
        box-shadow: none;
        width: auto;
      }
    }
  }
  @media screen and (min-width: 0 ){
    gap:1rem;
    form{
        gap: .5rem;
        label{
            color: ${colorSegundary.sideColor};
            font-size:1rem;
            font-weight: 400;
        }
        h2{
          color: ${colorSegundary.sideColor};
          font-size:1rem;
          font-weight: 400;
        }
        input{
            width: 250px;
        }
    }
    p{
        color: ${colorSegundary.error};
        margin: 0;
    }
  };
  @media screen and (min-width: 768px ){
      form{
          label{
              color: ${colorSegundary.sideColor};
              font-size:1.2rem;
              font-weight: 600;
          }
          h2{
            color: ${colorSegundary.sideColor};
            font-size:1.2rem;
            font-weight: 600;
          }
          input{
              width: 420px;
          }
      }
  };
  @media screen and (min-width: 1024px) {
      form{
          label{
              color: ${colorSegundary.sideColor};
              font-size:1.5rem;
              font-weight: 600;
          }
          h2{
            color: ${colorSegundary.sideColor};
            font-size:1.5rem;
            font-weight: 600;
          }
          input{
              width: 480px;
          }
      }
  }
`

export default function SettingsBoard({plan, userEmail, token, prices, setPlan}) {
  const [email, setEmail] = useState<string>(userEmail)
  const [err,setErr] = useState('')
  const [subscriptionld, setSubscriptionld] = useState('')
  const router = useRouter()
  function ChangeEmail(email: string) {
    if (err !== '') {
      setErr('')
    }
    axios.post('/api/auth/change_email',{
      email: email,
      token: token
    })
    .then((res)=>{
      setCookie(undefined,'token',res.data,{
        maxAge: 60 * 60 * 24
      })
      router.push('/dashboard')
    })
    .catch((err)=>{
      if (typeof(err.response.data) === 'string') {
        setErr(err.response.data)
      }
    })
  }
  useEffect(()=>{
    axios.post('/api/subscriptionld',{
      token,
    })
    .then((res)=>setSubscriptionld(res.data))
    .catch((err)=>console.log(err))
  },[subscriptionld === ''])
  return(
    <ContainerPlan>
      {userEmail !== '' &&
        <form onSubmit={(e)=>{
          e.preventDefault()
          if (email !== '') {
            ChangeEmail(email)
          }
        }}>
          <label>Seu Email atual: <strong>{userEmail}</strong> </label>
          <input type="email" onChange={(e)=>{setEmail(e.target.value)}} placeholder={userEmail} value={email}/>
          {email !== '' &&(
            <Button>Salvar</Button>
          )}
          {email == '' &&(
            <>
              <ButtonInvalid>Salvar</ButtonInvalid>
            </>
          )}
          {err  !== '' &&(
            <p>{err}</p>
          )}
        </form>
      }
      {plan !== ''&& prices.length > 0 && (
        <form onSubmit={(e)=>{
          e.preventDefault()
        }}>
          <h2>Seu Plano atual: <strong>{plan}</strong> </h2>
          {plan !== 'Gratuito' && prices.length > 0&& 
            <Link href={"/plans/cancel"}><p>Cancelar assinatura atual.</p></Link>
          }
          {plan === 'Gratuito'&&(
            <Button type="button" onClick={()=>{
              router.push('/plans')
             }}>Ver planos</Button>
          )}
        </form>
      )}
    </ContainerPlan>
  )
}