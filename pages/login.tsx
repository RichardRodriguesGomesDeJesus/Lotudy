import Link from "next/link";
import { Header, Title, Main, Footer  } from "../components/sharedstyles";
import { FormLogin } from "../components/formLogin";

export default function Login (){
    return (
        <>
             <Header>
                <nav>
                    <Link href={'/'}>Home</Link>
                    <Link href={'/register'}>Register</Link>
                </nav>
            </Header>
            <Main>
                <Title>Sign in to your account.</Title>
                <FormLogin/>
            </Main>
            <Footer>
                <Link href={'/register'}>Create your account</Link>
            </Footer>
        </>
    )
}