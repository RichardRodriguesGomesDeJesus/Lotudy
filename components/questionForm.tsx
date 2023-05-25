import styled from "styled-components"
import { colors } from "./sharedstyles"
import { useState } from "react"

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
        justify-content: space-evenly;
        label{
            font-size: 1.2rem;
            font-weight: 400;
        }
        input{
            border: 1px solid ${colors.textColor};
            border-radius: .5rem;
            box-shadow: 0 4px 4px ${colors.textColor};
            color: ${colors.textColor} ;
            padding: .5rem;
        }
        textarea{
            border: 1px solid ${colors.textColor};
            border-radius: .5rem;
            box-shadow: 0 4px 4px ${colors.textColor};
            color: ${colors.textColor} ;
            padding: .5rem;
        }
    }
    p{
        color: ${colors.error};
        margin: 0;
    }
    @media screen and (min-width: 0 ){
        gap: 1rem;
        min-height: 400px;
        width: 300px;
        div{
            gap: 1rem;
            label{
                color: ${colors.sideColor};
                font-size:1rem;
                font-weight: 400;
            }
            input{
                width: 250px;
            }
            textarea{
                width: 250px;
            }
        }
    };
    @media screen and (min-width: 768px ){
        background: ${colors.white};
        box-shadow: 0 8px 8px ${colors.textColor};
        border-radius: 1rem;
        min-height: 400px;
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
            textarea{
                width: 420px;
            }
        }
    };
    @media screen and (min-width: 1024px) {
        min-height: 500px;
        width: 800px;
        div{
            input{
                width: 480px;
            }
            textarea{
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
const ButtonAddOption = styled.button`
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

export default function QuestionForm() {
    const [text, setText] = useState('')
    const [options, setOptions] = useState([]); // Estado para controlar as perguntas adicionadas
  
    const addOption = () => {
        setOptions([...options, ""])
    };
  
    const handleOptionChange = (index, value) => {
      const updatedOptions = [...options];
      updatedOptions[index] = value;
      setOptions(updatedOptions); // Atualiza a pergunta alterada no estado
    };
    
    function submit() {
        const  option = { 
            ...options,
            text
        }
        console.log(option)
    }
    return (
      <>
        <Form onSubmit={ event => {
                    event.preventDefault() 
                    submit()
                }}>
            <div>
                <label htmlFor="text">Adicione um texto a pergunta.</label>
                <textarea name="text" id="text" value={text} onChange={(e)=>{ setText(e.target.value)}} cols={30} rows={10}></textarea>
            </div>
          {options.map((option, index) => (
            <div key={index}>
              <label htmlFor={`option-${index}`}>Opção {index + 1}:</label>
              <input
                type="text"
                id={`option-${index}`}
                value={option}
                onChange={(e) => { 
                    handleOptionChange(index, e.target.value)
                }}
              />
            </div>
          ))}
          {options.length <= 4 && <ButtonAddOption onClick={(e)=>{
            e.preventDefault() 
            addOption()
            }}>Adicionar uma Opção</ButtonAddOption>}
             <ButtonSubmit type="submit" name="submit" value={'Criar a pergunta'} />
        </Form>
      </>
    );
  }