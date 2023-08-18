import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { colorSegundary } from "./sharedstyles";
import { time } from "console";

const Timer = styled.div`
  align-items: center;
  background: ${colorSegundary.white};
  box-shadow: 0 8px 8px ${colorSegundary.textColor};
  border-radius: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 1rem 0;
  padding: 1rem;
  text-align: center;
  height: 40px;
  width: 300px;
  p {
    color: ${colorSegundary.textColor};
    margin: 1rem;
    font-weight: 400;
  }
`

const Form = styled.form`
  align-items: center;
  background: ${colorSegundary.white};
  box-shadow: 0 8px 8px ${colorSegundary.textColor};
  border-radius: 1rem;
  display: flex;
  flex-direction: column; 
  justify-content: space-around;
  margin: 1rem 0;
  padding: 1rem;
  text-align: justify;

  p {
    color: ${colorSegundary.textColor};
    margin: 1rem;
    font-weight: 400;
  }

  @media screen and (min-width: 0) {
    gap: 1rem;
    min-height: 400px;
    width: 100%;

    p {
      font-size: 1rem;
    }
    img{
      width:100%;
    }
  }

  @media screen and (min-width: 768px) {
    min-height: 400px;
    width: 600px;
    p {
      font-size: 1.2rem;
    }
  }

  @media screen and (min-width: 1024px) {
    min-height: 500px;
    width: 800px;
  }
`;

const Option = styled.button`
  align-items: flex-start;
  background: ${colorSegundary.white};
  border: 1px solid ${colorSegundary.sideColor};
  border-radius: 0.5rem;
  box-shadow: 0 4px 4px ${colorSegundary.textColor};
  color: ${colorSegundary.textColor};
  display: flex;
  margin: 0 auto;
  text-align: center;
  padding: 0;
  width: 100%;

  div {
    background: ${colorSegundary.sideColor};
    border-radius: 0.25rem;
    color: ${colorSegundary.white};
    padding: 5px;
    margin: 0;
  }

  p {
    font-weight: 400;
    flex-grow: 1;
    margin: auto 0.25rem;
  }

  &:hover,
  :focus,
  :active {
    cursor: pointer;
  }
`;

const ButtonNext = styled.button`
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

const MessageForm = styled.div`
  background: ${colorSegundary.white};
  border: 1px solid ${colorSegundary.sideColor};
  border-radius: 0.5rem;
  box-shadow: 0 4px 4px ${colorSegundary.textColor};
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: 1rem 0;
  padding: 1rem;
  text-align: center;

  p {
    color: ${colorSegundary.textColor};
    margin: 1rem;
    font-weight: 400;
  }
  @media screen and (min-width: 768px) {
    min-height: 400px;
    width: 600px;
    p {
      font-size: 1.2rem;
    }
  }

  @media screen and (min-width: 1024px) {
    min-height: 500px;
    width: 800px;
  }
