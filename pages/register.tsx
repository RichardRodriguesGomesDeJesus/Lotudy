import Link from "next/link";
import ResponsiveMenu, { Footer, Header, Main, Title } from "../components/sharedstyles";
import FormRegister from "../components/formRegister";
import { useState } from "react";

export default function Register (){
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
                        <Link href={'/login'}>Login</Link>
                    </div>
                </nav>
                <ResponsiveMenu display={display} setDisplay={setDisplay}/>
            </Header>
            <Main>
                <Title>Crie  sua conta</Title>
                <FormRegister/>
            </Main>
            <Footer>
                <Link href={'/login'}>Faça Login se já possui conta</Link>
            </Footer>
        </>
    )
} 