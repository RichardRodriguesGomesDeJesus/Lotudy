import Link from "next/link";
import ResponsiveMenu, { Header, Title, Main, Footer  } from "../components/sharedstyles";
import { FormLogin } from "../components/formLogin";
import { useState } from "react";
import { Head } from "next/document";

export default function Login (){
    const [display, setDisplay] = useState('none');
    return (
        <>
            <Header display={display} >
                <img src="logo-lotudy-removebg.png" alt="logo da lotudy" />
                <nav>
                    <div>
                        <NavLink href={'/'}>Home</NavLink>
                    </div>
                    <div>
                        <NavLink href={'/register'}>Register</NavLink>
                    </div>
                </nav>
                <ResponsiveMenu display={display} setDisplay={setDisplay} />
            </Header>
            <Main>
                <Title>Sign in to your account.</Title>
                <FormLogin/>
            </Main>
            <Footer>
                <NavLink href={'/register'}>Create your account</NavLink>
            </Footer>
        </>
    )
}