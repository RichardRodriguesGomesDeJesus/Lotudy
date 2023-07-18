import Link from "next/link";
import ResponsiveMenu, { Footer, Header, Main } from "../components/sharedstyles";
import { useState } from "react";

export default function Custom404() {
    const [translateX, setTranslateX] = useState('100%');
    return (
    <>
      <Header translateX={translateX} >
            <nav>
                <div>
                  <Link href={'/dashboard'} > Dashboard</Link>
                </div>
                <div>
                  <Link href={'/exams'}>Simulados</Link>
                </div>
                <div>
                  <Link href={'/flex-cards'}>Cards de revisão</Link>
                </div>
            </nav>
            <ResponsiveMenu translateX={translateX} setTranslateX={setTranslateX}/>
      </Header>
      <Main>
        <h1>404 - Page Not Found</h1>
      </Main>
      <Footer>
            <Link href={'/register'}>Crie sua conta</Link>
      </Footer>
    </>
    );
  }