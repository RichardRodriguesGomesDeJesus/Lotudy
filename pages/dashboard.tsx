import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Footer, Header, Main, Title } from "../components/sharedstyles";
import { parseCookies } from "nookies";
import { useRouter } from "next/router";
import axios from "axios";

export default function Dashboard() {
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
  return (
    <>
      <Header>
        <nav>
          <Link href={'/'} >Home</Link>
          <Link href={'/exams'}>Simulados</Link>
          <Link href={'/studyCycle'} >Ciclo de estudos</Link>
        </nav>
      </Header>
      <Main>
        <Title>Dashboard de ferramentas</Title>
      </Main>
      <Footer>
        <Link href={'/register'}>Crie sua conta</Link>
      </Footer>
    </>
  );
}
