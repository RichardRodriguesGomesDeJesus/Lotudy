import styled from "styled-components"
import { Button, Title, colorSegundary } from "./sharedstyles"
import { useState } from "react"
import axios from "axios"
import emailjs from '@emailjs/browser'

const Form = styled.form`
    background: ${colorSegundary.white};
    box-shadow: 0 8px 8px ${colorSegundary.textColor};
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 1rem;
    text-align: center;
    div{
        align-items: center;
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        justify-content: space-around;
        label{
            
        }
        input{
            border: 1px solid ${colorSegundary.textColor};
            border-radius: .5rem;
            box-shadow: 0 4px 4px ${colorSegundary.textColor};
            padding: .5rem;
        }
        span{
            color: ${colorSegundary.error};
            display: none;
        }
        
    }
    @media screen and (min-width: 0 ){
        gap:1rem;
        min-height: 250px;
        width: 300px;
        div{
            gap: .5rem;
            label{
                color: ${colorSegundary.sideColor};
                font-size:1rem;
                font-weight: 400;
            }
            input{
                width: 250px;
            }
        }
      };
    @media screen and (min-width: 768px ){
        min-height: 350px;
        width: 600px;
        div{
            label{
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
        min-height: 400px;
        width: 800px;
        div{
            label{
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
const ButtonSubmit = styled.input`
    background: ${colorSegundary.sideColor};
    border: none;
    border-radius: .5rem;
    box-shadow: 0 4px 4px ${colorSegundary.textColor};
    color: ${colorSegundary.white};
    margin: 0 auto;
    padding: .5rem;
    &:hover,
    :focus,
    :active {
        cursor: pointer;
        color: ${colorSegundary.sideColor};
        background: ${colorSegundary.white};
        border: 1px solid ${colorSegundary.sideColor};
        border-color: ${colorSegundary.sideColor};
        padding: calc(.5rem - 1px);
    }
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

export default function PasswordForm() {
  const [submit , setSubmit] = useState<boolean>(false)
  const [email,setEmail] = useState<string>('')
  return (
    <Form onSubmit={(e)=>{
        e.preventDefault()
        if (submit === false) {
            setSubmit(true)
        }
        const templatePrams = {
            email: email,
            link: "Na casa do caralho"
          }
        emailjs.send("service_0vi7m5l","template_nxqc2bp",templatePrams,"UT7iTWo88lxcFBcpL")
        .then((res)=>console.log(res))
        .catch((err)=>console.log(err))
    }} >
      <Title>Redefinir senha</Title>
      {submit === false &&
        <div>
            <label htmlFor="email">Email</label>
            <input type="email" placeholder="fulano@gmail.com" onChange={(e)=>{
                setEmail(e.target.value)
            }}  value={email} name="email" id='email' autoComplete="email" required/>
        </div>
      }
      {submit === false &&
        <p>Para redefinir sua senha, digite seu e-mail acima e envie.</p>
      }
      {submit === true && 
        <p>Um e-mail foi enviado á você com instruções sobre como concluir o processo.</p>
      }
      {submit === false &&
        <ButtonSubmit type="submit" value="Enviar" />
      }
      {submit === true && 
        <Button type="button" onClick={()=>{
            setSubmit(false)
        }} >Alterar email</Button>
      }
      {submit === true &&
        <ButtonSubmit type="submit" value="Enviar novamente" />
      }
    </Form>
  )
}