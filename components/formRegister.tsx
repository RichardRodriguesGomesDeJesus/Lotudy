import styled from "styled-components";
import { colors } from "./sharedstyles";
import { useState } from "react";

const Form = styled.form`
background: ${colors.white};
box-shadow: 0 8px 8px ${colors.textColor};
display: flex;
flex-direction: column;
justify-content: space-around;
margin: 1rem 0;
padding: 1rem;
text-align: center;
border-radius: 1rem;
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
        span{
            font-size: .9rem;
        }
    }
    button{
        width: 150px;
    }
  };
@media screen and (min-width: 768px ){
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
        span{
            font-size: 1rem;
        }
    }
    button{
        width: 175px;
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
        span{
            font-size: 1rem;
        }
    }
    button{
        width: 200px;
    }
}
`

export default function FormRegister() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    function submit() {
        
    }
    return(
        <>
            <Form>
                <div>
                    <label htmlFor="name">Nome</label>
                    <input type="text" name='name' placeholder='digite seu nome.' value={name} onChange={(event)=> setName(event.target.value)}/>
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" name='email' placeholder='fulano@gmail.com' value={email} onChange={(event)=> setEmail(event.target.value)}/>
                    <span>Este email já foi cadastrado.</span>
                </div> 
                <div>
                    <label htmlFor="password">Senha</label>
                    <input type="password" name='password' placeholder='crie uma senha.' value={password} onChange={(event)=> setPassword(event.target.value)}/>
                </div>
                <div>
                    <label htmlFor="confirm_password">Confirmação de senha</label>
                    <input type="password" name='confirm_password' placeholder='crie uma senha. ' value={confirmPassword} onChange={(event)=> setConfirmPassword(event.target.value)}/>
                </div>
                <button onClick={ event => event.preventDefault()}>Criar conta</button>
            </Form>
        </>
    )
    
}