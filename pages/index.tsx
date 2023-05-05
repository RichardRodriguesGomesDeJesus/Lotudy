import Head from 'next/head'
import {
  Container,
  Main,
  Header,
  Title,
  Description,
  Footer
} from '../components/sharedstyles'
import Cards from '../components/cards'
import Link from 'next/link'

export default function Home() {
     
  return (
    <Container>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="VestibulaPro" />
        <link rel="icon" href="/favicon.ico" />
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');
        </style>
      </Head>
      <Header>
        <nav>
          <Link href={'/login'}>Login</Link>
        </nav>
      </Header>
      <Main>
        <Title>Venha para o VestibulaPro</Title>
        <Cards />
        <Description>
          O VestibulaPro é a plataforma de estudos perfeita para quem quer conquistar a nota máxima no vestibular.
          <br/>
          <br/>
          Com tecnologia de aprendizado adaptativo, simulados, flex cards, perguntas e criador de ciclo e rotina de estudos, estudar nunca foi tão fácil e eficiente. Comece sua jornada rumo ao sucesso acadêmico com o VestibulaPro.
        </Description>
      </Main>
      <Footer>
        <Link href={'/login'}>Já tem conta?</Link>
      </Footer>
    </Container>
  )
}
