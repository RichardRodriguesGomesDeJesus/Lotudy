import styled from "styled-components";
import { Button, colors } from "./sharedstyles";
import { useState } from "react";
import { useRouter } from "next/router";

const FlexContainer = styled.div`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  flex-direction: column;
  width: 100%;
  margin: 1rem;
  perspective: 1000px;
  .rotate {
    transform: rotateY(180deg);
  }
  div{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1rem;
  }
  
  @media (max-width: 768px) {
    height: auto;
  }
`;

const Card = styled.div`
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
  transition: transform 1000ms;
  transform-style: preserve-3d;
  div{
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: absolute;
    p{
      font-weight: 400;
      margin: 0;
    }
  }
  &:hover,
  :focus {
    cursor: pointer;
  }
  @media screen and (min-width: 0 ){
    height:150px;
    width: 250px;
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
    width: 300px;
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
    width: 350px;
    img{
      height: 150px;  
      width: 150px;
    }
  };
`;
const CardBack = styled.div`
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  transform: rotateY(180deg);
  height: 100%;
  width:100%;
`
const CardFront = styled.div`
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;  
  height: 100%;
  width:100%;
`

export default function FlashCards ({cards}){
      const router = useRouter() 
      const [cardsEnd, setCardsEnd] = useState(false)
      const [index, setIndex] = useState(0)
      const [flip, setFlip] = useState(false)
      function nextCard() {
        if (index + 1 >= cards.length) {
            setFlip(false)
            setCardsEnd(true)
        } else {
          setFlip(false)
          setIndex(index + 1)
        }
      }
      return (
        <FlexContainer>
          {cards.length > 0 && cardsEnd === true &&
            <>
              <h2>Você terminou</h2>
              <Button onClick={()=>{
                router.push('/flex-cards')
              }}>Voltar</Button>
            </>
          }
          {cards.length > 0 && cardsEnd === false &&
            <Card  className={flip===true && 'rotate'} onClick={()=>{
              if (flip===false) {
                setFlip(true)
              }
            }} >
              <CardFront>
                <p>{cards[index].text}</p>
              </CardFront>
              <CardBack>{cards[index].correctAnswer}</CardBack>
            </Card>
          }
          {flip === true &&(
            <>
              <h2>Qual foi a sua dificuldade?</h2>
            <div>
              <Button onClick={()=>{
                cards[index].time = '4d'
                nextCard()
              }}>Muito Fácil</Button>
              <Button onClick={()=>{
                cards[index].time = '10m'
                nextCard()
              }}>Fácil</Button>
              <Button onClick={()=>{
                cards[index].time = '5m'
                nextCard()
              }}>Médio</Button>
              <Button onClick={()=>{
                cards[index].time = '2m'
                nextCard()
              }}>Difícil</Button>
              <Button onClick={()=>{
                cards[index].time = '1m'
                nextCard()
              }}>Muito Difícil</Button>
            </div>
            </>
          )}
          {cards.length <= 0 &&(
            <>
              <h2>Você não tem nenhum card.</h2>
            </>
          )

          }
        </FlexContainer>
      );
}