import styled from "styled-components"
import { Button, colorSegundary } from "./sharedstyles"
import { useState } from "react"
import { useRouter } from "next/router"
import axios from "axios"
import { parseCookies } from "nookies"

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
  box-shadow: 0 4px 20px ${colorSegundary.textColor};
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  background: ${colorSegundary.white};
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
`
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

export default function FlashCards({ cards, setCard, deckName }) {
  const [cardsEnd, setCardsEnd] = useState(false)
  const [index, setIndex] = useState(0)
  const [flip, setFlip] = useState(false)
  const { 'token': token } = parseCookies()

  function nextCard() {
    console.log(cards)
    if (index + 1 >= cards.length) {
      setFlip(false)
      setCardsEnd(true)
    } else {
      setFlip(false)
      setIndex(index + 1)
    }
  }

  function save(cards, token, title) {
    axios
      .put('/api/decks/put-cards', {
        token,
        cards,
        title
      })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <FlexContainer>
      {cards.length > 0 && cardsEnd === true && (
        <>
          <p>Você completou a revisão.</p>
          <Button
            onClick={() => {
              setCard(false)
            }}
          >
            Voltar
          </Button>
        </>
      )}
      {cards.length > 0 && cardsEnd === false && (
        <>
          <Card
            className={flip === true && 'rotate'}
            onClick={() => {
              if (flip === false) {
                setFlip(true)
              }
            }}
          >
            <CardFront>{cards[index].text}</CardFront>
            <CardBack>{cards[index].correctAnswer}</CardBack>
          </Card>
          {cards[index]?.time !== '' && flip === false &&(
            <h3>Tempo gasto para responder ao card anteriormente: {cards[index]?.time}.</h3>
          )}
        </>
      )}
      {flip === true && (
        <>
          <h3>Quanto tempo você levou para responder o cartão?</h3>
          <div>
            <Button
              onClick={() => {
                cards[index].time = 'Muito Pouco'
                save(cards, token, deckName)
                nextCard()
              }}
            >
              Muito Pouco
            </Button>
            <Button
              onClick={() => {
                cards[index].time = 'Pouco'
                save(cards, token, deckName)
                nextCard()
              }}
            >
              Pouco
            </Button>
            <Button
              onClick={() => {
                cards[index].time = 'Médio'
                save(cards, token, deckName)
                nextCard()
              }}
            >
              Médio
            </Button>
            <Button
              onClick={() => {
                cards[index].time = 'Grande'
                save(cards, token, deckName)
                nextCard()
              }}
            >
              Grande
            </Button>
            <Button
              onClick={() => {
                cards[index].time = 'Muito Grande'
                save(cards, token, deckName)
                nextCard()
              }}
            >
              Muito Grande
            </Button>
          </div>
        </>
      )}
      {cards.length === 0 && <p>Você não tem nenhum card.</p>}
    </FlexContainer>
  )
}

