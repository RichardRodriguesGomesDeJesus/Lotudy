import Link from "next/link";
import { Container, Footer, Header, Main, Title } from "../components/sharedstyles";

export default function home() {
    return(
        <Container>
        <Header>
           <nav>
               <Link href={'/home'}>Home</Link>
               <Link href={'/register'}>Cadastre-se</Link>
           </nav>
       </Header>
       <Main>
           <Title>Faça login na sua conta.</Title>
       </Main>
       <Footer>
           <Link href={'/register'}>Crie sua conta</Link>
       </Footer>
   </Container>
)
}