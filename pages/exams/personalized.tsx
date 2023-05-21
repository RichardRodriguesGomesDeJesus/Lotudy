import Link from "next/link"
import { Container, Footer, Header, Main, Title } from "../../components/sharedstyles"
import ValidatyToken from "../../util/token_validaty"
import FormExams from "../../components/formExams"
import ListExams from "../../components/listExams"
import { useState } from "react"


export default function personalizedExams () {
    ValidatyToken()
    const [ formUpdate, setFormUpdate ] = useState(false)
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
                <ListExams formUpdate={formUpdate} setFormUpdate={setFormUpdate}/>
                <FormExams formUpdate={formUpdate} setFormUpdate={setFormUpdate}/>
            </Main>
            <Footer>
                <Link href={'/register'}>Crie sua conta</Link>
            </Footer>
        </Container>
        </>
    )
}
