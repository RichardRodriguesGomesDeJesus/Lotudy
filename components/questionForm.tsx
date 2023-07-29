import styled from "styled-components"
import { Button, ButtonClose, colorSegundary} from "./sharedstyles"
import { useEffect, useState } from "react"
import axios from "axios"
import CustomSelect from "./select"

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
            width: 100%;
        }
        input, select{
            border: 1px solid ${colorSegundary.textColor};
            border-radius: .5rem;
            box-shadow: 0 4px 4px ${colorSegundary.textColor};
            color: ${colorSegundary.textColor} ;
            font-family: 'Poppins',sans-serif;
            padding: .5rem;
        }
        textarea{
            border: 1px solid ${colorSegundary.textColor};
            border-radius: .5rem;
            box-shadow: 0 4px 4px ${colorSegundary.textColor};
            color: ${colorSegundary.textColor} ;
            font-family: 'Poppins',sans-serif;
            padding: .5rem;
        }
    }
    p{
        color: ${colorSegundary.error};
        margin: 0;
    }

    @media screen and (min-width: 0 ){
        background: ${colorSegundary.white};
        box-shadow: 0 8px 8px ${colorSegundary.textColor};
        border-radius: 1rem;
        gap: 1rem;
        min-height: 400px;
        width: 100%;
        img{
            width:100%;
        }
        div{
            gap: 1rem;
            label{
                color: ${colorSegundary.sideColor};
                font-size:1rem;
                font-weight: 400;
            }
            input{
                font-size: 1rem;
                width: 100%;
            }
            textarea{
                font-size: .75rem;
                width: 100%;
            }
            div {
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: row;
                flex-wrap: wrap;
                input{
                    margin:0;
                    font-size: 1rem;
                    box-shadow: none;
                    height: 20px;
                    width: 20px;
                }
            }
        }
    };
    @media screen and (min-width: 768px ){
        background: ${colorSegundary.white};
        box-shadow: 0 8px 8px ${colorSegundary.textColor};
        border-radius: 1rem;
        min-height: 400px;
        width: 600px;
        img{
            width:400px;
        }
        div{
            label{
                color: ${colorSegundary.sideColor};
                font-size:1.2rem;
                font-weight: 600;
            }
            input{
                font-size: 1.025rem;
                margin: auto calc(50% - 210px);
                width: 420px;
            }
            textarea{
                font-size: 1.025rem;
                width: 420px;
            }
            div {
                display: flex;
                width:100%;
                flex-direction: row;
                flex-wrap: wrap;
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
        background: ${colorSegundary.white};
        box-shadow: 0 8px 8px ${colorSegundary.textColor};
        border-radius: 1rem;
        min-height: 500px;
        width: 800px;
        div{
            flex-direction: row;
            flex-wrap: wrap;
            input{
                font-size: 1.025rem;
                margin: auto calc(50% - 240px);
                width: 480px;
            }
            textarea{
                font-size: 1.025rem;
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
const RadioInput = styled.input`
    box-shadow: none;
    color: ${colorSegundary.textColor} ;
    padding: .5rem;
`
const ButtonAddOption = styled.button`
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
export default function QuestionForm({examName, token, setForm, setQuestion, question, updateList, setUpdateList, questionList}) {  
    const [text, setText] = useState('')
    const [options, setOptions] = useState([])
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [url,setUrl] = useState('')
    const [load, setLoad] = useState<Boolean>()
    const [isOpen, setIsOpen] = useState(false)
    const [selectedOption, setSelectedOption] = useState('')
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
            ...(load === true && { img: url}),
            title:examName,
            ...(selectedOption && { subject: selectedOption}),
            token
        })
        .then(()=>{
            if (question === true) {
                setQuestion(false)
            }
            setUpdateList(false)
            setForm(false)
        })
        .catch((error)=> {
            console.log(error)
        })
    }
    return (
      <>
        <Form  onSubmit={ event => {
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
                <label htmlFor="text">Adicione texto à pergunta.</label>
                <textarea name="text" id="text" minLength={10} maxLength={1000} value={text} onChange={(e)=>{ setText(e.target.value)}} cols={30} rows={10} required></textarea>
            </div>
            <div>
                <label htmlFor="url">Imagem</label>
                <input type="url" id="url" value={url} onChange={(e)=>{setUrl(e.target.value)}}/>
                {url !== '' && (
                    <img src={url} onLoad={()=>{ setLoad(true)}} onError={()=>{setLoad(false)}} />
                )}
                {load == false && (
                    <p>falha ao renderizar a imagem, use outra url.</p>
                )}
            </div>
            <CustomSelect options={questionList} selectedOption={selectedOption} setSelectedOption={setSelectedOption} isOpen={isOpen} setIsOpen={setIsOpen}/>
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
                        <span>Marcar como correto</span>
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
            }}>Adicione uma opção.</ButtonAddOption>}
            {
             options.length < 2 &&
                <p>adicionar mais opções</p>   
            }
            {
                options.length >= 2 && 
                <ButtonSubmit type="submit" name="submit" value={'Crie uma questão'} />
             }
        </Form>
      </>
    );
  }