`
export default function Question({ token, examName, setQuestion, questionList, clickCard, setClickCard}) {
  const [questionsText, setQuestionsText] = useState([]);
  const [questionsOptions, setQuestionsOptions] = useState([]);
  const [ correctOption, setCorrectOption ] = useState('')
  const [indexQuestion, setIndexQuestion ] = useState(0)
  const [endForm, setEndForm] = useState(false)
  const [error , setError] = useState(false)
  const [answeredCorrectly, setAnsweredCorrectly] = useState(false);
  const [request, setRequest] = useState(false);
  const [cont, setCont]= useState<number>(0)
  const [active, setActive] = useState(false)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [mistakes, setMistakes] = useState(0)
  const [ questionsUrlImg , setQuestionsUrlImg] = useState([])

  if (request === false) {
    const listText = questionList.map((question) => question.text);
    setQuestionsText(listText);
    const listOptions = questionList.map((question) => question.options);
    setQuestionsOptions(listOptions);
    const correct = questionList.map((questions)=> questions.correctOption)
    setCorrectOption(correct)
    const url = questionList.map((questions)=> questions.img)
    setQuestionsUrlImg(url)
    setRequest(true)
  }
  function NextQuestion() {
    if (indexQuestion + 1 >= questionsText.length){
      setEndForm(true)
      axios.put('/api/exams/put-exam',{
        correctAnswers: correctAnswers,
        mistakes: mistakes,
        time: cont,
        title: examName,
        token
      })
      .then()
      .catch((err)=>{console.log(err)})
  } else {
      setIndexQuestion( indexQuestion + 1)
      setAnsweredCorrectly(false)
      setError(false)
  }
  }
  useEffect(()=>{
    if (active === false && endForm === false) {
      setActive(true)
    } else {
      setActive(false)
    }
  },[endForm])
  useEffect(() => {
    let intervalId: string | number | NodeJS.Timer;
    
    if (endForm === false && active === true) {
      intervalId = setInterval(() => {
        setCont((cont) => cont + 1);
      }, 1000)
    } else {
      clearInterval(intervalId);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [active])

  const hors = Math.floor( cont / 3600)
  const minutes = Math.floor((cont % 3600)/ 60)
  const seconds = cont % 60

  const [horsDozens , horsUnits] = String(hors).padStart(2, '0')
  const [minutesDozens , minutesUnits] = String(minutes).padStart(2, '0')
  const [secondsDozens , secondsUnits] = String(seconds).padStart(2, '0')
  return (
    <>  
        {
          endForm === false &&(
            <Timer>
              <span>{horsDozens}</span>
              <span>{horsUnits}</span>
              <span>:</span>
              <span>{minutesDozens}</span>
              <span>{minutesUnits}</span>
              <span>:</span>
              <span>{secondsDozens}</span>
              <span>{secondsUnits}</span>
            </Timer>
          )
        }
        {
          endForm === true &&
          <MessageForm>
              <p>
                Você Terminou o simulado em {hors > 0 && `${hors} horas`} {minutes > 0 && `${minutes} minutos`} {seconds > 0 && `${seconds} segundos`} com {mistakes} erros e {correctAnswers} acertos
              </p>
              <ButtonNext onClick={(e)=>{
                e.preventDefault()
                if (clickCard == true) {
                  setClickCard(false)
                  setQuestion(false)
                } else {
                  setClickCard(false)
                  setQuestion(false)
                }
              }}>Voltar</ButtonNext>
            </MessageForm>
        }
        {
           answeredCorrectly === true && error === false && endForm === false &&
            <MessageForm>
              <p>Você Acertou</p>
              <ButtonNext onClick={(e)=>{
                e.preventDefault()
                NextQuestion()
              }}>Proxima pergunta</ButtonNext>
            </MessageForm>
        }
        {
          error === true && answeredCorrectly === false && endForm === false &&
            <MessageForm>
              <p>Você errou</p>
              <ButtonNext onClick={(e)=>{
                e.preventDefault()
                NextQuestion()
              }}>Proxima pergunta</ButtonNext>
            </MessageForm>
        }
        {questionsOptions.length > 0 && questionsText.length > 0 && error === false &&
         answeredCorrectly === false && endForm === false &&
        (
          <Form>
            <p>{questionsText[indexQuestion]}</p>
            {questionsUrlImg[indexQuestion] !== undefined && (
              <img src={questionsUrlImg[indexQuestion]} />
            )}
            {questionsOptions[indexQuestion].map((option, index) => (
              <Option
                onClick={(e) => {
                  e.preventDefault();
                  if (option == correctOption[indexQuestion]) {
                    setAnsweredCorrectly(true)
                    setCorrectAnswers( correctAnswers + 1)
                  } else {
                    setError(true)
                    setMistakes(mistakes + 1)
                  }
                }}
                key={index}
              >
                <div>{String.fromCharCode(65 + index)}</div>
                <p>{option}</p>
              </Option>
            ))}
          </Form>
        )}
    </>
  );
}
