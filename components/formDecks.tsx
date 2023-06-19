import { useState } from "react"
import { Button, colors } from "./sharedstyles"
import styled from "styled-components"
import axios from "axios"

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

export default function FormDeck({token,formUpdate, setFormUpdate}) {

    const [form,setForm] = useState(false)
    const [nameDeck, setNameDeck] = useState('')
    function submit() {
        axios.post('/api/decks', {
            name: nameDeck,
            token
        })
        .then((res) => {
            setForm(false);
            if (formUpdate === false) {
                setFormUpdate(true)
           }
        })
        .catch((err) => console.log(err));
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
                    <label htmlFor="name_deck">Adicione um nome  para o deck</label>
                    <input type="text" id="name_deck" onChange={(event)=> setNameDeck(event.target.value)} maxLength={30} required value={nameDeck} />
                </div>
                <ButtonSubmit type="submit" name="submit" value={'submit'}/>
            </Form>
            )
        }
        {form === false &&
            <Button onClick={()=>{
                setForm(true)
            }}>Add</Button>
        }
    </>
    )
}