import styled from "styled-components"
import { colorSegundary } from "./sharedstyles"
import { useState } from "react"
import studyCycle from "../utils/interfaces"
import axios from "axios"

const Form = styled.form`
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
    textarea {
      border: 1px solid ${colorSegundary.textColor};
      border-radius: 0.5rem;
      box-shadow: 0 4px 4px ${colorSegundary.textColor};
      color: ${colorSegundary.textColor};
      font-family: 'Poppins', sans-serif;
      padding: 0.5rem;
      width: 100%;
    }
  }

  p {
    color: ${colorSegundary.error};
    margin: 0;
  }

  @media screen and (min-width: 0) {
    gap: 1rem;
    min-height: 400px;
    width: 300px;

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
        flex-direction: column;
        align-items: center;
        justify-content: center;

        input {
          box-shadow: none;
          height: 20px;
          width: 20px;
        }
      }
    }
  }

  @media screen and (min-width: 768px) {
    background: ${colorSegundary.white};
    box-shadow: 0 8px 8px ${colorSegundary.textColor};
    border-radius: 1rem;
    min-height: 400px;
    width: 600px;

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
        flex-direction: row;

        input {
          margin: 0;
          box-shadow: none;
          height: 20px;
          width: 20px;
        }
      }
    }
  }

  @media screen and (min-width: 1024px) {
    min-height: 500px;
    width: 800px;

    div {
      input,
      textarea {
        width: 480px;
      }

      div {
        flex-direction: row;

        input {
          box-shadow: none;
          height: 20px;
          width: 20px;
        }
      }
    }
  }
`;

const ButtonSubmit = styled.input`
  background: ${colorSegundary.sideColor};
  border: none;
  border-radius: 0.5rem;
  box-shadow: 0 4px 4px ${colorSegundary.textColor};
  color: ${colorSegundary.white};
  margin: 0 auto;
  padding: 0.5em;

  &:hover,
  &:focus,
  &:active {
    cursor: pointer;
    color: ${colorSegundary.sideColor};
    background: ${colorSegundary.white};
    border: 1px solid ${colorSegundary.sideColor};
    border-color: ${colorSegundary.sideColor};
    padding: calc(0.5em - 1px);
  }

  @media screen and (min-width: 0) {
    width: 150px;
  }

  @media screen and (min-width: 768px) {
    width: 175px;
  }

  @media screen and (min-width: 1024px) {
    width: 200px;
  }
`;

const RadioInput = styled.input`
  box-shadow: none;
  color: ${colorSegundary.textColor};
  padding: 0.5rem;
`;

const ButtonAddOption = styled.button`
  background: ${colorSegundary.sideColor};
  border: none;
  border-radius: 0.5rem;
  box-shadow: 0 4px 4px ${colorSegundary.textColor};
  color: ${colorSegundary.white};
  margin: 0 auto;
  padding: 0.5em;

  &:hover,
  &:focus,
  &:active {
    cursor: pointer;
    color: ${colorSegundary.sideColor};
    background: ${colorSegundary.white};
    border: 1px solid ${colorSegundary.sideColor};
    border-color: ${colorSegundary.sideColor};
    padding: calc(0.5em - 1px);
  }

  @media screen and (min-width: 0) {
    width: 150px;
  }

  @media screen and (min-width: 768px) {
    width: 175px;
  }

  @media screen and (min-width: 1024px) {
    width: 200px;
  }
`;

