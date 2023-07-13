import axios from "axios";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, ButtonClose, colors } from "./sharedstyles";
import Link from "next/link";

const List = styled.div`
    align-items: center;
    display: flex;
    flex-flow: row wrap;
    gap: 1rem;
    padding: 1rem;
    div,a{
      box-shadow: 0 4px 20px ${colors.textColor};
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background: ${colors.white};
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
        color: ${colors.principalColor};
        border-color: ${colors.titleColor};
      }
    }
`;

export default function ListExams({ formUpdate, setFormUpdate }) {
  const { 'token': token } = parseCookies();
  
  const [examList, setExamList] = useState([]);
  const [edit, setEdit] = useState(false)
  
  useEffect(() => {
    const fetchExams = async () => {
    try {
      const response = await axios.post('/api/exams/getExams', {
        token,
      });
      setExamList(response.data.list);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchExamsAndUpdateList = async () => {
    if (token) {
      await fetchExams();
    }
  };

  fetchExamsAndUpdateList();
  setFormUpdate(false)
  }, [token,formUpdate === true]);
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
              <Link href={`/exams/${encodeURIComponent(exam)}`} key={index}>
                <h3>{exam}</h3>
              </Link>
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
  