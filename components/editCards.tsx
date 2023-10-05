import styled from "styled-components"
import { Button, colorSegundary } from "./sharedstyles"
import { useState } from "react"
import axios from "axios"
import { useRouter } from "next/router"

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

export default function EditCard ({cardList, setEdit, token , deckName}){
  const router = useRouter()
  const [cardSelect,setCardSelect] = useState(0)
  const [flip, setFlip] = useState(false);
  const [update, setUpdate] = useState(false)

  function save(cards, token) {
    axios.put('/api/decks/put-cards', {
        token,
        cards,
        title: deckName
      })
      .then((res) => {
        setEdit(false)
      })
      .catch((err) => {
        router.push('/login')
      });
  }

  return(
    <FlexContainer>
      {update === false && cardList.length > 0 &&
      <>
        <input type="range" onChange={(e)=>{
          setCardSelect(parseInt(e.target.value))
        }} value={cardSelect} min={0} max={cardList.length -1}/>
        <Card
        className={flip === true && 'rotate'}
        onClick={() => {
          if (flip === false) {
            setFlip(true);
          } else{
            setFlip(false)
          }
        }}
      >
        <CardFront>{cardList[cardSelect].text}</CardFront>
        <CardBack>{cardList[cardSelect].correctAnswer}</CardBack>
      </Card>
      <Button onClick={()=>{
        cardList.splice( cardSelect, 1)
        setUpdate(true)
        setCardSelect(0)
      }} >Deletar card</Button>
      <Button onClick={()=>{
        save(cardList,token)
      }} >Terminar de editar</Button>
      </>
    }
    {update === true && (
      <>
        <p>Card deletado</p>
        <Button onClick={()=>{
          setUpdate(false)
        }}>Voltar a editar</Button>
      </>
    )}
    </FlexContainer>
  )
}