export default function FormStudyCycle( { token, setForm, setFormUpdate}) {
    const [subjects, setSubjects] = useState([]);
    const [days , setDays] = useState(Number)
    const [hours, setHours] = useState(Number)
    
    const handleSubjectNameChange = (index, event) => {
      const updatedSubjects = [...subjects];
      updatedSubjects[index] = {
        ...updatedSubjects[index],
        name: event.target.value
      };
      setSubjects(updatedSubjects);
    };
    

    const handleDifficultyLevelChange = (index, event) => {
      const updatedSubjects = [...subjects];
      updatedSubjects[index] = {
        ...updatedSubjects[index],
        difficultyLevel: event.target.value
      };
      setSubjects(updatedSubjects);
    };
    
    const addSubject = (event) => {
      event.preventDefault();
      if (subjects.length < 21) {
        setSubjects([...subjects, { name: "", difficultyLevel: "", levelHours: 0, CompletedHours: 0}]);
      }
    };
  
    const submitForm = (event) => {
      event.preventDefault();
      const time = days * hours;
      if (subjects.length >= 2 && subjects.length <= 20) {
        const updatedSubjects = subjects.map((element) => {
          let levelHours = 0;
          if (element.difficultyLevel === 'Otimo') {
            levelHours = 1;
          } else if (element.difficultyLevel === 'Bom') {
            levelHours = 2;
          } else if (element.difficultyLevel === 'Médio') {
            levelHours = 3;
          } else if (element.difficultyLevel === 'Ruim') {
            levelHours = 4;
          } else if (element.difficultyLevel === 'Péssimo') {
            levelHours = 5;
          }
          return  {
            ...element,
            levelHours: levelHours,
          }
        });
        let soma  = 0
        for (let i = 0; i < updatedSubjects.length; i++) {
          soma += updatedSubjects[i].levelHours;
        }
        const total =  time / soma
        let newStudyCycle = updatedSubjects.map((e)=> {
          return  {
            ...e,
            levelHours: Math.round(e.levelHours * total)
          }
        })
        setSubjects(newStudyCycle)
        let verify  = 0
        for (let i = 0; i < newStudyCycle.length; i++) {
          verify += newStudyCycle[i].levelHours;
        }
        if (time !== verify) {
          if (time < verify) {
            const studyCycle = newStudyCycle.map((element)=>{
              if (element.levelHours > 2 && element.levelHours !== 2 && verify !== time) {
                element.levelHours = element.levelHours - 1
                verify = verify - 1
              } 
              return{
                ...element
              }
            })
            if (studyCycle.length === 0 ) {
              alert('array vazio')
              console.log(subjects)
            }
            axios.post('/api/study-cycle/',{
              token,
              StudyCycle: studyCycle
            })
            .then(
              setForm(false)
            )
            .catch((err)=>{
              console.log(err.response.data)
              throw new Error("something is wrong");
            })
          }
          if (time > verify) {
            const studyCycle = newStudyCycle.map((element)=>{
              if (element.levelHours > 2  && verify !== time) {
                element.levelHours = element.levelHours + 1
                verify = verify + 1
              } 
              return{
                ...element
              }
            })
            if (studyCycle.length === 0 ) {
              alert('array vazio')
            }
            axios.post('/api/study-cycle/',{
              token,
              StudyCycle: studyCycle
            })
            .then(
              setForm(false)
            )
            .catch((err)=>{
              console.log(err.response.data)
              throw new Error("something is wrong");
            })
          }

        } else {
          if (newStudyCycle.length === 0 ) {
            alert('array vazio')
            console.log(newStudyCycle)
          }
          axios.post('/api/study-cycle/',{
            token,
            StudyCycle: newStudyCycle
          })
          .then(()=>{
            setFormUpdate(true)
            setForm(false)
          })
          .catch((err)=>{
            console.log(err.response.data)
            throw new Error("something is wrong");
          })
        }
      } else {
        throw new Error("something is wrong");
      }
    };
  
    return (
      <Form onSubmit={submitForm}>
        <div>
          <label htmlFor="days">Quantos dias por semana você vai estudar?</label>
          <input type="number" id="days" name="days" min={1} max={7} value={days} onChange={(e)=> setDays(parseInt(e.target.value))} required />
        </div>
        <div>
          <label htmlFor="hours">Quantas horas você vai estudar por dia?</label>
          <input type="number" id="hours" name="hours" value={hours} min={1} max={8} onChange={(e)=> setHours(parseInt(e.target.value))} required />
        </div>
        {subjects.map((subject, index) => (
          <div key={index}>
            <label htmlFor={`subjectName_${index}`}>Qual o nome da matéria?</label>
            <input
              type="text"
              id={`subjectName_${index}`}
              value={subject.name}
              onChange={(event) => handleSubjectNameChange(index, event)}
              required
              minLength={1}
              maxLength={18}
            />
  
            <label htmlFor={`difficultyLevel_${index}`}>Qual seu grau de dificuldade?</label>
            <div>
            <RadioInput
                type="radio"
                name={`difficultyLevel_${index}`}
                value="Otimo"
                checked={subject.difficultyLevel === "Otimo"}
                onChange={(event) => handleDifficultyLevelChange(index, event)}
                required
              />
              <span>Otimo</span>
              <RadioInput
                type="radio"
                name={`difficultyLevel_${index}`}
                value="Bom"
                checked={subject.difficultyLevel === "Bom"}
                onChange={(event) => handleDifficultyLevelChange(index, event)}
                required
              />
              <span>Bom</span>
  
              <RadioInput
                type="radio"
                name={`difficultyLevel_${index}`}
                value="Médio"
                checked={subject.difficultyLevel === "Médio"}
                onChange={(event) => handleDifficultyLevelChange(index, event)}
              />
              <span>Médio</span>
  
              <RadioInput
                type="radio"
                name={`difficultyLevel_${index}`}
                value="Ruim"
                checked={subject.difficultyLevel === "Ruim"}
                onChange={(event) => handleDifficultyLevelChange(index, event)}
              />
              <span>Ruim</span>

              <RadioInput
                type="radio"
                name={`difficultyLevel_${index}`}
                value="Péssimo"
                checked={subject.difficultyLevel === "Péssimo"}
                onChange={(event) => handleDifficultyLevelChange(index, event)}
                required
              />
              <span>Péssimo</span>
            </div>
          </div>
        ))}
  
        
        {subjects.length < 20 && <ButtonAddOption onClick={addSubject}>
          Adicionar uma matéria
        </ButtonAddOption> }
  
        {subjects.length < 2 && <p>Adicione mais matérias</p>}
  
        {subjects.length >= 2 && (
          <ButtonSubmit type="submit" name="submit" value="Criar ciclo de estudos" />
        )}
      </Form>
    );
  }
  