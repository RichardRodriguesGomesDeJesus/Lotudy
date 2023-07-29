import styled from "styled-components";
import { Button, colorSegundary } from "./sharedstyles";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const Form = styled.div`
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
  transition:1s;
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

  @media screen and (min-width: 0) {
    min-width: 100%;
  }

  @media screen and (min-width: 768px) {
    min-width: 175px;
  }

  @media screen and (min-width: 1024px) {
    min-width: 200px;
  }
`;

export default function Questions({questionList, setEdit, token , examName}) {
  const router = useRouter()
  const [questionSelect, setQuestionSelect] = useState(0)
  const [update, setUpdate] = useState(false)
  function save(questions, token) {
    axios.put('/api/exams/put-questions', {
        token,
        questions,
        title: examName
      })
      .then((res) => {
        setEdit(false)
      })
      .catch((err) => {
        router.push('/login')
      });
  }
  return(
   <>
    {update === false && questionList.length > 0 &&
      <>
        <input type="range" onChange={(e)=>{
          setQuestionSelect(parseInt(e.target.value))
        }} value={questionSelect} min={0} max={questionList.length -1}/>
      </>
    }
    <Form>
      {update === false && questionList.length > 0 &&(
        <>
          <p>{questionList[questionSelect].text}</p>
          {questionList[questionSelect].img &&
          <img src={questionList[questionSelect].img} />
          }
          {questionList[questionSelect].options.map((option, index)=>(
            <Option key={index}><div>{String.fromCharCode(65 + index)}</div><p>{option}</p></Option>
          ))}
          <Button onClick={()=>{
              questionList.splice( questionSelect, 1)
              setQuestionSelect(0)
              setUpdate(true)
            }}>Deletar questão</Button>
        </>
      )}
      {update === true &&(
        <>
          <p>Questão deletada</p>
          <Button onClick={()=>{
            setUpdate(false)
          }}>Voltar a editar</Button>
        </>
      )}
      {questionList.length === 0 && update === false &&(
        <p>Não ha questões</p>
      )}
    </Form>
    <Button onClick={()=>{
      save(questionList,token)}} >Terminar de editar</Button>
   </>
  )
}