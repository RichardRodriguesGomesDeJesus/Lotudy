import styled from "styled-components";
import { Button, ButtonClose, colors } from "./sharedstyles";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  flex-flow: row wrap;
  width: 100%;
  margin: 1rem;

  @media (max-width: 768px) {
    height: auto;
  }
`;

const Decks = styled.div`
  box-shadow: 0 4px 20px ${colors.textColor};
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  background: ${colors.white};
  text-align: center;
  padding: 0;
  color: inherit;
  text-decoration: none;
  border-radius: 10px;
  transition: color 0.15s ease, border-color 0.15s ease;
  height:200px;
  width: 200px;

  p{
    font-size: 1rem;
    font-weight: 400;
    margin: 0;
  }
  &:hover,
  :focus,
  :active {
    cursor: pointer;
    color: ${colors.principalColor};
    border-color: ${colors.titleColor};
  }
  img{
    height: 100px;  
    width: 100px ;
  }
`;

export default function FlashCardDecks ({token,setFormUpdate,formUpdate, cardList, setCardList, edit,setEdit}){

  useEffect(() => {
    const fetchExams = async () => {
    try {
      const response = await axios.post('/api/decks/get-decks', {
        token,
      });
      setCardList(response.data.list);
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
  function Delete(card) {
    axios.put('api/decks/putCard',{
      token,
      title: card
    })
    .then((res)=>{
      setFormUpdate(true)
      if (cardList.length == 1) {
        setEdit(false)
      }
    })
    .catch((err)=>console.log(err))
    
  }
  return (
    <FlexContainer>
      {edit==true&&
        cardList.map((element, index) => (
          <span key={index}>
            <ButtonClose onClick={()=>{
              setEdit(false)
              Delete(element)
            }}><img src="/icons/close.png" alt="delete" /></ButtonClose>
            <Decks>
              <h3>{element}</h3>
            </Decks>
          </span>
        ))
      }
      {edit== false &&
      cardList.map((element, index) => (
        <Link href={`/flex-cards/${element}`} key={index}>
          <Decks>
            <h3>{element}</h3>
          </Decks>
        </Link>
      ))}
      {cardList.length <= 0 && 
        <p>You don't have a deck.</p>
      }
    </FlexContainer>
  );
}