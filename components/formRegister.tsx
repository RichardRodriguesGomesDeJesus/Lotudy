import styled from "styled-components"
import { colorSegundary } from "./sharedstyles"
import { useRef, useState } from "react"
import axios from "axios"
import { useRouter } from "next/router"
import { setCookie } from "nookies"

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
        
    }
    p{
        color: ${colorSegundary.error};
        margin: 0;
    }
    @media screen and (min-width: 0 ){
        gap:.5rem;
        min-height: 400px;
        width: 100%;
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
        min-height: 400px;
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
        min-height: 500px;
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

export default function FormRegister() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const passwordInput = useRef()
    const router = useRouter();

    const namePattern = /^[a-zA-Z0-9]+$/
    const passwordPattern = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/)

    function submit() {
        if (password === confirmPassword && namePattern.test(name) == true && passwordPattern.test(password) == true) {
            axios.post('/api/auth/set_user',{
            name: name,
            email:email ,
            password: password
        })
        .then((res)=> {
            setCookie(undefined,'token',res.data.token,{
                maxAge: 60 * 60 * 24
            })
        })
        .then(()=>{
            router.push('/dashboard')
        })
        .catch((err) => {
            let error =''
            if (err && err.response && err.response.data && err.response.data) {
                error = err.response.data.mse || err.response.data.message || err.response.data;
                setErrorMessage(error); 
            } 
            
        });        
        } else{
            if (namePattern.test(name) == false) {
                setErrorMessage('O nome deve conter apenas letras e números sem espaços.')
            }
            if (passwordPattern.test(password) == false) {
                setErrorMessage('A senha deve ter entre 8 e 20 caracteres, incluindo pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial.')
            }
            if (password !== confirmPassword) {
                setErrorMessage('As senhas devem ser iguais!')
            }
        }
    }
    return(
        <>
            <Form onSubmit={ event => {
                    event.preventDefault() 
                    submit()
                }}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input required type="text" name='name' placeholder='Escreva seu nome.' autoComplete="name" value={name} minLength={2} onChange={(event)=>{
                        setName(event.target.value)
                    }}
                    onBlur={()=>{
                        if (namePattern.test(name) == false) {
                            setErrorMessage('O nome deve conter apenas letras e números sem espaços.')
                        } else {
                            setErrorMessage('')
                        }
                    }}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input required type="email"  name='email' placeholder='fulano@gmail.com' autoComplete="email" value={email} onChange={(event)=> setEmail(event.target.value)}/>

                </div> 
                <div>
                    <label htmlFor="password">Senha</label>
                    <input required type="password" name='password' placeholder='Crie uma senha.' autoComplete="new-password" pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$" value={password} onChange={(event)=>{ 
                        setPassword(event.target.value)
                    }}
                    onBlur={()=>{
                        if (passwordPattern.test(password) == false) {
                            setErrorMessage('A senha deve ter entre 8 e 20 caracteres, incluindo pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial.')
                        } else {
                            setErrorMessage('')
                        }
                    }}
                    />
                </div>
                <div>
                    <label htmlFor="confirm_password">Confirme sua senha</label>
                    <input required  ref={passwordInput} type="password" name='confirm_password'  placeholder='Confirme sua nova senha.' autoComplete="new-password" value={confirmPassword} onChange={(event)=>{
                        setConfirmPassword(event.target.value)
                    }}
                    onBlur={()=>{
                        if (password !== confirmPassword) {
                            setErrorMessage('As senhas devem ser iguais!')
                        } else {
                            setErrorMessage('')
                        }
                    }}
                    />
                </div>
                {errorMessage && <p>{errorMessage}</p>}
                <ButtonSubmit type="submit" name="submit" value={'Criar conta'} />
            </Form>
        </>
    )
}
