import styled from "styled-components"
import { Button, colorSegundary } from "./sharedstyles"
import { useState } from "react"
import { useRouter } from "next/router"
import axios from "axios"

const Form = styled.form`
    background: ${colorSegundary.white};
    box-shadow: 0 8px 8px ${colorSegundary.textColor};
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin: 1rem 0;
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
    button{
        background: ${colorSegundary.sideColor};
        border: none;
        border-radius: .5rem;
        box-shadow: 0 4px 4px ${colorSegundary.textColor};
        color: ${colorSegundary.white};
        margin: 0 auto;
        padding: .5em;
        &:hover,
        :focus,
        :active {
            cursor: pointer;
            color: ${colorSegundary.sideColor};
            background: ${colorSegundary.white};
            border: 1px solid ${colorSegundary.sideColor};
            border-color: ${colorSegundary.sideColor};
        }
    }
    @media screen and (min-width: 0 ){
        gap:1rem;
        height: 250px;
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
        p{
            color: ${colorSegundary.error};
            margin: 0;
        }
      };
    @media screen and (min-width: 768px ){
        height: 350px;
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
        height: 400px;
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
    padding: .5em;
    &:hover,
    :focus,
    :active {
        cursor: pointer;
        color: ${colorSegundary.sideColor};
        background: ${colorSegundary.white};
        border: 1px solid ${colorSegundary.sideColor};
        border-color: ${colorSegundary.sideColor};
        padding: calc(.5em - 1px);
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

export default function ChangePasswordForm({token}) {
  const [changePassword, SetChangePassword] = useState(false)
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const passwordPattern = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/)
  const [errorMessage, setErrorMessage] = useState('')
  async function Submit(email, token, newPassword) {
    axios.put("/api/auth/charge_password",{
      email: email,
      token: token,
      newPassword: newPassword
    })
    .then(()=>SetChangePassword(true))
    .catch((err)=>{
      if(err?.response?.data?.mse){
        setErrorMessage(err.response.data.mse)
      }
      console.log(err)
    })
  }
  return(
    <Form onSubmit={(e)=>{
      e.preventDefault()
      Submit(email,token,password)
    }}>
    {changePassword === false &&
    <>
      <div>
        <label htmlFor="email">Email</label>
        <input required type="email"  name='email' placeholder='fulano@gmail.com' autoComplete="email" value={email} onChange={(event)=> setEmail(event.target.value)}  id='email'/>
      </div>
      <div>
        <label htmlFor="password">Nova Senha</label>
        <input required type="password" name='password'pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$" placeholder='Escreva sua senha.' autoComplete="password" value={password} onChange={(event)=>setPassword(event.target.value)} onBlur={()=>{
            if (passwordPattern.test(password) == false) {
                setErrorMessage('A senha deve ter entre 8 e 20 caracteres, incluindo pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial.')
            } else {
                setErrorMessage('')
            }
        }} id='password'/>
      </div>
      {errorMessage && <p>{errorMessage}</p>}
      <ButtonSubmit type="submit" name="submit" value={'Mudar senha'} />
    </>
    }
    {changePassword === true && 
      <div>
        <h3>Você acabou de mudar a sua senha, por favor, clique no botão abaixo para acessar a pagina de login.</h3>
        <Button type="button" onClick={()=>{
          router.push("/login")
        }}>Logar</Button>
      </div>
    }
    </Form>
  )
}