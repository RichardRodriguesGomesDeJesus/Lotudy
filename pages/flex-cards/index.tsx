import Link from "next/link";
import { Button, Footer, Header, Main, Title } from "../../components/sharedstyles";
import FlashCardDecks from "../../components/flashcardDecks";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import FormDeck from "../../components/formDecks";

export default function flexCards() {
    const { 'token': token } = parseCookies();
    const [userAuth, setUserAuth] = useState(true);
    const router = useRouter();
  
    useEffect(() => {
      if (!token) {
        setUserAuth(false);
      } else {
        try {
          axios
            .post('/api/auth/verify_token', {
              token,
            })
            .then(() => {
              setUserAuth(true);
            })
            .catch(() => {
              setUserAuth(false);
            });
        } catch (error) {
          setUserAuth(false);
        }
      }
    }, [token]);
  
    if (userAuth === false) {
      router.push("/login");
    }
  
    const [formUpdate, setFormUpdate] = useState(false);
  
    return (
      <>
        <Header>
          <nav>
            <Link href={'/dashboard'}>Dashboard</Link>
            <Link href={'/exams'}>Exams</Link>
            <Link href={'/study-cycle'}>Study Cycle</Link>
          </nav>
        </Header>
        <Main>
          <Title>Create a deck of review cards</Title>
          <FlashCardDecks token={token} setFormUpdate={setFormUpdate} formUpdate={formUpdate} />
          <FormDeck token={token} setFormUpdate={setFormUpdate} formUpdate={formUpdate} />
        </Main>
        <Footer>
          <Link href={'/register'}>Create an Account</Link>
        </Footer>
      </>
    )
  }
  