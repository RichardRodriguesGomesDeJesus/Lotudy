import axios from "axios";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, ButtonClose, NavLink, colorSegundary } from "./sharedstyles";
import Link from "next/link";

const List = styled.div`
    align-items: center;
    display: flex;
    flex-flow: row wrap;
    gap: 1rem;
    padding: 1rem;
    div,a{
      box-shadow: 0 4px 20px ${colorSegundary.textColor};
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background: ${colorSegundary.white};
      text-align: center;
      padding: 1rem;
      color: inherit;
      text-decoration: none;
      border-radius: 10px;
      height:200px;
      width: 200px;
      &:hover,
      :focus,
      :active {
        cursor: pointer;
        color: ${colorSegundary.principalColor};
        border-color: ${colorSegundary.titleColor};
      }
    }
`;

export default function ListExams({ formUpdate, setFormUpdate, examList, setExamList}) {
  const { 'token': token } = parseCookies();
  const [edit, setEdit] = useState(false)
  
  function Delete(exam) {
    axios.put('api/exams/putExam',{
      token,
      title: exam
    })
    .then((res)=>{
      setFormUpdate(true)
      if (examList.length == 1) {
        setEdit(false)
      }
    })
    .catch((err)=>console.log(err))
    
  }
    return (
      <>
        <List>
          {edit === false&&(
            examList.map((exam, index) => (
              <NavLink href={`/exams/${encodeURIComponent(exam)}`} key={index}>
                <h3>{exam}</h3>
              </NavLink>
            ))
          )}
          {edit === true&&(
            examList.map((exam,index)=>(
              <span key={index}>
                <ButtonClose onClick={()=>{
                  Delete(exam)
                }}><img src="/icons/close.png" alt="delete" /></ButtonClose>
                <div>
                  <h3>{exam}</h3>
                </div>
              </span>
            ))
          )}
          {examList.length == 0 && (
            <p>You don't have any exams yet</p>
          )}
        </List>
        {examList.length > 0 && edit === false &&(
          <Button onClick={()=>{
            setEdit(true)
          }} >edit</Button>
        )}
        {examList.length > 0 && edit === true &&(
          <Button onClick={()=>{
            setEdit(false)
          }} >finish editing</Button>
        )}
      </>
    );
  }
  