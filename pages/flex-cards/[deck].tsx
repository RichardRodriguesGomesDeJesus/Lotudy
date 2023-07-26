import axios from "axios";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import ResponsiveMenu, { Button, Header, Main, Title } from "../../components/sharedstyles";
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
    const [ card, setCard] = useState(false);
    const [] = useState(false)
  
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
              <Link href={'/dashboard'}>Dashboard</Link>
            </div>
            <div>
              <Link href={'/flex-cards'}>Flash Cards</Link>
            </div>
            <div>
              <Link href={'/exams'}>Exams</Link>
            </div>
            <div>
              <Link href={'/study-cycle'}>Study Cycle</Link>
            </div>
          </nav>
          <ResponsiveMenu display={display} setDisplay={setDisplay}/>
        </Header>
        <Main>
          <Title>Deck - {deckName}</Title>
          {form === false && card === true && <FlashCards cards={cardList} setCard={setCard} deckName={deckName} />}
          {form === false && card === false &&(
            <>
              <Button onClick={() => { setForm(true) }}>Create Cards</Button>
              <Button onClick={()=>{ setCard(true)}}>Start Deck</Button>
            </>
          )}
          {form === true && card === false && <FormCards setForm={setForm} setUpdateCards={setUpdateCards} deckName={deckName}  />}
        </Main>
      </>
    )
  }
  