import Head from 'next/head'
import ResponsiveMenu, {
  Main,
  Header,
  Title,
  Description,
  Footer,
  NavLink
} from '../components/sharedstyles'
import Cards from '../components/cards'
import Link from 'next/link'
import { useState } from 'react';

export default function Home() {
  const [display, setDisplay] = useState('none');
     
  return (
    <>
      <Header display={display} >
        <img src="logo-lotudy-removebg.png" alt="logo da lotudy" />
        <nav>
          <div>
            <NavLink href={'/login'}>Login</NavLink>
          </div>
          <div>
            <NavLink href={'/register'}>Cadastre-se</NavLink>
          </div>
          <div>
            <NavLink href={'/dashboard'} > Dashboard</NavLink>
          </div>
          <div>
            <NavLink href={'/exams'} >Exams</NavLink>
          </div>
          <div>
            <NavLink href={'/study-cycle'} >Study cycle</NavLink>
          </div>
          <div>
            <NavLink href={'/flex-cards'}>Flash Cards</NavLink>
          </div>
        </nav>
        <ResponsiveMenu display={display} setDisplay={setDisplay}  />
      </Header>
      <Main>
        <Title>Venha para o VestibulaPro</Title>
        <Cards />
        <Description>
          <p>O VestibulaPro é a plataforma de estudos perfeita para quem quer conquistar a nota máxima no vestibular.</p>
          <p>Com tecnologia de aprendizado adaptativo, simulados, flex cards, perguntas e criador de ciclo e rotina de estudos, estudar nunca foi tão fácil e eficiente. Comece sua jornada rumo ao sucesso acadêmico com o VestibulaPro.</p>
        </Description>
      </Main>
      <Footer>
        <NavLink href={'/login'}>Já tem conta?</NavLink>
        <NavLink href={'/register'}>Crie sua conta</NavLink>
      </Footer>
    </>
  )
}
