import styled from 'styled-components'
import { colorSegundary } from './sharedstyles'
import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { destroyCookie, parseCookies, setCookie } from 'nookies'

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

export function FormLogin (){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const passwordPattern = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/)
    const router = useRouter();
    function submit() {
        axios
            .post('/api/auth/login_user', {
              email: email,
              password: password
            })
            .then((res) => {
              const { 'token': token } = parseCookies();
              if (token) {
                destroyCookie(undefined, 'token');
              }
              setCookie(undefined, 'token', res.data.token, {
                maxAge: 172800
              });
      
              router.push('/dashboard');
            })
            .catch((err) => {
                const error = err.response.data.mse || err.response.data || err.response.data.message 
                setErrorMessage(error);
            });
      }
    return(
        <>
            <Form onSubmit={ event => {
                    event.preventDefault() 
                    submit()
                }}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input required type="email"  name='email' placeholder='fulano@gmail.com' autoComplete="email" value={email} onChange={(event)=> setEmail(event.target.value)}  id='email'/>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input required type="password" name='password'pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$" placeholder='Escreva sua senha.' autoComplete="password" value={password} onChange={(event)=> setPassword(event.target.value)} onBlur={()=>{
                        if (passwordPattern.test(password) == false) {
                            setErrorMessage('A senha deve ter entre 8 e 20 caracteres, incluindo pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial.')
                        } else {
                            setErrorMessage('')
                        }
                    }} id='password'/>
                    <span>Senha ou e-mail incorreto.</span>
                </div>
                {errorMessage && <p>{errorMessage}</p>}
                <ButtonSubmit type="submit" name="submit" value={'Logar'} />
            </Form>
        </>
    )
}
