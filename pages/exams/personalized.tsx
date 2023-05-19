import Link from "next/link"
import { Container, Footer, Header, Main, Title } from "../../components/sharedstyles"
import ValidatyToken from "../../util/token_validaty"
import FormExams from "../../components/formExams"


export default function personalizedExams () {
    ValidatyToken()
    return(
        <>
            <Container>
            <Header>
                <nav>
                    <Link href={'/exams'}>Simulados</Link>
                    <Link href={'/flexcards'}>Flesh Cards</Link>
                </nav>
            </Header>
            <Main>
                <Title>Crie Questionarios e ordene como quiser.</Title>
                <FormExams/>
            </Main>
            <Footer>
                <Link href={'/register'}>Crie sua conta</Link>
            </Footer>
        </Container>
        </>
    )
}