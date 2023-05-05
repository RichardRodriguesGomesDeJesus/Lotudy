import Link from "next/link";
import { Header, Title, Main, Footer } from "../components/sharedstyles";

export default function Login (){
    return (
        <>
            <Header>
                <nav>
                    <Link href={'/'}>Home</Link>
                </nav>
            </Header>
            <Main>
                <Title>Venha para o StadyMaster</Title>
            </Main>
            <Footer>
                <Link href={'/login'}>Já tem conta?</Link>
            </Footer>
        </>
    )
}