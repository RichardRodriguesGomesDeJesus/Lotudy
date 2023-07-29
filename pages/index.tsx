import Head from 'next/head'
import ResponsiveMenu, {
  Main,
  Header,
  Title,
  Description,
  Footer
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
            <Link href={'/login'}>Login</Link>
          </div>
          <div>
            <Link href={'/register'}>Cadastre-se</Link>
          </div>
          <div>
            <Link href={'/dashboard'} > Dashboard</Link>
          </div>
          <div>
            <Link href={'/exams'} >Simulados</Link>
          </div>
          <div>
            <Link href={'/study-cycle'} >Ciclo de estudos</Link>
          </div>
          <div>
            <Link href={'/flex-cards'}>Cards de revisão</Link>
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
        <Link href={'/login'}>Já tem conta?</Link>
        <Link href={'/register'}>Crie sua conta</Link>
      </Footer>
    </>
  )
}
