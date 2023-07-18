import Link from "next/link";
import ResponsiveMenu, { Footer, Header, Main, Title } from "../components/sharedstyles";
import FormRegister from "../components/formRegister";
import { useState } from "react";

export default function Register (){
    const [display, setDisplay] = useState('none');
    

    return (
        <>
             <Header display={display} >
                <nav>
                    <div>
                        <Link href={'/'}>Home</Link>
                    </div>
                    <div>
                        <Link href={'/login'}>Login</Link>
                    </div>
                </nav>
                <ResponsiveMenu display={display} setDisplay={setDisplay}/>
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