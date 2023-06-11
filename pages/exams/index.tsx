import Link from "next/link";
import { Header, Title, Footer, Main } from "../../components/sharedstyles";
import axios from "axios";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { useState, useEffect } from "react";
import ListExams from "../../components/listExams";
import FormExams from "../../components/formExams";


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
    const [ formUpdate, setFormUpdate ] = useState(false)
    return(
        <>
            <Header>
                <nav>
                    <Link href={'/dashboard'}>Dashboard</Link>
                    <Link href={'/exams'}>Simulados</Link>
                    <Link href={'/study-cycle'} >Ciclo de estudos</Link>
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
        </>
    )
}