import Link from "next/link"
import { Container, Footer, Header, Main, Title } from "../../components/sharedstyles"
import FormExams from "../../components/formExams"
import ListExams from "../../components/listExams"
import { useEffect, useState } from "react"
import { parseCookies } from "nookies"
import { useRouter } from "next/router"
import axios from "axios"


export default function personalizedExams () {
    const { 'token': token } = parseCookies();
    const [userAuth , setUserAuth] = useState(true)
    const router = useRouter();
    useEffect(()=>{
        if (!token) {
        setUserAuth(false)
        } else {
        try {
            axios.post('/api/auth/verify_token', {
            token,
            })
            .then(()=> { setUserAuth(true)})
            .catch(()=>{setUserAuth(false)})
        } catch (error) {
            setUserAuth(false)
        }
        }
    },[token])
    if (userAuth === false) {
        router.push("/login");
    }
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
