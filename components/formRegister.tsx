import styled from "styled-components";
import { colors } from "./sharedstyles";
import { useRef, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { setCookie } from "nookies";

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
        
    }
    p{
        color: ${colors.error};
        margin: 0;
    }
    @media screen and (min-width: 0 ){
        gap:.5rem;
        height: 400px;
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
    };
    @media screen and (min-width: 768px ){
        background: ${colors.white};
        box-shadow: 0 8px 8px ${colors.textColor};
        border-radius: 1rem;
        height: 400px;
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
        height: 500px;
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





export default function FormRegister() {
    const urlAtual = window.location.href
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const passwordInput = useRef()
    const router = useRouter();

    function submit() {
        
        if (password === confirmPassword) {

            axios.post(`${urlAtual}/api/auth/set_user`,{
            name: name,
            email:email ,
            password: password
        })
        .then((res)=> {
            setCookie(undefined,'token',res.data.token,{
                maxAge: 60 * 60 * 2
            })
        })
        .then(()=>{
            router.push('/dashboard')
        })
        .catch((err)=> setErrorMessage(err))
        } else{
            setErrorMessage('As senhas devem ser iguais!')
        }
    }
    return(
        <>
            <Form onSubmit={ event => {
                    event.preventDefault() 
                    submit()
                }}>
                <div>
                    <label htmlFor="name">Nome</label>
                    <input required type="text" name='name' placeholder='digite seu nome.' autoComplete="name" value={name} onChange={(event)=> setName(event.target.value)}/>
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input required type="email"  name='email' placeholder='fulano@gmail.com' autoComplete="email" value={email} onChange={(event)=> setEmail(event.target.value)}/>

                </div> 
                <div>
                    <label htmlFor="password">Senha</label>
                    <input required type="password" name='password'pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$" placeholder='crie uma senha.' autoComplete="new-password" value={password} onChange={(event)=> setPassword(event.target.value)}/>
                </div>
                <div>
                    <label htmlFor="confirm_password">Confirmação de senha</label>
                    <input required  ref={passwordInput} type="password" name='confirm_password' pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$" placeholder='crie uma senha.' autoComplete="new-password" value={confirmPassword} onChange={(event)=> setConfirmPassword(event.target.value)}/>
                </div>
                {errorMessage && <p>{errorMessage}</p>}
                <ButtonSubmit type="submit" name="submit" value={'Criar conta'} />
            </Form>
        </>
    )
    
}
