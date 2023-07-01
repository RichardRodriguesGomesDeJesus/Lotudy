import styled from "styled-components";
import { Button, colors } from "./sharedstyles";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { parseCookies } from "nookies";

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

export default function FlashCards({ cards }) {
  const router = useRouter();
  const [cardsEnd, setCardsEnd] = useState(false);
  const [index, setIndex] = useState(0);
  const [flip, setFlip] = useState(false);
  const { 'token': token } = parseCookies();

  function nextCard() {
    console.log(cards);
    if (index + 1 >= cards.length) {
      setFlip(false);
      setCardsEnd(true);
    } else {
      setFlip(false);
      setIndex(index + 1);
    }
  }

  function save(cards, token) {
    axios
      .put('/api/decks/put-cards', {
        token,
        cards,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <FlexContainer>
      {cards.length > 0 && cardsEnd === true && (
        <>
          <p>You have completed all the cards.</p>
          <Button
            onClick={() => {
              router.push('/flex-cards');
            }}
          >
            Go Back
          </Button>
        </>
      )}
      {cards.length > 0 && cardsEnd === false && (
        <>
          <Card
            className={flip === true && 'rotate'}
            onClick={() => {
              if (flip === false) {
                setFlip(true);
              }
            }}
          >
            <CardFront>{cards[index].text}</CardFront>
            <CardBack>{cards[index].correctAnswer}</CardBack>
          </Card>
          {cards[index]?.time !== '' && flip === false &&(
            <p>
              Time taken to respond to card previously: {cards[index]?.time}.
            </p>
          )}
        </>
      )}
      {flip === true && (
        <>
          <h2>How much time did it take you to answer the card?</h2>
          <div>
            <Button
              onClick={() => {
                cards[index].time = 'Very short';
                save(cards, token);
                nextCard();
              }}
            >
              Very Short
            </Button>
            <Button
              onClick={() => {
                cards[index].time = 'Short';
                save(cards, token);
                nextCard();
              }}
            >
              Short
            </Button>
            <Button
              onClick={() => {
                cards[index].time = 'Medium';
                save(cards, token);
                nextCard();
              }}
            >
              Medium
            </Button>
            <Button
              onClick={() => {
                cards[index].time = 'Long';
                save(cards, token);
                nextCard();
              }}
            >
              Long
            </Button>
            <Button
              onClick={() => {
                cards[index].time = 'Very long';
                save(cards, token);
                nextCard();
              }}
            >
              Very Long
            </Button>
          </div>
        </>
      )}
      {cards.length === 0 && <p>You don't have any cards.</p>}
    </FlexContainer>
  );
}

