import { useRouter } from "next/router";
import { Button, Container, Footer, Header, Main, Title } from "../../components/sharedstyles";
import Link from "next/link";
import axios from "axios";
import { parseCookies } from "nookies";
import { useState, useEffect } from "react";
import QuestionForm from "../../components/questionForm";
import Question from "../../components/question";

export default function ExamPage() {

  const router = useRouter();
  const { asPath } = router;
  const parts = asPath.split('/'); 

  const examName = parts[parts.length - 1];
  const { 'token': token } = parseCookies();
  const [userAuth , setUserAuth] = useState(true)
  const [question, setQuestion] = useState(false)
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
  const [form, setForm] = useState(false)
  return (
    <Container>
    <Header>
      <nav>
        <Link href={'/exams'}>Simulados</Link>
        <Link href={'/flexcards'}>Flesh Cards</Link>
      </nav>
    </Header>
    <Main>
      <Title> Crie questões para o simulado {examName} ou faça ele</Title>
      {form === true &&
        <QuestionForm examName={examName} token={token} setForm={setForm} setQuestion={setQuestion} question={question} />
      }
      {
        form === false &&
        <Button onClick={(e)=>{
          e.preventDefault()
          setForm(true)
        }}>Criar questões</Button>
      }
      {
        question === false && form === false && 
        <Button onClick={(e)=>{
          e.preventDefault()
          setQuestion(true)
        }}>Começar simulado</Button>
      }
      {
        question === true &&   form === false &&
          <Question/>
      }
    </Main>
    <Footer>
      <Link href={'/register'}>Crie sua conta</Link>
    </Footer>
  </Container>
  )
}