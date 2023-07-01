import styled from "styled-components"
import { colors } from "./sharedstyles"
import { useState } from "react"
import axios from "axios"
import { parseCookies } from "nookies"

const Form =styled.form`
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
      justify-content: space-around;
      label{
          
      }
      input{
          border: 1px solid ${colors.textColor};
          border-radius: .5rem;
          box-shadow: 0 4px 4px ${colors.textColor};
          padding: .5rem;
      }
      span{
          color: ${colors.error};
          display: none;
      }
      
  }
  button{
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
      }
  }
  @media screen and (min-width: 0 ){
      background: ${colors.white};
      box-shadow: 0 8px 8px ${colors.textColor};
      border-radius: 1rem;
      gap:1rem;
      height: 250px;
      width: 300px;
      div{
          gap: .5rem;
          label{
              color: ${colors.sideColor};
              font-size:1rem;
              font-weight: 400;
          }
          input{
              width: 250px;
          }
      }
      p{
          color: ${colors.error};
          margin: 0;
      }
    };
  @media screen and (min-width: 768px ){
      background: ${colors.white};
      box-shadow: 0 8px 8px ${colors.textColor};
      border-radius: 1rem;
      height: 350px;
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
      }
  };
  @media screen and (min-width: 1024px) {
      background: ${colors.white};
      box-shadow: 0 8px 8px ${colors.textColor};
      border-radius: 1rem;
      height: 400px;
      width: 800px;
      div{
          label{
              color: ${colors.sideColor};
              font-size:1.5rem;
              font-weight: 600;

          }
          input{
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

export default function FormCards({setForm,  setUpdateCards}) {
  const [textFront, setTextFront] = useState('')
  const [textBack, setTextBack] = useState('')
  const { 'token': token } = parseCookies();
  function submit() {
    setForm(false)
    const card = {
        token,
        text:textFront,
        correctAnswer:textBack,
        time: ''
    }
    axios.put('/api/decks/set-cards', card)
    .then((res)=>{
      console.log(res.data)
      setUpdateCards(true)
    })
    .catch((err)=>console.log(err))
  }
  return (
    <>
      <Form  onSubmit={(e)=>{
        e.preventDefault()
        submit()
      }}>
        <div>
          <label htmlFor="front">Front</label>
          <input type="text" name="front"  maxLength={70} onChange={(e)=>{
            setTextFront(e.target.value)
          }} value={textFront} required/>
        </div>
        <div>
          <label htmlFor="back">Back</label>
          <input type="text" name="back" maxLength={70} onChange={(e)=>{
            setTextBack(e.target.value)
          }} value={textBack} required/>
        </div>
        <ButtonSubmit type="submit" name="submit" value={'Criar Card'}/>
      </Form>
    </>
  )
}