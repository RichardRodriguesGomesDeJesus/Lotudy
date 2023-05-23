import styled from 'styled-components'
import { colors } from './sharedstyles'
import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { destroyCookie, parseCookies, setCookie } from 'nookies'

const Form = styled.form`
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
            border: 1px solid ${colors.textColor};
            border-radius: .5rem;
            box-shadow: 0 4px 4px ${colors.textColor};
            padding: .5rem;
        }
        span{
            color: ${colors.error};
            display: none;
        }
        
    }
    button{
        background: ${colors.sideColor};
        border: none;
        border-radius: .5rem;
        box-shadow: 0 4px 4px ${colors.textColor};
        color: ${colors.white};
        margin: 0 auto;
        padding: .5em;
        &:hover,
        :focus,
        :active {
            cursor: pointer;
            color: ${colors.sideColor};
            background: ${colors.white};
            border: 1px solid ${colors.sideColor};
            border-color: ${colors.sideColor};
        }
    }
    @media screen and (min-width: 0 ){
        gap:1rem;
        height: 250px;
        width: 300px;
        div{
            gap: .5rem;
            label{
                color: ${colors.sideColor};
                font-size:1rem;
                font-weight: 400;
            }
            input{
                width: 250px;
            }
        }
        p{
            color: ${colors.error};
            margin: 0;
        }
      };
    @media screen and (min-width: 768px ){
        background: ${colors.white};
        box-shadow: 0 8px 8px ${colors.textColor};
        border-radius: 1rem;
        height: 350px;
        width: 600px;
        div{
            label{
                color: ${colors.sideColor};
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
                color: ${colors.sideColor};
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
    background: ${colors.sideColor};
    border: none;
    border-radius: .5rem;
    box-shadow: 0 4px 4px ${colors.textColor};
    color: ${colors.white};
    margin: 0 auto;
    padding: .5em;
    &:hover,
    :focus,
    :active {
        cursor: pointer;
        color: ${colors.sideColor};
        background: ${colors.white};
        border: 1px solid ${colors.sideColor};
        border-color: ${colors.sideColor};
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
    const router = useRouter();
    function submit() {
        try {
          // Registrar o momento inicial
          const startTime = Date.now();
      
          axios
            .post('/api/auth/login_user', {
              email: email,
              password: password
            })
            .then((res) => {
              const { 'token': token } = parseCookies();
              if (token) {
                // Remover o token dos cookies
                destroyCookie(undefined, 'token');
              }
              setCookie(undefined, 'token', res.data.token, {
                maxAge: 60 * 60 * 2
              });
      
              // Registrar o momento final
              const endTime = Date.now();
      
              // Calcular a diferença de tempo em milissegundos
              const elapsedTime = endTime - startTime;
      
              console.log(`O tempo de requisição foi de ${elapsedTime} milissegundos.`);
      
              router.push('/dashboard');
            })
            .catch((err) => {
              // Registrar o momento final em caso de erro
              const endTime = Date.now();
      
              // Calcular a diferença de tempo em milissegundos
              const elapsedTime = endTime - startTime;
              const error = err.response.data.error.message || err.response.data 
                setErrorMessage(error);
                console.log(error);
                console.log(`O tempo de requisição foi de ${elapsedTime} milissegundos.`);
                
            });
        } catch (error) {
          console.log(error);
        }
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
                    <label htmlFor="password">Senha</label>
                    <input required type="password" name='password'pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$" placeholder='crie uma senha.' autoComplete="password" value={password} onChange={(event)=> setPassword(event.target.value)} id='password'/>
                    <span>Senha ou email incorreto.</span>
                </div>
                {errorMessage && <p>{errorMessage}</p>}
                <ButtonSubmit type="submit" name="submit" value={'Logar'} />
            </Form>
        </>
    )
}
