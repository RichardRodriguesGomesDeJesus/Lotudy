import Link from "next/link";
import { Container, Header, Title, Footer, Main } from "../../components/sharedstyles";
import DashboardExams from "../../components/dashboardExams";
import axios from "axios";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { useState, useEffect } from "react";


export default function exams() {
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