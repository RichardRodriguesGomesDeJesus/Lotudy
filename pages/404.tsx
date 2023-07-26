import Link from "next/link";
import ResponsiveMenu, { Footer, Header, Main, NavLink } from "../components/sharedstyles";
import { useState } from "react";

export default function Custom404() {
  const [display, setDisplay] = useState('none');
    return (
    <>
      <Header display={display} >
        <img src="logo-lotudy-removebg.png" alt="logo da lotudy" />
        <nav>
            <div>
              <NavLink href={'/dashboard'} > Dashboard</NavLink>
            </div>
            <div>
              <NavLink href={'/exams'}>Simulados</NavLink>
            </div>
            <div>
              <NavLink href={'/flex-cards'}>Cards de revisão</NavLink>
            </div>
        </nav>
        <ResponsiveMenu display={display} setDisplay={setDisplay}/>
      </Header>
      <Main>
        <h1>404 - Page Not Found</h1>
      </Main>
      <Footer>
            <NavLink href={'/register'}>Crie sua conta</NavLink>
      </Footer>
    </>
    );
  }