import Link from "next/link";
import { Container, Footer, Header, Main, Title } from "../components/sharedstyles";
import ValidatyToken from "../util/token_validaty";

export default function Dashboard() {
    ValidatyToken()
    return(
        <Container>
        <Header>
           <nav>
               <Link href={'/home'}>Home</Link>
               <Link href={'/register'}>Cadastre-se</Link>
           </nav>
       </Header>
       <Main>
           <Title>Dashboard de ferramentas</Title>
       </Main>
       <Footer>
           <Link href={'/register'}>Crie sua conta</Link>
       </Footer>
   </Container>
)
}