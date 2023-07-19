import styled from "styled-components";
import { Button, colorSegundary } from "./sharedstyles";
import { useEffect, useState } from "react";

const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: 1rem 0;
  padding: 1rem;
  text-align: center;

  div {
    align-items: center;
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    flex-wrap: wrap;
    justify-content: space-evenly;

    label {
      font-size: 1.2rem;
      font-weight: 400;
      width: 100%;
    }

    input,
    textarea,select {
      border: 1px solid ${colorSegundary.textColor};
      border-radius: 0.5rem;
      box-shadow: 0 4px 4px ${colorSegundary.textColor};
      font-family: 'Poppins', sans-serif;
      padding: 0.5rem;
      text-align: center;
      width: 100%;
    }
    div{
        input {
            margin: 0;
            box-shadow: none;
            height: 20px;
            width: 20px;
          }
    }
  }

  p {
    color: ${colorSegundary.error};
    margin: 0;
  }

  @media screen and (min-width: 0) {
    gap: 1rem;

    div {
      gap: 1rem;

      label {
        color: ${colorSegundary.sideColor};
        font-size: 1rem;
        font-weight: 400;
      }

      input,
      textarea {
        width: 250px;
      }

      div {
        display: flex;
        width: 50%;
        justify-content: space-around;
        align-items: center;
      }
    }
  }

  @media screen and (min-width: 768px) {
    div {
      label {
        color: ${colorSegundary.sideColor};
        font-size: 1.2rem;
        font-weight: 600;
      }

      input,
      textarea {
        width: 420px;
      }

      div {
        display: flex;
        width: 50%;
        justify-content: space-around;
        align-items: center;
      }
    }
  }

  @media screen and (min-width: 1024px) {

    div {
      input,
      textarea {
        width: 480px;
      }

      div {
        flex-direction: row;

        div{
            display: flex;
            width: 50%;
            justify-content: space-around;
            align-items: center;
        }
      }
    }
  }
`;
export default function FormSubject({newSubjectName, setNewSubjectName, newSubjectNumber, setNewSubjectNumber,newSubjectDifficultyLevel, setNewSubjectDifficultyLevel, StudyCycle}) {
  return(
    <Div>
      <div>
        <label htmlFor="">Nome da materia</label>
        <input type="text" name="suject" minLength={3} maxLength={20} onChange={(e)=>{
          setNewSubjectName(e.target.value)
        }} value={newSubjectName} required />
      </div>
      <div>
        <label htmlFor="">Quantas horas por semana você quer estudar?</label>
        <input type="number" min={2} max={10}  onChange={(e)=>{
          setNewSubjectNumber(e.target.value)
        }} value={newSubjectNumber}  required/>
      </div>
      <div>
        <label htmlFor="">Nivel de dificuldade</label>
        <select value={newSubjectDifficultyLevel} onChange={(e)=>{
          setNewSubjectDifficultyLevel(e.target.value)
        }} >
          <option value="Otimo">Otimo</option>
          <option value="Bom">Bom</option>
          <option value="Médio">Medio</option>
          <option value="Ruim">Ruim</option>
          <option value="Pessimo">Pessimo</option>
        </select>
      </div>
      <Button onClick={(e)=>{
        e.preventDefault()
        if (newSubjectName !=='' && newSubjectNumber !== 0 && newSubjectDifficultyLevel !== '') {
          StudyCycle.push({name: newSubjectName, difficultyLevel: newSubjectDifficultyLevel, levelHours: parseInt(newSubjectNumber), CompletedHours: 0})
          setNewSubjectName('')
          setNewSubjectNumber(0)
          setNewSubjectDifficultyLevel('Otimo')
        }

      }} >Criar</Button>
    </Div>
  )
}