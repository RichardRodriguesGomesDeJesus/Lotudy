import styled from "styled-components"
import { ButtonClose, colors } from "./sharedstyles"
import { useState } from "react"
import axios from "axios"

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
        flex-direction: row;
        flex-grow: 1;
        flex-wrap: wrap;
        justify-content: space-evenly;
        label{
            font-size: 1.2rem;
            font-weight: 400;
            width: 100%;
        }
        input{
            border: 1px solid ${colors.textColor};
            border-radius: .5rem;
            box-shadow: 0 4px 4px ${colors.textColor};
            color: ${colors.textColor} ;
            font-family: 'Poppins',sans-serif;
            padding: .5rem;
        }
        textarea{
            border: 1px solid ${colors.textColor};
            border-radius: .5rem;
            box-shadow: 0 4px 4px ${colors.textColor};
            color: ${colors.textColor} ;
            font-family: 'Poppins',sans-serif;
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
            div {
                display: flex;
                align-items: center;
                justify-content: center;
                input{
                    
                    box-shadow: none;
                    height: 20px;
                    width: 20px;
                }
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
            div {
                display: flex;
                width:100%;
                input{
                    margin: 0;
                    box-shadow: none;
                    height: 20px;
                    width: 20px;
                }
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
            span {
                input{
                    box-shadow: none;
                    height: 20px;
                    width: 20px;
                }
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
const RadioInput = styled.input`
    box-shadow: none;
    color: ${colors.textColor} ;
    padding: .5rem;
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

export default function QuestionForm({examName, token, setForm, setQuestion, question}) {
    const [text, setText] = useState('')
    const [options, setOptions] = useState([])
    const [correctAnswer, setCorrectAnswer] = useState('');

  
    const addOption = () => {
        setOptions([...options, ""])
    };
  
    const handleOptionChange = (index, value, isCorrect) => {
        const updatedOptions = [...options];
        updatedOptions[index] = value;
        setOptions(updatedOptions);
        if (isCorrect) {
          setCorrectAnswer(value);
        }
      };
      
    
    function submit() {
        axios.put('/api/exams/setQuestion', {
            options,
            correctOption:correctAnswer,
            text,
            title:examName,
            token
        })
        .then(()=>{
            if (question === true) {
                setQuestion(false)
            }
            setForm(false)
            alert('Questão adicionada com sucesso!')
        })
        .catch((error)=> {
            console.log(error)
        })
    }
    return (
      <>
        <Form onSubmit={ event => {
                    event.preventDefault() 
                    submit()
                }}>
            <ButtonClose onClick={(e)=>{
                e.preventDefault()
                if (question === true) {
                    setQuestion(false)
                }
                setForm(false)
            }}><img src="/icons/close.png"/></ButtonClose>
            <div>
                <label htmlFor="text">Adicione um texto a pergunta.</label>
                <textarea name="text" id="text" minLength={10} maxLength={600} value={text} onChange={(e)=>{ setText(e.target.value)}} cols={30} rows={10} required></textarea>
            </div>
            {options.map((option, index) => (
                <div key={index}>
                    <label htmlFor={`option-${index}`}>Opção {index + 1}:</label>
                    <input
                    type="text"
                    minLength={1}
                    maxLength={300}
                    id={`option-${index}`}
                    value={option}
                    onChange={(e) => {
                        handleOptionChange(index, e.target.value, false);
                    }}
                    required
                    />
                    <div>
                        <span>Marcar como correta</span>
                        <RadioInput
                        type="radio"
                        name="correctAnswer"
                        checked={option === correctAnswer}
                        id="radioInput"
                        onChange={() => {
                            handleOptionChange(index, option, true);
                        }}
                        required
                        />
                        
                    </div>
                    
                </div>
            ))}

          {options.length <= 4 && <ButtonAddOption onClick={(e)=>{
            e.preventDefault() 
            addOption()
            }}>Adicionar uma Opção</ButtonAddOption>}
            {
             options.length < 2 &&
                <p>Adicione mais opções</p>   
            }
            {
                options.length >= 2 && 
                <ButtonSubmit type="submit" name="submit" value={'Criar a pergunta'} />
             }
        </Form>
      </>
    );
  }