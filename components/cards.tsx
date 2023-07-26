import styled from 'styled-components';
import { Card, FlexContainer, colorSegundary } from './sharedstyles';
import Link from 'next/link';


export default function Cards() {
  const cardList = [
    {
      img: 'cards/studying.svg',
      text: 'Pratique usando simulados.',
      href: '/exams'
    },
    {
      img: 'cards/winners.svg',
      text: 'Revise o conteúdo com flashcards.',
      href: '/flex-cards'
    },
    {
      img: 'cards/growth.svg',
      text: 'Desenvolva o hábito de estudar usando o ciclo de estudos.',
      href: '/study-cycle'
    }
  ];
  return (
    <FlexContainer>
      {cardList.map((element, index) => (
        <NavLink href={element.href} key={index}>
          <Card >
            <img src={element.img} alt={element.text} />
            <p>{element.text}</p>
          </Card>
        </NavLink>
      ))}
    </FlexContainer>
  );
}
