import axios from "axios";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import ResponsiveMenu, { Button, Header, Main, NavLink, Title } from "../../components/sharedstyles";
import Link from "next/link";
import FlashCards from "../../components/flashCards";
import FormCards from "../../components/formCards";

export default function deck() {
    const router = useRouter();
    const { asPath } = router;
    const parts = asPath.split('/');
    const deckName = decodeURIComponent(parts[parts.length - 1]);
    const [request, setRequest] = useState(false);
    const { 'token': token } = parseCookies();
    const [userAuth, setUserAuth] = useState(true);
    const [cardList, setCardList] = useState([]);
    const [updateCards, setUpdateCards] = useState(false);
    const [display, setDisplay] = useState('none');
  
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
  
    useEffect(()=>{
      if (request === false && deckName !== '[deck]' || updateCards === true) {
        axios
          .post("/api/decks/get-cards", {
            title: deckName,
            token,
          })
          .then((res) => {
            console.log(res)
            setCardList(res.data.deck.cards);
            setRequest(true);
            setUpdateCards(false);
          })
          .catch((err) => {
            router.push("/flex-cards");
            console.log(err)
            setRequest(true);
            setUpdateCards(false);
          });
      }
    },[request,deckName,updateCards])
    const [form, setForm] = useState(false);
  
    return (
      <>
        <Header display={display} >
          <img src="../logo-lotudy-removebg.png" alt="logo da lotudy" />
          <nav>
            <div>
              <NavLink href={'/dashboard'}>Dashboard</NavLink>
            </div>
            <div>
              <NavLink href={'/exams'}>Exams</NavLink>
            </div>
            <div>
              <NavLink href={'/study-cycle'}>Study Cycle</NavLink>
            </div>
          </nav>
          <ResponsiveMenu display={display} setDisplay={setDisplay}/>
        </Header>
        <Main>
          <Title>Deck - {deckName}</Title>
          {form === false && <FlashCards cards={cardList} />}
          {form === false && <Button onClick={() => { setForm(true) }}>Create Cards</Button>}
          {form === true && <FormCards setForm={setForm} setUpdateCards={setUpdateCards} deckName={deckName}  />}
        </Main>
      </>
    )
  }
  