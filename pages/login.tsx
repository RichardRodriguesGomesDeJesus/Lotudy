import Link from "next/link";
import ResponsiveMenu, { Header, Title, Main, Footer  } from "../components/sharedstyles";
import { FormLogin } from "../components/formLogin";
import { useState } from "react";

export default function Login (){
    const [translateX, setTranslateX] = useState('100%');
    return (
        <>
             <Header translateX={translateX} >
                <nav>
                    <div>
                        <Link href={'/'}>Home</Link>
                    </div>
                    <div>
                        <Link href={'/register'}>Register</Link>
                    </div>
                </nav>
                <ResponsiveMenu translateX={translateX} setTranslateX={setTranslateX}/>
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