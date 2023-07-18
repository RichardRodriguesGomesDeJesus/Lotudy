import Link from "next/link";
import ResponsiveMenu, { Footer, Header, Main, Title } from "../components/sharedstyles";
import FormRegister from "../components/formRegister";
import { useState } from "react";

export default function Register (){
    const [translateX, setTranslateX] = useState('100%');
    

    return (
        <>
             <Header translateX={translateX} >
                <nav>
                    <div>
                        <Link href={'/'}>Home</Link>
                    </div>
                    <div>
                        <Link href={'/login'}>Login</Link>
                    </div>
                </nav>
                <ResponsiveMenu translateX={translateX} setTranslateX={setTranslateX}/>
            </Header>
            <Main>
                <Title>Crie  sua conta.</Title>
                <FormRegister/>
            </Main>
            <Footer>
                <Link href={'/register'}>Create your account</Link>
            </Footer>
        </>
    )
} 