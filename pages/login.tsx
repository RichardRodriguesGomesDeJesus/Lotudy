import Link from "next/link";
import ResponsiveMenu, { Header, Title, Main, Footer  } from "../components/sharedstyles";
import { FormLogin } from "../components/formLogin";
import { useState } from "react";

export default function Login (){
    const [display, setDisplay] = useState('none');
    return (
        <>
            <Header display={display} >
                <img src="logo-lotudy-removebg.png" alt="logo da lotudy" />
                <nav>
                    <div>
                        <Link href={'/'}>Home</Link>
                    </div>
                    <div>
                        <Link href={'/register'}>Register</Link>
                    </div>
                </nav>
                <ResponsiveMenu display={display} setDisplay={setDisplay} />
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