import { useRouter } from "next/router";
import { Container, Footer, Header, Main, Title } from "../../components/sharedstyles";
import Link from "next/link";
import axios from "axios";
import { parseCookies } from "nookies";
import { useState, useEffect } from "react";

export default function ExamPage() {

  const router = useRouter();
  const { asPath } = router;
  const parts = asPath.split('/'); // Divide a URL em partes separadas por '/'

  // Obtém o último elemento da divisão, que é o nome do exame
  const examName = parts[parts.length - 1];
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
  return (
    <Container>
    <Header>
      <nav>
        <Link href={'/exams'}>Simulados</Link>
        <Link href={'/flexcards'}>Flesh Cards</Link>
      </nav>
    </Header>
    <Main>
      <Title>{examName}</Title>
    </Main>
    <Footer>
      <Link href={'/register'}>Crie sua conta</Link>
    </Footer>
  </Container>
  )
}