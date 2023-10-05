import styled from "styled-components"
import { Button, ButtonClose, Description, colorSegundary } from "./sharedstyles"
import {  useEffect, useState } from "react"
import { useRouter } from "next/router"
import axios from "axios"
import FormSubject from "./formSubject"
import StudyPieChart from "./StudyPieChart"

const Form = styled.form`
  display: flex;
  flex-direction: column;
  div {
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin: 1rem 0;
    padding: 1rem;
    gap: 1rem;
    text-align: center;
    flex-wrap: wrap;
    span {
      align-content: center;
      align-items: center;
      background: ${colorSegundary.white};
      box-shadow: 0 8px 8px ${colorSegundary.textColor};
      border-radius: 1rem;
      display: flex;
      flex-direction: row;
      flex-grow: 1;
      flex-wrap: wrap;
      flex-grow: 0;
      gap: 1rem;
      min-height: 120px;
      justify-content: space-evenly;
      padding: 1rem;
      transition: 0.5s;
      width: 300px;
      label {
        color: ${colorSegundary.textColor};
        font-size: 1.2rem;
        font-weight: 400;
      }
      div {
        display: flex;
        align-items: center;
        margin: 0;
        padding: 0;
      }
      input,
      textarea {
        border: 1px solid ${colorSegundary.textColor};
        border-radius: 0.5rem;
        box-shadow: 0 4px 4px ${colorSegundary.textColor};
        font-family: "Poppins", sans-serif;
        text-align: center;
      }
      div{
        div{
          width: 100%;
        }
      }
    }
  }

  p {
    margin: 0;
    transition: .2s;
  }

  @media screen and (min-width: 0) {
    gap: 1rem;
    min-height: 400px;
    width: 300px;

    div {
      span {
        label {
          font-size: 1rem;
          font-weight: 400;
        }

        input {
          box-shadow: none;
          width: 100%;
        }
      }
    }
  }

  @media screen and (min-width: 768px) {
    min-height: 400px;
    width: 600px;

    div {
      span {
        label {
          font-size: 1.2rem;
          font-weight: 600;
        }
        input {
          box-shadow: none;
          width: 100%;
        }
      }
    }
  }

  @media screen and (min-width: 1024px) {
    min-height: 500px;
    width: 800px;
    div {
      span {
        label {
          font-size: 1.2rem;
          font-weight: 600;
        }

        input {
          box-shadow: none;
          width: 100%;
        }
      }
    }
  }
`;
const ButtonInput = styled.button`
  align-items: center;
  background: ${colorSegundary.sideColor};
  border: none;
  border-radius: 0.5rem;
  box-shadow: 0 4px 4px ${colorSegundary.textColor};
  color: ${colorSegundary.white};
  display: flex;
  justify-content: center;
  margin: 1rem auto;
  padding: 0.5em;
  &:hover,
  :focus,
  :active {
    cursor: pointer;
    color: ${colorSegundary.sideColor};
    background: ${colorSegundary.white};
    border: 1px solid ${colorSegundary.sideColor};
    border-color: ${colorSegundary.sideColor};
    padding: calc(0.5em - 1px);
  }
  @media screen and (min-width: 0) {
    height: 30px;
    width: 30px;
  }
  @media screen and (min-width: 768px) {
    height: 30px;
    width: 30px;
  }
  @media screen and (min-width: 1024px) {
    height: 30px;
    width: 30px;
  }
`;
const CompletedDiv = styled.p`
  background: ${colorSegundary.principalColor};
  border: none;
  border-radius: .5rem;
  box-shadow: 0 4px 4px ${colorSegundary.textColor};
  color: ${colorSegundary.white};
  margin: 1rem auto;
  padding: .5rem;
  &:hover,
  :focus,
  :active {
      cursor: pointer;
      color: ${colorSegundary.principalColor};
      background: ${colorSegundary.white};
      border: 1px solid ${colorSegundary.principalColor};
      border-color: ${colorSegundary.principalColor};
      padding: calc(.5rem - 1px);
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

export default function UserStudyCycle({ StudyCycle,token }) {
  const [clickClose ,setClickClose] = useState(false)
  const [clickIncrementHours, setClickIncrementHours] = useState(false);
  const [clickDincrementHours, setClickDincrementHours] = useState(false);
  const [clickIncrementLevelHours, setClickIncrementLevelHours] = useState(false);
  const [clickDincrementLevelHours, setClickDincrementLevelHours] = useState(false);
  const [clickStudy, setClickStudy] = useState(false);
  const [clickReset, setClickReset] = useState(false);
  const[index, setIndex]= useState<number>()
  const [newSubject , setNewSubject] = useState(false)
  const [newSubjectName, setNewSubjectName] = useState('')
  const [newSubjectNumber, setNewSubjectNumber] = useState(0)
  const [newSubjectDifficultyLevel, setNewSubjectDifficultyLevel] = useState('Otimo')
  const [ hoursForWeeks , setHoursForWeeks] = useState<number>()

  const router = useRouter()
  const [edit, setEdit] = useState(false);
  useEffect(()=>{
    if (clickStudy === true) {
      StudyCycle[index].CompletedHours++
      
      axios.put('/api/study-cycle/set-subjects',{
        token,
        StudyCycle
      })
      .then(()=>{
        setClickStudy(false)
      })
      .catch(()=>{
        setClickStudy(false)
        throw new Error("Something went wrong");
      })
    }
    if (clickDincrementHours === true) {
      StudyCycle[index].CompletedHours--
      setClickDincrementHours(false)
    } 
    if (clickIncrementHours === true) {
      StudyCycle[index].CompletedHours++
      setClickIncrementHours(false)
    }
    if (clickDincrementLevelHours  === true) {
      StudyCycle[index].levelHours--
      setClickDincrementLevelHours(false)
    }
    if (clickIncrementLevelHours === true) {
      StudyCycle[index].levelHours++
      setClickIncrementLevelHours(false)
    }
    if (clickReset === true) {
      for (let i = 0; i < StudyCycle.length; i++) {
        StudyCycle[i].CompletedHours = 0;
      }
      axios.put('/api/study-cycle/set-subjects',{
        token,
        StudyCycle
      })
      .then(()=>{
        setClickReset(false)
      })
      .catch(()=>{
        setClickReset(false)
        throw new Error("Something went wrong")
      })
    }
    if (clickClose === true) {
      StudyCycle.splice(index,1)
      axios.put('/api/study-cycle/set-subjects',{
        token,
        StudyCycle
      })
      .then(()=>{
        setClickClose(false)
      })
    }
    setHoursForWeeks(StudyCycle.reduce((accumulator, element) => accumulator + element.levelHours, 0) - StudyCycle.reduce((accumulator,element) => accumulator + element.CompletedHours, 0))
  },[clickStudy,clickDincrementHours, clickIncrementHours,clickDincrementLevelHours, clickIncrementLevelHours,clickReset, clickClose])
  return (
    <>
      <Form>
        <ButtonClose onClick={(e)=>{
          e.preventDefault()
          router.push('/dashboard')
        }}><img src="/icons/close.png"/></ButtonClose>
        <div>
          {StudyCycle.map(
            (
              element: {
                levelHours: number;
                CompletedHours: number;
                name: string;
              },
              index
            ) => (
              <span key={index}>
                {edit === true &&
                <ButtonClose onClick={(e)=>{
                  e.preventDefault()
                  setIndex(index)
                  setClickClose(true)
                }}><img src="/icons/close.png"/></ButtonClose>
                }
                <label>{element.name}</label>
                <div>
                  {edit === false && (
                    <>
                      <p>
                        {element.CompletedHours}/{element.levelHours}
                      </p>
                      {
                        element.levelHours <= element.CompletedHours &&(
                          <CompletedDiv>Completou</CompletedDiv>
                        )
                      }
                      {element.levelHours > element.CompletedHours && (
                        <Button
                          onClick={(e) => {
                            e.preventDefault();
                            setIndex(index)
                            setClickStudy(true)
                          }}>
                          Estudei 1h
                        </Button>
                      )}
                    </>
                  )}
                  {edit === true && (
                    <>
                      <div>
                        <ButtonInput
                          onClick={(e) => {
                            e.preventDefault();
                            if (element.CompletedHours > 0) {
                              setIndex(index)
                              setClickDincrementHours(true)
                            }
                          }}
                        >
                          -
                        </ButtonInput>

                        <p>{element.CompletedHours}</p>

                        <ButtonInput
                          onClick={(e) => {
                            e.preventDefault();
                            if (element.levelHours > element.CompletedHours) {
                              setIndex(index)
                              setClickIncrementHours(true)
                            }
                          }}
                        >
                          +
                        </ButtonInput>
                      </div>
                      <p>/</p>
                      <div>
                        <ButtonInput
                          onClick={(e) => {
                            e.preventDefault();
                            if (
                              element.levelHours > 0 &&
                              element.CompletedHours < element.levelHours
                            ) {
                              setIndex(index)
                              setClickDincrementLevelHours(true)
                            }
                          }}
                        >
                          -
                        </ButtonInput>
                      <p>{element.levelHours}</p>
                      <ButtonInput
                        onClick={(e) => {
                          e.preventDefault();
                          setIndex(index)
                          setClickIncrementLevelHours(true)
                        }}
                      >
                        +
                      </ButtonInput>
                      </div>
                    </>
                  )}
                </div>
              </span>
            )
          )}
        </div>
        <div>
          { edit === true &&
            <span>
            {
              newSubject === false &&
              <>
                <p>Criar nova materia?</p>
                <Button onClick={(e)=>{
                  e.preventDefault()
                  setNewSubject(true)
                }} >Nova matéria</Button>
              </>
            }
            {
              newSubject === true &&
              <FormSubject newSubjectName={newSubjectName} setNewSubjectName={setNewSubjectName} newSubjectNumber={newSubjectNumber} setNewSubjectNumber={setNewSubjectNumber} newSubjectDifficultyLevel={newSubjectDifficultyLevel} setNewSubjectDifficultyLevel={setNewSubjectDifficultyLevel} StudyCycle={StudyCycle}/>
            }
          </span>
          }
          {hoursForWeeks != 0 && edit === false &&
            <span>
              <div>
                Você precisa estudar {hoursForWeeks} horas essa semana.
              </div>
            </span>
          }
          {hoursForWeeks === 0 && edit === false &&
              <span>
                <div>
                  Bom Trabalho!
                </div>
              </span>
          }
        </div>
        {edit === false && (
          <Button
            onClick={(e) => {
              e.preventDefault();
              setEdit(true);
            }}
          >
            Editar
          </Button>
        )}
        {edit === true && (
          <Button
            onClick={(e) => {
              e.preventDefault();
              axios.put('/api/study-cycle/set-subjects',{
                token,
                StudyCycle
              })
              .then(()=>{
                setEdit(false)
                setHoursForWeeks(StudyCycle.reduce((total, objeto) => total + objeto.levelHours, 0) - StudyCycle.reduce((total,objeto) => total + objeto.CompletedHours, 0))
              })
              .catch(()=>{
                setEdit(false)
                throw new Error("Something went wrong")
              })
            }}
          >
            Terminar de Editar
          </Button>
        )}
        <Button onClick={(e)=>{
          e.preventDefault()
          setClickReset(true)
        }} >Reset</Button>
      </Form>
      <Description>
        <p>O ciclo de estudos é uma técnica de estudo para melhoria da aprendizagem e gestão do tempo. É muito utilizada por aprovados em concursos difíceis e pode ser utilizado para qualquer tipo de prova ou estudo, sendo quase obrigatório para quem pretenda estudar com alto desempenho.</p>

        <StudyPieChart StudyCycle={StudyCycle}/>

        <p>O método de ciclo de estudos considera a sequência de disciplinas que devem ser estudadas em uma ordem determinada anteriormente, independentemente do dia ou horário que você vá estudar. Nesse caso, caso você não consiga terminar uma matéria por algum motivo, será possível recomeçar os estudos a partir de onde parou no ciclo.</p>

        <p>Um dos benefícios do ciclo de estudos é que ele permite uma maior flexibilidade no seu plano de estudo e adapta-se a imprevistos e a sua rotina. Além disso, ele ajuda a ter uma visão real do tempo disponível de estudo, dá a importância correta de tempo para cada matéria e leva em consideração apenas o tempo líquido de estudo. Isso pode tornar suas horas dedicadas ao aprendizado muito mais produtivas.</p>
      </Description>              
    </>
  );
}
