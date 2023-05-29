import axios from "axios";
import { useState } from "react";
import styled from "styled-components";
import { colors } from "./sharedstyles";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: 1rem 0;
  padding: 1rem;
  text-align: center;

  p {
    color: ${colors.textColor};
    margin: 1rem;
    font-weight: 400;
  }

  @media screen and (min-width: 0) {
    gap: 1rem;
    min-height: 400px;
    width: 300px;

    p {
      font-size: 1rem;
    }
  }

  @media screen and (min-width: 768px) {
    background: ${colors.white};
    box-shadow: 0 8px 8px ${colors.textColor};
    border-radius: 1rem;
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
  background: ${colors.white};
  border: 1px solid ${colors.sideColor};
  border-radius: 0.5rem;
  box-shadow: 0 4px 4px ${colors.textColor};
  color: ${colors.textColor};
  display: flex;
  margin: 0 auto;
  text-align: center;
  padding: 0;

  div {
    background: ${colors.sideColor};
    border-radius: 0.25rem;
    color: ${colors.white};
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

  @media screen and (min-width: 0) {
    min-width: 150px;
  }

  @media screen and (min-width: 768px) {
    min-width: 175px;
  }

  @media screen and (min-width: 1024px) {
    min-width: 200px;
  }
`;

const ButtonNext = styled.button`
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

const MessageForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: 1rem 0;
  padding: 1rem;
  text-align: center;

  p {
    color: ${colors.textColor};
    margin: 1rem;
    font-weight: 400;
  }
  @media screen and (min-width: 0) {
    gap: 1rem;
    min-height: 200px;
    width: 150px;

    p {
      font-size: 1rem;
    }
  }

  @media screen and (min-width: 768px) {
    background: ${colors.white};
    box-shadow: 0 8px 8px ${colors.textColor};
    border-radius: 1rem;
    min-height: 200px;
    width: 300px;

    p {
      font-size: 1.2rem;
    }
  }

  @media screen and (min-width: 1024px) {
    min-height: 250px;
    width: 400px;
  }
`
export default function Question({ token, examName, setQuestion }) {
  const [questionsText, setQuestionsText] = useState([]);
  const [questionsOptions, setQuestionsOptions] = useState([]);
  const [ correctOption, setCorrectOption ] = useState('')
  const [indexQuestion, setIndexQuestion ] = useState(0)
  const [endForm, setEndForm] = useState(false)
  const [error , setError] = useState(false)
  const [answeredCorrectly, setAnsweredCorrectly] = useState(false);
  const [request, setRequest] = useState(false);

  if (request === false) {
    axios
      .post("/api/exams/getQuestions", {
        title: examName,
        token,
      })
      .then((res) => {
        const listText = res.data.exam.questions.map((question) => question.text);
        setQuestionsText(listText);
        const listOptions = res.data.exam.questions.map((question) => question.options);
        setQuestionsOptions(listOptions);
        const correct = res.data.exam.questions.map((questions)=> questions.correctOption)
        setCorrectOption(correct)
        setRequest(true);
      })
      .catch((err) => {
        console.log(err);
        setRequest(true);
      });
  }
  function NextQuestion() {
    if (indexQuestion + 1 >= questionsText.length){
      setEndForm(true)
  } else {
      setIndexQuestion( indexQuestion + 1)
  }
  }

  return (
    <>  
        {
          endForm === true &&
          <MessageForm>
              <p>Você Terminou o simulado</p>
              <ButtonNext onClick={(e)=>{
                e.preventDefault()
                setQuestion(false)
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
            {questionsOptions[indexQuestion].map((option, index) => (
              <Option
                onClick={(e) => {
                  e.preventDefault();
                  if (option == correctOption) {
                    setAnsweredCorrectly(true)
                  } else {
                    setError(true)
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
