import axios from "axios";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { colors } from "./sharedstyles";
import Link from "next/link";

const List = styled.div`
    display: flex;
    flex-direction: column;
    p{
      display: flex;
      background: ${colors.white};
      border: none;
      border-radius: .5rem;
      box-shadow: 0 4px 4px ${colors.textColor};
      color: ${colors.textColor};
      justify-content: center;
      padding: 1rem;
      width: 150px ;
      &:hover,
      :focus,
      :active {
          cursor: pointer;
          color: ${colors.sideColor};
          padding: calc(1rem - 1px);
          border: 1px solid ${colors.sideColor};
          border-color: ${colors.sideColor};
      }
    }
`;

export default function ListExams({ formUpdate, setFormUpdate }) {
  const { 'token': token } = parseCookies();
  
  const [examList, setExamList] = useState([]);
  
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

    return (
      <>
        <List>
          {examList.map((exam, index) => (
            <Link href={`/exams/${encodeURIComponent(exam)}`} key={index}>
              <p>{exam}</p>
            </Link>
          ))}
          {examList.length == 0 && (
            <p>Você ainda não possui nenhum  simulado</p>
          )}
        </List>
      </>
    );
  }
  