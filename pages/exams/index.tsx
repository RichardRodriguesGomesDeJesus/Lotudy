import Link from "next/link";
import { Container, Header, Title, Footer, Main } from "../../components/sharedstyles";
import ValidatyToken from "../../util/token_validaty";
import DashboardExams from "../../components/dashboardExams";


export default function exams() {
    ValidatyToken()
    return(
        <Container>
            <Header>
                <nav>
                    <Link href={'/exams'}>Simulados</Link>
                    <Link href={'/flexcards'}>Flesh Cards</Link>
                </nav>
            </Header>
            <Main>
                <Title>Crie Questionarios ou faça provas anteriores dos vestibulares famosos.</Title>
                <DashboardExams/>
            </Main>
            <Footer>
                <Link href={'/register'}>Crie sua conta</Link>
            </Footer>
        </Container>
    )
}