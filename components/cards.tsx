import styled from 'styled-components';
import { colors } from './sharedstyles';
import Link from 'next/link';
const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  flex-flow: row wrap;
  width: 80%;
  margin: 1rem;

  @media (max-width: 768px) {
    height: auto;
  }
`;

const Card = styled.div`
  display: flex;
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

export default function Cards() {
  const cardList = [
    {
      img: 'cards/studying.svg',
      text: 'Estude onde quiser. ',
    },
    {
      img: 'cards/winners.svg',
      text: 'Conquiste a nota maxima no vestibular. ',
    },
    {
      img: 'cards/growth.svg',
      text: 'Crie o habito de estudar de uma forma simples.' ,
    }
  ];
  return (
    <FlexContainer>
      {cardList.map((element, index) => (
        <Link href={'/login'} key={index}>
          <Card >
            <img src={element.img} alt={element.text} />
            <p>{element.text}</p>
          </Card>
        </Link>
      ))}
    </FlexContainer>
  );
}
