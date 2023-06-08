import styled from "styled-components";
import { Button, ButtonClose, colors } from "./sharedstyles";
import {  useEffect, useState } from "react";
import { useRouter } from "next/router";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  div {
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
      background: ${colors.white};
      box-shadow: 0 8px 8px ${colors.textColor};
      border-radius: 1rem;
      display: flex;
      flex-direction: row;
      flex-grow: 1;
      flex-wrap: wrap;
      flex-grow: 0;
      gap: 1rem;
      height: 120px;
      justify-content: space-evenly;
      padding: 1rem;
      transition: 0.5s;
      width: 300px;
      label {
        color: ${colors.textColor};
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
        border: 1px solid ${colors.textColor};
        border-radius: 0.5rem;
        box-shadow: 0 4px 4px ${colors.textColor};
        color: ${colors.textColor};
        font-family: "Poppins", sans-serif;
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
  background: ${colors.sideColor};
  border: none;
  border-radius: 0.5rem;
  box-shadow: 0 4px 4px ${colors.textColor};
  color: ${colors.white};
  display: flex;
  justify-content: center;
  margin: 1rem auto;
  padding: 0.5em;
  &:hover,
  :focus,
  :active {
    cursor: pointer;
    color: ${colors.sideColor};
    background: ${colors.white};
    border: 1px solid ${colors.sideColor};
    border-color: ${colors.sideColor};
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
background: ${colors.principalColor};
border: none;
border-radius: .5rem;
box-shadow: 0 4px 4px ${colors.textColor};
color: ${colors.white};
margin: 1rem auto;
padding: .5rem;
&:hover,
:focus,
:active {
    cursor: pointer;
    color: ${colors.principalColor};
    background: ${colors.white};
    border: 1px solid ${colors.principalColor};
    border-color: ${colors.principalColor};
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

export default function UserStudyCycle({ StudyCycle }) {
  const [clickIncrementHours, setClickIncrementHours] = useState(false);
  const [clickDincrementHours, setClickDincrementHours] = useState(false);
  const [clickIncrementLevelHours, setClickIncrementLevelHours] = useState(false);
  const [clickDincrementLevelHours, setClickDincrementLevelHours] = useState(false);
  const [clickStudy, setClickStudy] = useState(false);
  const [clickReset, setClickReset] = useState(false);
  const[index, setIndex]= useState<number>()

  const router = useRouter()
  const [edit, setEdit] = useState(false);

  useEffect(()=>{
    if (clickStudy === true) {
      StudyCycle[index].CompletedHours++
      setClickStudy(false)
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
      setClickReset(false)
    }
  },[clickStudy,clickDincrementHours, clickIncrementHours,clickDincrementLevelHours, clickIncrementLevelHours,clickReset])
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

                      <p>/</p>
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
                    </>
                  )}
                </div>
              </span>
            )
          )}
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
              setEdit(false);
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
    </>
  );
}
