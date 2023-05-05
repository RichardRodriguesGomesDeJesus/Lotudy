import styled from 'styled-components';
import { colors } from './sharedstyles';
import { link } from 'fs';
const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  flex-flow: row wrap;
  width: 80%;
  margin: 1rem;

  @media (max-width: 768px) {
    flex-flow: column;
    height: auto;
  }
`;

const Card = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  background: #fff;
  text-align: center;
  padding: 0;
  color: inherit;
  text-decoration: none;
  border: 1px solid black;
  border-radius: 10px;
  transition: color 0.15s ease, border-color 0.15s ease;

  p{
    margin: 0;
  }
  &:hover,
  :focus,
  :active {
    cursor: pointer;
    color: ${colors.principal};
    border-color: ${colors.segundaria};
  }
  @media screen and (min-width: 0 ){
    height:150px;
    width: 150px;
    img{
      height: 75px;  
      width:  75px ;
    }
  };
  @media screen and (min-width: 768px ){
    height:200px;
    width: 200px;
    img{
      height: 100px;  
      width: 100px ;
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

export default function Cards() {
  const cardList = [
    {
      img: 'cards/studying.svg',
      text: 'Estude onde quiser. ',
    },
    {
      img: 'cards/winners.svg',
      text: 'Conquiste a nota maxima no vestibular ',
    },
    {
      img: 'cards/growth.svg',
      text: 'Crie o habito de estudar de uma forma simples' ,
    }
  ];
  return (
    <FlexContainer>
      {cardList.map((element, index) => (
        <Card key={index}>
          <img src={element.img} alt={element.text} />
          <p>{element.text}</p>
        </Card>
      ))}
    </FlexContainer>
  );
}
