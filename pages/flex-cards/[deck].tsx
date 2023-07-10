import axios from "axios";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { Button, Footer, Header, Main, Title } from "../../components/sharedstyles";
import Link from "next/link";
import FlashCards from "../../components/flashCards";
import FormCards from "../../components/formCards";

export default function deck() {
    const router = useRouter();
    const { asPath } = router;
    const parts = asPath.split('/');
    const deckName = parts[parts.length - 1];
    const [request, setRequest] = useState(false);
    const { 'token': token } = parseCookies();
    const [userAuth, setUserAuth] = useState(true);
    const [cardList, setCardList] = useState([]);
    const [updateCards, setUpdateCards] = useState(false);
  
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
  
    if (request === false && deckName !== '[deck]' || updateCards === true) {
      axios
        .post("/api/decks/get-cards", {
          title: deckName,
          token,
        })
        .then((res) => {
          setCardList(res.data.deck.cards);
          setRequest(true);
          setUpdateCards(false);
        })
        .catch((err) => {
          console.log(err.response);
          setRequest(true);
          setUpdateCards(false);
        });
    }
    const [form, setForm] = useState(false);
  
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
          <Title>Deck - {deckName}</Title>
          {form === false && <FlashCards cards={cardList} />}
          {form === false && <Button onClick={() => { setForm(true) }}>Create Cards</Button>}
          {form === true && <FormCards setForm={setForm} setUpdateCards={setUpdateCards} />}
        </Main>
        <Footer>
          <Link href={'/register'}>Create an Account</Link>
        </Footer>
      </>
    )
  }
  