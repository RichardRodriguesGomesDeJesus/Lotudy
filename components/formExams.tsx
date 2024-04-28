import styled from "styled-components"
import { Button, colorSegundary } from "./sharedstyles"
import { useState } from "react"
import axios from "axios"
import { parseCookies } from "nookies"
import validator from "validator"

const Form =styled.form`
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
    p{
        color: ${colorSegundary.error};
        margin: 0;
    }
  };
@media screen and (min-width: 768px ){
    background: ${colorSegundary.white};
    box-shadow: 0 8px 8px ${colorSegundary.textColor};
    border-radius: 1rem;
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

export default function FormExams( { formUpdate, setFormUpdate, examList }) {
    const  { 'token': token } = parseCookies()
    const [form,setForm] = useState(false)
    const [nameExame, setNameExame] = useState('')
    const [mseError, setMseError] = useState('')
    function submit() {
        const exist = examList.includes(nameExame)
        if (exist == false && validator.isAlpha(nameExame) == true) {
            axios.post('/api/exams', {
                name: nameExame,
                token
              })
              .then(() => {
                setForm(false)
               if (formUpdate === false) {
                    setFormUpdate(true)
               }
              })
              .catch((err) => console.log(err))
        } else {
            if (validator.isAlpha(nameExame) == false) {
                setMseError('O nome deve ser conter por apenas letras sem espaços')
            }
            if (exist == true) {
                setMseError('Já existe um exame com esse nome.')
            }
        }
    }
    
    return(
        <>
            {
                form === true && (
                    <Form onSubmit={(e)=>{
                        e.preventDefault()
                        submit()
                    }}>
                    <div>
                        <label htmlFor="name_exame">Adicione um nome ao simulado.</label>
                        <input type="text" id="name_exame" onChange={(event)=> setNameExame(event.target.value)} onBlur={()=>{
                            if (validator.isAlpha(nameExame) == false) {
                                setMseError('O nome deve ser conter por apenas letras sem espaços')
                            } else {
                                setMseError('')
                            }
                        }} maxLength={30} required value={nameExame} />
                        {mseError !== '' &&(
                            <p>{mseError}</p>
                        )}
                    </div>
                    <ButtonSubmit type="submit" name="submit" value={'adicione'}/>
                    </Form>
                )
            }
            {
                form == false && (
                    <Button onClick={()=>{setForm(true)}}>adicione</Button>
                )
            }
        </>
    )
}

