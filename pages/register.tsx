import Link from "next/link";
import { Container, Footer, Header, Main, Title } from "../components/sharedstyles";
import FormRegister from "../components/formRegister";

export default function Register (){
    return (
        <Container>
             <Header>
                <nav>
                    <Link href={'/'}>Home</Link>
                    <Link href={'/login'}>Login</Link>
                </nav>
            </Header>
            <Main>
                <Title>Crie  sua conta.</Title>
                <FormRegister/>
            </Main>
            <Footer>
                <Link href={'/login'}>Já tem conta?</Link>
            </Footer>
        </Container>
    )
} 