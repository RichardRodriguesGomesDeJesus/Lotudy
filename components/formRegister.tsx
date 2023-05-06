import styled from "styled-components";
import { colors } from "./sharedstyles";

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
        div{
            input{
                width: ;
            }
        }
      };
    @media screen and (min-width: 768px ){
        div{
            input{
                width: ;
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
        button{
            width: 200px;
        }
    }
`

export default function FormRegister() {
    return(
        <>
            <Form>
                <div>
                    <label htmlFor="name">Nome</label>
                    <input type="text" name='name' placeholder='fulano@gmail.com'/>
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" name='email' placeholder='fulano@gmail.com'/>
                </div>
                <div>
                    <label htmlFor="password">Senha</label>
                    <input type="password" name='password' placeholder='crie uma senha '/>
                    <span>Senha ou email incorreto</span>
                </div>
                <button onClick={ event => event.preventDefault()}>Enviar</button>
            </Form>
        </>
    )
    
}