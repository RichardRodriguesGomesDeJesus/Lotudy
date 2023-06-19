import Link from "next/link";
import { Footer, Header, Main } from "../components/sharedstyles";

export default function Custom404() {
    return (
    <>
      <Header>
            <nav>
                <Link href={'/dashboard'} > Dashboard</Link>
                <Link href={'/exams'}>Simulados</Link>
                <Link href={'/flex-cards'}>Cards de revisão</Link>
            </nav>
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