import Link from "next/link";
import { Header, Title, Main, Footer  } from "../components/sharedstyles";
import { FormLogin } from "../components/formLogin";

export default function Login (){
    return (
        <>
             <Header>
                <nav>
                    <Link href={'/'}>Home</Link>
                    <Link href={'/register'}>Cadastre-se</Link>
                </nav>
            </Header>
            <Main>
                <Title>Faça login na sua conta.</Title>
                <FormLogin/>
            </Main>
            <Footer>
                <Link href={'/register'}>Crie sua conta</Link>
            </Footer>
        </>
    )
}