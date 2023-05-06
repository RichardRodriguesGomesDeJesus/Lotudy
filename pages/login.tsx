import Link from "next/link";
import { Header, Title, Main, Footer, Container } from "../components/sharedstyles";
import { FormLogin } from "../components/formLogin";

export default function Login (){
    return (
        <Container>
             <Header>
                <nav>
                    <Link href={'/'}>Home</Link>
                </nav>
            </Header>
            <Main>
                <Title>Faça login na sua conta</Title>
                <FormLogin/>
            </Main>
            <Footer>
                <Link href={'/login'}>Já tem conta?</Link>
            </Footer>
        </Container>
    )
}