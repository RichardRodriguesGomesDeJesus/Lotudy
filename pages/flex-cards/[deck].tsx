import axios from "axios";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { Footer, Header, Main, Title } from "../../components/sharedstyles";
import Link from "next/link";
import FlashCards from "../../components/flashCards";

export default function deck() {
    const router = useRouter();
    const { asPath } = router;
    const parts = asPath.split('/'); 

    const deckName = parts[parts.length - 1];
    const { 'token': token } = parseCookies();
    const [userAuth , setUserAuth] = useState(true)
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
    const cardList = [
        {title: 'Matematica', cards:[
            {text:'2 + 2 ?',correctAnswer: '4', time: ''},
            {text:'cosseno de 30 graus ?',correctAnswer: '√3/2.', time: ''}
        ]}]
    const index = cardList.findIndex((element) => element.title === deckName);
    return(
        <>
            <Header>
                <nav>
                    <Link href={'/dashboard'} > Dashboard</Link>
                    <Link href={'/exams'}>Simulados</Link>
                    <Link href={'/study-cycle'} >Ciclo de estudos</Link>
                </nav>
            </Header>
            <Main>
                <Title>Deck - {deckName}</Title>
                {
                    cardList[index]?.cards && (
                    <FlashCards cards={cardList[index].cards} />
                )}
            </Main>
            <Footer>
                <Link href={'/register'}>Crie sua conta</Link>
            </Footer>
        </>
    )
}