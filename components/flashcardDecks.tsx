import styled from "styled-components";
import { Button, colors } from "./sharedstyles";
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
  border: 1px solid black;
  border-radius: 10px;
  transition: color 0.15s ease, border-color 0.15s ease;

  p{
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
  @media screen and (min-width: 0 ){
    height:150px;
    width: 150px;
    img{
      height: 75px;  
      width:  75px ;
    }
    p{
      font-size: .85rem;
    }
  };
  @media screen and (min-width: 768px ){
    height:200px;
    width: 200px;
    img{
      height: 100px;  
      width: 100px ;
    }
    p{
      font-size: 1rem;
    }
  };
  @media screen and (min-width: 1024px) {
    height:250px;
    width: 250px;
    img{
      height: 150px;  
      width: 150px;
    }
  };
`;

export default function FlashCardDecks ({token,setFormUpdate,formUpdate}){
  const [cardList, setCardList] = useState([]) 

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
  return (
    <FlexContainer>
      {cardList.length > 0 &&
      cardList.map((element, index) => (
        <Link href={`/flex-cards/${element}`} key={index}>
          <Decks>
            <h3>{element}</h3>
          </Decks>
        </Link>
      ))}
      {cardList.length <= 0 && 
        <p>Você não tem um baralho.</p>
      }
    </FlexContainer>
  );
}