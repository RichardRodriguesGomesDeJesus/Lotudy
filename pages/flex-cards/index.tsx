import Link from "next/link";
import ResponsiveMenu, { Button, Footer, Header, Main, Title } from "../../components/sharedstyles";
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
  
    const [formUpdate, setFormUpdate] = useState(false);
    const [cardList, setCardList] = useState([]) 
    const [edit, setEdit] = useState(false)

  
    return (
      <>
        <Header display={display}>
          <img src="logo-lotudy-removebg.png" alt="logo da lotudy" />
          <nav>
            <div>
              <Link href={'/dashboard'}>Dashboard</Link>
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
          <Title>Create a deck of review cards</Title>
          <FlashCardDecks token={token} setFormUpdate={setFormUpdate} formUpdate={formUpdate} cardList={cardList} setCardList={setCardList} edit={edit} setEdit={setEdit} />
          {cardList.length > 0 && edit === false &&(
            <Button onClick={()=>{
              setEdit(true)
            }} >edit</Button>
          )}
          {cardList.length > 0 && edit === true &&(
            <Button onClick={()=>{
              setEdit(false)
            }} >finish editing</Button>
          )}
          <FormDeck token={token} setFormUpdate={setFormUpdate} formUpdate={formUpdate} cardList={cardList} />
        </Main>
        <Footer>
          <Link href={'/register'}>Create an Account</Link>
        </Footer>
      </>
    )
  }
  